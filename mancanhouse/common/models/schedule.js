'use strict';

module.exports = function(Schedule) {
  Schedule.getSchedule = function (id, cb) {
    Schedule.findById(id, function (err, instance) {
      var schedule = {
        subject: instance.subject,
        teacher: instance.teacher,
        dayOfWeek: instance.dayOfWeek,
        dateStart: instance.dateStart,
        dateEnd: instance.dateEnd,
      };
      cb(null, schedule);
    });
  };
  Schedule.remoteMethod("getSchedule", {
    http: { path: "/getSchedule", verb: "get" },
    accepts: {
      arg: "id",
      type: "number",
      required: true,
      http: { source: "query" },
    },
    returns: { arg: "schedule", type: "Object" },
  });
};
