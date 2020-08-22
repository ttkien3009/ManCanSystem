const ScheduleCompanion = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const RegisteringScheduleCompanion = {
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
      scheduleCompanions: [],
      companions: [],
      candidates: [],
      groupCommunity: [],
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      scheduleCompanion: {},
      role: 0,
      idTable: 0,
      metCompanions: [],
    };
  },
  mounted() {
    // let promiseResponse = axios.get("http://localhost:3000/api/logins/findOne?filter[where][token]=token")
    //                     .then(response => response.data)
    //                     .then(data => {return data})
    // console.log(promiseResponse);
    // Promise.resolve(promiseResponse).then((jsonResults) => {
    //   console.log(jsonResults);
    //   this.data().idTable = jsonResults.idTable;
    //   console.log(this.idTable);
    // })
    var path = "http://localhost:3000/api/logins/findOne?filter[where][token]=token";
    function loadDataPromise(path){
      return new Promise(function(res,rej){
        axios.get(path)
        .then(function(response){
          res(response.data);
        })
        .catch(function(err){
          rej(err);
        })
      })
    }; 
    async function Loaddata() {
      let c = await loadDataPromise(path);
      return c;
    }
    Loaddata().then(data => { console.log(data.idTable)});

    
    // var obj = loadDataPromise(path).then((resp) => {
    //   return resp.json();
    // });
    // console.log(obj);
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        this.idTable = resp.data.idTable;
        this.role = resp.data.role; 
      });
    axios
      .get("http://localhost:3000/api/scheduleCompanions?filter[where][companion]=12")
      .then((response) => {
        this.scheduleCompanions = response.data;
      });
    axios
      .get("http://localhost:3000/api/candidates")
      .then((resp) => {
        this.candidates = resp.data;
      });
    
    // axios
    //   .get(
    //     "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
    //   )
    //   .then((resp) => {
    //     this.idTable = resp.data.idTable;
    //     this.role = resp.data.role;
    //     if (this.role == 8 || this.role == 9) {
    //       axios
    //         .get(
    //           "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" +
    //             this.idTable
    //         )
    //         .then((response) => {
    //           this.scheduleCompanions = response.data; 
    //           console.log(this.scheduleCompanions);
    //         });
    //     }
    //     else if (this.role == 5) {
    //       axios
    //         .get(
    //           "http://localhost:3000/api/candidates?filter[where][id]=" +
    //             this.idTable
    //         )
    //         .then((respCan) => {
    //           var community = respCan.data[0].community;
    //           axios
    //             .get(
    //               "http://localhost:3000/api/groupCommunities?filter[where][firstCom]=" + community)
    //             .then((respGroupCom) => {
    //               var groupCommunity = {};
    //               groupCommunity = respGroupCom.data;
    //               if(groupCommunity != null){
    //                 var idGroup = respGroupCom.data[0].id;
    //                 axios
    //                   .get(
    //                     "http://localhost:3000/api/companions?filter[where][groupCommunity]=" +
    //                       idGroup
    //                   )
    //                   .then((respCom) => {
    //                     var companion = respCom.data[0].id;
    //                     axios
    //                       .get(
    //                         "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" +
    //                           companion
    //                       )
    //                       .then((respSchedule) => {
    //                         this.scheduleCompanions = respSchedule.data;
    //                       });
    //                   });
    //               } else{
    //                 axios
    //                   .get(
    //                     "http://localhost:3000/api/groupCommunities?filter[where][secondCom]=" + community)
    //                   .then((respGroupCom) => {
    //                     var groupCommunity = {};
    //                     groupCommunity = respGroupCom.data;
    //                     if(groupCommunity != null){
    //                       var idGroup = respGroupCom.data[0].id;
    //                     axios
    //                       .get(
    //                         "http://localhost:3000/api/companions?filter[where][groupCommunity]=" +
    //                           idGroup
    //                       )
    //                       .then((respCom) => {
    //                         var companion = respCom.data[0].id;
    //                         axios
    //                           .get(
    //                             "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" +
    //                               companion
    //                           )
    //                           .then((resp) => {
    //                             this.scheduleCompanions = resp.data;
    //                           });
    //                       });
    //                     } else{
    //                       axios
    //                         .get(
    //                           "http://localhost:3000/api/groupCommunities?filter[where][thirdCom]=" + community)
    //                         .then((respGroupCom) => {
    //                           var groupCommunity = {};
    //                           groupCommunity = respGroupCom.data;
    //                           if(groupCommunity != null){
    //                             var idGroup = respGroupCom.data[0].id;
    //                           axios
    //                             .get(
    //                               "http://localhost:3000/api/companions?filter[where][groupCommunity]=" +
    //                                 idGroup
    //                             )
    //                             .then((respCom) => {
    //                               var companion = respCom.data[0].id;
    //                               axios
    //                                 .get(
    //                                   "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" +
    //                                     companion
    //                                 )
    //                                 .then((respSchedule) => {
    //                                   this.scheduleCompanions = respSchedule.data;
    //                                 });
    //                             });
    //                           } else {
    //                             axios
    //                               .get(
    //                                 "http://localhost:3000/api/groupCommunities?filter[where][fourthCom]=" + community)
    //                               .then((respGroupCom) => {
    //                                 var groupCommunity = {};
    //                                 groupCommunity = respGroupCom.data;
    //                                 if(groupCommunity != null){
    //                                   var idGroup = respGroupCom.data[0].id;
    //                                 axios
    //                                   .get(
    //                                     "http://localhost:3000/api/companions?filter[where][groupCommunity]=" +
    //                                       idGroup
    //                                   )
    //                                   .then((respCom) => {
    //                                     var companion = respCom.data[0].id;
    //                                     axios
    //                                       .get(
    //                                         "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" +
    //                                           companion
    //                                       )
    //                                       .then((respSchedule) => {
    //                                         this.scheduleCompanions = respSchedule.data;
    //                                       });
    //                                   });
    //                                 } else{
    //                                   axios
    //                                     .get(
    //                                       "http://localhost:3000/api/groupCommunities?filter[where][fifthCom]=" + community)
    //                                     .then((respGroupCom) => {
    //                                       var groupCommunity = {};
    //                                       groupCommunity = respGroupCom.data;
    //                                       if(groupCommunity != null){
    //                                         var idGroup = respGroupCom.data[0].id;
    //                                       axios
    //                                         .get(
    //                                           "http://localhost:3000/api/companions?filter[where][groupCommunity]=" +
    //                                             idGroup
    //                                         )
    //                                         .then((respCom) => {
    //                                           var companion = respCom.data[0].id;
    //                                           axios
    //                                             .get(
    //                                               "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" +
    //                                                 companion
    //                                             )
    //                                             .then((respSchedule) => {
    //                                               this.scheduleCompanions = respSchedule.data;
    //                                             });
    //                                         });
    //                                       }
    //                                     });
    //                                 }
    //                               });
    //                           }
    //                         });
    //                     }
    //                   });
    //               }
    //             });
    //         });
    //     }
    //   });
      axios
        .get("http://localhost:3000/api/metCompanions")
        .then((resp) => {
          this.metCompanions = resp.data;
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

    scheduleCompanionsIsNull() {
      return !!(this.scheduleCompanions.length == 0);
    },
  },
  methods: {
    CreateScheduleCompanion() {
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
            const scheduleCompanion = {
              companion: this.idTable,
              candidate: null,
              session: this.sessions[sess].time,
              date: day,
              status: 1,
              groupSession: date,
            };
            const url = `http://localhost:3000/api/scheduleCompanions`;
            axios.post(url, scheduleCompanion);
          }
        }
        setTimeout(() => {
          this.$router.push("/scheduleCompanions");
          location.reload();
        }, 3000);
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        for (date = 1; date <= 30; date++) {
          for (sess = 0; sess < this.sessions.length; sess++) {
            var dd = String(date).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0");
            var day = dd + "/" + mm;
            const scheduleCompanion = {
              companion: this.idTable,
              candidate: null,
              session: this.sessions[sess].time,
              date: day,
              status: 1,
              groupSession: date,
            };
            const url = `http://localhost:3000/api/scheduleCompanions`;
            axios.post(url, scheduleCompanion);
          }
        }
        setTimeout(() => {
          this.$router.push("/scheduleCompanions");
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
              const scheduleCompanion = {
                companion: this.idTable,
                candidate: null,
                session: this.sessions[sess].time,
                date: day,
                status: 1,
                groupSession: date,
              };
              const url = `http://localhost:3000/api/scheduleCompanions`;
              axios.post(url, scheduleCompanion);
            }
          }
          setTimeout(() => {
            this.$router.push("/scheduleCompanions");
            location.reload();
          }, 3000);
        } else {
          for (date = 1; date <= 28; date++) {
            for (sess = 0; sess < this.sessions.length; sess++) {
              var dd = String(date).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0");
              var day = dd + "/" + mm;
              const scheduleCompanion = {
                companion: this.idTable,
                candidate: null,
                session: this.sessions[sess].time,
                date: day,
                status: 1,
                groupSession: date,
              };
              const url = `http://localhost:3000/api/scheduleCompanions`;
              axios.post(url, scheduleCompanion);
            }
          }
          setTimeout(() => {
            this.$router.push("/scheduleCompanions");
            location.reload();
          }, 3000);
        }
      }
    },

    DeleteScheduleCompanion() {
      axios
        .get(
          "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" + this.idTable
        )
        .then((resp) => {
          var arrayScheduleCompanions = resp.data;
          var lengthScheduleCompanions = arrayScheduleCompanions.length;
          if (lengthScheduleCompanions != 0){
            var firstId = arrayScheduleCompanions[0].id;
            // var maxId = lengthScheduleCompanions + firstId
            var maxIdFirst = firstId + 60;
            for(i = firstId; i < maxIdFirst; i++){
              axios
                .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                .then((response) => {
                  console.log(response);
                  this.scheduleCompanions.splice(i, 1);
                });
            }
            var maxIdSecond = maxIdFirst + 60;
            for(i = maxIdFirst; i < maxIdSecond; i++){
              axios
                .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                .then((response) => {
                  console.log(response);
                  this.scheduleCompanions.splice(i, 1);
                });
            }
            if(lengthScheduleCompanions == 168){
              var maxIdThird = maxIdSecond + 48;
              for(i = maxIdSecond; i < maxIdThird; i++){
                axios
                  .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                  .then((response) => {
                    console.log(response);
                    this.scheduleCompanions.splice(i, 1);
                  });
              }
            }
            if(lengthScheduleCompanions == 174){
              var maxIdThird = maxIdSecond + 54;
              for(i = maxIdSecond; i < maxIdThird; i++){
                axios
                  .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                  .then((response) => {
                    console.log(response);
                    this.scheduleCompanions.splice(i, 1);
                  });
              }
            }
            if(lengthScheduleCompanions >= 180){
              var maxIdThird = maxIdSecond + 60;
              for(i = maxIdSecond; i < maxIdThird; i++){
                axios
                  .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                  .then((response) => {
                    console.log(response);
                    this.scheduleCompanions.splice(i, 1);
                  });
              }
            }
            if(lengthScheduleCompanions == 186){
              var maxIdFourth = maxIdThird + 6;
              for(i = maxIdThird; i < maxIdFourth; i++){
                axios
                  .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                  .then((response) => {
                    console.log(response);
                    this.scheduleCompanions.splice(i, 1);
                  });
              }
            }
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
          
        });
    },

    updateScheduleCompanion(scheduleCompanionEdit) {
      axios
        .get(
          "http://localhost:3000/api/scheduleCompanions/getScheduleCompanion?id=" +
            scheduleCompanionEdit.id
        )
        .then((response) => {
          const scheduleCompanionOld = {
            companion: response.data.scheduleCompanion.companion,
            candidate: response.data.scheduleCompanion.candidate,
            session: response.data.scheduleCompanion.session,
            date: response.data.scheduleCompanion.date,
            status: response.data.scheduleCompanion.status,
            groupSession: response.data.scheduleCompanion.groupSession,
          };
          if (this.role == 8 || this.role == 9) {
            const scheduleCompanionNew = {
              companion: scheduleCompanionOld.companion,
              candidate: scheduleCompanionOld.candidate,
              session: scheduleCompanionOld.session,
              date: scheduleCompanionOld.date,
              status: 2,
              groupSession: scheduleCompanionOld.groupSession,
            };
            const url =
              "http://localhost:3000/api/scheduleCompanions/" +
              scheduleCompanionEdit.id +
              "/replace";
            axios.post(url, scheduleCompanionNew);
            setTimeout(() => {
              location.reload();
            }, 50);
          } else if (this.role == 5) {
            var max = this.scheduleCompanions.length;
            var check = 0;
            for(i = 0; i < max; i++){
              if(this.scheduleCompanions[i].candidate == this.idTable && this.scheduleCompanions[i].status == 1){
                check++;
              }
              if(this.scheduleCompanions[i].candidate == this.idTable && this.scheduleCompanions[i].status == 2){
                axios
                  .get(
                    "http://localhost:3000/api/scheduleCompanions?filter[where][candidate]=" + this.idTable + "&filter[status]=2"
                  )
                  .then((resp) => {
                    axios
                      .get(
                        "http://localhost:3000/api/metCompanions?filter[where][idSchedule]=" + resp.data[0].id
                      )
                      .then((response) => {
                          axios
                            .delete("http://localhost:3000/api/metCompanions/" + response.data[0].id)
                            .then((resp) => {
                              this.metCompanions.splice(response.data[0].id, 1);
                              setTimeout(() => {
                                location.reload();
                              }, 100);
                            });
                      });
                  });
              }
            }
            if(check != 0){
              alertify.alert("Thông báo", "Mỗi ứng sinh chỉ đăng ký một phiên!", function () {
                alertify.success("Ok");
              });
            } else {
              const scheduleCompanionNew = {
                companion: scheduleCompanionOld.companion,
                candidate: this.idTable,
                session: scheduleCompanionOld.session,
                date: scheduleCompanionOld.date,
                status: 1,
                groupSession: scheduleCompanionOld.groupSession,
              };
              var currentDate = new Date();
              const metCompanion = {
                companion: scheduleCompanionNew.companion,
                candidate: this.idTable,
                registeredDate: currentDate,
                status: 1,
                idSchedule: scheduleCompanionEdit.id,
              };
              const url_1 = `http://localhost:3000/api/metCompanions`;
              axios.post(url_1, metCompanion);
              const url =
                "http://localhost:3000/api/scheduleCompanions/" +
                scheduleCompanionEdit.id +
                "/replace";
              axios.post(url, scheduleCompanionNew);
              setTimeout(() => {
                location.reload();
              }, 100);
            }
          }
        });
    },

    cancelScheduleCompanion(scheduleCompanionEdit) {
      axios
        .get(
          "http://localhost:3000/api/scheduleCompanions/getScheduleCompanion?id=" +
            scheduleCompanionEdit.id
        )
        .then((response) => {
          const scheduleCompanionOld = {
            companion: response.data.scheduleCompanion.companion,
            candidate: response.data.scheduleCompanion.candidate,
            session: response.data.scheduleCompanion.session,
            date: response.data.scheduleCompanion.date,
            status: response.data.scheduleCompanion.status,
            groupSession: response.data.scheduleCompanion.groupSession,
          };
          if (this.role == 8 || this.role == 9) {
            if(scheduleCompanionOld.status == 2){
              const scheduleCompanionNew = {
                companion: scheduleCompanionOld.companion,
                candidate: null,
                session: scheduleCompanionOld.session,
                date: scheduleCompanionOld.date,
                status: 1,
                groupSession: scheduleCompanionOld.groupSession,
              };
              const url =
                "http://localhost:3000/api/scheduleCompanions/" +
                scheduleCompanionEdit.id +
                "/replace";
              axios.post(url, scheduleCompanionNew);
              setTimeout(() => {
                location.reload();
              }, 50);
            } else if(scheduleCompanionOld.candidate != null && scheduleCompanionOld.status == 1){
              var emailCandidate = null;
              axios
                .get("http://localhost:3000/api/candidates?filter[where][id]=" + scheduleCompanionOld.candidate)
                .then((resp) => {
                  emailCandidate = resp.data[0].email;
                  axios
                    .get("http://localhost:3000/api/companions?filter[where][id]=" + scheduleCompanionOld.companion)
                    .then((respCom) => {
                      Email.send({
                        Host : "smtp.gmail.com",
                        Username : "mancanhouse2020@gmail.com",
                        Password : "akyqnlcmanojglqb",
                        To : emailCandidate,
                        From : "mancanhouse2020@gmail.com",
                        Subject : "Thông Báo Hủy Lịch Gặp Đồng Hành",
                        Body : "Xin lỗi vì sự bất tiện này. Người đồng hành của bạn" +
                        " đã có việc bận nên không thể có lịch gặp như bạn mong muốn. Vui lòng chọn một lịch gặp khác hoặc liên hệ" + 
                        " với người đồng hành qua số điện thoại: " + respCom.data[0].phone + " hoặc địa chỉ email: " + respCom.data[0].email + ". Xin cảm ơn."
                      }).then(
                        // message => alert(message)
                      );
                    });
                  //Gửi mail báo bận.
                });
              const scheduleCompanionNew = {
                companion: scheduleCompanionOld.companion,
                candidate: scheduleCompanionOld.candidate,
                session: scheduleCompanionOld.session,
                date: scheduleCompanionOld.date,
                status: 2,
                groupSession: scheduleCompanionOld.groupSession,
              };
              const url =
                "http://localhost:3000/api/scheduleCompanions/" +
                scheduleCompanionEdit.id +
                "/replace";
              axios.post(url, scheduleCompanionNew);
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          } else if (this.role == 5) {
            var max = this.scheduleCompanions.length;
            var checkCancel = 0;
            var idSchedule = 0;
            for(i = 0; i < max; i++){
              if(this.scheduleCompanions[i].candidate == this.idTable){
                checkCancel++;
                idSchedule = this.scheduleCompanions[i].id;
              }
            }
            if(checkCancel != 0 && scheduleCompanionEdit.id != idSchedule){
              alertify.alert("Thông báo", "Hủy lịch gặp không hợp lệ. Vui lòng kiểm tra lại!", function () {
                alertify.success("Ok");
              });
            } else {
              const scheduleCompanionNew = {
                companion: scheduleCompanionOld.companion,
                candidate: null,
                session: scheduleCompanionOld.session,
                date: scheduleCompanionOld.date,
                status: 1,
                groupSession: scheduleCompanionOld.groupSession,
              };
              const url =
                "http://localhost:3000/api/scheduleCompanions/" +
                scheduleCompanionEdit.id +
                "/replace";
              axios.post(url, scheduleCompanionNew);
              axios
                .get(
                  "http://localhost:3000/api/metCompanions?filter[where][idSchedule]=" +
                    scheduleCompanionEdit.id
                )
                .then((response) => {
                    axios
                      .delete("http://localhost:3000/api/metCompanions/" + response.data[0].id)
                      .then((resp) => {
                        this.metCompanions.splice(response.data[0].id, 1);
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
          <h6 class="m-0 font-weight-bold text-dark">Đăng ký Lịch đồng hành</h6>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-2" style="padding-left:110px;" v-show="role == 8 || role == 9">
          <button class="btn rounded btn-danger" style="font-size:14px;" 
          data-toggle="modal" data-target="#deleteScheduleCompanionModal">
            <i class="fas fa-trash-alt"></i>
            &nbsp;Xóa lịch
          </button>
        </div>
        <div class="col-md-2" style="padding-left:50px;" v-show="role == 8 || role == 9">
          <button class="btn rounded btn-hover-blue"
            style="background-color: #056299;color: white;font-size:14px;" @click="CreateScheduleCompanion">
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
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[0].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 1">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[6].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 2">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[12].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 3">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[18].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 4">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[24].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 5">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[30].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 6">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[36].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 7">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[42].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 8">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[48].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 9">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[54].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 10">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[60].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 11">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[66].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 12">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[72].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 13">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[78].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 14">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[84].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 15">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[90].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 16">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[96].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 17">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[102].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 18">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[108].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 19">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[114].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 20">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[120].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 21">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[126].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 22">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[132].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 23">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[138].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 24">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[144].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 25">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[150].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 26">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[156].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 27">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr>
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[162].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 28">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr v-if="isFebruaryOfLeapYearTrue || isThirtyOneTrue || isThirtyTrue">
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[168].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 29">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr v-if="isThirtyOneTrue || isThirtyTrue">
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[174].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 30">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
            <tr v-if="isThirtyOneTrue">
              <th v-if="!scheduleCompanionsIsNull">{{ scheduleCompanions[180].date }}</th>
              <td class="align-middle text-center" scope="row" v-for="scheduleCompanion in scheduleCompanions"
                :key="scheduleCompanion.id" v-if="scheduleCompanion.groupSession == 31">
                <span class="text-center" v-if="scheduleCompanion.status === 2">Bận Việc</span>
                <span class="text-center" v-else-if="scheduleCompanion.candidate === null && scheduleCompanion.status === 1">Trống</span>
                <span class="text-center" v-else v-for="candidate in candidates">
                  <span v-if="candidate.id == scheduleCompanion.candidate">{{ candidate.candidateId }}</span>
                </span>
                <br />
                <div class="mt-1" v-show="(role === 5 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                  || (role === 5 && scheduleCompanion.candidate === idTable && scheduleCompanion.status === 1) 
                  || role === 8 || role === 9">
                  <button v-show="(role === 8 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 9 && scheduleCompanion.candidate === null && scheduleCompanion.status === 1) 
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)
                    || (role === 5 && scheduleCompanion.status === 1 && scheduleCompanion.candidate === null)" class="btn btn-primary btn-sm"
                    style="width: 62px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="updateScheduleCompanion(scheduleCompanion)">Đăng ký</button>
                  <button class="btn btn-danger btn-sm"
                    style="width: 50px;height: 25px;font-size:12px;border-radius:35px;"
                    @click="cancelScheduleCompanion(scheduleCompanion)">Hủy</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="deleteScheduleCompanionModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Lịch Đồng Hành</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa toàn bộ lịch đồng hành mà mình đã tạo không.</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="DeleteScheduleCompanion">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};