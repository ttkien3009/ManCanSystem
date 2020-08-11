'use strict';

module.exports = function(Teacher) {
  Teacher.getTeacher = function (id, cb) {
    Teacher.findById(id, function (err, instance) {
      var teacher = {
        teacherId: instance.teacherId,
        fullName: instance.fullName,
        gender: instance.gender,
        birthday: instance.birthday,
        phone: instance.phone,
        email: instance.email,
        image: instance.image,
        subject: instance.subject,
        status: instance.status,
      };
      cb(null, teacher);
    });
  };
  Teacher.existsEmail= function (email, cb) {
    Teacher.findOne({where: {email: email}}, function(err, email) {
      var bool = false;
      if(email != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  Teacher.existsPhone = function (phone, cb) {
    Teacher.findOne({where: {phone: phone}}, function(err, phone) {
      var bool = false;
      if(phone != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  Teacher.remoteMethod("getTeacher", {
    http: { path: "/getTeacher", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "teacher", type: "Object" },
  });
  Teacher.remoteMethod("existsEmail", {
    accepts: { arg: 'email', type: 'String', required: true},
    http: { path: '/existsEmail', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
  Teacher.remoteMethod("existsPhone", {
    accepts: { arg: 'phone', type: 'String', required: true},
    http: { path: '/existsPhone', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
};
