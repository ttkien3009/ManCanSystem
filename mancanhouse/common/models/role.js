'use strict';

module.exports = function(Role) {
  Role.getRole = function (id, cb) {
    Role.findById(id, function (err, instance) {
      var role = {
        roleName: instance.roleName
      };
      cb(null, role);
    });
  };
  Role.remoteMethod("getRole", {
    http: { path: "/getRole", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "role", type: "Object" },
  });
};
