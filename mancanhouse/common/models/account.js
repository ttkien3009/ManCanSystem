"use strict";

module.exports = function (Account) {
  Account.getAccount = function (id, cb) {
    Account.findById(id, function (err, instance) {
      var account = {
        userId: instance.userId,
        username: instance.username,
        password: instance.password,
        role: instance.role,
        status: instance.status,
      };
      cb(null, account);
    });
  };
  Account.existsUsername= function (username, cb) {
    Account.findOne({where: {username: username}}, function(err, username) {
      var bool = false;
      if(username != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  Account.remoteMethod("getAccount", {
    http: { path: "/getAccount", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "account", type: "Object" },
  });
  Account.remoteMethod("existsUsername", {
    accepts: { arg: 'username', type: 'String', required: true},
    http: { path: '/existsUsername', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
};
