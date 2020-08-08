'use strict';

module.exports = function(ScheduleCompanion) {
  ScheduleCompanion.getScheduleCompanion = function (id, cb) {
    ScheduleCompanion.findById(id, function (err, instance) {
      var scheduleCompanion = {
        companion: instance.companion,
        candidate: instance.candidate,
        session: instance.session,
        date: instance.date,
        status: instance.status,
        groupSession: instance.groupSession
      };
      cb(null, scheduleCompanion);
    });
  };
  ScheduleCompanion.remoteMethod("getScheduleCompanion", {
    http: { path: "/getScheduleCompanion", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "scheduleCompanion", type: "Object" },
  });
};
