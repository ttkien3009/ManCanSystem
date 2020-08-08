"use strict";

module.exports = function (Department) {
  Department.getDepartment = function (id, cb) {
    Department.findById(id, function (err, instance) {
      var department = {
        name: instance.name,
        positionType: instance.positionType,
      };
      cb(null, department);
    });
  };
  Department.remoteMethod("getDepartment", {
    http: { path: "/getDepartment", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "department", type: "Object" },
  });
};
