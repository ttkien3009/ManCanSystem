'use strict';

module.exports = function(ScheduleSpiritualGuide) {
  ScheduleSpiritualGuide.getScheduleSpiritualGuide = function (id, cb) {
    ScheduleSpiritualGuide.findById(id, function (err, instance) {
      var scheduleSpiritualGuide = {
        spiritualGuide: instance.spiritualGuide,
        candidate: instance.candidate,
        session: instance.session,
        date: instance.date,
        status: instance.status,
        groupSession: instance.groupSession
      };
      cb(null, scheduleSpiritualGuide);
    });
  };
  ScheduleSpiritualGuide.remoteMethod("getScheduleSpiritualGuide", {
    http: { path: "/getScheduleSpiritualGuide", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "scheduleSpiritualGuide", type: "Object" },
  });
};
