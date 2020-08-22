const ReportCompanion = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListReportCompanion = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Báo Cáo",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Báo Cáo",
      titleButtonConfirm: "Duyệt Báo Cáo",
      isRead: [
        { id: 1, name: "Chưa duyệt" },
        { id: 2, name: "Đã duyệt" },
      ],
      reportCompanions: [],
      reportCompanion: {},
      companions: [],
      candidates: [],
    };
  },
  mounted() {
    // axios
    //   .get(
    //     "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
    //   )
    //   .then((resp) => {
    //     this.idTable = resp.data.idTable;
    //     this.role = resp.data.role;
    //   });
    // if (this.role === 8 || this.role === 9) {
    //   axios
    //     .get(
    //       "http://localhost:3000/api/reportCompanions?filter[where][companion]=" +
    //         this.idTable
    //     )
    //     .then((response) => {
    //       this.reportCompanions = response.data;
    //     });
    // } else if (this.role === 1 || this.role === 2) {
    //   axios.get("http://localhost:3000/api/reportCompanions").then((response) => {
    //    this.reportCompanions = response.data;
    //  });
    // }
    axios.get("http://localhost:3000/api/reportCompanions").then((response) => {
      this.reportCompanions = response.data;
    });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
    axios.get("http://localhost:3000/api/companions").then((respCom) => {
      this.companions = respCom.data;
    });
  },
  computed: {},
  methods: {
    getDetailReportCompanion(reportCompanion) {
      this.reportCompanion = reportCompanion;
    },

    getDataReportCompanionUpdate(reportCompanion) {
      this.$router.push({
        name: "editReportCompanion",
        params: { id: reportCompanion.id },
      });
    },

    ConfirmReportCompanion(reportCompanion) {
      if( reportCompanion.status == 1){
        const newReportCompanion = {
          companion: reportCompanion.companion,
          candidate: reportCompanion.candidate,
          reportDate: reportCompanion.reportDate,
          brightTL: reportCompanion.brightTL,
          brightNB: reportCompanion.brightNB,
          brightTT: reportCompanion.brightTT,
          brightCD: reportCompanion.brightCD,
          brightTD: reportCompanion.brightTD,
          darkTL: reportCompanion.darkTL,
          darkNB: reportCompanion.darkNB,
          darkTT: reportCompanion.darkTT,
          darkCD: reportCompanion.darkCD,
          darkTD: reportCompanion.darkTD,
          targetNextMonth: reportCompanion.targetNextMonth,
          idSchedule: reportCompanion.idSchedule,
          isRead: 2
        }
        const url =
          "http://localhost:3000/api/reportCompanions/" +
          reportCompanion.id +
          "/replace";
        axios.post(url, newReportCompanion);
        setTimeout(() => {
          location.reload();
        }, 50);
      } else if(reportCompanion.status == 2){
        const newReportCompanion = {
          companion: reportCompanion.companion,
          candidate: reportCompanion.candidate,
          reportDate: reportCompanion.reportDate,
          brightTL: reportCompanion.brightTL,
          brightNB: reportCompanion.brightNB,
          brightTT: reportCompanion.brightTT,
          brightCD: reportCompanion.brightCD,
          brightTD: reportCompanion.brightTD,
          darkTL: reportCompanion.darkTL,
          darkNB: reportCompanion.darkNB,
          darkTT: reportCompanion.darkTT,
          darkCD: reportCompanion.darkCD,
          darkTD: reportCompanion.darkTD,
          targetNextMonth: reportCompanion.targetNextMonth,
          idSchedule: reportCompanion.idSchedule,
          isRead: 1
        }
        const url =
          "http://localhost:3000/api/reportCompanions/" +
          reportCompanion.id +
          "/replace";
        axios.post(url, newReportCompanion);
        setTimeout(() => {
          location.reload();
        }, 50);
      }
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Báo Cáo</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addReportCompanion' }">
            <button :title="titleButtonAdd" class="btn  rounded btn-hover-blue"
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
              <th>Ứng Sinh</th>
              <th>Người Đồng Hành</th>
              <th>Ngày Báo Cáo</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Ứng Sinh</th>
              <th>Người Đồng Hành</th>
              <th>Ngày Báo Cáo</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(reportCompanion, index) in reportCompanions" :key="reportCompanion.id">
              <th>{{ index + 1 }}</th>
              <td v-for="candidate in candidates" v-if="candidate.id == reportCompanion.candidate">{{ candidate.fullName }}</td>
              <td v-for="companion in companions" v-if="companion.id == reportCompanion.companion">{{ companion.fullName }}</td>
              <td>{{ crypt.formatDate(reportCompanion.reportDate) }}</td>
              <td v-for="status in statuses" v-if="status.id == reportCompanion.status">{{ status.name }}</td>
              <td>
                <div class="row" style="margin-left:-15px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailReportCompanion(reportCompanion)"
                      data-target="#detailReportCompanionModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonEdit" @click="getDataReportCompanionUpdate(reportCompanion)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -12.5px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonConfirm" @click="ConfirmReportCompanion(reportCompanion)"
                       class="btn btn-info btn-sm h-28px w-28px rounded"
                      style="margin-left: -25.5px;">
                      <i class="far fa-check-circle fa-md ml--1px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="detailReportCompanionModal" class="modal modal-edu-general default-popup-PrimaryModal fade rounded"
      role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Bản Báo Cáo Đồng Hành</h4>
            <div class="modal-close-area modal-close-df bg-danger"
              style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4 text-center" v-if="reportCompanion.image != null">
                <div v-html="image"></div>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ reportCompanion.reportCompanionId }}</p>
              </div>
              <div class="col-sm-4 text-center" v-if="reportCompanion.image == null">
                <img class="img-fluid img-thumbnail rounded-circle" src="../images/default_image.png" width="100px"
                height="100px" alt="reportCompanion-image"/>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ reportCompanion.reportCompanionId }}</p>
              </div>
              <div class="col-sm-8 mt-3">
                <p class="text-uppercase font-weight-bold" style="font-size: larger;">{{ reportCompanion.christianName }} {{ reportCompanion.fullName }}
                </p>
                <div style="margin-left: 12px;">
                <span class="font-weight-bold">Ngày
                  Sinh:</span><span> &nbsp;{{ birthdayFormat }}</span><br>
                <span class="font-weight-bold ">SĐT:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.phone}}</span><br>
                <span class="font-weight-bold ">Email:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{{ reportCompanion.email }}</span><br>
                <span class="font-weight-bold ">Chức Vụ:</span>
                &nbsp;<span v-for="department in positions" v-if="department.id == reportCompanion.position"> 
                &nbsp;&nbsp;&nbsp;{{ department.positionType}} - {{ department.name }}</span><br>
                <span class="font-weight-bold ">Cộng Đoàn:</span>
                <span v-for="community in communities" v-if="community.id == reportCompanion.community"> 
                &nbsp;{{ community.communityName }}</span><br>
                <span class="font-weight-bold ">Quê Quán:</span>
                <span> &nbsp;&nbsp;&nbsp;{{ reportCompanion.homeland }}</span><br>
                <span class="font-weight-bold ">Trạng Thái:&nbsp;&nbsp;</span>
                <span v-if="reportCompanion.status == 1"> 
                  <i class="fas fa-toggle-on fa-lg text-success"></i>
                </span>
                <span v-if="reportCompanion.status == 2"> 
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

const AddReportCompanion = {
  data() {
    return {
      id: 0,
      companion: 0,
      candidate: 0,
      reportDate: null,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleChristianName: "Nhập thông tin tên Thánh",
      titleFullName: "Nhập thông tin họ và tên",
      titlePhone: "Nhập thông tin số điện thoại",
      titleEmail: "Nhập thông tin địa chỉ email",
      titleHomeland: "Nhập thông tin quê quán",
      status: 0,
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      positions: [],
      communities: [],
      reportCompanions: [],
      communityName: null,
      patron: null,
      address: null,
      amount: 0,
      selectedFile: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/communities").then((response) => {
      this.communities = response.data;
    });
    axios.get("http://localhost:3000/api/reportCompanions").then((response) => {
      this.reportCompanions = response.data;
    });
  },
  computed: {
    communityIsValid() {
      return !!this.community;
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

    addReportCompanionFormIsValid() {
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
        this.communityIsValid
      );
    },

    refreshFormReportCompanion() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid ||
        this.communityIsValid
      );
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitAddReportCompanionForm() {
      if (this.addReportCompanionFormIsValid) {
        let lengthReportCompanions = this.reportCompanions.length;
        if (lengthReportCompanions == 0) {
          this.reportCompanionId = "US001";
        } else {
          let currentId = this.reportCompanions[lengthReportCompanions - 1].id;
          if (currentId > -1 && currentId < 9) {
            this.reportCompanionId = "US00" + (currentId + 1);
          }
          if (currentId > 8 && currentId < 99) {
            this.reportCompanionId = "US0" + (currentId + 1);
          }
          if (currentId > 98 && currentId < 999) {
            this.reportCompanionId = "US" + (currentId + 1);
          }
        }
        axios
          .get(
            "http://localhost:3000/api/reportCompanions/existsEmail?email=" +
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
                  "http://localhost:3000/api/reportCompanions/existsPhone?phone=" +
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
                  } else if (crypt.getAge(this.birthday) < 18) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của ứng sinh nhỏ hơn 18!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else if (crypt.getAge(this.birthday) > 30) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của ứng sinh lớn hơn 30!",
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
                        this.reportCompanionId +
                        this.selectedFile.name.slice(start, end);
                    }
                    const reportCompanion = {
                      reportCompanionId: this.reportCompanionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      community: this.community,
                      homeland: this.homeland,
                      status: this.status,
                    };
                    const account = {
                      userId: this.reportCompanionId,
                      username: this.email,
                      password: crypt.encrypt(this.phone),
                      role: 5,
                      status: this.status,
                    };
                    axios
                      .get(
                        "http://localhost:3000/api/communities/getCommunity?id=" +
                          this.community
                      )
                      .then((response) => {
                        this.communityName =
                          response.data.community.communityName;
                        this.patron = response.data.community.patron;
                        this.address = response.data.community.address;
                        this.amount = response.data.community.amount;
                        console.log(this.address);
                        let amount = 0;
                        amount = Number(this.amount) + 1;
                        console.log(this.amount);
                        const community = {
                          communityName: this.communityName,
                          patron: this.patron,
                          address: this.address,
                          amount: amount,
                          id: this.community,
                        };
                        const url_1 = `http://localhost:3000/api/reportCompanions`;
                        axios.post(url_1, reportCompanion);
                        axios
                          .get(
                            "http://localhost:3000/api/reportCompanions/findOne?filter[where][email]=" +
                              this.email
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data.reportCompanionId,
                              username: resp.data.email,
                              password: crypt.encrypt(resp.data.phone),
                              role: 5,
                              status: resp.data.status,
                              idTable: resp.data.id,
                            };
                            const url_2 =
                              "http://localhost:3000/api/communities/" +
                              community.id +
                              "/replace";
                            axios.post(url_2, community);
                            const url = "http://localhost:3000/api/accounts";
                            axios.post(url, account);
                            if (this.selectedFile != null) {
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
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
                      this.$router.push("/reportCompanions");
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

    clearInputReportCompanionForm() {
      if (this.communityIsValid) {
        this.community = 0;
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

    toListReportCompanion() {
      this.$router.push("/reportCompanions");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Báo Cáo</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddReportCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Báo Cáo:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều Báo Cáo</p>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
              class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
            <label class="text-danger">*</label>
            <input type="text" :title="titleChristianName" name="christianName" id="christianName"
              v-model="christianName" class="form-control  text-size-13px " placeholder="Nhập Tên Thánh..."
              style="margin-top: -5px;">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="position">Chức Vụ</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="position" name="position"
              id="position" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Chức Vụ ---</option>
              <option v-for="department in positions" v-bind:value="department.id" v-if="department.name != 'Headquarter' 
              && department.name != 'headquarter' && department.name != 'Đồng Hành' && department.name != 'Đồng hành' && department.name != 'đồng hành'
              && department.name != 'Linh Hướng' && department.name != 'Linh hướng' && department.name != 'linh hướng'">{{ department.positionType }} - {{ department.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
            <label class="text-danger">*</label>
            <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
              v-model="phone" class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
              style="margin-top: -5px;">
            <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
              định dạng</span>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="email">Email</label>
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
            <label class=" font-weight-bold col-form-label" for="community">Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="community" name="community" id="community"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn ---</option>
              <option v-for="community in communities" v-bind:value="community.id">{{ community.communityName }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="homeland">Quê Quán</label>
            <label class="text-danger">*</label>
            <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
              class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id">{{ status.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addReportCompanionFormIsValid" type="submit"
                class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormReportCompanion" @click="clearInputReportCompanionForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListReportCompanion">
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

const EditReportCompanion = {
  data() {
    return {
      id: 0,
      reportCompanionId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      phoneEdit: null,
      email: null,
      emailEdit: null,
      image: null,
      imageEdit: null,
      community: 0,
      communityEdit: 0,
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
      communities: [],
      reportCompanion: {},
      selectedFile: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/communities").then((response) => {
      this.communities = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/reportCompanions/getReportCompanion?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.reportCompanionId = response.data.reportCompanion.reportCompanionId;
        this.christianName = response.data.reportCompanion.christianName;
        this.fullName = response.data.reportCompanion.fullName;
        this.birthday = crypt.formatDate(response.data.reportCompanion.birthday);
        this.phone = response.data.reportCompanion.phone;
        this.phoneEdit = response.data.reportCompanion.phone;
        this.email = response.data.reportCompanion.email;
        this.emailEdit = response.data.reportCompanion.email;
        this.imageEdit = response.data.reportCompanion.image;
        this.position = response.data.reportCompanion.position;
        this.community = response.data.reportCompanion.community;
        this.communityEdit = response.data.reportCompanion.community;
        this.homeland = response.data.reportCompanion.homeland;
        this.status = response.data.reportCompanion.status;
      });
  },
  computed: {
    communityIsValid() {
      return !!this.community;
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

    editReportCompanionFormIsValid() {
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
        this.communityIsValid
      );
    },

    refreshFormReportCompanion() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid ||
        this.communityIsValid
      );
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitEditReportCompanionForm() {
      if (this.editReportCompanionFormIsValid) {
        if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
          if (crypt.getAge(this.birthday) < 18) {
            alertify.alert(
              "Thông báo",
              "Tuổi của ứng sinh nhỏ hơn 18!",
              function () {
                alertify.success("Ok");
              }
            );
          } else if (crypt.getAge(this.birthday) > 30) {
            alertify.alert(
              "Thông báo",
              "Tuổi của ứng sinh lớn hơn 30!",
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
                this.reportCompanionId + this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const reportCompanion = {
                  reportCompanionId: this.reportCompanionId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  community: this.community,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/reportCompanions/" +
                  reportCompanion.id +
                  "/replace";
                axios.post(url, reportCompanion);
                axios
                  .delete(
                    "http://localhost:3000/api/Photos/reportCompanion/files/" +
                      this.imageEdit
                  )
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => console.log(err));
                axios
                  .post(
                    "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              } else {
                const reportCompanion = {
                  reportCompanionId: this.reportCompanionId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  community: this.community,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/reportCompanions/" +
                  reportCompanion.id +
                  "/replace";
                axios.post(url, reportCompanion);
                axios
                  .post(
                    "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              }
            } else {
              const reportCompanion = {
                reportCompanionId: this.reportCompanionId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                phone: this.phone,
                email: this.email,
                image: this.imageEdit,
                position: this.position,
                community: this.community,
                homeland: this.homeland,
                status: this.status,
                id: this.$route.params.id,
              };
              const url =
                "http://localhost:3000/api/reportCompanions/" +
                reportCompanion.id +
                "/replace";
              axios.post(url, reportCompanion);
            }
            if (this.community != this.communityEdit) {
              axios
                .get(
                  "http://localhost:3000/api/communities/getCommunity?id=" +
                    this.communityEdit
                )
                .then((response) => {
                  this.communityName = response.data.community.communityName;
                  this.patron = response.data.community.patron;
                  this.address = response.data.community.address;
                  this.amount = response.data.community.amount;
                  let amount = 0;
                  amount = Number(this.amount) - 1;
                  const communityEdit = {
                    communityName: this.communityName,
                    patron: this.patron,
                    address: this.address,
                    amount: amount,
                    id: this.communityEdit,
                  };
                  console.log(communityEdit.amount);
                  console.log(communityEdit.id);
                  const url_2 =
                    "http://localhost:3000/api/communities/" +
                    communityEdit.id +
                    "/replace";
                  axios.post(url_2, communityEdit);
                  axios
                    .get(
                      "http://localhost:3000/api/communities/getCommunity?id=" +
                        this.community
                    )
                    .then((response) => {
                      this.communityName =
                        response.data.community.communityName;
                      this.patron = response.data.community.patron;
                      this.address = response.data.community.address;
                      this.amount = response.data.community.amount;
                      let amount = 0;
                      amount = Number(this.amount) + 1;
                      const community = {
                        communityName: this.communityName,
                        patron: this.patron,
                        address: this.address,
                        amount: amount,
                        id: this.community,
                      };
                      console.log(community.amount);
                      console.log(community.id);
                      const url_1 =
                        "http://localhost:3000/api/communities/" +
                        community.id +
                        "/replace";
                      axios.post(url_1, community);
                    });
                });
            }
            setTimeout(() => {
              this.$router.push("/reportCompanions");
              location.reload();
            }, 500);
            return 0;
          }
        } else if (
          this.emailEdit != this.email &&
          this.phoneEdit == this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/reportCompanions/existsEmail?email=" +
                this.email
            )
            .then((response) => {
              if (response.data.bool == true) {
                alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                  alertify.success("Ok");
                });
              } else if (crypt.getAge(this.birthday) < 18) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của ứng sinh nhỏ hơn 18!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 30) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của ứng sinh lớn hơn 30!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else {
                const reportCompanion = {
                  reportCompanionId: null,
                  christianName: null,
                  fullName: null,
                  birthday: null,
                  phone: null,
                  email: null,
                  image: null,
                  position: null,
                  community: null,
                  homeland: null,
                  status: null,
                  id: null,
                };
                if (this.selectedFile != null) {
                  const fd = new FormData();
                  fd.append("image", this.selectedFile, this.selectedFile.name);
                  var start = this.selectedFile.name.lastIndexOf(".");
                  var end = this.selectedFile.length;
                  var fileName =
                    this.reportCompanionId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    reportCompanion = {
                      reportCompanionId: this.reportCompanionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      community: this.community,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/reportCompanion/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    reportCompanion = {
                      reportCompanionId: this.reportCompanionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      community: this.community,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  reportCompanion = {
                    reportCompanionId: this.reportCompanionId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    image: this.imageEdit,
                    position: this.position,
                    community: this.community,
                    homeland: this.homeland,
                    status: this.status,
                    id: this.$route.params.id,
                  };
                }
                if (this.community != this.communityEdit) {
                  axios
                    .get(
                      "http://localhost:3000/api/communities/getCommunity?id=" +
                        this.communityEdit
                    )
                    .then((response) => {
                      this.communityName =
                        response.data.community.communityName;
                      this.patron = response.data.community.patron;
                      this.address = response.data.community.address;
                      this.amount = response.data.community.amount;
                      console.log(this.address);
                      let amount = 0;
                      amount = Number(this.amount) - 1;
                      console.log(this.amount);
                      const communityEdit = {
                        communityName: this.communityName,
                        patron: this.patron,
                        address: this.address,
                        amount: amount,
                        id: this.communityEdit,
                      };
                      axios
                        .get(
                          "http://localhost:3000/api/communities/getCommunity?id=" +
                            this.community
                        )
                        .then((response) => {
                          this.communityName =
                            response.data.community.communityName;
                          this.patron = response.data.community.patron;
                          this.address = response.data.community.address;
                          this.amount = response.data.community.amount;
                          let amount = 0;
                          amount = Number(this.amount) + 1;
                          const community = {
                            communityName: this.communityName,
                            patron: this.patron,
                            address: this.address,
                            amount: amount,
                            id: this.community,
                          };
                          const url_1 =
                            "http://localhost:3000/api/communities/" +
                            community.id +
                            "/replace";
                          axios.post(url_1, community);
                          const url_2 =
                            "http://localhost:3000/api/communities/" +
                            communityEdit.id +
                            "/replace";
                          axios.post(url_2, communityEdit);
                          const url =
                            "http://localhost:3000/api/reportCompanions/" +
                            reportCompanion.id +
                            "/replace";
                          axios.post(url, reportCompanion);
                        });
                    });
                }
                setTimeout(() => {
                  this.$router.push("/reportCompanions");
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
              "http://localhost:3000/api/reportCompanions/existsPhone?phone=" +
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
              } else if (crypt.getAge(this.birthday) < 18) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của ứng sinh nhỏ hơn 18!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 30) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của ứng sinh lớn hơn 30!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else {
                const reportCompanion = {
                  reportCompanionId: null,
                  christianName: null,
                  fullName: null,
                  birthday: null,
                  phone: null,
                  email: null,
                  image: null,
                  position: null,
                  community: null,
                  homeland: null,
                  status: null,
                  id: null,
                };
                if (this.selectedFile != null) {
                  const fd = new FormData();
                  fd.append("image", this.selectedFile, this.selectedFile.name);
                  var start = this.selectedFile.name.lastIndexOf(".");
                  var end = this.selectedFile.length;
                  var fileName =
                    this.reportCompanionId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    reportCompanion = {
                      reportCompanionId: this.reportCompanionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      community: this.community,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/reportCompanion/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    reportCompanion = {
                      reportCompanionId: this.reportCompanionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      community: this.community,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  reportCompanion = {
                    reportCompanionId: this.reportCompanionId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    image: this.imageEdit,
                    position: this.position,
                    community: this.community,
                    homeland: this.homeland,
                    status: this.status,
                    id: this.$route.params.id,
                  };
                }
                if (this.community != this.communityEdit) {
                  axios
                    .get(
                      "http://localhost:3000/api/communities/getCommunity?id=" +
                        this.communityEdit
                    )
                    .then((response) => {
                      this.communityName =
                        response.data.community.communityName;
                      this.patron = response.data.community.patron;
                      this.address = response.data.community.address;
                      this.amount = response.data.community.amount;
                      console.log(this.address);
                      let amount = 0;
                      amount = Number(this.amount) - 1;
                      console.log(this.amount);
                      const communityEdit = {
                        communityName: this.communityName,
                        patron: this.patron,
                        address: this.address,
                        amount: amount,
                        id: this.communityEdit,
                      };
                      axios
                        .get(
                          "http://localhost:3000/api/communities/getCommunity?id=" +
                            this.community
                        )
                        .then((response) => {
                          this.communityName =
                            response.data.community.communityName;
                          this.patron = response.data.community.patron;
                          this.address = response.data.community.address;
                          this.amount = response.data.community.amount;
                          let amount = 0;
                          amount = Number(this.amount) + 1;
                          const community = {
                            communityName: this.communityName,
                            patron: this.patron,
                            address: this.address,
                            amount: amount,
                            id: this.community,
                          };
                          const url_1 =
                            "http://localhost:3000/api/communities/" +
                            community.id +
                            "/replace";
                          axios.post(url_1, community);
                          const url_2 =
                            "http://localhost:3000/api/communities/" +
                            communityEdit.id +
                            "/replace";
                          axios.post(url_2, communityEdit);
                          const url =
                            "http://localhost:3000/api/reportCompanions/" +
                            reportCompanion.id +
                            "/replace";
                          axios.post(url, reportCompanion);
                        });
                    });
                }
                setTimeout(() => {
                  this.$router.push("/reportCompanions");
                  location.reload();
                }, 100);
                return 0;
              }
            });
        } else {
          axios
            .get(
              "http://localhost:3000/api/reportCompanions/existsEmail?email=" +
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
                    "http://localhost:3000/api/reportCompanions/existsPhone?phone=" +
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
                    } else if (crypt.getAge(this.birthday) < 18) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của ứng sinh nhỏ hơn 18!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else if (crypt.getAge(this.birthday) > 30) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của ứng sinh lớn hơn 30!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else {
                      const reportCompanion = {
                        reportCompanionId: null,
                        christianName: null,
                        fullName: null,
                        birthday: null,
                        phone: null,
                        email: null,
                        image: null,
                        position: null,
                        community: null,
                        homeland: null,
                        status: null,
                        id: null,
                      };
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
                          this.reportCompanionId +
                          this.selectedFile.name.slice(start, end);
                        if (this.imageEdit != null) {
                          reportCompanion = {
                            reportCompanionId: this.reportCompanionId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            image: fileName,
                            position: this.position,
                            community: this.community,
                            homeland: this.homeland,
                            status: this.status,
                            id: this.$route.params.id,
                          };
                          axios
                            .delete(
                              "http://localhost:3000/api/Photos/reportCompanion/files/" +
                                this.imageEdit
                            )
                            .then((resp) => {
                              console.log(resp);
                            })
                            .catch((err) => console.log(err));
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        } else {
                          reportCompanion = {
                            reportCompanionId: this.reportCompanionId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            image: fileName,
                            position: this.position,
                            community: this.community,
                            homeland: this.homeland,
                            status: this.status,
                            id: this.$route.params.id,
                          };
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/reportCompanion/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        }
                      } else {
                        reportCompanion = {
                          reportCompanionId: this.reportCompanionId,
                          christianName: this.christianName,
                          fullName: this.fullName,
                          birthday: this.birthday,
                          phone: this.phone,
                          email: this.email,
                          image: this.imageEdit,
                          position: this.position,
                          community: this.community,
                          homeland: this.homeland,
                          status: this.status,
                          id: this.$route.params.id,
                        };
                      }
                      if (this.community != this.communityEdit) {
                        axios
                          .get(
                            "http://localhost:3000/api/communities/getCommunity?id=" +
                              this.communityEdit
                          )
                          .then((response) => {
                            this.communityName =
                              response.data.community.communityName;
                            this.patron = response.data.community.patron;
                            this.address = response.data.community.address;
                            this.amount = response.data.community.amount;
                            console.log(this.address);
                            let amount = 0;
                            amount = Number(this.amount) - 1;
                            console.log(this.amount);
                            const communityEdit = {
                              communityName: this.communityName,
                              patron: this.patron,
                              address: this.address,
                              amount: amount,
                              id: this.communityEdit,
                            };
                            axios
                              .get(
                                "http://localhost:3000/api/communities/getCommunity?id=" +
                                  this.community
                              )
                              .then((response) => {
                                this.communityName =
                                  response.data.community.communityName;
                                this.patron = response.data.community.patron;
                                this.address = response.data.community.address;
                                this.amount = response.data.community.amount;
                                let amount = 0;
                                amount = Number(this.amount) + 1;
                                const community = {
                                  communityName: this.communityName,
                                  patron: this.patron,
                                  address: this.address,
                                  amount: amount,
                                  id: this.community,
                                };
                                const url_1 =
                                  "http://localhost:3000/api/communities/" +
                                  community.id +
                                  "/replace";
                                axios.post(url_1, community);
                                const url_2 =
                                  "http://localhost:3000/api/communities/" +
                                  communityEdit.id +
                                  "/replace";
                                axios.post(url_2, communityEdit);
                                const url =
                                  "http://localhost:3000/api/reportCompanions/" +
                                  reportCompanion.id +
                                  "/replace";
                                axios.post(url, reportCompanion);
                              });
                          });
                      }
                      setTimeout(() => {
                        this.$router.push("/reportCompanions");
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

    clearInputReportCompanionForm() {
      if (this.communityIsValid) {
        this.community = 0;
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

    toListReportCompanion() {
      this.$router.push("/reportCompanions");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Báo Cáo</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditReportCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Báo Cáo:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều Báo Cáo</p>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
            :value="fullName" v-on:keyup="fullName = $event.target.value"
            class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
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
            <label class=" font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
            :value="birthday" v-on:keyup="birthday = $event.target.value"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="position">Chức Vụ</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="position" name="position"
              id="position" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Chức Vụ ---</option>
              <option v-for="department in positions" v-bind:value="department.id" 
              v-if="department.name != 'Headquarter' 
              && department.name != 'headquarter' && department.name != 'Đồng Hành' && department.name != 'Đồng hành' && department.name != 'đồng hành'
              && department.name != 'Linh Hướng' && department.name != 'Linh hướng' && department.name != 'linh hướng'"
              :selected="reportCompanion.position == department.id">{{ department.positionType }} - {{ department.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
            <label class="text-danger">*</label>
            <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
              v-model="phone" :value="phone" v-on:keyup="phone = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
              style="margin-top: -5px;">
            <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
              định dạng</span>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="email">Email</label>
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
            <label class=" font-weight-bold col-form-label" for="community">Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="community" name="community" id="community"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn ---</option>
              <option v-for="community in communities" v-bind:value="community.id" :selected="reportCompanion.community == community.id">{{ community.communityName }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="homeland">Quê Quán</label>
            <label class="text-danger">*</label>
            <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
            :value="homeland" v-on:keyup="homeland = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id" :selected="reportCompanion.status == status.id">{{ status.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editReportCompanionFormIsValid" type="submit"
                class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormReportCompanion" @click="clearInputReportCompanionForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListReportCompanion">
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