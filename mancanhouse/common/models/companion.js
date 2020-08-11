'use strict';

module.exports = function(Companion) {
  Companion.getCompanion = function (id, cb) {
    Companion.findById(id, function (err, instance) {
      var companion = {
        companionId: instance.companionId,
        christianName: instance.christianName,
        fullName: instance.fullName,
        birthday: instance.birthday,
        phone: instance.phone,
        email: instance.email,
        groupCommunity: instance.groupCommunity,
        position: instance.position,
        image: instance.image,
        status: instance.status,
      };
      cb(null, companion);
    });
  };
  Companion.existsEmail= function (email, cb) {
    Companion.findOne({where: {email: email}}, function(err, email) {
      var bool = false;
      if(email != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  Companion.existsPhone = function (phone, cb) {
    Companion.findOne({where: {phone: phone}}, function(err, phone) {
      var bool = false;
      if(phone != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  Companion.remoteMethod("getCompanion", {
    http: { path: "/getCompanion", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "companion", type: "Object" },
  });
  Companion.remoteMethod("existsEmail", {
    accepts: { arg: 'email', type: 'String', required: true},
    http: { path: '/existsEmail', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
  Companion.remoteMethod("existsPhone", {
    accepts: { arg: 'phone', type: 'String', required: true},
    http: { path: '/existsPhone', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
};
