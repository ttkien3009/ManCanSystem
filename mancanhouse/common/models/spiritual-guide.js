'use strict';

module.exports = function(SpiritualGuide) {
  SpiritualGuide.getSpiritualGuide = function (id, cb) {
    SpiritualGuide.findById(id, function (err, instance) {
      var spiritualGuide = {
        spiritualGuideId: instance.spiritualGuideId,
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
      cb(null, spiritualGuide);
    });
  };
  SpiritualGuide.existsEmail= function (email, cb) {
    SpiritualGuide.findOne({where: {email: email}}, function(err, email) {
      var bool = false;
      if(email != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  SpiritualGuide.existsPhone = function (phone, cb) {
    SpiritualGuide.findOne({where: {phone: phone}}, function(err, phone) {
      var bool = false;
      if(phone != null){
        bool = true;
      }
      cb(null, bool)      
    });
  };
  SpiritualGuide.remoteMethod("getSpiritualGuide", {
    http: { path: "/getSpiritualGuide", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "spiritualGuide", type: "Object" },
  });
  SpiritualGuide.remoteMethod("existsEmail", {
    accepts: { arg: 'email', type: 'String', required: true},
    http: { path: '/existsEmail', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
  SpiritualGuide.remoteMethod("existsPhone", {
    accepts: { arg: 'phone', type: 'String', required: true},
    http: { path: '/existsPhone', verb: 'get'},
    returns: { arg: 'bool', type: 'boolean'}
  });
};
