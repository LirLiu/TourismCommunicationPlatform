let commonOption = require("../db/index");
let fs = require("fs");
let returnObj = {};
// 用户注册接口
commonOption.router.post("/register", (req, res) => {
    let params = req.body;
    new Promise((resolve, reject) => {
        let sql_name = `SELECT * FROM user WHERE u_account='${params.account}'`;
        commonOption.query(sql_name, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result[0] === undefined) {
                resolve();
            } else {
                returnObj.code = 1001;
                returnObj.msg = "账号重复！";
                res.send(returnObj);
                reject();
            }
        });
    }).then(() => {
        let sql = `INSERT INTO user (u_name,u_create,u_password,u_email,u_account) VALUES (?,?,?,?,?)`;
        commonOption.query(
            sql,
            [
                params.nickname,
                params.create,
                params.password,
                params.email,
                params.account
            ],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result === undefined) {
                    returnObj.code = 1001;
                    returnObj.msg = "注册失败";
                    res.send(returnObj);
                } else {
                    returnObj.code = 1000;
                    returnObj.msg = "注册成功";
                    res.send(returnObj);
                }
            }
        );
    });
});

//用户登录接口
commonOption.router.post("/login", (req, res) => {
    let params = req.body;
    let sql_name = `SELECT * FROM user WHERE u_account='${params.account}' AND u_password='${params.password}'`;

    commonOption.query(sql_name, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result[0]) {
            let resultArray = result[0];
            if (resultArray.u_password === params.password) {
                returnObj.code = 1000;
                returnObj.msg = "登录成功！";
                res.send(returnObj);
            }
        } else {
            returnObj.code = 1001;
            returnObj.msg = "用户名不存在或密码错误！";
            res.send(returnObj);
        }
    });
});

//获取用户信息
commonOption.router.post("/getUserInfo", (req, res) => {
    let params = req.body;
    let sql_name = `SELECT * FROM user WHERE u_account='${params.account}'`;
    commonOption.query(sql_name, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === undefined) {
            returnObj.code = 1001;
            returnObj.msg = "用户不存在！";
            res.send(returnObj);
        } else {
            returnObj.code = 1000;
            returnObj.msg = "success";
            returnObj.list = result;
            res.send(returnObj);
        }
    });
});
//获取用户帖子及总数
commonOption.router.post("/getUserPost", (req, res) => {
    let params = req.body;
    let sql_name;
    if (params.mark == 0) {
        sql_name = `SELECT COUNT(*) AS postCount FROM post p INNER JOIN user u ON p.p_user = u.u_account AND u_account= '${params.account}'`;
    } else if (params.mark == 1) {
        sql_name = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND u_account='${params.account}' ORDER BY p_create ASC`
    }
    commonOption.query(sql_name, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === undefined) {
            returnObj.code = 1001;
            returnObj.msg = "用户不存在！";
            res.send(returnObj);
        } else {
            returnObj.code = 1000;
            returnObj.msg = "success";
            returnObj.list = result;
            res.send(returnObj);
        }
    });
});
//获取用户评论及总数
commonOption.router.post("/getUserReview", (req, res) => {
    let params = req.body;
    let sql_name;
    if (params.mark == 0) {
        sql_name = `SELECT COUNT(*) AS reviewCount FROM review r INNER JOIN user u ON r.r_user = u.u_account AND u_account='${params.account}'`
    } else if (params.mark == 1) {
        sql_name = `SELECT * FROM review r INNER JOIN user u INNER JOIN post p ON r.r_user = u.u_account AND r_post = p_id AND u_account='${params.account}' ORDER BY r_create DESC`
    }
    commonOption.query(sql_name, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === undefined) {
            returnObj.code = 1001;
            returnObj.msg = "用户不存在！";
            res.send(returnObj);
        } else {
            returnObj.code = 1000;
            returnObj.msg = "success";
            returnObj.list = result;
            res.send(returnObj);
        }
    });
});
//帖子或评论删除接口
commonOption.router.post("/deleteUserElse", (req, res) => {
    let params = req.body;
    let sql_name;
    if (params.symbol == 0) {
        sql_name = `DELETE FROM post WHERE p_id = '${params.id}'`
    } else if (params.symbol == 1) {
        sql_name = `DELETE FROM review WHERE r_id = '${params.id}'`
    }
    commonOption.query(sql_name, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === undefined) {
            returnObj.code = 1001;
            returnObj.msg = "删除失败！";
            res.send(returnObj);
        } else {
            returnObj.code = 1000;
            returnObj.msg = "删除成功";
            res.send(returnObj);
        }
    });
});
//更新用户信息
commonOption.router.post("/modifyUser", (req, res) => {
    let params = req.body
    let updateSql = `UPDATE user SET u_name = '${params.nickname}',u_sex = ${params.sex}, u_password = '${params.password}',u_email = '${params.email}' WHERE u_account = '${params.account}'`;

    commonOption.query(updateSql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === undefined) {
            returnObj.code = 1001;
            returnObj.msg = "更新失败！";
            res.send(returnObj);
        } else {
            returnObj.code = 1000;
            returnObj.msg = "更新成功！";
            res.send(returnObj);
        }
    });
})
//更新用户头像
commonOption.router.post("/upload", (req, res) => {
    let params = req.body
    let imgData = params.avatar.thumbUrl
    let imgType = params.avatar.type
    // 设置图片后缀名
    let extName = ""; //后缀名
    switch (imgType) {
        case "image/pjpeg":
            extName = ".jpg";
            break;
        case "image/jpeg":
            extName = ".jpg";
            break;
        case "image/png":
            extName = ".png";
            break;
        case "image/x-png":
            extName = ".png";
            break;
    }
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let newPath = "public/images/" + Date.now() + extName;

    fs.writeFile(newPath, dataBuffer, function (err) {
        if (err) {
            res.send(err);
        } else {
            let avatarUrl = 'http://127.0.0.1:3000/' + newPath.slice(7);
            let updateSql = `UPDATE user SET u_avatar='${avatarUrl}' WHERE u_account = '${params.account}'`;

            commonOption.query(updateSql, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result === undefined) {
                    returnObj.code = 1001;
                    returnObj.msg = "更新失败";
                    res.send(returnObj);
                } else {
                    returnObj.code = 1000;
                    returnObj.msg = "更新成功";
                    res.send(returnObj);
                }
            });
        }
    });
});
module.exports = commonOption.router;
