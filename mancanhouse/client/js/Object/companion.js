const Companion = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListCompanion = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Người Đồng hành",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Người Đồng hành",
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Ngừng hoạt động" },
      ],
      companions: [],
      companion: {},
      positions: [],
      birthdayFormat: null,
      groupCommunities: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/companions").then((response) => {
      this.companions = response.data;
    });
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/groupCommunities").then((response) => {
      this.groupCommunities = response.data;
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
    getDetailCompanion(companion) {
      this.companion = companion;
      this.birthdayFormat = this.formatDate(this.companion.birthday);
    },

    getDataCompanionUpdate(companion) {
      this.$router.push({
        name: "editCompanion",
        params: { id: companion.id },
      });
    },

    deleteDataCompanion(id) {
      axios
        .delete("http://localhost:3000/api/companions/" + id)
        .then((response) => {
          console.log(response);
          this.companions.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/companions");
            location.reload();
          }, 10);
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <div class="row">
        <div class="col-md-4">
          <h5 class="m-0 font-weight-bold text-primary">Danh sách Người Đồng Hành</h5>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addCompanion' }">
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
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Chức Vụ</th>
              <th>Nhóm Cộng Đoàn</th>
              <th>Quê Quán</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Họ và Tên</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Chức Vụ</th>
              <th>Nhóm Cộng Đoàn</th>
              <th>Quê Quán</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(companion, index) in companions" :key="companion.id">
              <th>{{ index + 1 }}</th>
              <td>{{ companion.fullName }}</td>
              <td>{{ companion.phone }}</td>
              <td>{{ companion.email }}</td>
              <td v-for="department in positions" v-if="department.id == companion.position">{{ department.positionType }}-{{ department.name }}</td>
              <td v-for="grCom in groupCommunities" v-if="grCom.id == companion.groupCommunity">{{ grCom.name }}</td>
              <td>{{ companion.homeland }}</td>
              <td v-if="companion.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="companion.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td>
                <div class="row" style="margin-left:-25px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailCompanion(companion)"
                      data-target="#detailCompanionModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonEdit" @click="getDataCompanionUpdate(companion)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -6px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailCompanion(companion)"
                      data-target="#deleteCompanionModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -12px;">
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
    <div id="deleteCompanionModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Người Đồng Hành</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Người Đồng hành {{ companion.companionId }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataCompanion(companion.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="detailCompanionModal" class="modal modal-edu-general default-popup-PrimaryModal fade rounded"
      role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Chi tiết Người Đồng Hành</h4>
            <div class="modal-close-area modal-close-df bg-danger"
              style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4 text-center">
                <img class="img-fluid img-thumbnail rounded-circle" src="../images/user_03.jpg" width="100px"
                  height="100px" />
                <p class="font-weight-bold" style="padding-top: 5px;">{{ companion.companionId }}</p>
              </div>
              <div class="col-sm-8 mt-3">
                <p class="text-uppercase font-weight-bold" style="font-size: larger;">{{ companion.christianName }} {{ companion.fullName }}
                </p>
                <div style="margin-left: 12px;">
                <span class="font-weight-bold">Ngày
                  Sinh:</span><span> &nbsp;{{ birthdayFormat }}</span><br>
                <span class="font-weight-bold ">SĐT:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ companion.phone}}</span><br>
                <span class="font-weight-bold ">Email:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{{ companion.email }}</span><br>
                <span class="font-weight-bold ">Chức Vụ:</span>
                &nbsp;<span v-for="department in positions" v-if="department.id == companion.position"> 
                &nbsp;&nbsp;{{ department.positionType}} - {{ department.name }}</span><br>
                <span class="font-weight-bold ">Nhóm Cộng Đoàn:</span>
                <span v-for="grCom in groupCommunities" v-if="grCom.id == companion.groupCommunity"> 
                &nbsp;{{ grCom.name }}</span><br>
                <span class="font-weight-bold ">Quê Quán:</span>
                <span> &nbsp;&nbsp;&nbsp;{{ companion.homeland }}</span><br>
                <span class="font-weight-bold ">Trạng Thái:&nbsp;&nbsp;</span>
                <span v-if="companion.status == 1"> 
                  <i class="fas fa-toggle-on fa-lg text-success"></i>
                </span>
                <span v-if="companion.status == 2"> 
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

const AddCompanion = {
  data() {
    return {
      id: 0,
      companionId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      email: null,
      image: null,
      groupCommunity: 0,
      position: 0,
      homeland: null,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleChristianName: "Nhập thông tin tên Thánh",
      titleFullName: "Nhập thông tin họ và tên",
      titlePhone: "Nhập thông tin số điện thoại",
      titleEmail: "Nhập thông tin địa chỉ email",
      titleHomeland: "Nhập thông tin quê quán",
      checkEmail: false,
      checkPhone: false,
      status: 0,
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      positions: [],
      groupCommunities: [],
      companions: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/groupCommunities").then((response) => {
      this.groupCommunities = response.data;
    });
    axios.get("http://localhost:3000/api/companions").then((response) => {
      this.companions = response.data;
    });
  },
  computed: {
    groupCommunityIsValid() {
      return !!this.groupCommunity;
    },

    statusIsValid() {
      return !!this.status;
    },

    christianNameIsValid() {
      return this.christianName;
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

    positionIsValid() {
      return this.position;
    },

    homelandIsValid() {
      return this.homeland;
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

    addCompanionFormIsValid() {
      return (
        this.christianNameIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.positionIsValid &&
        this.homelandIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail &&
        this.statusIsValid &&
        this.groupCommunityIsValid
      );
    },

    refreshFormCompanion() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid ||
        this.groupCommunityIsValid
      );
    },
  },
  methods: {
    submitAddCompanionForm() {
      if (this.addCompanionFormIsValid) {
        let lengthCompanions = 0;
        lengthCompanions = this.companions.length;
        if (lengthCompanions > -1 && lengthCompanions < 9) {
          this.companionId = "DH00" + (lengthCompanions + 1);
        }
        if (lengthCompanions > 8 && lengthCompanions < 99) {
          this.companionId = "DH0" + (lengthCompanions + 1);
        }
        if (lengthCompanions > 98 && lengthCompanions < 999) {
          this.companionId = "DH" + (lengthCompanions + 1);
        }
        axios
          .get(
            "http://localhost:3000/api/companions/existsEmail?email=" +
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
                  "http://localhost:3000/api/companions/existsPhone?phone=" +
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
                  } else if(crypt.getAge(this.birthday) < 28){
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của người đồng hành nhỏ hơn 28!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else if(crypt.getAge(this.birthday) > 60){
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của người đồng hành lớn hơn 60!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else {
                    const companion = {
                      companionId: this.companionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: this.image,
                      position: this.position,
                      groupCommunity: this.groupCommunity,
                      homeland: this.homeland,
                      status: this.status,
                    };
                    axios
                      .get(
                        "http://localhost:3000/api/departments/getDepartment?id=" +
                          this.position
                      )
                      .then((response) => {
                        let role = 0;
                        if (
                          response.data.department.positionType ==
                            "Trưởng Phòng" ||
                          response.data.department.positionType ==
                            "Trưởng phòng" ||
                          response.data.department.positionType ==
                            "trưởng phòng"
                        ) {
                          role = 8;
                        } else {
                          role = 9;
                        }
                        const accountCompanion = {
                          userId: this.companionId,
                          username: this.email,
                          password: crypt.encrypt(this.phone),
                          role: role,
                          status: this.status,
                        };
                        const url = `http://localhost:3000/api/accounts`;
                        axios.post(url, accountCompanion);
                        const url_1 = `http://localhost:3000/api/companions`;
                        axios.post(url_1, companion);
                      });
                    setTimeout(() => {
                      this.$router.push("/companions");
                      location.reload();
                    }, 100);
                    return 0;
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

    clearInputCompanionForm() {
      if (this.groupCommunityIsValid) {
        this.groupCommunity = 0;
      }
      if (this.christianNameIsValid) {
        this.christianName = null;
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
      if (this.positionIsValid) {
        this.position = 0;
      }
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
      if (this.homelandIsValid) {
        this.homeland = null;
      }
      if (this.statusIsValid) {
        this.status = 0;
      }
    },

    toListCompanion() {
      this.$router.push("/companions");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Thêm Người Đồng Hành</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Người Đồng Hành:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Người Đồng Hành</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
              class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
            <label class="text-danger">*</label>
            <input type="text" :title="titleChristianName" name="christianName" id="christianName"
              v-model="christianName" class="form-control  text-size-13px " placeholder="Nhập Tên Thánh..."
              style="margin-top: -5px;">
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
            <label class="text-size-15px font-weight-bold col-form-label" for="position">Chức Vụ</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="position" name="position"
              id="position" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Chức Vụ ---</option>
              <option v-for="department in positions" v-bind:value="department.id" v-if="department.name == 'Đồng Hành' 
              || department.name == 'Đồng hành' || department.name == 'đồng hành'">{{ department.positionType }} - {{ department.name }}
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
            <label class="text-size-15px font-weight-bold col-form-label" for="groupCommunity">Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="groupCommunity" name="groupCommunity" id="groupCommunity"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Nhóm Cộng Đoàn ---</option>
              <option v-for="grCom in groupCommunities" v-bind:value="grCom.id">{{ grCom.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="homeland">Quê Quán</label>
            <label class="text-danger">*</label>
            <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
              class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
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
            <input type="file" id="image" v-model="image" name="image" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addCompanionFormIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormCompanion" @click="clearInputCompanionForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListCompanion">
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

const EditCompanion = {
  data() {
    return {
      id: 0,
      companionId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      phoneEdit: null,
      email: null,
      emailEdit: null,
      image: null,
      groupCommunity: 0,
      position: 0,
      homeland: null,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleChristianName: "Nhập thông tin tên Thánh",
      titleFullName: "Nhập thông tin họ và tên",
      titlePhone: "Nhập thông tin số điện thoại",
      titleEmail: "Nhập thông tin địa chỉ email",
      titleHomeland: "Nhập thông tin quê quán",
      checkEmail: false,
      checkPhone: false,
      status: 0,
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      positions: [],
      groupCommunities: [],
      companion: {},
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/groupCommunities").then((response) => {
      this.groupCommunities = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/companions/getCompanion?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.companionId = response.data.companion.companionId;
        this.christianName = response.data.companion.christianName;
        this.fullName = response.data.companion.fullName;
        this.birthday = crypt.formatDate(response.data.companion.birthday);
        this.position = response.data.companion.position;
        this.homeland = response.data.companion.homeland;
        this.phone = response.data.companion.phone;
        this.phoneEdit = response.data.companion.phone;
        this.email = response.data.companion.email;
        this.emailEdit = response.data.companion.email;
        this.status = response.data.companion.status;
        this.groupCommunity = response.data.companion.groupCommunity;
      });
  },
  computed: {
    groupCommunityIsValid() {
      return !!this.groupCommunity;
    },

    statusIsValid() {
      return !!this.status;
    },

    christianNameIsValid() {
      return this.christianName;
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

    positionIsValid() {
      return this.position;
    },

    homelandIsValid() {
      return this.homeland;
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

    editCompanionFormIsValid() {
      return (
        this.christianNameIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.positionIsValid &&
        this.homelandIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail &&
        this.statusIsValid &&
        this.groupCommunityIsValid
      );
    },

    refreshFormCompanion() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid ||
        this.groupCommunityIsValid
      );
    },
  },
  methods: {
    submitEditCompanionForm() {
      if (this.editCompanionFormIsValid) {
        if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
          if(crypt.getAge(this.birthday) < 28){
            alertify.alert(
              "Thông báo",
              "Tuổi của người đồng hành nhỏ hơn 28!",
              function () {
                alertify.success("Ok");
              }
            );
          } else if(crypt.getAge(this.birthday) > 60){
            alertify.alert(
              "Thông báo",
              "Tuổi của người đồng hành lớn hơn 60!",
              function () {
                alertify.success("Ok");
              }
            );
          } else{
            const companion = {
              companionId: this.companionId,
              christianName: this.christianName,
              fullName: this.fullName,
              birthday: this.birthday,
              position: this.position,
              homeland: this.homeland,
              phone: this.phone,
              email: this.email,
              status: this.status,
              groupCommunity: this.groupCommunity,
              id: this.$route.params.id,
            };
            const url =
              "http://localhost:3000/api/companions/" + companion.id + "/replace";
            axios.post(url, companion);
            setTimeout(() => {
              this.$router.push("/companions");
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
              "http://localhost:3000/api/companions/existsEmail?email=" +
                this.email
            )
            .then((response) => {
              if (response.data.bool == true) {
                alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                  alertify.success("Ok");
                });
              } else if(crypt.getAge(this.birthday) < 28){
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if(crypt.getAge(this.birthday) > 60){
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành lớn hơn 60!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else {
                const companion = {
                  companionId: this.companionId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  position: this.position,
                  homeland: this.homeland,
                  phone: this.phone,
                  email: this.email,
                  status: this.status,
                  groupCommunity: this.groupCommunity,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/companions/" +
                  companion.id +
                  "/replace";
                axios.post(url, companion);
                setTimeout(() => {
                  this.$router.push("/companions");
                  location.reload();
                }, 100);
                return 0;
              }
            });
        } else if (
          this.emailEdit == this.email &&
          this.phoneEdit != this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/companions/existsPhone?phone=" +
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
              } else if(crypt.getAge(this.birthday) < 28){
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if(crypt.getAge(this.birthday) > 60){
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành lớn hơn 60!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else {
                const companion = {
                  companionId: this.companionId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  position: this.position,
                  homeland: this.homeland,
                  phone: this.phone,
                  email: this.email,
                  status: this.status,
                  groupCommunity: this.groupCommunity,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/companions/" +
                  companion.id +
                  "/replace";
                axios.post(url, companion);
                setTimeout(() => {
                  this.$router.push("/companions");
                  location.reload();
                }, 100);
                return 0;
              }
            });
        } else {
          axios
            .get(
              "http://localhost:3000/api/companions/existsEmail?email=" +
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
                    "http://localhost:3000/api/companions/existsPhone?phone=" +
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
                    } else if(crypt.getAge(this.birthday) < 28){
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của người đồng hành nhỏ hơn 28!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else if(crypt.getAge(this.birthday) > 60){
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của người đồng hành lớn hơn 60!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else {
                      const companion = {
                        companionId: this.companionId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        position: this.position,
                        homeland: this.homeland,
                        phone: this.phone,
                        email: this.email,
                        status: this.status,
                        groupCommunity: this.groupCommunity,
                        id: this.$route.params.id,
                      };
                      const url =
                        "http://localhost:3000/api/companions/" +
                        companion.id +
                        "/replace";
                      axios.post(url, companion);
                      setTimeout(() => {
                        this.$router.push("/companions");
                        location.reload();
                      }, 100);
                      return 0;
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

    clearInputCompanionForm() {
      if (this.groupCommunityIsValid) {
        this.groupCommunity = 0;
      }
      if (this.christianNameIsValid) {
        this.christianName = null;
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
      if (this.positionIsValid) {
        this.position = 0;
      }
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
      if (this.homelandIsValid) {
        this.homeland = null;
      }
      if (this.statusIsValid) {
        this.status = 0;
      }
    },

    toListCompanion() {
      this.$router.push("/companions");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Chỉnh sửa Người Đồng Hành</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Người Đồng Hành:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Người Đồng Hành</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
            :value="fullName" v-on:keyup="fullName = $event.target.value"
            class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
            <label class="text-danger">*</label>
            <input type="text" :title="titleChristianName" name="christianName" id="christianName"
              v-model="christianName" :value="christianName" v-on:keyup="christianName = $event.target.value" 
              class="form-control  text-size-13px " placeholder="Nhập Tên Thánh..."
              style="margin-top: -5px;">
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
            <label class="text-size-15px font-weight-bold col-form-label" for="position">Chức Vụ</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="position" name="position"
              id="position" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Chức Vụ ---</option>
              <option v-for="department in positions" v-bind:value="department.id" 
              v-if="department.name == 'Đồng Hành' || department.name == 'Đồng hành' || department.name == 'đồng hành'"
              :selected="companion.position == department.id">{{ department.positionType }} - {{ department.name }}
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
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="groupCommunity">Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="groupCommunity" name="groupCommunity" id="groupCommunity"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Nhóm Cộng Đoàn ---</option>
              <option v-for="grCom in groupCommunities" v-bind:value="grCom.id" :selected="companion.groupCommunity == grCom.id">{{ grCom.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="homeland">Quê Quán</label>
            <label class="text-danger">*</label>
            <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
            :value="homeland" v-on:keyup="homeland = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id" :selected="companion.status == status.id">{{ status.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" v-model="image" name="image" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editCompanionFormIsValid" type="submit"
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormCompanion" @click="clearInputCompanionForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListCompanion">
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