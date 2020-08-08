'use strict';

module.exports = function(Candidate) {
  Candidate.getCandidate = function (id, cb) {
    Candidate.findById(id, function (err, instance) {
      var candidate = {
        candidateId: instance.candidateId,
        christianName: instance.christianName,
        fullName: instance.fullName,
        birthday: instance.birthday,
        position: instance.position,
        homeland: instance.homeland,
        phone: instance.phone,
        email: instance.email,
        status: instance.status,
        community: instance.community
      };
      cb(null, candidate);
    });
  };
  Candidate.existsEmail= function (email, cb) {
    Candidate.findOne({where: {email: email}}, function(err, email) {
      var bool = false;
      if(email != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  Candidate.existsPhone = function (phone, cb) {
    Candidate.findOne({where: {phone: phone}}, function(err, phone) {
      var bool = false;
      if(phone != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  Candidate.remoteMethod("getCandidate", {
    http: { path: "/getCandidate", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "candidate", type: "Object" },
  });
  Candidate.remoteMethod("existsEmail", {
    accepts: { arg: 'email', type: 'String', required: true},
    http: { path: '/existsEmail', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
  Candidate.remoteMethod("existsPhone", {
    accepts: { arg: 'phone', type: 'String', required: true},
    http: { path: '/existsPhone', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
};
