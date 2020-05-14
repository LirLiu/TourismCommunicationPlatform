let commonOption = require("../db/index");

//获取特定文章评论列表
commonOption.router.post("/getCommentList", (req, res) => {
    let params = req.body;
    let detail_sql = `SELECT * FROM review r INNER JOIN user u ON r.r_user = u.u_account AND r_examine=1 AND r_post='${params.account}' ORDER BY r_create DESC`
    let returnObj = {};
    commonOption.query(detail_sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            returnObj.code = 1000;
            returnObj.msg = "Success";
            returnObj.list = result;
            res.send(returnObj);
        }
    });
});

//发表评论
commonOption.router.post("/createReview", (req, res) => {
    let params = req.body;
    let add_sql = `INSERT INTO review (r_content,r_examine,r_create,r_user,r_post,r_audit) VALUES (?,?,?,?,?,?)`;
    let returnObj = {};
    commonOption.query(
        add_sql,
        [
            params.content,
            params.examine,
            params.create,
            params.account,
            params.postId,
            params.audit
        ],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result) {
                returnObj.code = 1000;
                returnObj.msg = "评论成功！";
                res.send(returnObj);
            } else {
                returnObj.code = 1001;
                returnObj.msg = "评论失败！";
                res.send(returnObj);
            }
        })
});

module.exports = commonOption.router;
