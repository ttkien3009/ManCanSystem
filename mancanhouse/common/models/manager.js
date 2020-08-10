"use strict";

module.exports = function (Manager) {
  Manager.getManager = function (id, cb) {
    Manager.findById(id, function (err, instance) {
      var manager = {
        managerId: instance.managerId,
        christianName: instance.christianName,
        fullName: instance.fullName,
        birthday: instance.birthday,
        phone: instance.phone,
        email: instance.email,
        image: instance.image,
        position: instance.position,
        homeland: instance.homeland,
        status: instance.status,
      };
      cb(null, manager);
    });
  };
  Manager.existsEmail = function (email, cb) {
    Manager.findOne({ where: { email: email } }, function (err, email) {
      var bool = false;
      if (email != null) {
        bool = true;
      }
      cb(null, bool);
    });
  };
  Manager.existsPhone = function (phone, cb) {
    Manager.findOne({ where: { phone: phone } }, function (err, phone) {
      var bool = false;
      if (phone != null) {
        bool = true;
      }
      cb(null, bool);
    });
  };
  Manager.remoteMethod("getManager", {
    http: { path: "/getManager", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "manager", type: "Object" },
  });
  Manager.remoteMethod("existsEmail", {
    accepts: { arg: "email", type: "String", required: true },
    http: { path: "/existsEmail", verb: "get" },
    returns: { arg: "bool", type: "boolean" },
  });
  Manager.remoteMethod("existsPhone", {
    accepts: { arg: "phone", type: "String", required: true },
    http: { path: "/existsPhone", verb: "get" },
    returns: { arg: "bool", type: "boolean" },
  });
};
