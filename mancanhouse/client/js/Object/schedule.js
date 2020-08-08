const Schedule = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListSchedule = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Lịch học",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Lịch Học",
      dayOfWeeks: [
        { id: 1, name: "Thứ 2" },
        { id: 2, name: "Thứ 3" },
        { id: 3, name: "Thứ 4" },
        { id: 4, name: "Thứ 5" },
        { id: 5, name: "Thứ 6" },
        { id: 6, name: "Thứ 7" },
        { id: 7, name: "Chủ Nhật" },
      ],
      schedules: [],
      schedule: {},
      subjects: [],
      teachers: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/schedules").then((response) => {
      this.schedules = response.data;
    });
    axios.get("http://localhost:3000/api/subjects").then((response) => {
      this.subjects = response.data;
    });
    axios.get("http://localhost:3000/api/teachers").then((response) => {
      this.teachers = response.data;
    });
  },
  computed: {},
  methods: {
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("-");
    },
    getDetailSchedule(schedule) {
      this.schedule = schedule;
    },
    getDataScheduleUpdate(schedule) {
      this.$router.push({ name: "editSchedule", params: { id: schedule.id } });
    },
    deleteDataSchedule(id) {
      axios
        .delete("http://localhost:3000/api/schedules/" + id)
        .then((response) => {
          console.log(response);
          this.schedules.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/schedules");
            location.reload();
          }, 5);
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <div class="row">
        <div class="col-md-4">
          <h5 class="m-0 font-weight-bold text-primary">Danh sách Lịch Học</h5>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addSchedule' }">
            <button :title="titleButtonAdd" class="btn text-size-15px rounded btn-hover-blue"
              style="background-color: #056299;color: white;">
              <i class="fas fa-plus"></i>
              &nbsp;Thêm
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Môn Học</th>
              <th>Giáo Viên</th>
              <th>Ngày Trong Tuần</th>
              <th>Ngày Bắt Đầu</th>
              <th>Ngày Kết Thúc</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Môn Học</th>
              <th>Giáo Viên</th>
              <th>Ngày Trong Tuần</th>
              <th>Ngày Bắt Đầu</th>
              <th>Ngày Kết Thúc</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(schedule, index) in schedules" :key="schedule.id">
              <th>{{ index + 1 }}</th>
              <td v-for="subject in subjects" v-if="subject.id == schedule.subject">{{ subject.name }}</td>
              <td v-for="teacher in teachers" v-if="teacher.id == schedule.teacher">{{ teacher.fullName }}</td>
              <td v-for="dayOfWeek in dayOfWeeks" v-if="dayOfWeek.id == schedule.dayOfWeek">{{ dayOfWeek.name }}</td>
              <td>{{ crypt.formatDate(schedule.dateStart) }}</td>
              <td>{{ crypt.formatDate(schedule.dateEnd) }}</td>
              <td>
                <div class="row" style="margin-left:-10px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonEdit" @click="getDataScheduleUpdate(schedule)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -10px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailSchedule(schedule)"
                      data-target="#deleteScheduleModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -13px;">
                      <i class="far fa-trash-alt fa-md ml--1px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="deleteScheduleModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Lịch Học</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Lịch Học {{ schedule.scheduleId }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataSchedule(schedule.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddSchedule = {
  data() {
    return {
      id: 0,
      subject: 0,
      teacher: 0,
      dayOfWeek: 0,
      dateStart: null,
      dateEnd: null,
      titleDateStart: "Nhập thông tin ngày bắt đầu",
      titleDateEnd: "Nhập thông tin ngày kết thúc",
      teachers: [],
      subjects: [],
      dayOfWeeks: [
        { id: 1, name: "Thứ 2" },
        { id: 2, name: "Thứ 3" },
        { id: 3, name: "Thứ 4" },
        { id: 4, name: "Thứ 5" },
        { id: 5, name: "Thứ 6" },
        { id: 6, name: "Thứ 7" },
        { id: 7, name: "Chủ Nhật" },
      ],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/subjects").then((response) => {
      this.subjects = response.data;
    });
    axios.get("http://localhost:3000/api/teachers").then((response) => {
      this.teachers = response.data;
    });
  },
  computed: {
    subjectIsValid() {
      return !!this.subject;
    },

    teacherIsValid() {
      return this.teacher;
    },

    dayOfWeekIsValid() {
      return this.dayOfWeek;
    },

    dateStartIsValid() {
      return this.dateStart;
    },

    dateEndIsValid() {
      return this.dateEnd;
    },

    addScheduleFormIsValid() {
      return (
        this.teacherIsValid &&
        this.dayOfWeekIsValid &&
        this.dateEndIsValid &&
        this.dateStartIsValid &&
        this.subjectIsValid
      );
    },

    refreshFormSchedule() {
      return (
        this.teacherIsValid ||
        this.dateEndIsValid ||
        this.dateStartIsValid ||
        this.dayOfWeekIsValid ||
        this.subjectIsValid
      );
    },
  },
  methods: {
    submitAddScheduleForm() {
      if (this.addScheduleFormIsValid) {
        var dateS = new Date(this.dateStart);
        var dateE = new Date(this.dateEnd);
        var today = new Date();
        console.log(today.getFullYear());
        if(today.getFullYear() === dateS.getFullYear() && today.getMonth() === dateS.getMonth() && today.getDate() > dateS.getDate()){
          alertify.alert(
            "Thông báo",
            "Ngày bắt đầu nhỏ hơn ngày hiện tại!",
            function () {
              alertify.success("Ok");
            }
          );
        } else if (dateS.getTime() > dateE.getTime()) {
          alertify.alert(
            "Thông báo",
            "Ngày bắt đầu lớn hơn ngày kết thúc!",
            function () {
              alertify.success("Ok");
            }
          );
        } else if (dateS.getTime() === dateE.getTime()) {
          alertify.alert(
            "Thông báo",
            "Ngày bắt đầu bằng ngày kết thúc!",
            function () {
              alertify.success("Ok");
            }
          );
        } else {
          const schedule = {
            subject: this.subject,
            teacher: this.teacher,
            dayOfWeek: this.dayOfWeek,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
          };
          const url_1 = `http://localhost:3000/api/schedules`;
          axios.post(url_1, schedule);
          setTimeout(() => {
            this.$router.push("/schedules");
            location.reload();
          }, 100);
          return 0;
        }
      } else {
        alertify.alert("Thông báo", "Lưu dữ liệu thất bại!", function () {
          alertify.success("Ok");
        });
      }
    },

    clearInputScheduleForm() {
      if (this.subjectIsValid) {
        this.subject = 0;
      }
      if (this.teacherIsValid) {
        this.teacher = 0;
      }
      if (this.dayOfWeekIsValid) {
        this.dayOfWeek = 0;
      }
      if (this.dateStartIsValid) {
        this.dateStart = null;
      }
      if (this.dateEndIsValid) {
        this.dateEnd = null;
      }
    },

    toListSchedule() {
      this.$router.push("/schedules");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Thêm Lịch Học</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddScheduleForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Lịch Học:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Lịch Học</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="subject">Môn Học</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="subject" name="subject"
              id="subject" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Môn Học ---</option>
              <option v-for="subject in subjects" v-bind:value="subject.id">{{ subject.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="teacher">Giảng Viên</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="teacher" name="teacher"
              id="teacher" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Giảng Viên ---</option>
              <option v-for="teacher in teachers" v-bind:value="teacher.id">{{ teacher.fullName }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="dateStart">Ngày Bắt Đầu Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateStart" name="dateStart" id="dateStart" type="date" :title="titleDateStart"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="dateEnd">Ngày Kết Thúc Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateEnd" name="dateEnd" id="dateEnd" type="date" :title="titleDateEnd"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="dayOfWeek">Ngày Học Trong Tuần</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="dayOfWeek" name="dayOfWeek" id="dayOfWeek"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Ngày Học Trong Tuần ---</option>
              <option v-for="dayOfWeek in dayOfWeeks" v-bind:value="dayOfWeek.id">{{ dayOfWeek.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addScheduleFormIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormSchedule" @click="clearInputScheduleForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListSchedule">
                <i class="fas fa-fast-backward"></i>
                &nbsp;Quay lại
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
};

const EditSchedule = {
  data() {
    return {
      id: 0,
      subject: 0,
      teacher: 0,
      dayOfWeek: 0,
      dateStart: null,
      dateEnd: null,
      titleDateStart: "Nhập thông tin ngày bắt đầu",
      titleDateEnd: "Nhập thông tin ngày kết thúc",
      teachers: [],
      subjects: [],
      dayOfWeeks: [
        { id: 1, name: "Thứ 2" },
        { id: 2, name: "Thứ 3" },
        { id: 3, name: "Thứ 4" },
        { id: 4, name: "Thứ 5" },
        { id: 5, name: "Thứ 6" },
        { id: 6, name: "Thứ 7" },
        { id: 7, name: "Chủ Nhật" },
      ],
      schedule: {},
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/schedules").then((response) => {
      this.schedules = response.data;
    });
    axios.get("http://localhost:3000/api/subjects").then((response) => {
      this.subjects = response.data;
    });
    axios.get("http://localhost:3000/api/teachers").then((response) => {
      this.teachers = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/schedules/getSchedule?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.subject = response.data.schedule.subject;
        this.teacher = response.data.schedule.teacher;
        this.dayOfWeek = response.data.schedule.dayOfWeek;
        this.dateStart = crypt.formatDate(response.data.schedule.dateStart);
        this.dateEnd = crypt.formatDate(response.data.schedule.dateEnd);
      });
  },
  computed: {
    subjectIsValid() {
      return !!this.subject;
    },

    teacherIsValid() {
      return this.teacher;
    },

    dayOfWeekIsValid() {
      return this.dayOfWeek;
    },

    dateStartIsValid() {
      return this.dateStart;
    },

    dateEndIsValid() {
      return this.dateEnd;
    },

    editScheduleFormIsValid() {
      return (
        this.teacherIsValid &&
        this.dayOfWeekIsValid &&
        this.dateEndIsValid &&
        this.dateStartIsValid &&
        this.subjectIsValid
      );
    },

    refreshFormSchedule() {
      return (
        this.teacherIsValid ||
        this.dateEndIsValid ||
        this.dateStartIsValid ||
        this.dayOfWeekIsValid ||
        this.subjectIsValid
      );
    },
  },
  methods: {
    submitEditScheduleForm() {
      if (this.editScheduleFormIsValid) {
        var dateS = new Date(this.dateStart);
        var dateE = new Date(this.dateEnd);
        if (dateS.getTime() > dateE.getTime()) {
          alertify.alert(
            "Thông báo",
            "Ngày bắt đầu lớn hơn ngày kết thúc!",
            function () {
              alertify.success("Ok");
            }
          );
        } else if (dateS.getTime() === dateE.getTime()) {
          alertify.alert(
            "Thông báo",
            "Ngày bắt đầu bằng ngày kết thúc!",
            function () {
              alertify.success("Ok");
            }
          );
        } else {
          const schedule = {
            teacher: this.teacher,
            dayOfWeek: this.dayOfWeek,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
            subject: this.subject,
            id: this.$route.params.id,
          };
          const url =
            "http://localhost:3000/api/schedules/" + schedule.id + "/replace";
          axios.post(url, schedule);
          setTimeout(() => {
            this.$router.push("/schedules");
            location.reload();
          }, 100);
          return 0;
        }
      } else {
        alertify.alert("Thông báo", "Lưu dữ liệu thất bại!", function () {
          alertify.success("Ok");
        });
      }
    },

    clearInputScheduleForm() {
      if (this.subjectIsValid) {
        this.subject = 0;
      }
      if (this.teacherIsValid) {
        this.teacher = 0;
      }
      if (this.dayOfWeekIsValid) {
        this.dayOfWeek = 0;
      }
      if (this.dateStartIsValid) {
        this.dateStart = null;
      }
      if (this.dateEndIsValid) {
        this.dateEnd = null;
      }
    },

    toListSchedule() {
      this.$router.push("/schedules");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Chỉnh sửa Lịch Học</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditScheduleForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Lịch Học:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Lịch Học</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="subject">Môn Học</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="subject" name="subject"
              id="subject" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Môn Học ---</option>
              <option v-for="subject in subjects" v-bind:value="subject.id" :selected="schedule.subject == subject.id">{{ subject.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="teacher">Giảng Viên</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="teacher" name="teacher"
              id="teacher" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Giảng Viên ---</option>
              <option v-for="teacher in teachers" v-bind:value="teacher.id" :selected="schedule.teacher == teacher.id">{{ teacher.fullName }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="dateStart">Ngày Bắt Đầu Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateStart" name="dateStart" id="dateStart" type="date" :title="titleDateStart"
            :value="dateStart" v-on:keyup="dateStart = $event.target.value" class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="dateEnd">Ngày Kết Thúc Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateEnd" name="dateEnd" id="dateEnd" type="date" :title="titleDateEnd"
            :value="dateEnd" v-on:keyup="dateEnd = $event.target.value" class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="dayOfWeek">Ngày Học Trong Tuần</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="dayOfWeek" name="dayOfWeek" id="dayOfWeek"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Ngày Học Trong Tuần ---</option>
              <option v-for="dayOfWeek in dayOfWeeks" v-bind:value="dayOfWeek.id" :selected="schedule.dayOfWeek == dayOfWeek.id">{{ dayOfWeek.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editScheduleFormIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormSchedule" @click="clearInputScheduleForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListSchedule">
                <i class="fas fa-fast-backward"></i>
                &nbsp;Quay lại
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
};