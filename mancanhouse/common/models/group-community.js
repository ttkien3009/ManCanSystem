'use strict';

module.exports = function(GroupCommunity) {
  GroupCommunity.getGroupCommunity = function (id, cb) {
    GroupCommunity.findById(id, function (err, instance) {
      var groupCommunity = {
        name: instance.name,
        firstCom: instance.firstCom,
        secondCom: instance.secondCom,
        thirdCom: instance.thirdCom,
        fourthCom: instance.fourthCom,
        fifthCom: instance.fifthCom,
      };
      cb(null, groupCommunity);
    });
  };
  GroupCommunity.remoteMethod("getGroupCommunity", {
    http: { path: "/getGroupCommunity", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "groupCommunity", type: "Object" },
  });
};
