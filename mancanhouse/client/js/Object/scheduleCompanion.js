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
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      scheduleCompanion: {},
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/scheduleCompanions")
      .then((response) => {
        this.scheduleCompanions = response.data;
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
              companion: 1,
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
              companion: 1,
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
                companion: 1,
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
                companion: 1,
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
        .delete(
          "http://localhost:3000/api/scheduleCompanions?[where][companion]=" +
            this.$store.state.user.idTable
        )
        .then((response) => {
          console.log(response);
          this.scheduleCompanions.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/scheduleCompanions");
            location.reload();
          }, 5);
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
          var role = "";
          if (role == "Người đồng hành") {
            const scheduleCompanionNew = {
              companion: scheduleCompanionOld.companion,
              candidate: 1,
              session: scheduleCompanionOld.session,
              date: scheduleCompanionOld.date,
              status: 2,
              groupSession: scheduleCompanionOld.groupSession,
            };
          } else if (role == "Ứng sinh") {
            const scheduleCompanionNew = {
              companion: scheduleCompanionOld.companion,
              candidate: null,
              session: scheduleCompanionOld.session,
              date: scheduleCompanionOld.date,
              status: 2,
              groupSession: scheduleCompanionOld.groupSession,
            };
          }
          const url =
            "http://localhost:3000/api/scheduleCompanions/" +
            scheduleCompanionEdit.id +
            "/replace";
          axios.post(url, scheduleCompanionNew);
          setTimeout(() => {
            this.$router.push("/scheduleCompanions");
            location.reload();
          }, 100);
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
          var role = "";
          if (role == "Người đồng hành") {
            const scheduleCompanionNew = {
              companion: scheduleCompanionOld.companion,
              candidate: scheduleCompanionOld.candidate,
              session: scheduleCompanionOld.session,
              date: scheduleCompanionOld.date,
              status: 1,
              groupSession: scheduleCompanionOld.groupSession,
            };
          } else if (role == "Ứng sinh") {
            const scheduleCompanionNew = {
              companion: scheduleCompanionOld.companion,
              candidate: null,
              session: scheduleCompanionOld.session,
              date: scheduleCompanionOld.date,
              status: 1,
              groupSession: scheduleCompanionOld.groupSession,
            };
          }
          const url =
            "http://localhost:3000/api/scheduleCompanions/" +
            scheduleCompanionEdit.id +
            "/replace";
          axios.post(url, scheduleCompanionNew);
          setTimeout(() => {
            this.$router.push("/scheduleCompanions");
            location.reload();
          }, 100);
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
        <div class="col-md-2" style="padding-left:110px;">
          <button class="btn rounded btn-danger" style="font-size:14px;" data-toggle="modal" data-target="#deleteScheduleCompanionModal">
            <i class="fas fa-trash-alt"></i>
            &nbsp;Xóa lịch
          </button>
        </div>
        <div class="col-md-2" style="padding-left:50px;">
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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