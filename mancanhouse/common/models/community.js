'use strict';

module.exports = function(Community) {
  Community.getCommunity = function (id, cb) {
    Community.findById(id, function (err, instance) {
      var community = {
        communityName: instance.communityName,
        patron: instance.patron,
        address: instance.address,
        amount: instance.amount,
      };
      cb(null, community);
    });
  };
  Community.remoteMethod("getCommunity", {
    http: { path: "/getCommunity", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "community", type: "Object" },
  });
};
