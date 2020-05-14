let commonOption = require("../db/index");
let fs = require("fs");
let returnObj = {};

//管理员登录接口
commonOption.router.post("/adminSend", (req, res) => {
  let params = req.body;
  let sql_name = `SELECT * FROM admin WHERE a_account = '${params.account}' AND a_password='${params.password}'`;
  commonOption.query(sql_name, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result[0]) {
      let resultArray = result[0];
      if (resultArray.a_password === params.password) {
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

//获取管理员信息
commonOption.router.post("/getAdminInfo", (req, res) => {
  let params = req.body;
  let sql_name = `SELECT * FROM admin WHERE a_account='${params.account}'`;
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
//帖子审核
commonOption.router.post("/postManage", (req, res) => {
  let params = req.body;
  let sql_name;
  if (params.mark == 0) {
    sql_name = `UPDATE post SET p_examine = ${params.examine} WHERE p_id = '${params.id}'`;
    commonOption.query(sql_name, function (err, result) {
      if (err) {
        console.log(err);
      }

      if (result === undefined) {
        returnObj.code = 1001;
        returnObj.msg = "审批失败！";
        res.send(returnObj);
      } else {
        returnObj.code = 1000;
        returnObj.msg = "审批成功";
        res.send(returnObj);
      }
    });
  } else if (params.mark == 1) {
    sql_name = `SELECT * FROM post HAVING p_audit = 1 AND p_type = ${params.type} ORDER BY p_create DESC`
    commonOption.query(sql_name, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result === undefined) {
        returnObj.code = 1001;
        returnObj.msg = "审批失败！";
        res.send(returnObj);
      } else {
        returnObj.code = 1000;
        returnObj.msg = "审批成功";
        returnObj.list = result;
        res.send(returnObj);
      }
    });
  }
});
//评论审核
commonOption.router.post("/reviewManage", (req, res) => {
  let params = req.body;
  let sql_name;
  if (params.mark == 0) {
    sql_name = `UPDATE review SET r_examine = ${params.examine} WHERE r_id = '${params.id}'`;
    commonOption.query(sql_name, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result === undefined) {
        returnObj.code = 1001;
        returnObj.msg = "审批失败！";
        res.send(returnObj);
      } else {
        returnObj.code = 1000;
        returnObj.msg = "审批成功";
        res.send(returnObj);
      }
    });
  } else if (params.mark == 1) {
    sql_name = `SELECT * FROM review HAVING r_audit = 1 ORDER BY r_create DESC`
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
  }
});

//更新管理员信息
commonOption.router.post("/modifyAdmin", (req, res) => {
  let params = req.body
  let updateSql = `UPDATE admin SET a_name = '${params.nickname}',a_sex = ${params.sex}, a_password = '${params.password}',a_email = '${params.email}' WHERE a_account = '${params.account}'`;

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
//更新管理员头像
commonOption.router.post("/uploadAvatar", (req, res) => {
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
      let updateSql = `UPDATE admin SET a_avatar='${avatarUrl}' WHERE a_account = '${params.account}'`;

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
//管理员管理

commonOption.router.post("/adminManage", (req, res) => {
  let params = req.body;
  if (params.mark == 0) {
    new Promise((resolve, reject) => {
      let sql_name = `SELECT * FROM admin WHERE a_account='${params.account}'`;
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
      let add_sql = `INSERT INTO admin (a_account,a_password,a_create,a_power) VALUES (?,?,?,?)`;
      commonOption.query(
        add_sql,
        [
          params.account,
          params.password,
          params.create,
          params.power,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            returnObj.code = 1000;
            returnObj.msg = "添加成功！";
            res.send(returnObj);
          } else {
            returnObj.code = 1001;
            returnObj.msg = "添加失败！";
            res.send(returnObj);
          }
        })
    });
  } else if (params.mark == 1) {
    let sql = `SELECT * FROM admin WHERE a_power = ${params.power}`;
    commonOption.query(sql, function (err, result) {
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
  } else if (params.mark == 2) {
    let sql = `DELETE FROM admin WHERE a_account = '${params.account}'`;
    commonOption.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result === undefined) {
        returnObj.code = 1001;
        returnObj.msg = "删除失败！";
        res.send(returnObj);
      } else {
        returnObj.code = 1000;
        returnObj.msg = "删除成功！";
        res.send(returnObj);
      }
    });
  }

});
module.exports = commonOption.router;
