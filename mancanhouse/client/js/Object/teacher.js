const Teacher = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListTeacher = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Giảng viên",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Giảng Viên",
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Ngừng hoạt động" },
      ],
      teachers: [],
      teacher: {},
      birthdayFormat: null,
      subjects: [],
      genders: [
        { id: "1", name: "Nam" },
        { id: "2", name: "Nữ" },
      ],
      image: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/teachers").then((response) => {
      this.teachers = response.data;
    });
    axios.get("http://localhost:3000/api/subjects").then((response) => {
      this.subjects = response.data;
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
    getDetailTeacher(teacher) {
      this.teacher = teacher;
      this.image = `
      <img class="img-fluid img-thumbnail rounded-circle" src="../api/Photos/teacher/download/` + this.teacher.image + `" width="100px"
      height="100px" alt="teacher-image"/>
      `
      this.birthdayFormat = this.formatDate(this.teacher.birthday);
    },

    getDataTeacherUpdate(teacher) {
      this.$router.push({ name: "editTeacher", params: { id: teacher.id } });
    },

    deleteDataTeacher(id) {
      axios
        .delete("http://localhost:3000/api/teachers/" + id)
        .then((response) => {
          console.log(response);
          this.teachers.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/teachers");
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
          <h5 class="m-0 font-weight-bold text-primary">Danh sách Giảng Viên</h5>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addTeacher' }">
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
              <th>Họ và Tên</th>
              <th>Giới Tính</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Bộ Môn</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Họ và Tên</th>
              <th>Giới Tính</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Bộ Môn</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(teacher, index) in teachers" :key="teacher.id">
              <th>{{ index + 1 }}</th>
              <td>{{ teacher.fullName }}</td>
              <td v-for="gender in genders" v-if="gender.id == teacher.gender">{{ gender.name }}</td>
              <td>{{ teacher.phone }}</td>
              <td>{{ teacher.email }}</td>
              <td v-for="subject in subjects" v-if="subject.id == teacher.subject">{{ subject.name }}</td>
              <td v-if="teacher.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="teacher.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td>
                <div class="row" style="margin-left:-15px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailTeacher(teacher)"
                      data-target="#detailTeacherModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonEdit" @click="getDataTeacherUpdate(teacher)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -10px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailTeacher(teacher)"
                      data-target="#deleteTeacherModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -20px;">
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
    <div id="deleteTeacherModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Giảng Viên</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Giảng Viên {{ teacher.teacherId }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataTeacher(teacher.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="detailTeacherModal" class="modal modal-edu-general default-popup-PrimaryModal fade rounded"
      role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Chi tiết Giảng Viên</h4>
            <div class="modal-close-area modal-close-df bg-danger"
              style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4 text-center" v-if="teacher.image != null">
                <div v-html="image"></div>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ teacher.teacherId }}</p>
              </div>
              <div class="col-sm-4 text-center" v-if="teacher.image == null">
                <img class="img-fluid img-thumbnail rounded-circle" src="../images/default_image.png" width="100px"
                  height="100px" alt="teacher-image"/>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ teacher.teacherId }}</p>
              </div>
              <div class="col-sm-8 mt-3">
                <p class="text-uppercase font-weight-bold" style="font-size: larger;">{{ teacher.fullName }}
                </p>
                <div style="margin-left: 12px;">
                <span class="font-weight-bold">Giới 
                Tính:</span><span v-for="gender in genders" v-if="gender.id == teacher.gender">
                 &nbsp;&nbsp;&nbsp;{{ gender.name }}</span><br>
                <span class="font-weight-bold">Ngày
                  Sinh:</span><span> &nbsp;{{ birthdayFormat }}</span><br>
                <span class="font-weight-bold ">SĐT:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ teacher.phone}}</span><br>
                <span class="font-weight-bold ">Email:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{{ teacher.email }}</span><br>
                <span class="font-weight-bold ">Bộ Môn:</span>
                <span v-for="subject in subjects" v-if="subject.id == teacher.subject"> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ subject.name}}</span><br>
                <span class="font-weight-bold">Trạng Thái:&nbsp;</span>
                <span v-if="teacher.status == 1"> 
                  <i class="fas fa-toggle-on fa-lg text-success"></i>
                </span>
                <span v-if="teacher.status == 2"> 
                  <i class="fas fa-toggle-off fa-lg text-danger"></i>
                </span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddTeacher = {
  data() {
    return {
      id: 0,
      teacherId: null,
      fullName: null,
      gender: 0,
      birthday: null,
      phone: null,
      email: null,
      image: null,
      subject: 0,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleFullName: "Nhập thông tin họ và tên",
      titlePhone: "Nhập thông tin số điện thoại",
      titleEmail: "Nhập thông tin địa chỉ email",
      checkEmail: false,
      checkPhone: false,
      status: 0,
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      genders: [
        { id: 1, name: "Nam" },
        { id: 2, name: "Nữ" },
      ],
      subjects: [],
      teachers: [],
      selectedFile: null,
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
    statusIsValid() {
      return !!this.status;
    },

    genderIsValid() {
      return this.gender;
    },

    fullNameIsValid() {
      return this.fullName;
    },

    phoneIsValid() {
      return this.phone;
    },

    emailIsValid() {
      return this.email;
    },

    subjectIsValid() {
      return this.subject;
    },

    birthdayIsValid() {
      return this.birthday;
    },

    checkFormatPhone() {
      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      this.checkPhone = vnf_regex.test(this.phone);
      return !!this.phoneIsValid && !this.checkPhone;
    },

    checkFormatEmail() {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      this.checkEmail = filter.test(this.email);
      return !!this.emailIsValid && !this.checkEmail;
    },

    addTeacherFormIsValid() {
      return (
        this.genderIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.subjectIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail &&
        this.statusIsValid
      );
    },

    refreshFormTeacher() {
      return (
        this.genderIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.subjectIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid
      );
    },
  },
  methods: {
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
    },
    submitAddTeacherForm() {
      if (this.addTeacherFormIsValid) {
        let lengthTeachers = this.teachers.length;
        if ( lengthTeachers == 0) {
          this.teacherId == 'GV001';
        }
        else {
          let currentId = this.teachers[lengthTeachers - 1].id;
          if (currentId > -1 && currentId < 9) {
            this.teacherId = "GV00" + (currentId + 1);
          }
          if (currentId > 8 && currentId < 99) {
            this.teacherId = "GV0" + (currentId + 1);
          }
          if (currentId > 98 && currentId < 999) {
            this.teacherId = "GV" + (currentId + 1);
          }
        }
        axios
          .get(
            "http://localhost:3000/api/teachers/existsEmail?email=" + this.email
          )
          .then((response) => {
            if (response.data.bool == true) {
              alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                alertify.success("Ok");
              });
            } else {
              axios
                .get(
                  "http://localhost:3000/api/teachers/existsPhone?phone=" +
                    this.phone
                )
                .then((resp) => {
                  if (resp.data.bool == true) {
                    alertify.alert(
                      "Thông báo",
                      "Số điện thoại đã tồn tại!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else {
                    if (crypt.getAge(this.birthday) < 25) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi giáo viên nhỏ hơn 25!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else if (crypt.getAge(this.birthday) > 50) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi giáo viên lớn hơn 50!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else {
                      var fileName = null;
                      const fd = new FormData();
                      if(this.selectedFile != null) {
                        fd.append("image", this.selectedFile, this.selectedFile.name);
                        var start = this.selectedFile.name.lastIndexOf('.');
                        var end = this.selectedFile.length;
                        fileName = this.teacherId + this.selectedFile.name.slice(start, end);
                      }
                      const teacher = {
                        teacherId: this.teacherId,
                        fullName: this.fullName,
                        gender: this.gender,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        subject: this.subject,
                        status: this.status,
                      };
                      const url_1 = `http://localhost:3000/api/teachers`;
                      axios.post(url_1, teacher);
                      axios
                        .get(
                          "http://localhost:3000/api/teachers/findOne?filter[where][email]=" +
                            this.email
                        )
                        .then((resp) => {
                          const account_teacher = {
                            userId: resp.data.teacherId,
                            username: resp.data.email,
                            password: crypt.encrypt(resp.data.phone),
                            role: 10,
                            status: resp.data.status,
                            idTable: resp.data.id,
                          };
                          const url = "http://localhost:3000/api/accounts";
                          axios.post(url, account_teacher);
                          if(this.selectedFile != null){
                            axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                              .then(res => {
                                console.log(res);
                              })
                              .catch(err => console.log(err));
                          }
                        });
                      setTimeout(() => {
                        this.$router.push("/teachers");
                        location.reload();
                      }, 100);
                      return 0;
                    }
                  }
                });
            }
          });
      } else {
        alertify.alert("Thông báo", "Lưu dữ liệu thất bại!", function () {
          alertify.success("Ok");
        });
      }
    },

    clearInputTeacherForm() {
      if (this.genderIsValid) {
        this.gender = 0;
      }
      if (this.fullNameIsValid) {
        this.fullName = null;
      }
      if (this.phoneIsValid) {
        this.phone = null;
      }
      if (this.emailIsValid) {
        this.email = null;
      }
      if (this.subjectIsValid) {
        this.subject = 0;
      }
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
      if (this.statusIsValid) {
        this.status = 0;
      }
    },

    toListTeacher() {
      this.$router.push("/teachers");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Thêm Giảng Viên</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddTeacherForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Giảng Viên:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều người Giảng Viên</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
              class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="gender">Giới Tính</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="gender" name="gender"
              id="gender" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Giới Tính ---</option>
              <option v-for="gender in genders" v-bind:value="gender.id">{{ gender.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="subject">Bộ Môn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="subject" name="subject"
              id="subject" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Bộ Môn ---</option>
              <option v-for="subject in subjects" v-bind:value="subject.id">{{ subject.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
            <label class="text-danger">*</label>
            <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
              v-model="phone" class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
              style="margin-top: -5px;">
            <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
              định dạng</span>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="email">Email</label>
            <label class="text-danger">*</label>
            <input v-model="email" name="email" id="email" type="text" :title="titleEmail"
              class="form-control  text-size-13px " placeholder="Nhập Địa chỉ email..."
              style="margin-top: -5px;">
            <span v-if="checkFormatEmail" class="text-danger text-size-13px">Địa chỉ email không hợp
              lệ</span>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id">{{ status.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addTeacherFormIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormTeacher" @click="clearInputTeacherForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListTeacher">
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

const EditTeacher = {
  data() {
    return {
      id: 0,
      teacherId: null,
      fullName: null,
      gender: 0,
      birthday: null,
      phone: null,
      phoneEdit: null,
      email: null,
      emailEdit: null,
      image: null,
      imageEdit: null,
      subject: 0,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleFullName: "Nhập thông tin họ và tên",
      titlePhone: "Nhập thông tin số điện thoại",
      titleEmail: "Nhập thông tin địa chỉ email",
      checkEmail: false,
      checkPhone: false,
      status: 0,
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      genders: [
        { id: 1, name: "Nam" },
        { id: 2, name: "Nữ" },
      ],
      subjects: [],
      teachers: [],
      teacher: {},
      selectedFile: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/teachers").then((response) => {
      this.teachers = response.data;
    });
    axios.get("http://localhost:3000/api/subjects").then((response) => {
      this.subjects = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/teachers/getTeacher?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.teacherId = response.data.teacher.teacherId;
        this.fullName = response.data.teacher.fullName;
        this.gender = response.data.teacher.gender;
        this.birthday = crypt.formatDate(response.data.teacher.birthday);
        this.phone = response.data.teacher.phone;
        this.phoneEdit = response.data.teacher.phone;
        this.email = response.data.teacher.email;
        this.emailEdit = response.data.teacher.email;
        this.imageEdit = response.data.teacher.image;
        this.subject = response.data.teacher.subject;
        this.status = response.data.teacher.status;
      });
  },
  computed: {
    statusIsValid() {
      return !!this.status;
    },

    genderIsValid() {
      return this.gender;
    },

    fullNameIsValid() {
      return this.fullName;
    },

    phoneIsValid() {
      return this.phone;
    },

    emailIsValid() {
      return this.email;
    },

    subjectIsValid() {
      return this.subject;
    },

    birthdayIsValid() {
      return this.birthday;
    },

    checkFormatPhone() {
      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      this.checkPhone = vnf_regex.test(this.phone);
      return !!this.phoneIsValid && !this.checkPhone;
    },

    checkFormatEmail() {
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      this.checkEmail = filter.test(this.email);
      return !!this.emailIsValid && !this.checkEmail;
    },

    editTeacherFormIsValid() {
      return (
        this.genderIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.subjectIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail &&
        this.statusIsValid
      );
    },

    refreshFormTeacher() {
      return (
        this.genderIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.subjectIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid
      );
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitEditTeacherForm() {
      if (this.editTeacherFormIsValid) {
        if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
          if (crypt.getAge(this.birthday) < 25) {
            alertify.alert(
              "Thông báo",
              "Tuổi giáo viên nhỏ hơn 25!",
              function () {
                alertify.success("Ok");
              }
            );
          } else if (crypt.getAge(this.birthday) > 50) {
            alertify.alert(
              "Thông báo",
              "Tuổi giáo viên lớn hơn 50!",
              function () {
                alertify.success("Ok");
              }
            );
          } else {
            if(this.selectedFile != null) {
              const fd = new FormData();
              fd.append('image', this.selectedFile, this.selectedFile.name);
              var start = this.selectedFile.name.lastIndexOf('.');
              var end = this.selectedFile.length;
              var fileName = this.teacherId + this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const teacher = {
                  teacherId: this.teacherId,
                  fullName: this.fullName,
                  gender: this.gender,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  subject: this.subject,
                  status: this.status,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                axios.post(url, teacher);
                axios.delete("http://localhost:3000/api/Photos/teacher/files/" + this.imageEdit)
                  .then(resp => {
                    console.log(resp);
                  })
                  .catch(err => console.log(err));
                axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => console.log(err));
              } else {
                const teacher = {
                  teacherId: this.teacherId,
                  fullName: this.fullName,
                  gender: this.gender,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  subject: this.subject,
                  status: this.status,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                axios.post(url, teacher);
                axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => console.log(err));
              }
            } else {
              const teacher = {
                teacherId: this.teacherId,
                fullName: this.fullName,
                gender: this.gender,
                birthday: this.birthday,
                phone: this.phone,
                email: this.email,
                image: this.imageEdit,
                subject: this.subject,
                status: this.status,
                id: this.$route.params.id,
              };
              const url =
                "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
              axios.post(url, teacher);
            }
            setTimeout(() => {
              this.$router.push("/teachers");
              location.reload();
            }, 100);
            return 0;
          }
        } else if (
          this.emailEdit != this.email &&
          this.phoneEdit == this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/teachers/existsEmail?email=" +
                this.email
            )
            .then((response) => {
              if (response.data.bool == true) {
                alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                  alertify.success("Ok");
                });
              } else {
                if (crypt.getAge(this.birthday) < 25) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi giáo viên nhỏ hơn 25!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 50) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi giáo viên lớn hơn 50!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  if(this.selectedFile != null) {
                    const fd = new FormData();
                    fd.append('image', this.selectedFile, this.selectedFile.name);
                    var start = this.selectedFile.name.lastIndexOf('.');
                    var end = this.selectedFile.length;
                    var fileName = this.teacherId + this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      const teacher = {
                        teacherId: this.teacherId,
                        fullName: this.fullName,
                        gender: this.gender,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        subject: this.subject,
                        status: this.status,
                        id: this.$route.params.id,
                      };
                      const url =
                        "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                      axios.post(url, teacher);
                      axios.delete("http://localhost:3000/api/Photos/teacher/files/" + this.imageEdit)
                        .then(resp => {
                          console.log(resp);
                        })
                        .catch(err => console.log(err));
                      axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                        .then(res => {
                          console.log(res);
                        })
                        .catch(err => console.log(err));
                    } else {
                      const teacher = {
                        teacherId: this.teacherId,
                        fullName: this.fullName,
                        gender: this.gender,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        subject: this.subject,
                        status: this.status,
                        id: this.$route.params.id,
                      };
                      const url =
                        "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                      axios.post(url, teacher);
                      axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                        .then(res => {
                          console.log(res);
                        })
                        .catch(err => console.log(err));
                    }
                  } else {
                    const teacher = {
                      teacherId: this.teacherId,
                      fullName: this.fullName,
                      gender: this.gender,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: this.imageEdit,
                      subject: this.subject,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    const url =
                      "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                    axios.post(url, teacher);
                  }
                  setTimeout(() => {
                    this.$router.push("/teachers");
                    location.reload();
                  }, 100);
                  return 0;
                }
              }
            });
        } else if (
          this.emailEdit == this.email &&
          this.phoneEdit != this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/teachers/existsPhone?phone=" +
                this.phone
            )
            .then((response) => {
              if (response.data.bool == true) {
                alertify.alert(
                  "Thông báo",
                  "Số điện thoại đã tồn tại!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else {
                if (crypt.getAge(this.birthday) < 25) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi giáo viên nhỏ hơn 25!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 50) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi giáo viên lớn hơn 50!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
                  if(this.selectedFile != null) {
                    const fd = new FormData();
                    fd.append('image', this.selectedFile, this.selectedFile.name);
                    var start = this.selectedFile.name.lastIndexOf('.');
                    var end = this.selectedFile.length;
                    var fileName = this.teacherId + this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      const teacher = {
                        teacherId: this.teacherId,
                        fullName: this.fullName,
                        gender: this.gender,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        subject: this.subject,
                        status: this.status,
                        id: this.$route.params.id,
                      };
                      const url =
                        "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                      axios.post(url, teacher);
                      axios.delete("http://localhost:3000/api/Photos/teacher/files/" + this.imageEdit)
                        .then(resp => {
                          console.log(resp);
                        })
                        .catch(err => console.log(err));
                      axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                        .then(res => {
                          console.log(res);
                        })
                        .catch(err => console.log(err));
                    } else {
                      const teacher = {
                        teacherId: this.teacherId,
                        fullName: this.fullName,
                        gender: this.gender,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        subject: this.subject,
                        status: this.status,
                        id: this.$route.params.id,
                      };
                      const url =
                        "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                      axios.post(url, teacher);
                      axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                        .then(res => {
                          console.log(res);
                        })
                        .catch(err => console.log(err));
                    }
                  } else {
                    const teacher = {
                      teacherId: this.teacherId,
                      fullName: this.fullName,
                      gender: this.gender,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: this.imageEdit,
                      subject: this.subject,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    const url =
                      "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                    axios.post(url, teacher);
                  }
                  setTimeout(() => {
                    this.$router.push("/teachers");
                    location.reload();
                  }, 100);
                  return 0;
                }
              }
            });
        } else {
          axios
            .get(
              "http://localhost:3000/api/teachers/existsEmail?email=" +
                this.email
            )
            .then((response) => {
              if (response.data.bool == true) {
                alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                  alertify.success("Ok");
                });
              } else {
                axios
                  .get(
                    "http://localhost:3000/api/teachers/existsPhone?phone=" +
                      this.phone
                  )
                  .then((resp) => {
                    if (resp.data.bool == true) {
                      alertify.alert(
                        "Thông báo",
                        "Số điện thoại đã tồn tại!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else {
                      if (crypt.getAge(this.birthday) < 25) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi giáo viên nhỏ hơn 25!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) > 50) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi giáo viên lớn hơn 50!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else {
                        if(this.selectedFile != null) {
                          const fd = new FormData();
                          fd.append('image', this.selectedFile, this.selectedFile.name);
                          var start = this.selectedFile.name.lastIndexOf('.');
                          var end = this.selectedFile.length;
                          var fileName = this.teacherId + this.selectedFile.name.slice(start, end);
                          if (this.imageEdit != null) {
                            const teacher = {
                              teacherId: this.teacherId,
                              fullName: this.fullName,
                              gender: this.gender,
                              birthday: this.birthday,
                              phone: this.phone,
                              email: this.email,
                              image: fileName,
                              subject: this.subject,
                              status: this.status,
                              id: this.$route.params.id,
                            };
                            const url =
                              "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                            axios.post(url, teacher);
                            axios.delete("http://localhost:3000/api/Photos/teacher/files/" + this.imageEdit)
                              .then(resp => {
                                console.log(resp);
                              })
                              .catch(err => console.log(err));
                            axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                              .then(res => {
                                console.log(res);
                              })
                              .catch(err => console.log(err));
                          } else {
                            const teacher = {
                              teacherId: this.teacherId,
                              fullName: this.fullName,
                              gender: this.gender,
                              birthday: this.birthday,
                              phone: this.phone,
                              email: this.email,
                              image: fileName,
                              subject: this.subject,
                              status: this.status,
                              id: this.$route.params.id,
                            };
                            const url =
                              "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                            axios.post(url, teacher);
                            axios.post('http://localhost:3000/api/Photos/teacher/upload?filename=' + fileName, fd)
                              .then(res => {
                                console.log(res);
                              })
                              .catch(err => console.log(err));
                          }
                        } else {
                          const teacher = {
                            teacherId: this.teacherId,
                            fullName: this.fullName,
                            gender: this.gender,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            image: this.imageEdit,
                            subject: this.subject,
                            status: this.status,
                            id: this.$route.params.id,
                          };
                          const url =
                            "http://localhost:3000/api/teachers/" + teacher.id + "/replace";
                          axios.post(url, teacher);
                        }
                        setTimeout(() => {
                          this.$router.push("/teachers");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    }
                  });
              }
            });
        }
      } else {
        alertify.alert("Thông báo", "Lưu dữ liệu thất bại!", function () {
          alertify.success("Ok");
        });
      }
    },

    clearInputTeacherForm() {
      if (this.genderIsValid) {
        this.gender = 0;
      }
      if (this.fullNameIsValid) {
        this.fullName = null;
      }
      if (this.phoneIsValid) {
        this.phone = null;
      }
      if (this.emailIsValid) {
        this.email = null;
      }
      if (this.subjectIsValid) {
        this.subject = 0;
      }
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
      if (this.statusIsValid) {
        this.status = 0;
      }
    },

    toListTeacher() {
      this.$router.push("/teachers");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Chỉnh sửa Giảng Viên</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditTeacherForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Giảng Viên:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều người Giảng Viên</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
            :value="fullName" v-on:keyup="fullName = $event.target.value"
            class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="gender">Giới Tính</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="gender" name="gender"
              id="gender" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Giới Tính ---</option>
              <option v-for="gender in genders" v-bind:value="gender.id" :selected="teacher.gender == gender.id">{{ gender.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
            :value="birthday" v-on:keyup="birthday = $event.target.value"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="subject">Bộ Môn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="subject" name="subject"
              id="subject" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Bộ Môn ---</option>
              <option v-for="subject in subjects" v-bind:value="subject.id" :selected="teacher.subject == subject.id">{{ subject.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
            <label class="text-danger">*</label>
            <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
              v-model="phone" :value="phone" v-on:keyup="phone = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
              style="margin-top: -5px;">
            <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
              định dạng</span>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="email">Email</label>
            <label class="text-danger">*</label>
            <input v-model="email" name="email" id="email" type="text" :title="titleEmail"
            :value="email" v-on:keyup="email = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Địa chỉ email..."
              style="margin-top: -5px;">
            <span v-if="checkFormatEmail" class="text-danger text-size-13px">Địa chỉ email không hợp
              lệ</span>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id" :selected="teacher.status == status.id">{{ status.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editTeacherFormIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormTeacher" @click="clearInputTeacherForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListTeacher">
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