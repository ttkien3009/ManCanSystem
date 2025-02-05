const SpiritualGuide = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListSpiritualGuide = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Người Linh hướng",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Người Linh hướng",
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Ngừng hoạt động" },
      ],
      spiritualGuides: [],
      spiritualGuide: {},
      positions: [],
      birthdayFormat: null,
      groupCommunities: [],
      image: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/spiritualGuides").then((response) => {
      this.spiritualGuides = response.data;
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
    getDetailSpiritualGuide(spiritualGuide) {
      this.spiritualGuide = spiritualGuide;
      this.image =
        `
      <img class="img-fluid img-thumbnail rounded-circle" src="../api/Photos/spiritualGuide/download/` +
        this.spiritualGuide.image +
        `" width="100px"
      height="100px" alt="spiritualGuide-image"/>
      `;
      this.birthdayFormat = this.formatDate(this.spiritualGuide.birthday);
    },

    getDataSpiritualGuideUpdate(spiritualGuide) {
      this.$router.push({
        name: "editSpiritualGuide",
        params: { id: spiritualGuide.id },
      });
    },

    deleteDataSpiritualGuide(spiritualGuide) {
      axios
        .delete(
          "http://localhost:3000/api/spiritualGuides/" + spiritualGuide.id
        )
        .then((response) => {
          console.log(response);
          this.spiritualGuides.splice(spiritualGuide.id, 1);
        });
      if (spiritualGuide.position == 8) {
        axios
          .get(
            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
              spiritualGuide.id +
              "&filter[where][and][1][role]=6"
          )
          .then((resp) => {
            axios
              .delete("http://localhost:3000/api/accounts/" + resp.data[0].id)
              .then((respSprt) => {
                setTimeout(() => {
                  location.reload();
                }, 10);
              });
          });
      } else if (spiritualGuide.position == 9) {
        axios
          .get(
            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
              spiritualGuide.id +
              "&filter[where][and][1][role]=7"
          )
          .then((resp) => {
            axios
              .delete("http://localhost:3000/api/accounts/" + resp.data[0].id)
              .then((respCom) => {
                setTimeout(() => {
                  location.reload();
                }, 10);
              });
          });
      }
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Người Linh Hướng</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addSpiritualGuide' }">
            <button :title="titleButtonAdd" class="btn rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:14px;">
              <i class="fas fa-plus"></i>
              &nbsp;Thêm
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <hr style="height:1px;color:lightgray;background-color:lightgray">
      <div class="table-responsive" style="margin-top:-8px">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và Tên</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Nhóm Cộng Đoàn</th>
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
              <th>Nhóm Cộng Đoàn</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(spiritualGuide, index) in spiritualGuides" :key="spiritualGuide.id">
              <th>{{ index + 1 }}</th>
              <td>{{ spiritualGuide.fullName }}</td>
              <td>{{ spiritualGuide.phone }}</td>
              <td>{{ spiritualGuide.email }}</td>
              <td v-for="grCom in groupCommunities" v-if="grCom.id == spiritualGuide.groupCommunity">{{ grCom.name }}</td>
              <td v-if="spiritualGuide.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="spiritualGuide.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td>
                <div class="row" style="margin-left:-20px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailSpiritualGuide(spiritualGuide)"
                      data-target="#detailSpiritualGuideModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button v-show="spiritualGuide.status == 1" :title="titleButtonEdit" @click="getDataSpiritualGuideUpdate(spiritualGuide)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -17px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailSpiritualGuide(spiritualGuide)"
                      data-target="#deleteSpiritualGuideModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -33px;">
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
    <div id="deleteSpiritualGuideModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Người Linh Hướng</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Người Linh hướng {{ spiritualGuide.spiritualGuideId }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataSpiritualGuide(spiritualGuide)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="detailSpiritualGuideModal" class="modal modal-edu-general default-popup-PrimaryModal fade rounded"
      role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Chi tiết Người Linh Hướng</h4>
            <div class="modal-close-area modal-close-df bg-danger"
              style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4 text-center" v-if="spiritualGuide.image != null">
                <div v-html="image"></div>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ spiritualGuide.spiritualGuideId }}</p>
              </div>
              <div class="col-sm-4 text-center" v-if="spiritualGuide.image == null">
                <img class="img-fluid img-thumbnail rounded-circle" src="../images/default_image.png" width="100px"
                  height="100px" alt="spiritualGuide-image"/>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ spiritualGuide.spiritualGuideId }}</p>
              </div>
              <div class="col-sm-8 mt-3">
                <p class="text-uppercase font-weight-bold" style="font-size: larger;">{{ spiritualGuide.christianName }} {{ spiritualGuide.fullName }}
                </p>
                <div style="margin-left: 12px;">
                <span class="font-weight-bold">Ngày
                  Sinh:</span><span> &nbsp;{{ birthdayFormat }}</span><br>
                <span class="font-weight-bold ">SĐT:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ spiritualGuide.phone}}</span><br>
                <span class="font-weight-bold ">Email:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{{ spiritualGuide.email }}</span><br>
                <span class="font-weight-bold ">Chức Vụ:</span>
                &nbsp;<span v-for="department in positions" v-if="department.id == spiritualGuide.position"> 
                &nbsp;&nbsp;{{ department.positionType}} - {{ department.name }}</span><br>
                <span class="font-weight-bold ">Nhóm Cộng Đoàn:</span>
                <span v-for="grCom in groupCommunities" v-if="grCom.id == spiritualGuide.groupCommunity"> 
                &nbsp;{{ grCom.name }}</span><br>
                <span class="font-weight-bold ">Trạng Thái:&nbsp;&nbsp;</span>
                <span v-if="spiritualGuide.status == 1"> 
                  <i class="fas fa-toggle-on fa-lg text-success"></i>
                </span>
                <span v-if="spiritualGuide.status == 2"> 
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

const AddSpiritualGuide = {
  data() {
    return {
      id: 0,
      spiritualGuideId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      email: null,
      image: null,
      groupCommunity: 0,
      position: 0,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleChristianName: "Nhập thông tin tên Thánh",
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
      positions: [],
      groupCommunities: [],
      spiritualGuides: [],
      selectedFile: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/groupCommunities").then((response) => {
      this.groupCommunities = response.data;
    });
    axios.get("http://localhost:3000/api/spiritualGuides").then((response) => {
      this.spiritualGuides = response.data;
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

    addSpiritualGuideFormIsValid() {
      return (
        this.christianNameIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.positionIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail &&
        this.statusIsValid &&
        this.groupCommunityIsValid
      );
    },

    refreshFormSpiritualGuide() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid ||
        this.groupCommunityIsValid
      );
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitAddSpiritualGuideForm() {
      if (this.addSpiritualGuideFormIsValid) {
        let lengthSpiritualGuides = this.spiritualGuides.length;
        if (lengthSpiritualGuides == 0) {
          this.spiritualGuideId = "LH001";
        } else {
          let currentId = this.spiritualGuides[lengthSpiritualGuides - 1].id;
          if (currentId > -1 && currentId < 9) {
            this.spiritualGuideId = "LH00" + (currentId + 1);
          }
          if (currentId > 8 && currentId < 99) {
            this.spiritualGuideId = "LH0" + (currentId + 1);
          }
          if (currentId > 98 && currentId < 999) {
            this.spiritualGuideId = "LH" + (currentId + 1);
          }
        }
        axios
          .get(
            "http://localhost:3000/api/spiritualGuides/existsEmail?email=" +
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
                  "http://localhost:3000/api/spiritualGuides/existsPhone?phone=" +
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
                  } else if (crypt.getAge(this.birthday) < 28) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của người linh hướng nhỏ hơn 28!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else if (crypt.getAge(this.birthday) > 60) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của người linh hướng lớn hơn 60!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else {
                    var fileName = null;
                    const fd = new FormData();
                    if (this.selectedFile != null) {
                      fd.append(
                        "image",
                        this.selectedFile,
                        this.selectedFile.name
                      );
                      var start = this.selectedFile.name.lastIndexOf(".");
                      var end = this.selectedFile.length;
                      fileName =
                        this.spiritualGuideId +
                        this.selectedFile.name.slice(start, end);
                    }
                    const spiritualGuide = {
                      spiritualGuideId: this.spiritualGuideId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      groupCommunity: this.groupCommunity,
                      position: this.position,
                      image: fileName,
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
                          role = 6;
                        } else {
                          role = 7;
                        }
                        const url_1 = `http://localhost:3000/api/spiritualGuides`;
                        axios.post(url_1, spiritualGuide);
                        axios
                          .get(
                            "http://localhost:3000/api/spiritualGuides/findOne?filter[where][email]=" +
                              this.email
                          )
                          .then((resp) => {
                            const account_spiritualGuide = {
                              userId: resp.data.spiritualGuideId,
                              username: resp.data.email,
                              password: crypt.encrypt(resp.data.phone),
                              role: role,
                              status: resp.data.status,
                              idTable: resp.data.id,
                            };
                            const url = "http://localhost:3000/api/accounts";
                            axios.post(url, account_spiritualGuide);
                            if (this.selectedFile != null) {
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                                    fileName,
                                  fd
                                )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.log(err));
                            }
                          });
                      });
                    setTimeout(() => {
                      this.$router.push("/spiritualGuides");
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

    clearInputSpiritualGuideForm() {
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
      if (this.statusIsValid) {
        this.status = 0;
      }
    },

    toListSpiritualGuide() {
      this.$router.push("/spiritualGuides");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Người Linh Hướng</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddSpiritualGuideForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Người Linh Hướng:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Người Linh Hướng</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
              class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
            <label class="text-danger">*</label>
            <input type="text" :title="titleChristianName" name="christianName" id="christianName"
              v-model="christianName" class="form-control  text-size-13px " placeholder="Nhập Tên Thánh..."
              style="margin-top: -5px;">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="position">Chức Vụ</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="position" name="position"
              id="position" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Chức Vụ ---</option>
              <option v-for="department in positions" v-bind:value="department.id"
              v-if="department.name == 'Linh Hướng' 
              || department.name == 'Linh hướng' || department.name == 'linh hướng'">{{ department.positionType }} - {{ department.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
            <label class="text-danger">*</label>
            <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
              v-model="phone" class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
              style="margin-top: -5px;">
            <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
              định dạng</span>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="email">Email</label>
            <label class="text-danger">*</label>
            <input v-model="email" name="email" id="email" type="text" :title="titleEmail"
              class="form-control  text-size-13px " placeholder="Nhập Địa chỉ email..."
              style="margin-top: -5px;">
            <span v-if="checkFormatEmail" class="text-danger text-size-13px">Địa chỉ email không hợp
              lệ</span>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="groupCommunity">Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="groupCommunity" name="groupCommunity" id="groupCommunity"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Nhóm Cộng Đoàn ---</option>
              <option v-for="grCom in groupCommunities" v-bind:value="grCom.id">{{ grCom.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id">{{ status.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addSpiritualGuideFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormSpiritualGuide" @click="clearInputSpiritualGuideForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListSpiritualGuide">
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

const EditSpiritualGuide = {
  data() {
    return {
      id: 0,
      spiritualGuideId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      phoneEdit: null,
      email: null,
      emailEdit: null,
      image: null,
      imageEdit: null,
      groupCommunity: 0,
      position: 0,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleChristianName: "Nhập thông tin tên Thánh",
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
      positions: [],
      groupCommunities: [],
      spiritualGuide: {},
      selectedFile: null,
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
        "http://localhost:3000/api/spiritualGuides/getSpiritualGuide?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.spiritualGuideId = response.data.spiritualGuide.spiritualGuideId;
        this.christianName = response.data.spiritualGuide.christianName;
        this.fullName = response.data.spiritualGuide.fullName;
        this.birthday = crypt.formatDate(response.data.spiritualGuide.birthday);
        this.phone = response.data.spiritualGuide.phone;
        this.phoneEdit = response.data.spiritualGuide.phone;
        this.email = response.data.spiritualGuide.email;
        this.emailEdit = response.data.spiritualGuide.email;
        this.groupCommunity = response.data.spiritualGuide.groupCommunity;
        this.position = response.data.spiritualGuide.position;
        this.imageEdit = response.data.spiritualGuide.image;
        this.status = response.data.spiritualGuide.status;
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

    editSpiritualGuideFormIsValid() {
      return (
        this.christianNameIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.positionIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail &&
        this.statusIsValid &&
        this.groupCommunityIsValid
      );
    },

    refreshFormSpiritualGuide() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid ||
        this.groupCommunityIsValid
      );
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitEditSpiritualGuideForm() {
      if (this.editSpiritualGuideFormIsValid) {
        if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
          if (crypt.getAge(this.birthday) < 28) {
            alertify.alert(
              "Thông báo",
              "Tuổi của người linh hướng nhỏ hơn 28!",
              function () {
                alertify.success("Ok");
              }
            );
          } else if (crypt.getAge(this.birthday) > 60) {
            alertify.alert(
              "Thông báo",
              "Tuổi của người linh hướng lớn hơn 60!",
              function () {
                alertify.success("Ok");
              }
            );
          } else {
            if (this.selectedFile != null) {
              const fd = new FormData();
              fd.append("image", this.selectedFile, this.selectedFile.name);
              var start = this.selectedFile.name.lastIndexOf(".");
              var end = this.selectedFile.length;
              var fileName =
                this.spiritualGuideId +
                this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const spiritualGuide = {
                  spiritualGuideId: this.spiritualGuideId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  groupCommunity: this.groupCommunity,
                  position: this.position,
                  image: fileName,
                  status: this.status,
                  id: this.$route.params.id,
                };
                if (spiritualGuide.status == 2) {
                  if (spiritualGuide.position == 8) {
                    axios
                      .get(
                        "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                          spiritualGuide.id +
                          "&filter[where][and][1][role]=6"
                      )
                      .then((resp) => {
                        const account = {
                          userId: resp.data[0].userId,
                          username: resp.data[0].username,
                          password: resp.data[0].password,
                          role: resp.data[0].role,
                          status: 2,
                          idTable: resp.data[0].idTable,
                          id: resp.data[0].id,
                        };
                        const url_5 =
                          "http://localhost:3000/api/accounts/" +
                          account.id +
                          "/replace";
                        axios.post(url_5, account);
                      });
                  } else if (spiritualGuide.position == 9) {
                    axios
                      .get(
                        "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                          spiritualGuide.id +
                          "&filter[where][and][1][role]=7"
                      )
                      .then((resp) => {
                        const account = {
                          userId: resp.data[0].userId,
                          username: resp.data[0].username,
                          password: resp.data[0].password,
                          role: resp.data[0].role,
                          status: 2,
                          idTable: resp.data[0].idTable,
                          id: resp.data[0].id,
                        };
                        const url_5 =
                          "http://localhost:3000/api/accounts/" +
                          account.id +
                          "/replace";
                        axios.post(url_5, account);
                      });
                  }
                }
                const url =
                  "http://localhost:3000/api/spiritualGuides/" +
                  spiritualGuide.id +
                  "/replace";
                axios.post(url, spiritualGuide);
                axios
                  .delete(
                    "http://localhost:3000/api/Photos/spiritualGuide/files/" +
                      this.imageEdit
                  )
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => console.log(err));
                axios
                  .post(
                    "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              } else {
                const spiritualGuide = {
                  spiritualGuideId: this.spiritualGuideId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  groupCommunity: this.groupCommunity,
                  position: this.position,
                  image: fileName,
                  status: this.status,
                  id: this.$route.params.id,
                };
                if (spiritualGuide.status == 2) {
                  if (spiritualGuide.position == 8) {
                    axios
                      .get(
                        "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                          spiritualGuide.id +
                          "&filter[where][and][1][role]=6"
                      )
                      .then((resp) => {
                        const account = {
                          userId: resp.data[0].userId,
                          username: resp.data[0].username,
                          password: resp.data[0].password,
                          role: resp.data[0].role,
                          status: 2,
                          idTable: resp.data[0].idTable,
                          id: resp.data[0].id,
                        };
                        const url_5 =
                          "http://localhost:3000/api/accounts/" +
                          account.id +
                          "/replace";
                        axios.post(url_5, account);
                      });
                  } else if (spiritualGuide.position == 9) {
                    axios
                      .get(
                        "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                          spiritualGuide.id +
                          "&filter[where][and][1][role]=7"
                      )
                      .then((resp) => {
                        const account = {
                          userId: resp.data[0].userId,
                          username: resp.data[0].username,
                          password: resp.data[0].password,
                          role: resp.data[0].role,
                          status: 2,
                          idTable: resp.data[0].idTable,
                          id: resp.data[0].id,
                        };
                        const url_5 =
                          "http://localhost:3000/api/accounts/" +
                          account.id +
                          "/replace";
                        axios.post(url_5, account);
                      });
                  }
                }
                const url =
                  "http://localhost:3000/api/spiritualGuides/" +
                  spiritualGuide.id +
                  "/replace";
                axios.post(url, spiritualGuide);
                axios
                  .post(
                    "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              }
            } else {
              const spiritualGuide = {
                spiritualGuideId: this.spiritualGuideId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                phone: this.phone,
                email: this.email,
                groupCommunity: this.groupCommunity,
                position: this.position,
                image: this.imageEdit,
                status: this.status,
                id: this.$route.params.id,
              };
              if (spiritualGuide.status == 2) {
                if (spiritualGuide.position == 8) {
                  axios
                    .get(
                      "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                        spiritualGuide.id +
                        "&filter[where][and][1][role]=6"
                    )
                    .then((resp) => {
                      const account = {
                        userId: resp.data[0].userId,
                        username: resp.data[0].username,
                        password: resp.data[0].password,
                        role: resp.data[0].role,
                        status: 2,
                        idTable: resp.data[0].idTable,
                        id: resp.data[0].id,
                      };
                      const url_5 =
                        "http://localhost:3000/api/accounts/" +
                        account.id +
                        "/replace";
                      axios.post(url_5, account);
                    });
                } else if (spiritualGuide.position == 9) {
                  axios
                    .get(
                      "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                        spiritualGuide.id +
                        "&filter[where][and][1][role]=7"
                    )
                    .then((resp) => {
                      const account = {
                        userId: resp.data[0].userId,
                        username: resp.data[0].username,
                        password: resp.data[0].password,
                        role: resp.data[0].role,
                        status: 2,
                        idTable: resp.data[0].idTable,
                        id: resp.data[0].id,
                      };
                      const url_5 =
                        "http://localhost:3000/api/accounts/" +
                        account.id +
                        "/replace";
                      axios.post(url_5, account);
                    });
                }
              }
              const url =
                "http://localhost:3000/api/spiritualGuides/" +
                spiritualGuide.id +
                "/replace";
              axios.post(url, spiritualGuide);
            }
            setTimeout(() => {
              this.$router.push("/spiritualGuides");
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
              "http://localhost:3000/api/spiritualGuides/existsEmail?email=" +
                this.email
            )
            .then((response) => {
              if (response.data.bool == true) {
                alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                  alertify.success("Ok");
                });
              } else if (crypt.getAge(this.birthday) < 28) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người linh hướng nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 60) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người linh hướng lớn hơn 60!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else {
                if (this.selectedFile != null) {
                  const fd = new FormData();
                  fd.append("image", this.selectedFile, this.selectedFile.name);
                  var start = this.selectedFile.name.lastIndexOf(".");
                  var end = this.selectedFile.length;
                  var fileName =
                    this.spiritualGuideId +
                    this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const spiritualGuide = {
                      spiritualGuideId: this.spiritualGuideId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      groupCommunity: this.groupCommunity,
                      position: this.position,
                      image: fileName,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    if (spiritualGuide.status == 2) {
                      if (spiritualGuide.position == 8) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=6"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      } else if (spiritualGuide.position == 9) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=7"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      }
                    }
                    const url =
                      "http://localhost:3000/api/spiritualGuides/" +
                      spiritualGuide.id +
                      "/replace";
                    axios.post(url, spiritualGuide);
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/spiritualGuide/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    const spiritualGuide = {
                      spiritualGuideId: this.spiritualGuideId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      groupCommunity: this.groupCommunity,
                      position: this.position,
                      image: fileName,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    if (spiritualGuide.status == 2) {
                      if (spiritualGuide.position == 8) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=6"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      } else if (spiritualGuide.position == 9) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=7"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      }
                    }
                    const url =
                      "http://localhost:3000/api/spiritualGuides/" +
                      spiritualGuide.id +
                      "/replace";
                    axios.post(url, spiritualGuide);
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  const spiritualGuide = {
                    spiritualGuideId: this.spiritualGuideId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    groupCommunity: this.groupCommunity,
                    position: this.position,
                    image: this.imageEdit,
                    status: this.status,
                    id: this.$route.params.id,
                  };
                  if (spiritualGuide.status == 2) {
                    if (spiritualGuide.position == 8) {
                      axios
                        .get(
                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                            spiritualGuide.id +
                            "&filter[where][and][1][role]=6"
                        )
                        .then((resp) => {
                          const account = {
                            userId: resp.data[0].userId,
                            username: resp.data[0].username,
                            password: resp.data[0].password,
                            role: resp.data[0].role,
                            status: 2,
                            idTable: resp.data[0].idTable,
                            id: resp.data[0].id,
                          };
                          const url_5 =
                            "http://localhost:3000/api/accounts/" +
                            account.id +
                            "/replace";
                          axios.post(url_5, account);
                        });
                    } else if (spiritualGuide.position == 9) {
                      axios
                        .get(
                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                            spiritualGuide.id +
                            "&filter[where][and][1][role]=7"
                        )
                        .then((resp) => {
                          const account = {
                            userId: resp.data[0].userId,
                            username: resp.data[0].username,
                            password: resp.data[0].password,
                            role: resp.data[0].role,
                            status: 2,
                            idTable: resp.data[0].idTable,
                            id: resp.data[0].id,
                          };
                          const url_5 =
                            "http://localhost:3000/api/accounts/" +
                            account.id +
                            "/replace";
                          axios.post(url_5, account);
                        });
                    }
                  }
                  const url =
                    "http://localhost:3000/api/spiritualGuides/" +
                    spiritualGuide.id +
                    "/replace";
                  axios.post(url, spiritualGuide);
                }
                setTimeout(() => {
                  this.$router.push("/spiritualGuides");
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
              "http://localhost:3000/api/spiritualGuides/existsPhone?phone=" +
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
              } else if (crypt.getAge(this.birthday) < 28) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người linh hướng nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 60) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người linh hướng lớn hơn 60!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else {
                if (this.selectedFile != null) {
                  const fd = new FormData();
                  fd.append("image", this.selectedFile, this.selectedFile.name);
                  var start = this.selectedFile.name.lastIndexOf(".");
                  var end = this.selectedFile.length;
                  var fileName =
                    this.spiritualGuideId +
                    this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const spiritualGuide = {
                      spiritualGuideId: this.spiritualGuideId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      groupCommunity: this.groupCommunity,
                      position: this.position,
                      image: fileName,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    if (spiritualGuide.status == 2) {
                      if (spiritualGuide.position == 8) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=6"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      } else if (spiritualGuide.position == 9) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=7"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      }
                    }
                    const url =
                      "http://localhost:3000/api/spiritualGuides/" +
                      spiritualGuide.id +
                      "/replace";
                    axios.post(url, spiritualGuide);
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/spiritualGuide/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    const spiritualGuide = {
                      spiritualGuideId: this.spiritualGuideId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      groupCommunity: this.groupCommunity,
                      position: this.position,
                      image: fileName,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    if (spiritualGuide.status == 2) {
                      if (spiritualGuide.position == 8) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=6"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      } else if (spiritualGuide.position == 9) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              spiritualGuide.id +
                              "&filter[where][and][1][role]=7"
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data[0].userId,
                              username: resp.data[0].username,
                              password: resp.data[0].password,
                              role: resp.data[0].role,
                              status: 2,
                              idTable: resp.data[0].idTable,
                              id: resp.data[0].id,
                            };
                            const url_5 =
                              "http://localhost:3000/api/accounts/" +
                              account.id +
                              "/replace";
                            axios.post(url_5, account);
                          });
                      }
                    }
                    const url =
                      "http://localhost:3000/api/spiritualGuides/" +
                      spiritualGuide.id +
                      "/replace";
                    axios.post(url, spiritualGuide);
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  const spiritualGuide = {
                    spiritualGuideId: this.spiritualGuideId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    groupCommunity: this.groupCommunity,
                    position: this.position,
                    image: this.imageEdit,
                    status: this.status,
                    id: this.$route.params.id,
                  };
                  if (spiritualGuide.status == 2) {
                    if (spiritualGuide.position == 8) {
                      axios
                        .get(
                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                            spiritualGuide.id +
                            "&filter[where][and][1][role]=6"
                        )
                        .then((resp) => {
                          const account = {
                            userId: resp.data[0].userId,
                            username: resp.data[0].username,
                            password: resp.data[0].password,
                            role: resp.data[0].role,
                            status: 2,
                            idTable: resp.data[0].idTable,
                            id: resp.data[0].id,
                          };
                          const url_5 =
                            "http://localhost:3000/api/accounts/" +
                            account.id +
                            "/replace";
                          axios.post(url_5, account);
                        });
                    } else if (spiritualGuide.position == 9) {
                      axios
                        .get(
                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                            spiritualGuide.id +
                            "&filter[where][and][1][role]=7"
                        )
                        .then((resp) => {
                          const account = {
                            userId: resp.data[0].userId,
                            username: resp.data[0].username,
                            password: resp.data[0].password,
                            role: resp.data[0].role,
                            status: 2,
                            idTable: resp.data[0].idTable,
                            id: resp.data[0].id,
                          };
                          const url_5 =
                            "http://localhost:3000/api/accounts/" +
                            account.id +
                            "/replace";
                          axios.post(url_5, account);
                        });
                    }
                  }
                  const url =
                    "http://localhost:3000/api/spiritualGuides/" +
                    spiritualGuide.id +
                    "/replace";
                  axios.post(url, spiritualGuide);
                }
                setTimeout(() => {
                  this.$router.push("/spiritualGuides");
                  location.reload();
                }, 100);
                return 0;
              }
            });
        } else {
          axios
            .get(
              "http://localhost:3000/api/spiritualGuides/existsEmail?email=" +
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
                    "http://localhost:3000/api/spiritualGuides/existsPhone?phone=" +
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
                    } else if (crypt.getAge(this.birthday) < 28) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của người linh hướng nhỏ hơn 28!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else if (crypt.getAge(this.birthday) > 60) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của người linh hướng lớn hơn 60!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else {
                      if (this.selectedFile != null) {
                        const fd = new FormData();
                        fd.append(
                          "image",
                          this.selectedFile,
                          this.selectedFile.name
                        );
                        var start = this.selectedFile.name.lastIndexOf(".");
                        var end = this.selectedFile.length;
                        var fileName =
                          this.spiritualGuideId +
                          this.selectedFile.name.slice(start, end);
                        if (this.imageEdit != null) {
                          const spiritualGuide = {
                            spiritualGuideId: this.spiritualGuideId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            groupCommunity: this.groupCommunity,
                            position: this.position,
                            image: fileName,
                            status: this.status,
                            id: this.$route.params.id,
                          };
                          if (spiritualGuide.status == 2) {
                            if (spiritualGuide.position == 8) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    spiritualGuide.id +
                                    "&filter[where][and][1][role]=6"
                                )
                                .then((resp) => {
                                  const account = {
                                    userId: resp.data[0].userId,
                                    username: resp.data[0].username,
                                    password: resp.data[0].password,
                                    role: resp.data[0].role,
                                    status: 2,
                                    idTable: resp.data[0].idTable,
                                    id: resp.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                });
                            } else if (spiritualGuide.position == 9) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    spiritualGuide.id +
                                    "&filter[where][and][1][role]=7"
                                )
                                .then((resp) => {
                                  const account = {
                                    userId: resp.data[0].userId,
                                    username: resp.data[0].username,
                                    password: resp.data[0].password,
                                    role: resp.data[0].role,
                                    status: 2,
                                    idTable: resp.data[0].idTable,
                                    id: resp.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                });
                            }
                          }
                          const url =
                            "http://localhost:3000/api/spiritualGuides/" +
                            spiritualGuide.id +
                            "/replace";
                          axios.post(url, spiritualGuide);
                          axios
                            .delete(
                              "http://localhost:3000/api/Photos/spiritualGuide/files/" +
                                this.imageEdit
                            )
                            .then((resp) => {
                              console.log(resp);
                            })
                            .catch((err) => console.log(err));
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        } else {
                          const spiritualGuide = {
                            spiritualGuideId: this.spiritualGuideId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            groupCommunity: this.groupCommunity,
                            position: this.position,
                            image: fileName,
                            status: this.status,
                            id: this.$route.params.id,
                          };
                          if (spiritualGuide.status == 2) {
                            if (spiritualGuide.position == 8) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    spiritualGuide.id +
                                    "&filter[where][and][1][role]=6"
                                )
                                .then((resp) => {
                                  const account = {
                                    userId: resp.data[0].userId,
                                    username: resp.data[0].username,
                                    password: resp.data[0].password,
                                    role: resp.data[0].role,
                                    status: 2,
                                    idTable: resp.data[0].idTable,
                                    id: resp.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                });
                            } else if (spiritualGuide.position == 9) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    spiritualGuide.id +
                                    "&filter[where][and][1][role]=7"
                                )
                                .then((resp) => {
                                  const account = {
                                    userId: resp.data[0].userId,
                                    username: resp.data[0].username,
                                    password: resp.data[0].password,
                                    role: resp.data[0].role,
                                    status: 2,
                                    idTable: resp.data[0].idTable,
                                    id: resp.data[0].id,
                                  };
                                  const url_5 =
                                    "http://localhost:3000/api/accounts/" +
                                    account.id +
                                    "/replace";
                                  axios.post(url_5, account);
                                });
                            }
                          }
                          const url =
                            "http://localhost:3000/api/spiritualGuides/" +
                            spiritualGuide.id +
                            "/replace";
                          axios.post(url, spiritualGuide);
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/spiritualGuide/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        }
                      } else {
                        const spiritualGuide = {
                          spiritualGuideId: this.spiritualGuideId,
                          christianName: this.christianName,
                          fullName: this.fullName,
                          birthday: this.birthday,
                          phone: this.phone,
                          email: this.email,
                          groupCommunity: this.groupCommunity,
                          position: this.position,
                          image: this.imageEdit,
                          status: this.status,
                          id: this.$route.params.id,
                        };
                        if (spiritualGuide.status == 2) {
                          if (spiritualGuide.position == 8) {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                  spiritualGuide.id +
                                  "&filter[where][and][1][role]=6"
                              )
                              .then((resp) => {
                                const account = {
                                  userId: resp.data[0].userId,
                                  username: resp.data[0].username,
                                  password: resp.data[0].password,
                                  role: resp.data[0].role,
                                  status: 2,
                                  idTable: resp.data[0].idTable,
                                  id: resp.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                              });
                          } else if (spiritualGuide.position == 9) {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                  spiritualGuide.id +
                                  "&filter[where][and][1][role]=7"
                              )
                              .then((resp) => {
                                const account = {
                                  userId: resp.data[0].userId,
                                  username: resp.data[0].username,
                                  password: resp.data[0].password,
                                  role: resp.data[0].role,
                                  status: 2,
                                  idTable: resp.data[0].idTable,
                                  id: resp.data[0].id,
                                };
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                              });
                          }
                        }
                        const url =
                          "http://localhost:3000/api/spiritualGuides/" +
                          spiritualGuide.id +
                          "/replace";
                        axios.post(url, spiritualGuide);
                      }
                      setTimeout(() => {
                        this.$router.push("/spiritualGuides");
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

    clearInputSpiritualGuideForm() {
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
      if (this.statusIsValid) {
        this.status = 0;
      }
    },

    toListSpiritualGuide() {
      this.$router.push("/spiritualGuides");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Người Linh Hướng</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditSpiritualGuideForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Người Linh Hướng:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Người Linh Hướng</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
            :value="fullName" v-on:keyup="fullName = $event.target.value"
            class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
            <label class="text-danger">*</label>
            <input type="text" :title="titleChristianName" name="christianName" id="christianName"
              v-model="christianName" :value="christianName" v-on:keyup="christianName = $event.target.value" 
              class="form-control  text-size-13px " placeholder="Nhập Tên Thánh..."
              style="margin-top: -5px;">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
            :value="birthday" v-on:keyup="birthday = $event.target.value"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="position">Chức Vụ</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="position" name="position"
              id="position" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Chức Vụ ---</option>
              <option v-for="department in positions" v-bind:value="department.id" 
              v-if="department.name == 'Linh Hướng' 
              || department.name == 'Linh hướng' || department.name == 'linh hướng'"
              :selected="spiritualGuide.position == department.id">{{ department.positionType }} - {{ department.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
            <label class="text-danger">*</label>
            <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
              v-model="phone" :value="phone" v-on:keyup="phone = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
              style="margin-top: -5px;">
            <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
              định dạng</span>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="email">Email</label>
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
            <label class="font-weight-bold col-form-label" for="groupCommunity">Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="groupCommunity" name="groupCommunity" id="groupCommunity"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Nhóm Cộng Đoàn ---</option>
              <option v-for="grCom in groupCommunities" v-bind:value="grCom.id" :selected="spiritualGuide.groupCommunity == grCom.id">{{ grCom.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id" :selected="spiritualGuide.status == status.id">{{ status.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editSpiritualGuideFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormSpiritualGuide" @click="clearInputSpiritualGuideForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListSpiritualGuide">
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