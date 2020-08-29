const ScheduleSpiritualGuide = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const RegisteringScheduleSpiritualGuide = {
  data() {
    return {
      isThirtyOne: false,
      isFebruary: false,
      isThirty: false,
      isFebruaryOfLeapYear: false,
      sessions: [
        { id: 1, time: "7:00 - 8:00" },
        { id: 2, time: "8:00 - 9:00" },
        { id: 3, time: "9:00 - 10:00" },
        { id: 4, time: "10:00 - 11:00" },
        { id: 5, time: "14:00 - 15:00" },
        { id: 6, time: "15:00 - 16:00" },
      ],
      scheduleSpiritualGuides: [],
      spiritualGuides: [],
      candidates: [],
      groupCommunity: [],
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      scheduleSpiritualGuide: {},
      role: 0,
      idTable: 0,
      roleName: null,
      metSpiritualGuides: [],
      checkAdd: 0,
      checkDelete: 0,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/candidates").then((resp) => {
      this.candidates = resp.data;
    });

    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        this.idTable = resp.data.idTable;
        axios
          .get(
            "http://localhost:3000/api/roles?filter[where][id]=" +
              resp.data.role
          )
          .then((respRole) => {
            this.roleName = respRole.data[0].roleName;
            if (this.roleName == "Quản trị viên") {
              this.role = 1;
            } else if (this.roleName == "Giám đốc") {
              this.role = 2;
            } else if (this.roleName == "Quản lý") {
              this.role = 3;
            } else if (this.roleName == "Giám học") {
              this.role = 4;
            } else if (this.roleName == "Ứng sinh") {
              this.role = 5;
            } else if (this.roleName == "Trưởng linh hướng") {
              this.role = 6;
            } else if (this.roleName == "Linh hướng") {
              this.role = 7;
            } else if (this.roleName == "Trưởng đồng hành") {
              this.role = 8;
            } else if (this.roleName == "Đồng hành") {
              this.role = 9;
            } else if (this.roleName == "Giảng viên") {
              this.role = 10;
            }
            if (this.role == 6 || this.role == 7) {
              axios
                .get(
                  "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
                    this.idTable
                )
                .then((response) => {
                  this.scheduleSpiritualGuides = response.data;
                  if (response.data.length == 0) {
                    this.checkAdd = 1;
                  } else {
                    this.checkDelete = 1;
                  }
                });
            } else if (this.role == 5) {
              axios
                .get(
                  "http://localhost:3000/api/candidates?filter[where][id]=" +
                    this.idTable
                )
                .then((respCan) => {
                  var community = respCan.data[0].community;
                  axios
                    .get(
                      "http://localhost:3000/api/groupCommunities?filter[where][firstCom]=" +
                        community
                    )
                    .then((respGroupCom) => {
                      var groupCommunity = {};
                      groupCommunity = respGroupCom.data;
                      if (groupCommunity != null) {
                        var idGroup = respGroupCom.data[0].id;
                        axios
                          .get(
                            "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
                              idGroup
                          )
                          .then((respCom) => {
                            var spiritualGuide = respCom.data[0].id;
                            axios
                              .get(
                                "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
                                  spiritualGuide
                              )
                              .then((respSchedule) => {
                                this.scheduleSpiritualGuides =
                                  respSchedule.data;
                              });
                          });
                      } else {
                        axios
                          .get(
                            "http://localhost:3000/api/groupCommunities?filter[where][secondCom]=" +
                              community
                          )
                          .then((respGroupCom) => {
                            var groupCommunity = {};
                            groupCommunity = respGroupCom.data;
                            if (groupCommunity != null) {
                              var idGroup = respGroupCom.data[0].id;
                              axios
                                .get(
                                  "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
                                    idGroup
                                )
                                .then((respCom) => {
                                  var spiritualGuide = respCom.data[0].id;
                                  axios
                                    .get(
                                      "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
                                        spiritualGuide
                                    )
                                    .then((resp) => {
                                      this.scheduleSpiritualGuides = resp.data;
                                    });
                                });
                            } else {
                              axios
                                .get(
                                  "http://localhost:3000/api/groupCommunities?filter[where][thirdCom]=" +
                                    community
                                )
                                .then((respGroupCom) => {
                                  var groupCommunity = {};
                                  groupCommunity = respGroupCom.data;
                                  if (groupCommunity != null) {
                                    var idGroup = respGroupCom.data[0].id;
                                    axios
                                      .get(
                                        "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
                                          idGroup
                                      )
                                      .then((respCom) => {
                                        var spiritualGuide = respCom.data[0].id;
                                        axios
                                          .get(
                                            "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
                                              spiritualGuide
                                          )
                                          .then((respSchedule) => {
                                            this.scheduleSpiritualGuides =
                                              respSchedule.data;
                                          });
                                      });
                                  } else {
                                    axios
                                      .get(
                                        "http://localhost:3000/api/groupCommunities?filter[where][fourthCom]=" +
                                          community
                                      )
                                      .then((respGroupCom) => {
                                        var groupCommunity = {};
                                        groupCommunity = respGroupCom.data;
                                        if (groupCommunity != null) {
                                          var idGroup = respGroupCom.data[0].id;
                                          axios
                                            .get(
                                              "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
                                                idGroup
                                            )
                                            .then((respCom) => {
                                              var spiritualGuide =
                                                respCom.data[0].id;
                                              axios
                                                .get(
                                                  "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
                                                    spiritualGuide
                                                )
                                                .then((respSchedule) => {
                                                  this.scheduleSpiritualGuides =
                                                    respSchedule.data;
                                                });
                                            });
                                        } else {
                                          axios
                                            .get(
                                              "http://localhost:3000/api/groupCommunities?filter[where][fifthCom]=" +
                                                community
                                            )
                                            .then((respGroupCom) => {
                                              var groupCommunity = {};
                                              groupCommunity =
                                                respGroupCom.data;
                                              if (groupCommunity != null) {
                                                var idGroup =
                                                  respGroupCom.data[0].id;
                                                axios
                                                  .get(
                                                    "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
                                                      idGroup
                                                  )
                                                  .then((respCom) => {
                                                    var spiritualGuide =
                                                      respCom.data[0].id;
                                                    axios
                                                      .get(
                                                        "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
                                                          spiritualGuide
                                                      )
                                                      .then((respSchedule) => {
                                                        this.scheduleSpiritualGuides =
                                                          respSchedule.data;
                                                      });
                                                  });
                                              }
                                            });
                                        }
                                      });
                                  }
                                });
                            }
                          });
                      }
                    });
                });
            }
          });
      });
    axios.get("http://localhost:3000/api/metSpiritualGuides").then((resp) => {
      this.metSpiritualGuides = resp.data;
    });
  },
  computed: {
    isThirtyOneTrue() {
      var currentDateTime = new Date();
      var month = currentDateTime.getMonth() + 1;
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ) {
        this.isThirtyOne = true;
      }
      return this.isThirtyOne;
    },

    isFebruaryTrue() {
      var currentDateTime = new Date();
      if (currentDateTime.getMonth() + 1 == 2) {
        this.isFebruary = true;
      }
      return this.isFebruary;
    },

    isThirtyTrue() {
      var currentDateTime = new Date();
      var month = currentDateTime.getMonth() + 1;
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        this.isThirty = true;
      }
      return this.isThirty;
    },

    isFebruaryOfLeapYearTrue() {
      var currentDateTime = new Date();
      var month = currentDateTime.getMonth() + 1;
      var year = currentDateTime.getFullYear();
      if (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
      ) {
        if (month == 2) {
          this.isFebruaryOfLeapYear = true;
        }
      }
      return this.isFebruaryOfLeapYear;
    },

    scheduleSpiritualGuidesIsNull() {
      return !!(this.scheduleSpiritualGuides.length == 0);
    },
  },
  methods: {
    CreateScheduleSpiritualGuide() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ) {
        for (date = 1; date <= 31; date++) {
          for (sess = 0; sess < this.sessions.length; sess++) {
            var dd = String(date).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0");
            var day = dd + "/" + mm;
            const scheduleSpiritualGuide = {
              spiritualGuide: this.idTable,
              candidate: null,
              session: this.sessions[sess].time,
              date: day,
              status: 1,
              groupSession: date,
            };
            const url = `http://localhost:3000/api/scheduleSpiritualGuides`;
            axios.post(url, scheduleSpiritualGuide);
          }
        }
        setTimeout(() => {
          this.$router.push("/scheduleSpiritualGuides");
          location.reload();
        }, 3000);
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        for (date = 1; date <= 30; date++) {
          for (sess = 0; sess < this.sessions.length; sess++) {
            var dd = String(date).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0");
            var day = dd + "/" + mm;
            const scheduleSpiritualGuide = {
              spiritualGuide: this.idTable,
              candidate: null,
              session: this.sessions[sess].time,
              date: day,
              status: 1,
              groupSession: date,
            };
            const url = `http://localhost:3000/api/scheduleSpiritualGuides`;
            axios.post(url, scheduleSpiritualGuide);
          }
        }
        setTimeout(() => {
          this.$router.push("/scheduleSpiritualGuides");
          location.reload();
        }, 3000);
      } else if (month == 2) {
        if (
          (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
          (year % 100 === 0 && year % 400 === 0)
        ) {
          for (date = 1; date <= 29; date++) {
            for (sess = 0; sess < this.sessions.length; sess++) {
              var dd = String(date).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0");
              var day = dd + "/" + mm;
              const scheduleSpiritualGuide = {
                spiritualGuide: this.idTable,
                candidate: null,
                session: this.sessions[sess].time,
                date: day,
                status: 1,
                groupSession: date,
              };
              const url = `http://localhost:3000/api/scheduleSpiritualGuides`;
              axios.post(url, scheduleSpiritualGuide);
            }
          }
          setTimeout(() => {
            this.$router.push("/scheduleSpiritualGuides");
            location.reload();
          }, 3000);
        } else {
          for (date = 1; date <= 28; date++) {
            for (sess = 0; sess < this.sessions.length; sess++) {
              var dd = String(date).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0");
              var day = dd + "/" + mm;
              const scheduleSpiritualGuide = {
                spiritualGuide: this.idTable,
                candidate: null,
                session: this.sessions[sess].time,
                date: day,
                status: 1,
                groupSession: date,
              };
              const url = `http://localhost:3000/api/scheduleSpiritualGuides`;
              axios.post(url, scheduleSpiritualGuide);
            }
          }
          setTimeout(() => {
            this.$router.push("/scheduleSpiritualGuides");
            location.reload();
          }, 3000);
        }
      }
    },

    DeleteScheduleSpiritualGuide() {
      axios
        .get(
          "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
            this.idTable
        )
        .then((resp) => {
          var arrayScheduleSpiritualGuides = resp.data;
          var lengthScheduleSpiritualGuides =
            arrayScheduleSpiritualGuides.length;
          if (lengthScheduleSpiritualGuides != 0) {
            var firstId = arrayScheduleSpiritualGuides[0].id;
            // var maxId = lengthScheduleSpiritualGuides + firstId
            var maxIdFirst = firstId + 60;
            for (i = firstId; i < maxIdFirst; i++) {
              axios
                .delete(
                  "http://localhost:3000/api/scheduleSpiritualGuides/" + i
                )
                .then((response) => {
                  console.log(response);
                  this.scheduleSpiritualGuides.splice(i, 1);
                });
            }
            var maxIdSecond = maxIdFirst + 60;
            for (i = maxIdFirst; i < maxIdSecond; i++) {
              axios
                .delete(
                  "http://localhost:3000/api/scheduleSpiritualGuides/" + i
                )
                .then((response) => {
                  console.log(response);
                  this.scheduleSpiritualGuides.splice(i, 1);
                });
            }
            if (lengthScheduleSpiritualGuides == 168) {
              var maxIdThird = maxIdSecond + 48;
              for (i = maxIdSecond; i < maxIdThird; i++) {
                axios
                  .delete(
                    "http://localhost:3000/api/scheduleSpiritualGuides/" + i
                  )
                  .then((response) => {
                    console.log(response);
                    this.scheduleSpiritualGuides.splice(i, 1);
                  });
              }
            }
            if (lengthScheduleSpiritualGuides == 174) {
              var maxIdThird = maxIdSecond + 54;
              for (i = maxIdSecond; i < maxIdThird; i++) {
                axios
                  .delete(
                    "http://localhost:3000/api/scheduleSpiritualGuides/" + i
                  )
                  .then((response) => {
                    console.log(response);
                    this.scheduleSpiritualGuides.splice(i, 1);
                  });
              }
            }
            if (lengthScheduleSpiritualGuides >= 180) {
              var maxIdThird = maxIdSecond + 60;
              for (i = maxIdSecond; i < maxIdThird; i++) {
                axios
                  .delete(
                    "http://localhost:3000/api/scheduleSpiritualGuides/" + i
                  )
                  .then((response) => {
                    console.log(response);
                    this.scheduleSpiritualGuides.splice(i, 1);
                  });
              }
            }
            if (lengthScheduleSpiritualGuides == 186) {
              var maxIdFourth = maxIdThird + 6;
              for (i = maxIdThird; i < maxIdFourth; i++) {
                axios
                  .delete(
                    "http://localhost:3000/api/scheduleSpiritualGuides/" + i
                  )
                  .then((response) => {
                    console.log(response);
                    this.scheduleSpiritualGuides.splice(i, 1);
                  });
              }
            }
            this.$router.push("/");
            setTimeout(() => {
              this.$router.push("/scheduleSpiritualGuides");
              location.reload();
            }, 1000);
          }
        });
    },

    updateScheduleSpiritualGuide(scheduleSpiritualGuideEdit) {
      axios
        .get(
          "http://localhost:3000/api/scheduleSpiritualGuides/getScheduleSpiritualGuide?id=" +
            scheduleSpiritualGuideEdit.id
        )
        .then((response) => {
          const scheduleSpiritualGuideOld = {
            spiritualGuide: response.data.scheduleSpiritualGuide.spiritualGuide,
            candidate: response.data.scheduleSpiritualGuide.candidate,
            session: response.data.scheduleSpiritualGuide.session,
            date: response.data.scheduleSpiritualGuide.date,
            status: response.data.scheduleSpiritualGuide.status,
            groupSession: response.data.scheduleSpiritualGuide.groupSession,
          };
          if (this.role == 6 || this.role == 7) {
            const scheduleSpiritualGuideNew = {
              spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
              candidate: scheduleSpiritualGuideOld.candidate,
              session: scheduleSpiritualGuideOld.session,
              date: scheduleSpiritualGuideOld.date,
              status: 2,
              groupSession: scheduleSpiritualGuideOld.groupSession,
            };
            const url =
              "http://localhost:3000/api/scheduleSpiritualGuides/" +
              scheduleSpiritualGuideEdit.id +
              "/replace";
            axios.post(url, scheduleSpiritualGuideNew);
            setTimeout(() => {
              this.$router.push("/scheduleSpiritualGuides");
              location.reload();
            }, 100);
          } else if (this.role == 5) {
            var max = this.scheduleSpiritualGuides.length;
            var check = 0;
            for (i = 0; i < max; i++) {
              if (
                this.scheduleSpiritualGuides[i].candidate == this.idTable &&
                this.scheduleSpiritualGuides[i].status == 1
              ) {
                check++;
              }
              if (
                this.scheduleSpiritualGuides[i].candidate == this.idTable &&
                this.scheduleSpiritualGuides[i].status == 2
              ) {
                axios
                  .get(
                    "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][candidate]=" +
                      this.idTable +
                      "&filter[status]=2"
                  )
                  .then((resp) => {
                    axios
                      .get(
                        "http://localhost:3000/api/metSpiritualGuides?filter[where][idSchedule]=" +
                          resp.data[0].id
                      )
                      .then((response) => {
                        axios
                          .delete(
                            "http://localhost:3000/api/metSpiritualGuides/" +
                              response.data[0].id
                          )
                          .then((resp) => {
                            this.metSpiritualGuides.splice(
                              response.data[0].id,
                              1
                            );
                            setTimeout(() => {
                              location.reload();
                            }, 100);
                          });
                      });
                  });
              }
            }
            if (check != 0) {
              alertify.alert(
                "Thông báo",
                "Mỗi ứng sinh chỉ đăng ký một phiên!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else {
              const scheduleSpiritualGuideNew = {
                spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
                candidate: this.idTable,
                session: scheduleSpiritualGuideOld.session,
                date: scheduleSpiritualGuideOld.date,
                status: 1,
                groupSession: scheduleSpiritualGuideOld.groupSession,
              };
              var currentDate = new Date();
              const metSpiritualGuide = {
                spiritualGuide: scheduleSpiritualGuideNew.spiritualGuide,
                candidate: this.idTable,
                registeredDate: currentDate,
                status: 1,
                idSchedule: scheduleSpiritualGuideEdit.id,
              };
              axios
                .get(
                  "http://localhost:3000/api/countMets?filter[where][candidate]=" +
                    this.idTable
                )
                .then((respCountMet) => {
                  if (respCountMet.data.length === 0) {
                    const countMet = {
                      candidate: this.idTable,
                      countMetCompanion: 0,
                      countMetSpiritualGuide: 0,
                    };
                    const url_3 = `http://localhost:3000/api/countMets`;
                    axios.post(url_3, countMet);
                  }
                });
              const url_1 = `http://localhost:3000/api/metSpiritualGuides`;
              axios.post(url_1, metSpiritualGuide);
              const url =
                "http://localhost:3000/api/scheduleSpiritualGuides/" +
                scheduleSpiritualGuideEdit.id +
                "/replace";
              axios.post(url, scheduleSpiritualGuideNew);
              setTimeout(() => {
                this.$router.push("/scheduleSpiritualGuides");
                location.reload();
              }, 100);
            }
          }
        });
    },

    cancelScheduleSpiritualGuide(scheduleSpiritualGuideEdit) {
      axios
        .get(
          "http://localhost:3000/api/scheduleSpiritualGuides/getScheduleSpiritualGuide?id=" +
            scheduleSpiritualGuideEdit.id
        )
        .then((response) => {
          const scheduleSpiritualGuideOld = {
            spiritualGuide: response.data.scheduleSpiritualGuide.spiritualGuide,
            candidate: response.data.scheduleSpiritualGuide.candidate,
            session: response.data.scheduleSpiritualGuide.session,
            date: response.data.scheduleSpiritualGuide.date,
            status: response.data.scheduleSpiritualGuide.status,
            groupSession: response.data.scheduleSpiritualGuide.groupSession,
          };
          if (this.role == 6 || this.role == 7) {
            if (scheduleSpiritualGuideOld.status == 2) {
              const scheduleSpiritualGuideNew = {
                spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
                candidate: null,
                session: scheduleSpiritualGuideOld.session,
                date: scheduleSpiritualGuideOld.date,
                status: 1,
                groupSession: scheduleSpiritualGuideOld.groupSession,
              };
              const url =
                "http://localhost:3000/api/scheduleSpiritualGuides/" +
                scheduleSpiritualGuideEdit.id +
                "/replace";
              axios.post(url, scheduleSpiritualGuideNew);
              setTimeout(() => {
                location.reload();
              }, 50);
            } else if (
              scheduleSpiritualGuideOld.candidate != null &&
              scheduleSpiritualGuideOld.status == 1
            ) {
              var emailCandidate = null;
              axios
                .get(
                  "http://localhost:3000/api/candidates?filter[where][id]=" +
                    scheduleSpiritualGuideOld.candidate
                )
                .then((resp) => {
                  emailCandidate = resp.data[0].email;
                  axios
                    .get(
                      "http://localhost:3000/api/spiritualGuides?filter[where][id]=" +
                        scheduleSpiritualGuideOld.spiritualGuide
                    )
                    .then((respCom) => {
                      Email.send({
                        Host: "smtp.gmail.com",
                        Username: "mancanhouse2020@gmail.com",
                        Password: "akyqnlcmanojglqb",
                        To: emailCandidate,
                        From: "mancanhouse2020@gmail.com",
                        Subject: "Thông Báo Hủy Lịch Gặp Linh Hướng",
                        Body:
                          "Xin lỗi vì sự bất tiện này. Người linh hướng của bạn" +
                          " đã có việc bận nên không thể có lịch gặp như bạn mong muốn. Vui lòng chọn một lịch gặp khác hoặc liên hệ" +
                          " với người linh hướng qua số điện thoại: " +
                          respCom.data[0].phone +
                          " hoặc địa chỉ email: " +
                          respCom.data[0].email +
                          ". Xin cảm ơn.",
                      })
                        .then
                        // message => alert(message)
                        ();
                    });
                  //Gửi mail báo bận.
                });
              const scheduleSpiritualGuideNew = {
                spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
                candidate: scheduleSpiritualGuideOld.candidate,
                session: scheduleSpiritualGuideOld.session,
                date: scheduleSpiritualGuideOld.date,
                status: 2,
                groupSession: scheduleSpiritualGuideOld.groupSession,
              };
              const url =
                "http://localhost:3000/api/scheduleSpiritualGuides/" +
                scheduleSpiritualGuideEdit.id +
                "/replace";
              axios.post(url, scheduleSpiritualGuideNew);
              setTimeout(() => {
                location.reload();
              }, 2500);
            }
          } else if (this.role == 5) {
            var max = this.scheduleSpiritualGuides.length;
            var checkCancel = 0;
            var idSchedule = 0;
            for (i = 0; i < max; i++) {
              if (this.scheduleSpiritualGuides[i].candidate == this.idTable) {
                checkCancel++;
                idSchedule = this.scheduleSpiritualGuides[i].id;
              }
            }
            if (
              checkCancel != 0 &&
              scheduleSpiritualGuideEdit.id != idSchedule
            ) {
              alertify.alert(
                "Thông báo",
                "Hủy lịch gặp không hợp lệ. Vui lòng kiểm tra lại!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else {
              const scheduleSpiritualGuideNew = {
                spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
                candidate: null,
                session: scheduleSpiritualGuideOld.session,
                date: scheduleSpiritualGuideOld.date,
                status: 1,
                groupSession: scheduleSpiritualGuideOld.groupSession,
              };
              const url =
                "http://localhost:3000/api/scheduleSpiritualGuides/" +
                scheduleSpiritualGuideEdit.id +
                "/replace";
              axios.post(url, scheduleSpiritualGuideNew);
              axios
                .get(
                  "http://localhost:3000/api/metSpiritualGuides?filter[where][idSchedule]=" +
                    scheduleSpiritualGuideEdit.id
                )
                .then((response) => {
                  axios
                    .delete(
                      "http://localhost:3000/api/metSpiritualGuides/" +
                        response.data[0].id
                    )
                    .then((resp) => {
                      this.metSpiritualGuides.splice(response.data[0].id, 1);
                      setTimeout(() => {
                        location.reload();
                      }, 100);
                    });
                });
            }
          }
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Đăng ký Lịch linh hướng</h6>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-2" style="padding-left:110px;" v-show="(role === 6 && checkDelete === 1) || (role == 7 && checkDelete === 1)">
          <button class="btn rounded btn-danger" style="font-size:14px;" 
          data-toggle="modal" data-target="#deleteScheduleSpiritualGuideModal">
            <i class="fas fa-trash-alt"></i>
            &nbsp;Xóa lịch
          </button>
        </div>
        <div class="col-md-2" style="padding-left:50px;" v-show="(role === 6 && checkAdd === 1) || (role == 7 && checkAdd === 1)">
          <button class="btn rounded btn-hover-blue"
            style="background-color: #056299;color: white;font-size:14px;" @click="CreateScheduleSpiritualGuide">
            <i class="fas fa-plus"></i>
            &nbsp;Tạo lịch
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <hr style="height:1px;color:lightgray;background-color:lightgray">
      <div class="table-responsive" style="margin-top:-8px">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col" v-for="session in sessions" :key="session.id">{{ session.time }}</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col"></th>
              <th scope="col" v-for="session in sessions" :key="session.id">{{ session.time }}</th>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[0].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 1">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[6].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 2">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[12].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 3">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[18].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 4">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[24].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 5">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[30].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 6">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[36].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 7">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[42].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 8">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[48].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 9">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[54].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 10">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[60].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 11">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[66].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 12">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[72].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 13">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[78].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 14">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[84].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 15">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[90].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 16">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[96].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 17">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[102].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 18">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[108].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 19">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[114].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 20">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[120].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 21">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[126].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 22">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[132].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 23">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[138].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 24">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[144].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 25">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[150].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 26">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[156].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 27">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[162].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 28">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr v-if="isFebruaryOfLeapYearTrue || isThirtyOneTrue || isThirtyTrue">
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[168].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 29">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr v-if="isThirtyOneTrue || isThirtyTrue">
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[174].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 30">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr v-if="isThirtyOneTrue">
              <th v-if="!scheduleSpiritualGuidesIsNull">{{ scheduleSpiritualGuides[180].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleSpiritualGuide in scheduleSpiritualGuides"
                :key="scheduleSpiritualGuide.id" v-if="scheduleSpiritualGuide.groupSession == 31">
                <span class="text-center" v-if="scheduleSpiritualGuide.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleSpiritualGuide.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                  || (role === 5 && scheduleSpiritualGuide.candidate === idTable && scheduleSpiritualGuide.status === 1) 
                  || role === 6 || role === 7">
                  <button v-show="(role === 6 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 7 && scheduleSpiritualGuide.candidate === null && scheduleSpiritualGuide.status === 1) 
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)
                    || (role === 5 && scheduleSpiritualGuide.status === 1 && scheduleSpiritualGuide.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleSpiritualGuide(scheduleSpiritualGuide)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleSpiritualGuide(scheduleSpiritualGuide)">Hủy</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="deleteScheduleSpiritualGuideModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Lịch Linh Hướng</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa toàn bộ lịch linh hướng mà mình đã tạo không.</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="DeleteScheduleSpiritualGuide">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};