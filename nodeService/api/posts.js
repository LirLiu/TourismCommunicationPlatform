let commonOption = require("../db/index");

let fs = require("fs");
let formidable = require("formidable");
let path = require('path');
// 首页推荐帖列表
commonOption.router.get("/getRecommendList", (req, res, next) => {
  let sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 ORDER BY p_views DESC LIMIT 30`;
  let returnObj = {};
  commonOption.query(sql_recommend, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined) {
      returnObj.code = 1001;
      returnObj.msg = "无数据！";
      res.send(returnObj);
    } else {
      returnObj.code = 1000;
      returnObj.msg = "Success";
      returnObj.list = result;
      res.send(returnObj);
    }
  });
});
// 帖子列表
commonOption.router.post("/getPostList", (req, res, next) => {
  let params = req.body
  let sql_recommend
  if (params.sign == 0) {//按时间降序排序
    sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_type='${params.type}' ORDER BY p_create DESC`;
  } else if (params.sign == 1) {//按评论量降序排序
    sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_type='${params.type}' ORDER BY p_comments DESC`;
  } else if (params.sign == 2) {//按浏览量降序排序
    sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_type='${params.type}' ORDER BY p_views DESC`;
  }
  let returnObj = {};
  commonOption.query(sql_recommend, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined) {
      returnObj.code = 1001;
      returnObj.msg = "无数据！";
      res.send(returnObj);
    } else {
      returnObj.code = 1000;
      returnObj.msg = "Success";
      returnObj.list = result;
      res.send(returnObj);
    }
  });
});

// 首页查询功能
commonOption.router.post("/getSearchList", (req, res, next) => {
  let params = req.body
  let sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_title LIKE '%${params.field}%' ORDER BY p_views DESC`;
  let returnObj = {};
  commonOption.query(sql_recommend, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined) {
      returnObj.code = 1001;
      returnObj.msg = "无数据！";
      res.send(returnObj);
    } else {
      returnObj.code = 1000;
      returnObj.msg = "Success";
      returnObj.list = result;
      res.send(returnObj);
    }
  });
});
// 子页面查询功能
commonOption.router.post("/getSearchPost", (req, res, next) => {
  let params = req.body
  let sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_title LIKE '%${params.field}%' AND p_type ='${params.type}' ORDER BY p_views DESC`;
  let returnObj = {};
  commonOption.query(sql_recommend, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined) {
      returnObj.code = 1001;
      returnObj.msg = "无数据！";
      res.send(returnObj);
    } else {
      returnObj.code = 1000;
      returnObj.msg = "Success";
      returnObj.list = result;
      res.send(returnObj);
    }
  });
});
// 子页面标签查询功能
commonOption.router.post("/getSearchTags", (req, res, next) => {
  let params = req.body
  let sql_recommend
  if (params.sign == 0) {
    sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_tags LIKE '%${params.tag}%' AND p_type ='${params.type}' ORDER BY p_views DESC`;
  } else if (params.sign == 1) {
    sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_tags LIKE '%${params.tag}%' AND p_type ='${params.type}' AND p_area = '${params.area}' ORDER BY p_views DESC`;
  } else if (params.sign == 2) {
    sql_recommend = `SELECT * FROM scenic HAVING s_area = '${params.area}' ORDER BY s_rank ASC`;
  }
  let returnObj = {};
  commonOption.query(sql_recommend, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined) {
      returnObj.code = 1001;
      returnObj.msg = "无数据！";
      res.send(returnObj);
    } else {
      returnObj.code = 1000;
      returnObj.msg = "Success";
      returnObj.list = result;
      res.send(returnObj);
    }
  });
});

// 十大景区列表请求
commonOption.router.post("/getOtherList", (req, res, next) => {
  let params = req.body
  let sql_recommend = `SELECT * FROM scenic HAVING s_area = '${params.area}' ORDER BY s_rank ASC`
  let returnObj = {};
  commonOption.query(sql_recommend, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined) {
      returnObj.code = 1001;
      returnObj.msg = "无数据！";
      res.send(returnObj);
    } else {
      returnObj.code = 1000;
      returnObj.msg = "Success";
      returnObj.list = result;
      res.send(returnObj);
    }
  });
});

// 零回答问题列表
commonOption.router.get("/getZeroAnswer", (req, res, next) => {
  let sql_recommend = `SELECT * FROM post p INNER JOIN user u ON p.p_user = u.u_account AND p_examine=1 AND p_type=3 AND p_comments=0 LIMIT 6`;
  let returnObj = {};
  commonOption.query(sql_recommend, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined) {
      returnObj.code = 1001;
      returnObj.msg = "无数据！";
      res.send(returnObj);
    } else {
      returnObj.code = 1000;
      returnObj.msg = "Success";
      returnObj.list = result;
      res.send(returnObj);
    }
  });
});

// 新建帖子
commonOption.router.post("/postCreate", (req, res, next) => {
  let returnObj = {};
  let params = req.body
  let add_sql = `INSERT INTO post (p_title,p_tags,w_start,w_end,w_phone,p_content,p_cover,p_create,p_user,p_type,p_area,p_examine,p_audit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
  if (params.mark == 0) {
    let imgData = params.cover.thumbUrl
    let imgType = params.cover.type
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
        let coverUrl = 'http://127.0.0.1:3000/' + newPath.slice(7);
        commonOption.query(
          add_sql,
          [
            params.title,
            params.tags,
            params.start,
            params.end,
            params.phone,
            params.content,
            coverUrl,
            params.create,
            params.account,
            params.type,
            params.area,
            params.examine,
            params.audit
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result === undefined) {
              returnObj.code = 1001;
              returnObj.msg = "发布失败！";
              res.send(returnObj);
            } else {
              returnObj.code = 1000;
              returnObj.msg = "发布成功";
              res.send(returnObj);
            }
          }
        );
      }
    });
  }
  if (params.mark == 1) {
    commonOption.query(
      add_sql,
      [
        params.title,
        params.tags,
        params.start,
        params.end,
        params.phone,
        params.content,
        params.cover,
        params.create,
        params.account,
        params.type,
        params.area,
        params.examine,
        params.audit
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result === undefined) {
          returnObj.code = 1001;
          returnObj.msg = "发布失败！";
          res.send(returnObj);
        } else {
          returnObj.code = 1000;
          returnObj.msg = "发布成功";
          res.send(returnObj);
        }
      }
    );
  }
});

//获取帖子详情
commonOption.router.post("/getPostDetail", (req, res) => {
  let params = req.body;
  let detail_sql = `SELECT * FROM post p INNER JOIN user u 
    ON p.p_user = u.u_account 
    AND p_id=${params.postId}`;
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
//浏览量、评论量更新
commonOption.router.post("/getViewsIncrease", (req, res) => {
  let params = req.body;
  let detail_sql;
  if (params.sign == 1) {
    detail_sql = `UPDATE post SET p_comments = ${params.count} WHERE p_id = ${params.id}`;
  } else {
    detail_sql = `UPDATE post SET p_views = ${params.views} WHERE p_id = ${params.id}`;
  }
  let returnObj = {};
  commonOption.query(detail_sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      returnObj.code = 1000;
      returnObj.msg = "浏览量/评论更新";
      res.send(returnObj);
    }
  });
});

module.exports = commonOption.router;
