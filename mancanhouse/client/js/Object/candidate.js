const Candidate = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListCandidate = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Ứng sinh",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Ứng sinh",
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Ngừng hoạt động" },
      ],
      candidates: [],
      candidate: {},
      positions: [],
      birthdayFormat: null,
      communities: [],
      image: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/candidates").then((response) => {
      this.candidates = response.data;
    });
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/communities").then((response) => {
      this.communities = response.data;
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

    getDetailCandidate(candidate) {
      this.candidate = candidate;
      this.image =
        `
      <img class="img-fluid img-thumbnail rounded-circle" src="../api/Photos/candidate/download/` +
        this.candidate.image +
        `" width="100px"
      height="100px" alt="candidate-image"/>
      `;
      this.birthdayFormat = this.formatDate(this.candidate.birthday);
    },

    getDataCandidateUpdate(candidate) {
      this.$router.push({
        name: "editCandidate",
        params: { id: candidate.id },
      });
    },

    deleteDataCandidate(candidate) {
      axios
        .delete("http://localhost:3000/api/candidates/" + candidate.id)
        .then((response) => {
          console.log(response);
          this.candidates.splice(id, 1);
        });
      axios
        .get(
          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
            candidate.id +
            "&filter[where][and][1][role]=5"
        )
        .then((resp) => {
          axios
            .delete("http://localhost:3000/api/accounts/" + resp.data[0].id)
            .then((respCan) => {
              setTimeout(() => {
                location.reload();
              }, 10);
            });
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Ứng Sinh</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addCandidate' }">
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
              <th>Họ và Tên</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Cộng Đoàn</th>
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
              <th>Cộng Đoàn</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(candidate, index) in candidates" :key="candidate.id">
              <th>{{ index + 1 }}</th>
              <td>{{ candidate.fullName }}</td>
              <td>{{ candidate.phone }}</td>
              <td>{{ candidate.email }}</td>
              <td v-for="community in communities" v-if="community.id == candidate.community">{{ community.communityName }}</td>
              <td v-if="candidate.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="candidate.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td>
                <div class="row" style="margin-left:-15px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailCandidate(candidate)"
                      data-target="#detailCandidateModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button v-show="candidate.status == 1" :title="titleButtonEdit" @click="getDataCandidateUpdate(candidate)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -15px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailCandidate(candidate)"
                      data-target="#deleteCandidateModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -30px;">
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
    <div id="deleteCandidateModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Ứng Sinh</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Ứng sinh {{ candidate.candidateId }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataCandidate(candidate)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="detailCandidateModal" class="modal modal-edu-general default-popup-PrimaryModal fade rounded"
      role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Chi tiết Ứng Sinh</h4>
            <div class="modal-close-area modal-close-df bg-danger"
              style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4 text-center" v-if="candidate.image != null">
                <div v-html="image"></div>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ candidate.candidateId }}</p>
              </div>
              <div class="col-sm-4 text-center" v-if="candidate.image == null">
                <img class="img-fluid img-thumbnail rounded-circle" src="../images/default_image.png" width="100px"
                height="100px" alt="candidate-image"/>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ candidate.candidateId }}</p>
              </div>
              <div class="col-sm-8 mt-3">
                <p class="text-uppercase font-weight-bold" style="font-size: larger;">{{ candidate.christianName }} {{ candidate.fullName }}
                </p>
                <div style="margin-left: 12px;">
                <span class="font-weight-bold">Ngày
                  Sinh:</span><span> &nbsp;{{ birthdayFormat }}</span><br>
                <span class="font-weight-bold ">SĐT:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ candidate.phone}}</span><br>
                <span class="font-weight-bold ">Email:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{{ candidate.email }}</span><br>
                <span class="font-weight-bold ">Chức Vụ:</span>
                &nbsp;<span v-for="department in positions" v-if="department.id == candidate.position"> 
                &nbsp;&nbsp;&nbsp;{{ department.positionType}} - {{ department.name }}</span><br>
                <span class="font-weight-bold ">Cộng Đoàn:</span>
                <span v-for="community in communities" v-if="community.id == candidate.community"> 
                &nbsp;{{ community.communityName }}</span><br>
                <span class="font-weight-bold ">Quê Quán:</span>
                <span> &nbsp;&nbsp;&nbsp;{{ candidate.homeland }}</span><br>
                <span class="font-weight-bold ">Trạng Thái:&nbsp;&nbsp;</span>
                <span v-if="candidate.status == 1"> 
                  <i class="fas fa-toggle-on fa-lg text-success"></i>
                </span>
                <span v-if="candidate.status == 2"> 
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

const AddCandidate = {
  data() {
    return {
      id: 0,
      candidateId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      email: null,
      image: null,
      community: 0,
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
      candidates: [],
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
    axios.get("http://localhost:3000/api/candidates").then((response) => {
      this.candidates = response.data;
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

    addCandidateFormIsValid() {
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

    refreshFormCandidate() {
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
    submitAddCandidateForm() {
      if (this.addCandidateFormIsValid) {
        let lengthCandidates = this.candidates.length;
        if (lengthCandidates == 0) {
          this.candidateId = "US001";
        } else {
          let currentId = this.candidates[lengthCandidates - 1].id;
          if (currentId > -1 && currentId < 9) {
            this.candidateId = "US00" + (currentId + 1);
          }
          if (currentId > 8 && currentId < 99) {
            this.candidateId = "US0" + (currentId + 1);
          }
          if (currentId > 98 && currentId < 999) {
            this.candidateId = "US" + (currentId + 1);
          }
        }
        axios
          .get(
            "http://localhost:3000/api/candidates/existsEmail?email=" +
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
                  "http://localhost:3000/api/candidates/existsPhone?phone=" +
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
                        this.candidateId +
                        this.selectedFile.name.slice(start, end);
                    }
                    const candidate = {
                      candidateId: this.candidateId,
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
                        const url_1 = `http://localhost:3000/api/candidates`;
                        axios.post(url_1, candidate);
                        axios
                          .get(
                            "http://localhost:3000/api/candidates/findOne?filter[where][email]=" +
                              this.email
                          )
                          .then((resp) => {
                            const account = {
                              userId: resp.data.candidateId,
                              username: resp.data.email,
                              password: crypt.encrypt(resp.data.phone),
                              role: 5,
                              status: resp.data.status,
                              idTable: resp.data.id,
                            };
                            var current = new Date();
                            var year = current.getFullYear();
                            for (i = 1; i < 7; i++) {
                              const rateCandidate = {
                                candidate: resp.data.id,
                                month: i,
                                year: year,
                                score: 0,
                                idSchedule: 0,
                              };
                              const url_3 =
                                "http://localhost:3000/api/rateCandidates";
                              axios.post(url_3, rateCandidate);
                            }
                            for (i = 7; i < 13; i++) {
                              const rateCandidate = {
                                candidate: resp.data.id,
                                month: i,
                                year: year,
                                score: 0,
                                idSchedule: 0,
                              };
                              const url_3 =
                                "http://localhost:3000/api/rateCandidates";
                              axios.post(url_3, rateCandidate);
                            }
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
                                  "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                    fileName,
                                  fd
                                )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.log(err));
                            }
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 100);
                            return 0;
                          });
                      });
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

    clearInputCandidateForm() {
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

    toListCandidate() {
      this.$router.push("/candidates");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Ứng Sinh</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddCandidateForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Ứng Sinh:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều Ứng Sinh</p>
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
              <button :disabled="!addCandidateFormIsValid" type="submit"
                class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormCandidate" @click="clearInputCandidateForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListCandidate">
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

const EditCandidate = {
  data() {
    return {
      id: 0,
      candidateId: null,
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
      candidate: {},
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
        "http://localhost:3000/api/candidates/getCandidate?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.candidateId = response.data.candidate.candidateId;
        this.christianName = response.data.candidate.christianName;
        this.fullName = response.data.candidate.fullName;
        this.birthday = crypt.formatDate(response.data.candidate.birthday);
        this.phone = response.data.candidate.phone;
        this.phoneEdit = response.data.candidate.phone;
        this.email = response.data.candidate.email;
        this.emailEdit = response.data.candidate.email;
        this.imageEdit = response.data.candidate.image;
        this.position = response.data.candidate.position;
        this.community = response.data.candidate.community;
        this.communityEdit = response.data.candidate.community;
        this.homeland = response.data.candidate.homeland;
        this.status = response.data.candidate.status;
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

    editCandidateFormIsValid() {
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

    refreshFormCandidate() {
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
    submitEditCandidateForm() {
      if (this.editCandidateFormIsValid) {
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
                this.candidateId + this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const candidate = {
                  candidateId: this.candidateId,
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
                if (candidate.status == 2) {
                  axios
                    .get(
                      "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                        candidate.id +
                        "&filter[where][and][1][role]=5"
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
                            let amount = 0;
                            amount = Number(this.amount) - 1;
                            const communityEdit = {
                              communityName: this.communityName,
                              patron: this.patron,
                              address: this.address,
                              amount: amount,
                              id: this.communityEdit,
                            };
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
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/candidate/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/candidates/" +
                                  this.$route.params.id +
                                  "/replace";
                                axios.post(url, candidate);
                                const url_1 =
                                  "http://localhost:3000/api/communities/" +
                                  community.id +
                                  "/replace";
                                axios.post(url_1, community);
                                setTimeout(() => {
                                  this.$router.push("/candidates");
                                  location.reload();
                                }, 500);
                                return 0;
                              });
                          });
                      } else {
                        axios
                          .delete(
                            "http://localhost:3000/api/Photos/candidate/files/" +
                              this.imageEdit
                          )
                          .then((resp) => {
                            console.log(resp);
                          })
                          .catch((err) => console.log(err));
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        const url_5 =
                          "http://localhost:3000/api/accounts/" +
                          account.id +
                          "/replace";
                        axios.post(url_5, account);
                        const url =
                          "http://localhost:3000/api/candidates/" +
                          this.$route.params.id +
                          "/replace";
                        axios.post(url, candidate);
                        setTimeout(() => {
                          this.$router.push("/candidates");
                          location.reload();
                        }, 500);
                        return 0;
                      }
                    });
                } else {
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
                        let amount = 0;
                        amount = Number(this.amount) - 1;
                        const communityEdit = {
                          communityName: this.communityName,
                          patron: this.patron,
                          address: this.address,
                          amount: amount,
                          id: this.communityEdit,
                        };
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
                            axios
                              .delete(
                                "http://localhost:3000/api/Photos/candidate/files/" +
                                  this.imageEdit
                              )
                              .then((resp) => {
                                console.log(resp);
                              })
                              .catch((err) => console.log(err));
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                            const url =
                              "http://localhost:3000/api/candidates/" +
                              this.$route.params.id +
                              "/replace";
                            axios.post(url, candidate);
                            const url_1 =
                              "http://localhost:3000/api/communities/" +
                              community.id +
                              "/replace";
                            axios.post(url_1, community);
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 500);
                            return 0;
                          });
                      });
                  } else {
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/candidate/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                    const url =
                      "http://localhost:3000/api/candidates/" +
                      this.$route.params.id +
                      "/replace";
                    axios.post(url, candidate);
                    setTimeout(() => {
                      this.$router.push("/candidates");
                      location.reload();
                    }, 500);
                    return 0;
                  }
                }
              } else {
                const candidate = {
                  candidateId: this.candidateId,
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
                if (candidate.status == 2) {
                  axios
                    .get(
                      "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                        candidate.id +
                        "&filter[where][and][1][role]=5"
                    )
                    .then((resp) => {
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
                            let amount = 0;
                            amount = Number(this.amount) - 1;
                            const communityEdit = {
                              communityName: this.communityName,
                              patron: this.patron,
                              address: this.address,
                              amount: amount,
                              id: this.communityEdit,
                            };
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
                                const account = {
                                  userId: resp.data[0].userId,
                                  username: resp.data[0].username,
                                  password: resp.data[0].password,
                                  role: resp.data[0].role,
                                  status: 2,
                                  idTable: resp.data[0].idTable,
                                  id: resp.data[0].id,
                                };
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                const url_1 =
                                  "http://localhost:3000/api/communities/" +
                                  community.id +
                                  "/replace";
                                axios.post(url_1, community);
                                const url_5 =
                                  "http://localhost:3000/api/accounts/" +
                                  account.id +
                                  "/replace";
                                axios.post(url_5, account);
                                const url =
                                  "http://localhost:3000/api/candidates/" +
                                  candidate.id +
                                  "/replace";
                                axios.post(url, candidate);
                                setTimeout(() => {
                                  this.$router.push("/candidates");
                                  location.reload();
                                }, 500);
                                return 0;
                              });
                          });
                      } else {
                        const account = {
                          userId: resp.data[0].userId,
                          username: resp.data[0].username,
                          password: resp.data[0].password,
                          role: resp.data[0].role,
                          status: 2,
                          idTable: resp.data[0].idTable,
                          id: resp.data[0].id,
                        };
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        const url_5 =
                          "http://localhost:3000/api/accounts/" +
                          account.id +
                          "/replace";
                        axios.post(url_5, account);
                        const url =
                          "http://localhost:3000/api/candidates/" +
                          candidate.id +
                          "/replace";
                        axios.post(url, candidate);
                        setTimeout(() => {
                          this.$router.push("/candidates");
                          location.reload();
                        }, 500);
                        return 0;
                      }
                    });
                } else {
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
                        let amount = 0;
                        amount = Number(this.amount) - 1;
                        const communityEdit = {
                          communityName: this.communityName,
                          patron: this.patron,
                          address: this.address,
                          amount: amount,
                          id: this.communityEdit,
                        };
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
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                            const url_1 =
                              "http://localhost:3000/api/communities/" +
                              community.id +
                              "/replace";
                            axios.post(url_1, community);
                            const url =
                              "http://localhost:3000/api/candidates/" +
                              candidate.id +
                              "/replace";
                            axios.post(url, candidate);
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 500);
                            return 0;
                          });
                      });
                  } else {
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                    const url =
                      "http://localhost:3000/api/candidates/" +
                      candidate.id +
                      "/replace";
                    axios.post(url, candidate);
                    setTimeout(() => {
                      this.$router.push("/candidates");
                      location.reload();
                    }, 500);
                    return 0;
                  }
                }
              }
            } else {
              const candidate = {
                candidateId: this.candidateId,
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
              if (candidate.status == 2) {
                axios
                  .get(
                    "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                      candidate.id +
                      "&filter[where][and][1][role]=5"
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
                          let amount = 0;
                          amount = Number(this.amount) - 1;
                          const communityEdit = {
                            communityName: this.communityName,
                            patron: this.patron,
                            address: this.address,
                            amount: amount,
                            id: this.communityEdit,
                          };
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
                              const url_5 =
                                "http://localhost:3000/api/accounts/" +
                                account.id +
                                "/replace";
                              axios.post(url_5, account);
                              const url =
                                "http://localhost:3000/api/candidates/" +
                                candidate.id +
                                "/replace";
                              axios.post(url, candidate);
                              const url_1 =
                                "http://localhost:3000/api/communities/" +
                                community.id +
                                "/replace";
                              axios.post(url_1, community);
                              setTimeout(() => {
                                this.$router.push("/candidates");
                                location.reload();
                              }, 500);
                              return 0;
                            });
                        });
                    } else {
                      const url_5 =
                        "http://localhost:3000/api/accounts/" +
                        account.id +
                        "/replace";
                      axios.post(url_5, account);
                      const url =
                        "http://localhost:3000/api/candidates/" +
                        candidate.id +
                        "/replace";
                      axios.post(url, candidate);
                      setTimeout(() => {
                        this.$router.push("/candidates");
                        location.reload();
                      }, 500);
                      return 0;
                    }
                  });
              } else {
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
                      let amount = 0;
                      amount = Number(this.amount) - 1;
                      const communityEdit = {
                        communityName: this.communityName,
                        patron: this.patron,
                        address: this.address,
                        amount: amount,
                        id: this.communityEdit,
                      };
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
                          const url =
                            "http://localhost:3000/api/candidates/" +
                            candidate.id +
                            "/replace";
                          axios.post(url, candidate);
                          const url_1 =
                            "http://localhost:3000/api/communities/" +
                            community.id +
                            "/replace";
                          axios.post(url_1, community);
                          setTimeout(() => {
                            this.$router.push("/candidates");
                            location.reload();
                          }, 500);
                          return 0;
                        });
                    });
                } else {
                  const url =
                    "http://localhost:3000/api/candidates/" +
                    candidate.id +
                    "/replace";
                  axios.post(url, candidate);
                  setTimeout(() => {
                    this.$router.push("/candidates");
                    location.reload();
                  }, 500);
                  return 0;
                }
              }
            }
          }
        } else if (
          this.emailEdit != this.email &&
          this.phoneEdit == this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/candidates/existsEmail?email=" +
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
                if (this.selectedFile != null) {
                  const fd = new FormData();
                  fd.append("image", this.selectedFile, this.selectedFile.name);
                  var start = this.selectedFile.name.lastIndexOf(".");
                  var end = this.selectedFile.length;
                  var fileName =
                    this.candidateId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const candidate = {
                      candidateId: this.candidateId,
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
                              if (this.candidate.status == 2) {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                      candidate.id +
                                      "&filter[where][and][1][role]=5"
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
                                      "http://localhost:3000/api/candidates/" +
                                      candidate.id +
                                      "/replace";
                                    axios.post(url, candidate);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/candidate/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/candidates");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              } else {
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
                                  "http://localhost:3000/api/candidates/" +
                                  candidate.id +
                                  "/replace";
                                axios.post(url, candidate);
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/candidate/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/candidates");
                                  location.reload();
                                }, 100);
                                return 0;
                              }
                            });
                        });
                    } else {
                      if (this.candidate.status == 2) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              candidate.id +
                              "&filter[where][and][1][role]=5"
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
                            const url =
                              "http://localhost:3000/api/candidates/" +
                              candidate.id +
                              "/replace";
                            axios.post(url, this.candidate);
                            axios
                              .delete(
                                "http://localhost:3000/api/Photos/candidate/files/" +
                                  this.imageEdit
                              )
                              .then((resp) => {
                                console.log(resp);
                              })
                              .catch((err) => console.log(err));
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 100);
                            return 0;
                          });
                      } else {
                        const url =
                          "http://localhost:3000/api/candidates/" +
                          candidate.id +
                          "/replace";
                        axios.post(url, this.candidate);
                        axios
                          .delete(
                            "http://localhost:3000/api/Photos/candidate/files/" +
                              this.imageEdit
                          )
                          .then((resp) => {
                            console.log(resp);
                          })
                          .catch((err) => console.log(err));
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        setTimeout(() => {
                          this.$router.push("/candidates");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    }
                  } else {
                    const candidate = {
                      candidateId: this.candidateId,
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
                              if (this.candidate.status == 2) {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                      candidate.id +
                                      "&filter[where][and][1][role]=5"
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
                                      "http://localhost:3000/api/candidates/" +
                                      candidate.id +
                                      "/replace";
                                    axios.post(url, candidate);
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/candidates");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              } else {
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
                                  "http://localhost:3000/api/candidates/" +
                                  candidate.id +
                                  "/replace";
                                axios.post(url, candidate);
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/candidates");
                                  location.reload();
                                }, 100);
                                return 0;
                              }
                            });
                        });
                    } else {
                      if (this.candidate.status == 2) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              candidate.id +
                              "&filter[where][and][1][role]=5"
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
                            const url =
                              "http://localhost:3000/api/candidates/" +
                              candidate.id +
                              "/replace";
                            axios.post(url, candidate);
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 100);
                            return 0;
                          });
                      } else {
                        const url =
                          "http://localhost:3000/api/candidates/" +
                          candidate.id +
                          "/replace";
                        axios.post(url, candidate);
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        setTimeout(() => {
                          this.$router.push("/candidates");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    }
                  }
                } else {
                  const candidate = {
                    candidateId: this.candidateId,
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
                            if (this.candidate.status == 2) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    candidate.id +
                                    "&filter[where][and][1][role]=5"
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
                                    "http://localhost:3000/api/candidates/" +
                                    candidate.id +
                                    "/replace";
                                  axios.post(url, candidate);
                                  setTimeout(() => {
                                    this.$router.push("/candidates");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            } else {
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
                                "http://localhost:3000/api/candidates/" +
                                candidate.id +
                                "/replace";
                              axios.post(url, candidate);
                              setTimeout(() => {
                                this.$router.push("/candidates");
                                location.reload();
                              }, 100);
                              return 0;
                            }
                          });
                      });
                  } else {
                    if (this.candidate.status == 2) {
                      axios
                        .get(
                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                            candidate.id +
                            "&filter[where][and][1][role]=5"
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
                          const url =
                            "http://localhost:3000/api/candidates/" +
                            candidate.id +
                            "/replace";
                          axios.post(url, candidate);
                          setTimeout(() => {
                            this.$router.push("/candidates");
                            location.reload();
                          }, 100);
                          return 0;
                        });
                    } else {
                      const url =
                        "http://localhost:3000/api/candidates/" +
                        candidate.id +
                        "/replace";
                      axios.post(url, candidate);
                      setTimeout(() => {
                        this.$router.push("/candidates");
                        location.reload();
                      }, 100);
                      return 0;
                    }
                  }
                }
              }
            });
        } else if (
          this.emailEdit == this.email &&
          this.phoneEdit != this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/candidates/existsPhone?phone=" +
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
                if (this.selectedFile != null) {
                  const fd = new FormData();
                  fd.append("image", this.selectedFile, this.selectedFile.name);
                  var start = this.selectedFile.name.lastIndexOf(".");
                  var end = this.selectedFile.length;
                  var fileName =
                    this.candidateId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const candidate = {
                      candidateId: this.candidateId,
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
                              if (this.candidate.status == 2) {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                      candidate.id +
                                      "&filter[where][and][1][role]=5"
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
                                      "http://localhost:3000/api/candidates/" +
                                      candidate.id +
                                      "/replace";
                                    axios.post(url, candidate);
                                    axios
                                      .delete(
                                        "http://localhost:3000/api/Photos/candidate/files/" +
                                          this.imageEdit
                                      )
                                      .then((resp) => {
                                        console.log(resp);
                                      })
                                      .catch((err) => console.log(err));
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/candidates");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              } else {
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
                                  "http://localhost:3000/api/candidates/" +
                                  candidate.id +
                                  "/replace";
                                axios.post(url, candidate);
                                axios
                                  .delete(
                                    "http://localhost:3000/api/Photos/candidate/files/" +
                                      this.imageEdit
                                  )
                                  .then((resp) => {
                                    console.log(resp);
                                  })
                                  .catch((err) => console.log(err));
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/candidates");
                                  location.reload();
                                }, 100);
                                return 0;
                              }
                            });
                        });
                    } else {
                      if (this.candidate.status == 2) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              candidate.id +
                              "&filter[where][and][1][role]=5"
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
                            const url =
                              "http://localhost:3000/api/candidates/" +
                              candidate.id +
                              "/replace";
                            axios.post(url, this.candidate);
                            axios
                              .delete(
                                "http://localhost:3000/api/Photos/candidate/files/" +
                                  this.imageEdit
                              )
                              .then((resp) => {
                                console.log(resp);
                              })
                              .catch((err) => console.log(err));
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 100);
                            return 0;
                          });
                      } else {
                        const url =
                          "http://localhost:3000/api/candidates/" +
                          candidate.id +
                          "/replace";
                        axios.post(url, this.candidate);
                        axios
                          .delete(
                            "http://localhost:3000/api/Photos/candidate/files/" +
                              this.imageEdit
                          )
                          .then((resp) => {
                            console.log(resp);
                          })
                          .catch((err) => console.log(err));
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        setTimeout(() => {
                          this.$router.push("/candidates");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    }
                  } else {
                    const candidate = {
                      candidateId: this.candidateId,
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
                              if (this.candidate.status == 2) {
                                axios
                                  .get(
                                    "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                      candidate.id +
                                      "&filter[where][and][1][role]=5"
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
                                      "http://localhost:3000/api/candidates/" +
                                      candidate.id +
                                      "/replace";
                                    axios.post(url, candidate);
                                    axios
                                      .post(
                                        "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                          fileName,
                                        fd
                                      )
                                      .then((res) => {
                                        console.log(res);
                                      })
                                      .catch((err) => console.log(err));
                                    setTimeout(() => {
                                      this.$router.push("/candidates");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  });
                              } else {
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
                                  "http://localhost:3000/api/candidates/" +
                                  candidate.id +
                                  "/replace";
                                axios.post(url, candidate);
                                axios
                                  .post(
                                    "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                      fileName,
                                    fd
                                  )
                                  .then((res) => {
                                    console.log(res);
                                  })
                                  .catch((err) => console.log(err));
                                setTimeout(() => {
                                  this.$router.push("/candidates");
                                  location.reload();
                                }, 100);
                                return 0;
                              }
                            });
                        });
                    } else {
                      if (this.candidate.status == 2) {
                        axios
                          .get(
                            "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                              candidate.id +
                              "&filter[where][and][1][role]=5"
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
                            const url =
                              "http://localhost:3000/api/candidates/" +
                              candidate.id +
                              "/replace";
                            axios.post(url, candidate);
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 100);
                            return 0;
                          });
                      } else {
                        const url =
                          "http://localhost:3000/api/candidates/" +
                          candidate.id +
                          "/replace";
                        axios.post(url, candidate);
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
                        setTimeout(() => {
                          this.$router.push("/candidates");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    }
                  }
                } else {
                  const candidate = {
                    candidateId: this.candidateId,
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
                            if (this.candidate.status == 2) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    candidate.id +
                                    "&filter[where][and][1][role]=5"
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
                                    "http://localhost:3000/api/candidates/" +
                                    candidate.id +
                                    "/replace";
                                  axios.post(url, candidate);
                                  setTimeout(() => {
                                    this.$router.push("/candidates");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            } else {
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
                                "http://localhost:3000/api/candidates/" +
                                candidate.id +
                                "/replace";
                              axios.post(url, candidate);
                              setTimeout(() => {
                                this.$router.push("/candidates");
                                location.reload();
                              }, 100);
                              return 0;
                            }
                          });
                      });
                  } else {
                    if (this.candidate.status == 2) {
                      axios
                        .get(
                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                            candidate.id +
                            "&filter[where][and][1][role]=5"
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
                          const url =
                            "http://localhost:3000/api/candidates/" +
                            candidate.id +
                            "/replace";
                          axios.post(url, candidate);
                          setTimeout(() => {
                            this.$router.push("/candidates");
                            location.reload();
                          }, 100);
                          return 0;
                        });
                    } else {
                      const url =
                        "http://localhost:3000/api/candidates/" +
                        candidate.id +
                        "/replace";
                      axios.post(url, candidate);
                      setTimeout(() => {
                        this.$router.push("/candidates");
                        location.reload();
                      }, 100);
                      return 0;
                    }
                  }
                }
              }
            });
        } else {
          axios
            .get(
              "http://localhost:3000/api/candidates/existsEmail?email=" +
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
                    "http://localhost:3000/api/candidates/existsPhone?phone=" +
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
                          this.candidateId +
                          this.selectedFile.name.slice(start, end);
                        if (this.imageEdit != null) {
                          const candidate = {
                            candidateId: this.candidateId,
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
                                    this.patron =
                                      response.data.community.patron;
                                    this.address =
                                      response.data.community.address;
                                    this.amount =
                                      response.data.community.amount;
                                    let amount = 0;
                                    amount = Number(this.amount) + 1;
                                    const community = {
                                      communityName: this.communityName,
                                      patron: this.patron,
                                      address: this.address,
                                      amount: amount,
                                      id: this.community,
                                    };
                                    if (this.candidate.status == 2) {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                            candidate.id +
                                            "&filter[where][and][1][role]=5"
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
                                            "http://localhost:3000/api/candidates/" +
                                            candidate.id +
                                            "/replace";
                                          axios.post(url, candidate);
                                          axios
                                            .delete(
                                              "http://localhost:3000/api/Photos/candidate/files/" +
                                                this.imageEdit
                                            )
                                            .then((resp) => {
                                              console.log(resp);
                                            })
                                            .catch((err) => console.log(err));
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/candidates");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    } else {
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
                                        "http://localhost:3000/api/candidates/" +
                                        candidate.id +
                                        "/replace";
                                      axios.post(url, candidate);
                                      axios
                                        .delete(
                                          "http://localhost:3000/api/Photos/candidate/files/" +
                                            this.imageEdit
                                        )
                                        .then((resp) => {
                                          console.log(resp);
                                        })
                                        .catch((err) => console.log(err));
                                      axios
                                        .post(
                                          "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                            fileName,
                                          fd
                                        )
                                        .then((res) => {
                                          console.log(res);
                                        })
                                        .catch((err) => console.log(err));
                                      setTimeout(() => {
                                        this.$router.push("/candidates");
                                        location.reload();
                                      }, 100);
                                      return 0;
                                    }
                                  });
                              });
                          } else {
                            if (this.candidate.status == 2) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    candidate.id +
                                    "&filter[where][and][1][role]=5"
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
                                  const url =
                                    "http://localhost:3000/api/candidates/" +
                                    candidate.id +
                                    "/replace";
                                  axios.post(url, this.candidate);
                                  axios
                                    .delete(
                                      "http://localhost:3000/api/Photos/candidate/files/" +
                                        this.imageEdit
                                    )
                                    .then((resp) => {
                                      console.log(resp);
                                    })
                                    .catch((err) => console.log(err));
                                  axios
                                    .post(
                                      "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                        fileName,
                                      fd
                                    )
                                    .then((res) => {
                                      console.log(res);
                                    })
                                    .catch((err) => console.log(err));
                                  setTimeout(() => {
                                    this.$router.push("/candidates");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            } else {
                              const url =
                                "http://localhost:3000/api/candidates/" +
                                candidate.id +
                                "/replace";
                              axios.post(url, this.candidate);
                              axios
                                .delete(
                                  "http://localhost:3000/api/Photos/candidate/files/" +
                                    this.imageEdit
                                )
                                .then((resp) => {
                                  console.log(resp);
                                })
                                .catch((err) => console.log(err));
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                    fileName,
                                  fd
                                )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.log(err));
                              setTimeout(() => {
                                this.$router.push("/candidates");
                                location.reload();
                              }, 100);
                              return 0;
                            }
                          }
                        } else {
                          const candidate = {
                            candidateId: this.candidateId,
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
                                    this.patron =
                                      response.data.community.patron;
                                    this.address =
                                      response.data.community.address;
                                    this.amount =
                                      response.data.community.amount;
                                    let amount = 0;
                                    amount = Number(this.amount) + 1;
                                    const community = {
                                      communityName: this.communityName,
                                      patron: this.patron,
                                      address: this.address,
                                      amount: amount,
                                      id: this.community,
                                    };
                                    if (this.candidate.status == 2) {
                                      axios
                                        .get(
                                          "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                            candidate.id +
                                            "&filter[where][and][1][role]=5"
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
                                            "http://localhost:3000/api/candidates/" +
                                            candidate.id +
                                            "/replace";
                                          axios.post(url, candidate);
                                          axios
                                            .post(
                                              "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                                fileName,
                                              fd
                                            )
                                            .then((res) => {
                                              console.log(res);
                                            })
                                            .catch((err) => console.log(err));
                                          setTimeout(() => {
                                            this.$router.push("/candidates");
                                            location.reload();
                                          }, 100);
                                          return 0;
                                        });
                                    } else {
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
                                        "http://localhost:3000/api/candidates/" +
                                        candidate.id +
                                        "/replace";
                                      axios.post(url, candidate);
                                      axios
                                        .post(
                                          "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                            fileName,
                                          fd
                                        )
                                        .then((res) => {
                                          console.log(res);
                                        })
                                        .catch((err) => console.log(err));
                                      setTimeout(() => {
                                        this.$router.push("/candidates");
                                        location.reload();
                                      }, 100);
                                      return 0;
                                    }
                                  });
                              });
                          } else {
                            if (this.candidate.status == 2) {
                              axios
                                .get(
                                  "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                    candidate.id +
                                    "&filter[where][and][1][role]=5"
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
                                  const url =
                                    "http://localhost:3000/api/candidates/" +
                                    candidate.id +
                                    "/replace";
                                  axios.post(url, candidate);
                                  axios
                                    .post(
                                      "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                        fileName,
                                      fd
                                    )
                                    .then((res) => {
                                      console.log(res);
                                    })
                                    .catch((err) => console.log(err));
                                  setTimeout(() => {
                                    this.$router.push("/candidates");
                                    location.reload();
                                  }, 100);
                                  return 0;
                                });
                            } else {
                              const url =
                                "http://localhost:3000/api/candidates/" +
                                candidate.id +
                                "/replace";
                              axios.post(url, candidate);
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/candidate/upload?filename=" +
                                    fileName,
                                  fd
                                )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.log(err));
                              setTimeout(() => {
                                this.$router.push("/candidates");
                                location.reload();
                              }, 100);
                              return 0;
                            }
                          }
                        }
                      } else {
                        const candidate = {
                          candidateId: this.candidateId,
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
                                  this.address =
                                    response.data.community.address;
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
                                  if (this.candidate.status == 2) {
                                    axios
                                      .get(
                                        "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                          candidate.id +
                                          "&filter[where][and][1][role]=5"
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
                                          "http://localhost:3000/api/candidates/" +
                                          candidate.id +
                                          "/replace";
                                        axios.post(url, candidate);
                                        setTimeout(() => {
                                          this.$router.push("/candidates");
                                          location.reload();
                                        }, 100);
                                        return 0;
                                      });
                                  } else {
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
                                      "http://localhost:3000/api/candidates/" +
                                      candidate.id +
                                      "/replace";
                                    axios.post(url, candidate);
                                    setTimeout(() => {
                                      this.$router.push("/candidates");
                                      location.reload();
                                    }, 100);
                                    return 0;
                                  }
                                });
                            });
                        } else {
                          if (this.candidate.status == 2) {
                            axios
                              .get(
                                "http://localhost:3000/api/accounts?filter[where][and][0][idTable]=" +
                                  candidate.id +
                                  "&filter[where][and][1][role]=5"
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
                                const url =
                                  "http://localhost:3000/api/candidates/" +
                                  candidate.id +
                                  "/replace";
                                axios.post(url, candidate);
                                setTimeout(() => {
                                  this.$router.push("/candidates");
                                  location.reload();
                                }, 100);
                                return 0;
                              });
                          } else {
                            const url =
                              "http://localhost:3000/api/candidates/" +
                              candidate.id +
                              "/replace";
                            axios.post(url, candidate);
                            setTimeout(() => {
                              this.$router.push("/candidates");
                              location.reload();
                            }, 100);
                            return 0;
                          }
                        }
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

    clearInputCandidateForm() {
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

    toListCandidate() {
      this.$router.push("/candidates");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Ứng Sinh</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditCandidateForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Ứng Sinh:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều Ứng Sinh</p>
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
              :selected="candidate.position == department.id">{{ department.positionType }} - {{ department.name }}
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
              <option v-for="community in communities" v-bind:value="community.id" :selected="candidate.community == community.id">{{ community.communityName }}
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
              <option v-for="status in statuses" v-bind:value="status.id" :selected="candidate.status == status.id">{{ status.name }}
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
              <button :disabled="!editCandidateFormIsValid" type="submit"
                class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormCandidate" @click="clearInputCandidateForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListCandidate">
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