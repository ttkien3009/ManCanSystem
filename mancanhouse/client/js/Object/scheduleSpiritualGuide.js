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
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      scheduleSpiritualGuide: {},
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/scheduleSpiritualGuides")
      .then((response) => {
        this.scheduleSpiritualGuides = response.data;
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
              spiritualGuide: 1,
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
              spiritualGuide: 1,
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
                spiritualGuide: 1,
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
                spiritualGuide: 1,
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
        .delete(
          "http://localhost:3000/api/scheduleSpiritualGuides?[where][spiritualGuide]=" +
            this.$store.state.user.idTable
        )
        .then((response) => {
          console.log(response);
          this.scheduleSpiritualGuides.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/scheduleSpiritualGuides");
            location.reload();
          }, 5);
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
          var role = "";
          if (role == "Người linh hướng") {
            const scheduleSpiritualGuideNew = {
              spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
              candidate: 1,
              session: scheduleSpiritualGuideOld.session,
              date: scheduleSpiritualGuideOld.date,
              status: 2,
              groupSession: scheduleSpiritualGuideOld.groupSession,
            };
          } else if (role == "Ứng sinh") {
            const scheduleSpiritualGuideNew = {
              spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
              candidate: null,
              session: scheduleSpiritualGuideOld.session,
              date: scheduleSpiritualGuideOld.date,
              status: 2,
              groupSession: scheduleSpiritualGuideOld.groupSession,
            };
          }
          const url =
            "http://localhost:3000/api/scheduleSpiritualGuides/" +
            scheduleSpiritualGuideEdit.id +
            "/replace";
          axios.post(url, scheduleSpiritualGuideNew);
          setTimeout(() => {
            this.$router.push("/scheduleSpiritualGuides");
            location.reload();
          }, 100);
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
          var role = "";
          if (role == "Người linh hướng") {
            const scheduleSpiritualGuideNew = {
              spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
              candidate: scheduleSpiritualGuideOld.candidate,
              session: scheduleSpiritualGuideOld.session,
              date: scheduleSpiritualGuideOld.date,
              status: 1,
              groupSession: scheduleSpiritualGuideOld.groupSession,
            };
          } else if (role == "Ứng sinh") {
            const scheduleSpiritualGuideNew = {
              spiritualGuide: scheduleSpiritualGuideOld.spiritualGuide,
              candidate: null,
              session: scheduleSpiritualGuideOld.session,
              date: scheduleSpiritualGuideOld.date,
              status: 1,
              groupSession: scheduleSpiritualGuideOld.groupSession,
            };
          }
          const url =
            "http://localhost:3000/api/scheduleSpiritualGuides/" +
            scheduleSpiritualGuideEdit.id +
            "/replace";
          axios.post(url, scheduleSpiritualGuideNew);
          setTimeout(() => {
            this.$router.push("/scheduleSpiritualGuides");
            location.reload();
          }, 100);
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <div class="row">
        <div class="col-md-4">
          <h5 class="m-0 font-weight-bold text-primary">Đăng ký Lịch linh hướng</h5>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-2" style="padding-left:110px;">
          <button class="btn text-size-15px rounded btn-danger" data-toggle="modal" data-target="#deleteScheduleSpiritualGuideModal">
            <i class="fas fa-trash-alt"></i>
            &nbsp;Xóa lịch
          </button>
        </div>
        <div class="col-md-2" style="padding-left:50px;">
          <button class="btn text-size-15px rounded btn-hover-blue"
            style="background-color: #056299;color: white;" @click="CreateScheduleSpiritualGuide">
            <i class="fas fa-plus"></i>
            &nbsp;Tạo lịch
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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
                <span class="text-center">Trống</span><br />
                <div class="mt-1">
                  <button class="btn btn-primary btn-sm"
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