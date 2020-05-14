let models = require('../db/db')
let express = require("express");
let router = express.Router();
let mysql = require("mysql");

let pool = mysql.createPool(models.mysql);

let query = function (sql,params, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql,params,function (qerr, vals, fields) {
        //释放连接
        conn.release();
        //事件驱动回调
        callback(qerr, vals, fields);
      });
    }
  });
};

const commonOption = {
  models,
  express,
  router,
  mysql,
  query
};
module.exports = commonOption;