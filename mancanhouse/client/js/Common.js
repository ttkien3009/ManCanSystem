const store = new Vuex.Store({
  state: {
    idTable: 0,
  },
  mutations: {
    updateIdTable(state, id) {
      state.idTable = id;
    },
  },
  actions: {
    updateIdTable: ({ commit }, id) => {
      commit("updateIdTable", id);
    },
  },
  getters: {},
});

const Login = {
  data() {
    return {
      username: null,
      password: null,
      titleUsername: "Nhập thông tin tài khoản của bạn",
      titlePassword: "Nhập thông tin mật khẩu của bạn",
    };
  },
  computed: {
    usernameIsValid() {
      return !!this.username;
    },
    passwordIsValid() {
      return !!this.password;
    },
    loginFormIsValid() {
      return this.usernameIsValid && this.passwordIsValid;
    },
  },
  methods: {
    submitLoginForm() {
      axios
        .get(
          "http://localhost:3000/api/accounts/existsUsername?username=" +
            this.username
        )
        .then((response) => {
          if (response.data.bool == true) {
            axios
              .get(
                "http://localhost:3000/api/accounts/findOne?filter[where][username]=" +
                  this.username
              )
              .then((resp) => {
                const userInfo = {
                  idAccount: resp.data.id,
                  userId: resp.data.userId,
                  username: resp.data.username,
                  password: crypt.decrypt(resp.data.password),
                  role: resp.data.role,
                  idTable: resp.data.idTable,
                  token: "token",
                };
                if (this.password == userInfo.password) {
                  const url = `http://localhost:3000/api/logins`;
                  axios.post(url, userInfo);
                  this.$router.push("/");
                } else {
                  alertify.alert(
                    "Thông báo",
                    "Mật khẩu không đúng!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                }
              });
          } else {
            alertify.alert("Thông báo", "Tài khoản không đúng!", function () {
              alertify.success("Ok");
            });
          }
        });
    },
  },
  template: `
  <div class="body-login" style="height:625px;">
    <div class="container">
      <img src="../images/logoungsinh.png" class="image-fluid" alt="logo">
      <div class="card-login bg-white">
        <div class="card-title-login text-center font-weight-bold">Đăng Nhập Hệ Thống</div>
        <div class="card-login-body" id="loginForm">
          <form @submit.prevent="submitLoginForm" action="" method="POST" autocomplete="off" class="login100-form">
            <!--'Submit' event won't reload page-->
            <div class="wrap-input100 validate-input mt-2 ml-3">
              <input type="text" v-bind:title="titleUsername" name="username" id="username" v-model="username"
                class="form-control input100" placeholder="Tài khoản" autofocus>
              <span class="symbol-input100">
                <i class="fas fa-user fa-lg"></i>
              </span>
            </div>
            <div class="wrap-input100 validate-input mt-4 ml-3">
              <input type="password" v-bind:title="titlePassword" name="password" id="password" v-model="password"
                class="form-control input100" placeholder="Mật khẩu">
              <span class="symbol-input100">
                <i class="fa fa-lock fa-lg"></i>
              </span>
            </div>
            <button :disabled="!loginFormIsValid"
              class="btn btn-login btn-block btn-outline-dark align-middle rounded mt-4 ml-3 mr-3 btn-hover-blue" type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  `,
};

Vue.component("page-header", {
  data() {
    return {
      id: 0,
      imageEdit: null,
      htmlImage: null,
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        this.id = resp.data.id;
      });
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        const userInfo = {
          id: resp.data.id,
          userId: resp.data.userId,
          username: resp.data.username,
          password: crypt.decrypt(resp.data.password),
          role: resp.data.role,
          idTable: resp.data.idTable,
        };
        this.role = resp.data.role;
        this.idTable = resp.data.idTable;
        if (
          this.role == 1 ||
          this.role == 2 ||
          this.role == 3 ||
          this.role == 4
        ) {
          axios
            .get(
              "http://localhost:3000/api/managers/getManager?id=" + this.idTable
            )
            .then((response) => {
              this.imageEdit = response.data.manager.image;
              this.htmlImage =
                `
                  <img class="user-avatar rounded-circle" src="../api/Photos/manager/download/` +
                this.imageEdit +
                `" alt="User Avatar">
                `;
            });
        }
        if (this.role == 5) {
          axios
            .get(
              "http://localhost:3000/api/candidates/getCandidate?id=" +
                this.idTable
            )
            .then((response) => {
              this.imageEdit = response.data.candidate.image;
              this.htmlImage =
                `
                  <img class="user-avatar rounded-circle" src="../api/Photos/candidate/download/` +
                this.imageEdit +
                `" alt="User Avatar">
                `;
            });
        }
        if (this.role == 6 || this.role == 7) {
          axios
            .get(
              "http://localhost:3000/api/spiritualGuides/getSpiritualGuide?id=" +
                this.idTable
            )
            .then((response) => {
              this.imageEdit = response.data.spiritualGuide.image;
              this.htmlImage =
                `
                  <img class="user-avatar rounded-circle" src="../api/Photos/spiritualGuide/download/` +
                this.imageEdit +
                `" alt="User Avatar">
                `;
            });
        }
        if (this.role == 8 || this.role == 9) {
          axios
            .get(
              "http://localhost:3000/api/companions/getCompanion?id=" +
                this.idTable
            )
            .then((response) => {
              this.imageEdit = response.data.companion.image;
              this.htmlImage =
                `
                  <img class="user-avatar rounded-circle" src="../api/Photos/companion/download/` +
                this.imageEdit +
                `" alt="User Avatar">
                `;
            });
        }
        if (this.role == 10) {
          axios
            .get(
              "http://localhost:3000/api/teachers/getTeacher?id=" + this.idTable
            )
            .then((response) => {
              this.imageEdit = response.data.teacher.image;
              this.htmlImage =
                `
                <img class="user-avatar rounded-circle" src="../api/Photos/teacher/download/` +
                this.imageEdit +
                `" alt="User Avatar">
                `;
            });
        }
      });
  },
  methods: {
    logout() {
      axios
        .delete("http://localhost:3000/api/logins/" + this.id)
        .then((response) => {
          setTimeout(() => {
            this.$router.push("/login");
          }, 1);
        });
    },
  },
  template: `
  <header id="header" class="header">
  <div class="header-menu">
    <div class="col-sm-7">
      <a id="menuToggle" class="float-left" style="margin-left: -25px; cursor: pointer;"><i
          class="fas fa-bars fa-2x"></i></a>
      <div class="header-left">

      </div>
    </div>

    <div class="col-sm-5">
      <div class="user-area dropdown float-right">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div v-html="htmlImage"></div>
        </a>
        <div class="user-menu dropdown-menu">
          <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'detailProfile' }">
            <a class="nav-link" href="#"><i class="fas fa-info mr-4"></i> Cá Nhân</a>
          </router-link>
          <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'changePassword' }">
            <a class="nav-link" href="#"><i class="fas fa-key mr-3"></i> Đổi Mật Khẩu</a>
          </router-link>
          <button class="btn" style="background-color:white;margin-left:-10px;margin-top:-6px" @click="logout">
            <a class="nav-link" href="#"><i class="fas fa-sign-out-alt mr-3"></i> Đăng Xuất</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
    `,
});

Vue.component("page-menu", {
  data() {
    return {
      role: 0,
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        this.role = resp.data.role;
      });
  },
  template: `
  <aside id="left-panel" class="left-panel">
  <nav class="navbar navbar-expand-sm navbar-default">

    <div class="navbar-header">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu"
        aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars"></i>
      </button>
      <a class="navbar-brand" href="#"><img src="../images/logoungsinh.png" alt="Logo" width="50px"
          height="50px"></a>
      <a class="navbar-brand hidden" href="#"><img src="../images/logoungsinh.png" alt="Logo"></a>
    </div>

    <div id="main-menu" class="main-menu collapse navbar-collapse">
      <ul class="nav navbar-nav" style="cursor: pointer;">
        <router-link v-show="role == 1" style="text-decoration: none; color: inherit;" :to="{ name: 'homePage'}">
          <li>
            <a><i class="menu-icon fas fa-tachometer-alt fa-lg"></i>Dashboard </a>
          </li>
        </router-link>
        <router-link v-show="role == 1" style="text-decoration: none; color: inherit;" :to="{ name: 'listManager'}">
          <li>
            <a><i class="menu-icon fas fa-user-tie fa-lg"></i>Người Điều Hành</a>
          </li>
        </router-link>
        <router-link v-show="role == 1 || role == 2" style="text-decoration: none; color: inherit;" :to="{ name: 'listCandidate'}">
          <li>
            <a><i class="menu-icon fas fa-users fa-lg"></i>Ứng Sinh </a>
          </li>
        </router-link>
        <router-link v-show="role == 1 || role == 2" style="text-decoration: none; color: inherit;" :to="{ name: 'listCommunity'}">
          <li>
            <a><i class="menu-icon fas fa-church fa-lg"></i>Cộng Đoàn </a>
          </li>
        </router-link>
        <li class="menu-item-has-children dropdown" v-show="role == 1 || role == 8 || role == 9 || role == 5">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fas fa-user-friends fa-lg"></i>Đồng Hành</a>
            <ul class="sub-menu children dropdown-menu">
              <router-link tag="li" :to="{ name: 'listCompanion'}" v-show="role == 1 || role == 8">
                <i class="menu-icon fas fa-user-check fa-lg"></i><a href="#">Người Đồng Hành</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'listGroupCommunity'}" v-show="role == 1 || role == 8">
                <i class="menu-icon fas fa-house-damage fa-lg"></i><a href="#">Nhóm Cộng Đoàn</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'listScheduleCompanions'}" v-show="role == 8 || role == 9 || role == 5">
                <i class="menu-icon far fa-calendar fa-lg"></i><a href="#">Lịch Đồng Hành</a>
              </router-link>
            </ul>
        </li>
        <li class="menu-item-has-children dropdown" v-show="role == 1 || role == 6 || role == 7 || role == 5">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fas fa-user-nurse fa-lg"></i>Linh Hướng</a>
            <ul class="sub-menu children dropdown-menu">
              <router-link tag="li" :to="{ name: 'listSpiritualGuide'}" v-show="role == 1 || role == 6">
                <i class="menu-icon fas fa-user-check fa-lg"></i><a href="#">Người Linh Hướng</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'listGroupCommunity'}" v-show="role == 1 || role == 6">
                <i class="menu-icon fas fa-house-damage fa-lg"></i><a href="#">Nhóm Cộng Đoàn</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'listScheduleSpiritualGuides'}" v-show="role == 6 || role == 7 || role == 5">
                <i class="menu-icon far fa-calendar fa-lg"></i><a href="#">Lịch Linh Hướng</a>
              </router-link>
            </ul>
        </li>
        <li class="menu-item-has-children dropdown" v-show="role == 1 || role == 4 || role == 5 || role == 10">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fas fa-graduation-cap fa-lg"></i>Giảng Dạy</a>
            <ul class="sub-menu children dropdown-menu">
              <router-link tag="li" :to="{ name: 'listTeacher'}" v-show="role == 1 || role == 4">
                <i class="menu-icon fas fa-chalkboard-teacher fa-lg"></i><a href="#">Giảng Viên</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'listSchedule'}" v-show="role == 1 || role == 4 || role == 5 || role == 10">
                <i class="menu-icon far fa-calendar-alt fa-lg"></i><a href="#">Lịch Học</a>
              </router-link>
            </ul>
        </li>
        <router-link v-show="role == 1 || role == 3" style="text-decoration: none; color: inherit;" :to="{ name: 'listDepartment'}">
          <li>
            <a><i class="menu-icon fas fa-boxes fa-lg"></i>Phòng Ban </a>
          </li>
        </router-link>
        <li class="menu-item-has-children dropdown" v-show="role == 1 || role == 6 || role == 7 || role == 8 || role == 9">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fas fa-chart-line fa-lg"></i>Thống Kê</a>
            <ul class="sub-menu children dropdown-menu">
              <router-link tag="li" :to="{ name: 'listMetCompanion'}" v-show="role == 1 || role == 8|| role == 9">
                <i class="menu-icon far fa-handshake fa-lg"></i><a href="#">Gặp Đồng Hành</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'listMetSpiritualGuide'}" v-show="role == 1 || role == 6 || role == 7">
                <i class="menu-icon fas fa-handshake fa-lg"></i><a href="#">Gặp Linh Hướng</a>
              </router-link>
            </ul>
        </li>
        <li class="menu-item-has-children dropdown" v-show="role == 1">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fab fa-windows fa-lg"></i>Hệ Thống</a>
            <ul class="sub-menu children dropdown-menu">
              <router-link tag="li" :to="{ name: 'listAccount'}">
                <i class="menu-icon far fa-user fa-lg"></i><a href="#">Người Dùng</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'listRole'}">
                <i class="menu-icon fas fa-user-tag fa-lg"></i><a href="#">Phân Quyền</a>
              </router-link>
            </ul>
        </li>
      </ul>
    </div>
  </nav>
</aside>
    `,
});

const Header = {
  template: `
  <header id="header" class="header">
    <div class="header-menu">
      <div class="col-sm-7">
        <a id="menuToggle" class="float-left" style="margin-left: -25px; cursor: pointer;"><i
            class="fas fa-bars fa-2x"></i></a>
        <div class="header-left">

        </div>
      </div>

      <div class="col-sm-5">
        <div class="user-area dropdown float-right">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img class="user-avatar rounded-circle" src="../images/user_02.png" alt="User Avatar">
          </a>
          <div class="user-menu dropdown-menu">
            <a class="nav-link" href="#"><i class="fas fa-info mr-4"></i> Cá Nhân</a>
            <a class="nav-link" href="#"><i class="fas fa-key mr-3"></i> Đổi Mật Khẩu</a>
            <a class="nav-link" href="#"><i class="fas fa-sign-out-alt mr-3"></i> Đăng Xuất</a>
          </div>
        </div>
      </div>
    </div>
  </header>
  `,
};

const Menu = {
  template: `
  <aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">

      <div class="navbar-header">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu"
          aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa fa-bars"></i>
        </button>
        <a class="navbar-brand" href="./"><img src="../images/logoungsinh.png" alt="Logo" width="50px"
            height="50px"></a>
        <a class="navbar-brand hidden" href="./"><img src="../images/logoungsinh.png" alt="Logo"></a>
      </div>

      <div id="main-menu" class="main-menu collapse navbar-collapse">
        <ul class="nav navbar-nav" style="cursor: pointer;">
          <li>
            <a><i class="menu-icon fas fa-tachometer-alt fa-lg"></i>Dashboard </a>
          </li>
          <li>
            <a><i class="menu-icon fas fa-user-tie fa-lg"></i>Người điều hành</a>
          </li>
          <li>
            <a><i class="menu-icon fas fa-users fa-lg"></i>Ứng sinh </a>
          </li>
          <li>
            <a><i class="menu-icon fas fa-church fa-lg"></i>Cộng đoàn </a>
          </li>
          <li>
            <a><i class="menu-icon fas fa-user-friends fa-lg"></i>Đồng hành </a>
          </li>
          <li>
            <a><i class="menu-icon fas fa-bible"></i>Linh hướng </a>
          </li>
          <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="menu-icon fas fa-graduation-cap fa-lg"></i>Học tập</a>
            <ul class="sub-menu children dropdown-menu">
              <li><i class="fas fa-chalkboard-teacher fa-lg"></i><a href="">Giảng viên</a></li>
              <li><i class="far fa-calendar-alt fa-lg"></i><a href="">Lịch học</a></li>
            </ul>
          </li>
          <li>
            <a><i class="menu-icon fas fa-boxes fa-lg"></i>Phòng ban </a>
          </li>
          <li>
            <a><i class="menu-icon fas fa-chart-line fa-lg"></i>Thống kê </a>
          </li>
          <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'listAccount'}">
              <li>
                <a><i class="menu-icon far fa-user fa-lg"></i>Ngưởi dùng </a>
              </li>
          </router-link>
        </ul>
      </div>
    </nav>
  </aside>
  `,
};

const Home = {
  data() {
    return {
      candidate: 0,
      community: 0,
      candidateOut: 0,
      candidateOuts: [],
      candidateOut: 0,
      account: 0,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/candidates/count").then((resp) => {
      this.candidate = resp.data.count;
    });
    axios.get("http://localhost:3000/api/communities/count").then((resp) => {
      this.community = resp.data.count;
    });
    axios
      .get("http://localhost:3000/api/candidates/?filter[where][status]=2")
      .then((resp) => {
        this.candidateOuts = resp.data;
        this.candidateOut = this.candidateOuts.length;
      });
    axios.get("http://localhost:3000/api/accounts/count").then((resp) => {
      this.account = resp.data.count;
    });
  },
  template: `
  <div>
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-warning card-header-icon">
            <div class="card-icon">
              <i class="fas fa-users"></i>
            </div>
            <p class="card-category">Ứng Sinh</p>
            <h3 class="card-title">{{ candidate }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-info-circle mt-1 text-info"></i>
              <a href="">&nbsp;Thông tin chi tiết</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-success card-header-icon">
            <div class="card-icon">
              <i class="fas fa-church"></i>
            </div>
            <p class="card-category">Cộng Đoàn</p>
            <h3 class="card-title">{{ community }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-info-circle mt-1 text-info"></i>
              <a href="">&nbsp;Thông tin chi tiết</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-danger card-header-icon">
            <div class="card-icon">
              <i class="fas fa-users"></i>
            </div>
            <p class="card-category">Ứng Sinh Rời</p>
            <h3 class="card-title">{{ candidateOut }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-exclamation-triangle mt-1 text-warning"></i>
              &nbsp; Số lượng Ứng sinh xin ra
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-info card-header-icon">
            <div class="card-icon">
              <i class="far fa-user"></i>
            </div>
            <p class="card-category">Người Dùng</p>
            <h3 class="card-title">{{ account }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-info-circle mt-1 text-info"></i>
              <a href="">&nbsp;Thông tin chi tiết</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-4">
        <div class="card card-chart">
          <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image" src="../images/user_03.jpg" alt="User Image" style="margin-top: -70px;">
          <div class="card-body">
            <h4 class="card-title text-center">Nguyễn Văn Khang</h4>
            <h6 class="card-title text-center">(Giám Học)</h6>
            <p class="card-category text-center">
              <span class="align-middle"><i class="fas fa-mobile-alt text-dark"></i>&nbsp; 0978645123</span><br/>
              <span class="align-middle"><i class="fas fa-envelope-open-text text-dark"></i></i>&nbsp; vankhan@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-chart">
          <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image" src="../images/user_04.jpg" alt="User Image" style="margin-top: -70px;">
          <div class="card-body">
            <h4 class="card-title text-center">Nguyễn Quốc Kính</h4>
            <h6 class="card-title text-center">(Giám Đốc)</h6>
            <p class="card-category text-center">
              <span class="align-middle"><i class="fas fa-mobile-alt text-dark"></i>&nbsp; 0978645123</span><br/>
              <span class="align-middle"><i class="fas fa-envelope-open-text text-dark"></i>&nbsp; quockinh@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-chart">
          <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image" src="../images/user_08.jpg" alt="User Image" style="margin-top: -70px;">
          <div class="card-body">
            <h4 class="card-title text-center">Nguyễn Ngọc Triêm</h4>
            <h6 class="card-title text-center">(Quản Lý)</h6>
            <p class="card-category text-center">
              <span class="align-middle"><i class="fas fa-mobile-alt text-dark"></i>&nbsp; 0978645123</span><br/>
              <span class="align-middle"><i class="fas fa-envelope-open-text text-dark"></i>&nbsp; ngoctriem@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

/* ACCOUNT */
const Account = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListAccount = {
  data() {
    return {
      account: {},
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      accounts: [],
      roles: [],
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa tài khoản",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Tài Khoản",
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/accounts").then((response) => {
      this.accounts = response.data;
    });
    axios.get("http://localhost:3000/api/roles").then((response) => {
      this.roles = response.data;
    });
  },
  computed: {},
  methods: {
    getDetailAccount(account) {
      this.account = account;
    },

    getDataAccountUpdate(account) {
      this.$router.push({ name: "editAccount", params: { id: account.id } });
    },

    deleteDataAccount(id) {
      axios
        .delete("http://localhost:3000/api/accounts/" + id)
        .then((response) => {
          console.log(response);
          this.accounts.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/accounts");
            location.reload();
          }, 5);
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Tài Khoản</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addAccount' }">
          <button :title="titleButtonAdd" class="btn rounded btn-hover-blue" style="background-color: #056299;color: white;font-size:14px;">
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
              <th scope="col">STT</th>
              <th scope="col">Mã TK</th>
              <th scope="col">Tài Khoản</th>
              <th scope="col">Phân Quyền</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã TK</th>
              <th scope="col">Tài Khoản</th>
              <th scope="col">Phân Quyền</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(account, index) in accounts" :key="account.id">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td>{{ account.userId }}</td>
              <td>{{ account.username }}</td>
              <td v-for="role in roles" v-if="role.id == account.role">{{ role.roleName }}</td>
              <td v-if="account.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="account.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td class="align-middle">
                <div class="row" style="margin-left:-15px;">
                  <div class="col-4" style="margin-left:-6px;">
                    <button :title="titleButtonEdit" @click="getDataAccountUpdate(account)" class="btn btn-warning btn-sm h-28px w-28px rounded"
                      type="submit">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-4" style="margin-left:-15px;">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailAccount(account)"
                      data-target="#deleteAccountModal" class="btn btn-danger btn-sm h-28px w-28px rounded">
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
    <div id="deleteAccountModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Tài Khoản</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Tài Khoản {{ account.userId }} </span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataAccount(account.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddAccount = {
  data() {
    return {
      userId: null,
      username: null,
      password: null,
      role: 0,
      status: 0,
      titleUsername: "Nhập thông tin tài khoản",
      titlePassword: "Nhập thông tin mật khẩu",
      titleRole: "Chọn thông tin phân quyền",
      titleStatus: "Chọn thông tin tình trạng",
      hasNumber: false,
      hasLowercase: false,
      hasUppercase: false,
      hasSpecial: false,
      roles: [],
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/roles").then((response) => {
      this.roles = response.data;
    });
  },
  computed: {
    usernameIsValid() {
      return !!this.username;
    },

    passwordIsValid() {
      return !!this.password;
    },

    passwordEnoughLength() {
      return !!this.passwordIsValid && !!(this.password.length < 10);
    },

    passwordHasNumber() {
      return /\d/.test(this.password);
    },

    passwordHasLowercase() {
      return /[a-z]/.test(this.password);
    },

    passwordHasUppercase() {
      return /[A-Z]/.test(this.password);
    },

    passwordHasSpecial() {
      return /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
    },

    passwordStrong() {
      return (
        !this.passwordEnoughLength &&
        this.passwordHasNumber &&
        this.passwordHasLowercase &&
        this.passwordHasUppercase &&
        this.passwordHasSpecial
      );
    },

    passwordMiddle() {
      return (
        (!this.passwordEnoughLength && this.passwordHasNumber) ||
        (!this.passwordEnoughLength && this.passwordHasUppercase) ||
        (!this.passwordEnoughLength && this.passwordHasSpecial)
      );
    },

    passwordWeak() {
      return !!this.passwordIsValid && !!(this.password.length >= 10);
    },

    roleIsValid() {
      return !!this.role;
    },

    statusIsValid() {
      return !!this.status;
    },

    addAccountFormIsValid() {
      return (
        this.usernameIsValid &&
        this.passwordIsValid &&
        this.roleIsValid &&
        this.statusIsValid &&
        this.password.length >= 10
      );
    },

    refreshAccountForm() {
      return (
        this.usernameIsValid ||
        this.passwordIsValid ||
        this.roleIsValid ||
        this.statusIsValid
      );
    },
  },
  methods: {
    submitAddAccountForm() {
      if (this.addAccountFormIsValid) {
        if (this.role == 1) {
          this.userId = "AD###";
        }
        if (this.role == 2) {
          this.userId = "GD###";
        }
        if (this.role == 3) {
          this.userId = "QL###";
        }
        if (this.role == 4) {
          this.userId = "GH###";
        }
        if (this.role == 5) {
          this.userId = "US###";
        }
        if (this.role == 6) {
          this.userId = "LH###";
        }
        if (this.role == 7) {
          this.userId = "DH###";
        }
        if (this.role == 8) {
          this.userId = "TC###";
        }
        axios
          .get(
            "http://localhost:3000/api/accounts/existsUsername?username=" +
              this.username
          )
          .then((response) => {
            if (response.data.bool == true) {
              alertify.alert("Thông báo", "Tài khoản đã tồn tại!", function () {
                alertify.success("Ok");
              });
            } else {
              const account = {
                userId: this.userId,
                username: this.username,
                password: crypt.encrypt(this.password),
                role: this.role,
                status: this.status,
                idTable: 0,
              };
              const url = `http://localhost:3000/api/accounts`;
              axios.post(url, account);
              this.$router.push("/accounts");
              location.reload();
              return 0;
            }
          });
      } else {
        console.log("Invalid Form");
      }
    },

    clearInputAccountForm() {
      if (this.usernameIsValid) {
        this.username = null;
      }
      if (this.passwordIsValid) {
        this.password = null;
      }
      if (this.roleIsValid) {
        this.role = 0;
      }
      if (this.statusIsValid) {
        this.status = 0;
      }
    },

    toListAccount() {
      this.$router.push("/accounts");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Tài Khoản</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddAccountForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Tài Khoản:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều Tài Khoản</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="username">Tài Khoản</label>
            <label class="text-danger">*</label>
            <input type="text" v-bind:title="titleUsername" name="username" id="username" v-model="username"
              class="form-control text-size-13px " placeholder="Nhập Tài khoản..."
              style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="password">Mật Khẩu</label>
            <label class="text-danger">*</label>
            <input v-bind:title="titlePassword" v-model="password" id="password" name="password" type="password"
              class="form-control  text-size-13px " placeholder="Nhập Mật khẩu..."
              style="margin-top: -5px;">
            <span v-if="passwordEnoughLength" class="text-danger text-size-13px">Mật khẩu phải trên 9
              ký tự</span>
            <span v-else-if="passwordStrong" class="text-success text-size-13px">Mật khẩu mạnh</span>
            <span v-else-if="passwordMiddle" class="text-warning text-size-13px">Mật khẩu trung bình</span>
            <span v-else-if="passwordWeak" class="text-danger text-size-13px">Mật khẩu yếu</span>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="role">Phân Quyền</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="role" id="role" name="role"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Phân quyền ---</option>
              <option v-for="role in roles" v-bind:value="role.id">{{ role.roleName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="status">Tình Trạng</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px h-32px form-control" v-model="status"
              name="status" id="status" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Tình trạng ---</option>
              <option v-for="status in statuses" v-bind:value="status.id">{{ status.name }}</option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addAccountFormIsValid" type="submit" class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshAccountForm" @click="clearInputAccountForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListAccount">
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

const EditAccount = {
  data() {
    return {
      username: null,
      usernameEdit: null,
      passwordEdit: null,
      roleEdit: 0,
      statusEdit: 0,
      userIdEdit: null,
      idTableEdit: null,
      titleUsername: "Nhập thông tin tài khoản",
      titlePassword: "Nhập thông tin mật khẩu",
      titleRole: "Chọn thông tin phân quyền",
      titleStatus: "Chọn thông tin tình trạng",
      hasNumber: false,
      hasLowercase: false,
      hasUppercase: false,
      hasSpecial: false,
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      roles: [],
      accounts: [],
      account: {},
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/roles").then((response) => {
      this.roles = response.data;
    });
    axios.get("http://localhost:3000/api/accounts").then((response) => {
      this.accounts = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/accounts/getAccount?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.userIdEdit = response.data.account.userId;
        this.username = response.data.account.username;
        this.usernameEdit = response.data.account.username;
        this.passwordEdit = crypt.decrypt(response.data.account.password);
        this.roleEdit = response.data.account.role;
        this.statusEdit = response.data.account.status;
        this.idTableEdit = response.data.account.idTable;
      });
  },

  computed: {
    usernameIsValid() {
      return !!this.usernameEdit;
    },

    passwordIsValid() {
      return !!this.passwordEdit;
    },

    passwordEnoughLength() {
      return !!this.passwordIsValid && !!(this.passwordEdit.length < 10);
    },

    passwordHasNumber() {
      return /\d/.test(this.passwordEdit);
    },

    passwordHasLowercase() {
      return /[a-z]/.test(this.passwordEdit);
    },

    passwordHasUppercase() {
      return /[A-Z]/.test(this.passwordEdit);
    },

    passwordHasSpecial() {
      return /[!@#\$%\^\&*\)\(+=._-]/.test(this.passwordEdit);
    },

    passwordStrong() {
      return (
        !this.passwordEnoughLength &&
        this.passwordHasNumber &&
        this.passwordHasLowercase &&
        this.passwordHasUppercase &&
        this.passwordHasSpecial
      );
    },

    passwordMiddle() {
      return (
        (!this.passwordEnoughLength && this.passwordHasNumber) ||
        (!this.passwordEnoughLength && this.passwordHasUppercase) ||
        (!this.passwordEnoughLength && this.passwordHasSpecial)
      );
    },

    passwordWeak() {
      return !!this.passwordIsValid && !!(this.passwordEdit.length >= 10);
    },

    roleIsValid() {
      return !!this.roleEdit;
    },

    statusIsValid() {
      return !!this.statusEdit;
    },

    editAccountFormIsValid() {
      return (
        this.usernameIsValid &&
        this.passwordIsValid &&
        this.roleIsValid &&
        this.statusIsValid &&
        this.passwordEdit.length >= 10
      );
    },

    refreshForm() {
      return (
        this.usernameIsValid ||
        this.passwordIsValid ||
        this.roleIsValid ||
        this.statusIsValid
      );
    },
  },
  methods: {
    submitEditAccountForm() {
      if (this.editAccountFormIsValid) {
        const account = {
          userId: this.userIdEdit,
          username: this.usernameEdit,
          password: crypt.encrypt(this.passwordEdit),
          role: this.roleEdit,
          status: this.statusEdit,
          idTable: this.idTableEdit,
          id: this.$route.params.id,
        };
        const url =
          "http://localhost:3000/api/accounts/" + account.id + "/replace";
        axios.post(url, account);
        this.$router.push("/accounts");
        location.reload();
        return 0;
      } else {
        console.log("Invalid Form");
      }
    },

    clearInput() {
      if (this.usernameIsValid) {
        this.usernameEdit = null;
      }
      if (this.passwordIsValid) {
        this.passwordEdit = null;
      }
      if (this.roleIsValid) {
        this.roleEdit = 0;
      }
      if (this.statusIsValid) {
        this.statusEdit = 0;
      }
    },

    toListAccount() {
      this.$router.push("/accounts");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Tài Khoản</h6>
  </div>
  <div class="card-body">
    <form @submit.prevent="submitEditAccountForm" action="POST" method="" autocomplete="off">
      <div class="row mt-2">
        <div class="col-lg-4">
          <label class="font-weight-bold text-size-15px">Thông Tin Tài Khoản:</label>
          <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Tài Khoản</p>
        </div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="usernameEdit">Tài Khoản</label>
          <label class="text-danger">*</label>
          <input type="text" v-bind:title="titleUsername" v-model="usernameEdit" id="usernameEdit"
            name="usernameEdit" class="form-control text-size-13px " placeholder="Nhập Tài khoản..."
            :value="usernameEdit" v-on:keyup="usernameEdit = $event.target.value"
            style="margin-top: -5px;">
        </div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="passwordEdit">Mật Khẩu</label>
          <label class="text-danger">*</label>
          <input v-bind:title="titlePassword" v-model="passwordEdit" id="passwordEdit" name="passwordEdit"
            type="password" class="form-control  text-size-13px " placeholder="Nhập Mật khẩu..."
            :value="passwordEdit" v-on:keyup="passwordEdit = $event.target.value" style="margin-top: -5px;">
          <span v-if="passwordEnoughLength" class="text-danger text-size-13px">Mật khẩu phải trên 9
            ký tự</span>
          <span v-else-if="passwordStrong" class="text-success text-size-13px">Mật khẩu mạnh</span>
          <span v-else-if="passwordMiddle" class="text-warning text-size-13px">Mật khẩu trung bình</span>
          <span v-else-if="passwordWeak" class="text-danger text-size-13px">Mật khẩu yếu</span>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="roleEdit">Phân Quyền</label>
          <label class="text-danger">*</label>
          <select class="custom-select  text-size-13px  h-32px" v-model="roleEdit" id="roleEdit" name="roleEdit"
            style="margin-top: -5px;">
            <option value="0" disabled>--- Chọn Phân quyền ---</option>
            <option v-for="role in roles" v-bind:value ="role.id" :selected="role.id == roleEdit">{{ role.roleName }}</option>
          </select>
        </div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="statusEdit">Tình Trạng</label>
          <label class="text-danger">*</label>
          <select class="custom-select  text-size-13px h-32px form-control" v-model="statusEdit" name="statusEdit"
            id="statusEdit" style="margin-top: -5px;">
            <option value="0" disabled>--- Chọn Tình trạng ---</option>
            <option v-for="status in statuses" v-bind:value="status.id" :selected="status.id == statusEdit">{{ status.name }}</option>
          </select>
        </div>
      </div>
      <div class="row" style="margin-top: 30px;">
        <div class="col-12">
          <div style="float:right">
            <button :disabled="!editAccountFormIsValid" type="submit"
              class="btn rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right; margin-right: 10px;">
            <button :disabled="!refreshForm" @click="clearInput"
              class="btn btn-success rounded" style="font-size:13px;">
              <i class="fas fa-sync-alt"></i>
              &nbsp;Làm mới
            </button>
          </div>
          <div style="float:right; margin-right: 360px;">
            <button class="btn rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;" @click="toListAccount">
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

/* MANAGER */
const Manager = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListManager = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Quản lý",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Quản Lý",
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Ngừng hoạt động" },
      ],
      managers: [],
      manager: {},
      positions: [],
      birthdayFormat: null,
      image: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/managers").then((response) => {
      this.managers = response.data;
    });
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
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
    getDetailManager(manager) {
      this.manager = manager;
      this.image =
        `
      <img class="img-fluid img-thumbnail rounded-circle" src="../api/Photos/manager/download/` +
        this.manager.image +
        `" width="100px"
      height="100px" alt="manager-image"/>
      `;
      this.birthdayFormat = this.formatDate(this.manager.birthday);
    },

    getDataManagerUpdate(manager) {
      this.$router.push({ name: "editManager", params: { id: manager.id } });
    },

    deleteDataManager(id) {
      axios
        .delete("http://localhost:3000/api/managers/" + id)
        .then((response) => {
          console.log(response);
          this.managers.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/managers");
            location.reload();
          }, 10);
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh Sách Quản Lý</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addManager' }">
            <button :title="titleButtonAdd" class="btn rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:14px;">
              <i class="fas fa-plus fa-sm"></i>
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
              <th>Chức Vụ</th>
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
              <th>Quê Quán</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(manager, index) in managers" :key="manager.id">
              <th>{{ index + 1 }}</th>
              <td>{{ manager.fullName }}</td>
              <td>{{ manager.phone }}</td>
              <td>{{ manager.email }}</td>
              <td v-for="department in positions" v-if="department.id == manager.position">{{ department.positionType }}</td>
              <td>{{ manager.homeland }}</td>
              <td v-if="manager.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="manager.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td>
                <div class="row" style="margin-left:-13px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailManager(manager)"
                      data-target="#detailManagerModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonEdit" @click="getDataManagerUpdate(manager)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -14px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailManager(manager)"
                      data-target="#deleteManagerModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -28px;">
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
    <div id="deleteManagerModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Người Quản Lý</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Người Quản Lý {{ manager.managerId }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataManager(manager.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="detailManagerModal" class="modal modal-edu-general default-popup-PrimaryModal fade rounded"
      role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Chi tiết Người Quản Lý</h4>
            <div class="modal-close-area modal-close-df bg-danger"
              style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4 text-center" v-if="manager.image != null">
                <div v-html="image"></div>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ manager.managerId }}</p>
              </div>
              <div class="col-sm-4 text-center" v-if="manager.image == null">
              <img class="img-fluid img-thumbnail rounded-circle" src="../images/default_image.png" width="100px"
              height="100px" alt="manager-image"/>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ manager.managerId }}</p>
              </div>
              <div class="col-sm-8 mt-3">
                <p class="text-uppercase font-weight-bold" style="font-size: larger;">{{ manager.christianName }} {{ manager.fullName }}
                </p>
                <div style="margin-left: 12px;">
                <span class="font-weight-bold">Ngày
                  Sinh:</span><span> &nbsp;{{ birthdayFormat }}</span><br>
                <span class="font-weight-bold ">SĐT:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ manager.phone}}</span><br>
                <span class="font-weight-bold ">Email:</span>
                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;{{ manager.email }}</span><br>
                <span class="font-weight-bold ">Chức Vụ:</span>
                <span v-for="department in positions" v-if="department.id == manager.position"> 
                &nbsp;&nbsp;&nbsp;{{ department.positionType}} - {{ department.name }}</span><br>
                <span class="font-weight-bold ">Quê Quán:</span>
                <span> &nbsp;{{ manager.homeland }}</span><br>
                <span class="font-weight-bold ">Trạng Thái:&nbsp;</span>
                <span v-if="manager.status == 1"> 
                  <i class="fas fa-toggle-on fa-lg text-success"></i>
                </span>
                <span v-if="manager.status == 2"> 
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

const AddManager = {
  data() {
    return {
      id: 0,
      managerId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      email: null,
      image: null,
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
      managers: [],
      selectedFile: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios.get("http://localhost:3000/api/managers").then((response) => {
      this.managers = response.data;
    });
  },
  computed: {
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

    addManagerFormIsValid() {
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
        this.statusIsValid
      );
    },

    refreshFormManager() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid
      );
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitAddManagerForm() {
      if (this.addManagerFormIsValid) {
        let lengthManagers = this.managers.length;
        if (lengthManagers == 0) {
          this.managerId == "MN001";
        } else {
          let currentId = this.managers[lengthManagers - 1].id;
          if (currentId > -1 && currentId < 9) {
            this.managerId = "MN00" + (currentId + 1);
          }
          if (currentId > 8 && currentId < 99) {
            this.managerId = "MN0" + (currentId + 1);
          }
          if (currentId > 98 && currentId < 999) {
            this.managerId = "MN" + (currentId + 1);
          }
        }
        axios
          .get(
            "http://localhost:3000/api/managers/existsEmail?email=" + this.email
          )
          .then((response) => {
            if (response.data.bool == true) {
              alertify.alert("Thông báo", "Email đã tồn tại!", function () {
                alertify.success("Ok");
              });
            } else {
              axios
                .get(
                  "http://localhost:3000/api/managers/existsPhone?phone=" +
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
                      "Tuổi của người quản lý nhỏ hơn 28!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else if (crypt.getAge(this.birthday) > 60) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của người quản lý lớn hơn 60!",
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
                        this.managerId +
                        this.selectedFile.name.slice(start, end);
                    }
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
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
                          response.data.department.positionType == "Quản Lý" ||
                          response.data.department.positionType == "Quản lý" ||
                          response.data.department.positionType == "quản lý"
                        ) {
                          role = 3;
                        }
                        if (
                          response.data.department.positionType == "Giám Đốc" ||
                          response.data.department.positionType == "Giám đốc" ||
                          response.data.department.positionType == "giám đốc"
                        ) {
                          role = 2;
                        }
                        if (
                          response.data.department.positionType == "Giám Học" ||
                          response.data.department.positionType == "Giám học" ||
                          response.data.department.positionType == "giám học"
                        ) {
                          role = 4;
                        }
                        const url_1 = "http://localhost:3000/api/managers";
                        axios.post(url_1, manager);
                        axios
                          .get(
                            "http://localhost:3000/api/managers/findOne?filter[where][email]=" +
                              this.email
                          )
                          .then((resp) => {
                            const account_manager = {
                              userId: resp.data.managerId,
                              username: resp.data.email,
                              password: crypt.encrypt(resp.data.phone),
                              role: role,
                              status: resp.data.status,
                              idTable: resp.data.id,
                            };
                            const url = "http://localhost:3000/api/accounts";
                            axios.post(url, account_manager);
                            if (this.selectedFile != null) {
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/manager/upload?filename=" +
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
                      this.$router.push("/managers");
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

    clearInputManagerForm() {
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

    toListManager() {
      this.$router.push("/managers");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Quản Lý</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddManagerForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Quản Lý:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều người Quản Lý</p>
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
              v-if="department.name == 'Headquarter' || department.name == 'headquarter'">{{ department.positionType }} - {{ department.name }}
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
            <label class="font-weight-bold col-form-label" for="homeland">Quê Quán</label>
            <label class="text-danger">*</label>
            <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
              class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
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
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture" class="form-control rounded text-size-13px" style="margin-top: -5px;"/>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addManagerFormIsValid" type="submit"
                class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormManager" @click="clearInputManagerForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListManager">
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

const EditManager = {
  data() {
    return {
      id: 0,
      managerId: null,
      christianName: null,
      fullName: null,
      birthday: null,
      phone: null,
      email: null,
      image: null,
      imageEdit: null,
      position: 0,
      homeland: null,
      status: 0,
      emailEdit: null,
      phoneEdit: null,
      titlePicture: "Chọn hình ảnh",
      titleBirthday: "Nhập thông tin ngày sinh",
      titleChristianName: "Nhập thông tin tên Thánh",
      titleFullName: "Nhập thông tin họ và tên",
      titlePhone: "Nhập thông tin số điện thoại",
      titleEmail: "Nhập thông tin địa chỉ email",
      titleHomeland: "Nhập thông tin quê quán",
      checkEmail: false,
      checkPhone: false,
      statuses: [
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Vô hiệu hóa" },
      ],
      positions: [],
      managers: [],
      manager: {},
      selectedFile: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/managers").then((response) => {
      this.managers = response.data;
    });
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.positions = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/managers/getManager?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.managerId = response.data.manager.managerId;
        this.christianName = response.data.manager.christianName;
        this.fullName = response.data.manager.fullName;
        this.birthday = crypt.formatDate(response.data.manager.birthday);
        this.phone = response.data.manager.phone;
        this.phoneEdit = response.data.manager.phone;
        this.email = response.data.manager.email;
        this.emailEdit = response.data.manager.email;
        this.imageEdit = response.data.manager.image;
        this.position = response.data.manager.position;
        this.homeland = response.data.manager.homeland;
        this.status = response.data.manager.status;
      });
  },
  computed: {
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

    editManagerFormIsValid() {
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
        this.statusIsValid
      );
    },

    refreshFormManager() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.positionIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid ||
        this.statusIsValid
      );
    },
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitEditManagerForm() {
      if (this.editManagerFormIsValid) {
        if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
          if (crypt.getAge(this.birthday) < 28) {
            alertify.alert(
              "Thông báo",
              "Tuổi của người quản lý nhỏ hơn 28!",
              function () {
                alertify.success("Ok");
              }
            );
          } else if (crypt.getAge(this.birthday) > 60) {
            alertify.alert(
              "Thông báo",
              "Tuổi của người quản lý lớn hơn 60!",
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
                this.managerId + this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const manager = {
                  managerId: this.managerId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/managers/" +
                  manager.id +
                  "/replace";
                axios.post(url, manager);
                axios
                  .delete(
                    "http://localhost:3000/api/Photos/manager/files/" +
                      this.imageEdit
                  )
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => console.log(err));
                axios
                  .post(
                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              } else {
                const manager = {
                  managerId: this.managerId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: fileName,
                  position: this.position,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.$route.params.id,
                };
                const url =
                  "http://localhost:3000/api/managers/" +
                  manager.id +
                  "/replace";
                axios.post(url, manager);
                axios
                  .post(
                    "http://localhost:3000/api/Photos/manager/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              }
            } else {
              const manager = {
                managerId: this.managerId,
                christianName: this.christianName,
                fullName: this.fullName,
                birthday: this.birthday,
                phone: this.phone,
                email: this.email,
                image: this.imageEdit,
                position: this.position,
                homeland: this.homeland,
                status: this.status,
                id: this.$route.params.id,
              };
              const url =
                "http://localhost:3000/api/managers/" + manager.id + "/replace";
              axios.post(url, manager);
            }
            this.$router.push("/managers");
            location.reload();
            return 0;
          }
        } else if (
          this.emailEdit != this.email &&
          this.phoneEdit == this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/managers/existsEmail?email=" +
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
                  "Tuổi của người quản lý nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 60) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người quản lý lớn hơn 60!",
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
                    this.managerId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    const url =
                      "http://localhost:3000/api/managers/" +
                      manager.id +
                      "/replace";
                    axios.post(url, manager);
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/manager/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    const url =
                      "http://localhost:3000/api/managers/" +
                      manager.id +
                      "/replace";
                    axios.post(url, manager);
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  const manager = {
                    managerId: this.managerId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    image: this.imageEdit,
                    position: this.position,
                    homeland: this.homeland,
                    status: this.status,
                    id: this.$route.params.id,
                  };
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                }
                this.$router.push("/managers");
                location.reload();
                return 0;
              }
            });
        } else if (
          this.emailEdit == this.email &&
          this.phoneEdit != this.phone
        ) {
          axios
            .get(
              "http://localhost:3000/api/managers/existsPhone?phone=" +
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
                  "Tuổi của người quản lý nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 60) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người quản lý lớn hơn 60!",
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
                    this.managerId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    const url =
                      "http://localhost:3000/api/managers/" +
                      manager.id +
                      "/replace";
                    axios.post(url, manager);
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/manager/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: fileName,
                      position: this.position,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.$route.params.id,
                    };
                    const url =
                      "http://localhost:3000/api/managers/" +
                      manager.id +
                      "/replace";
                    axios.post(url, manager);
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/manager/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  const manager = {
                    managerId: this.managerId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    image: this.imageEdit,
                    position: this.position,
                    homeland: this.homeland,
                    status: this.status,
                    id: this.$route.params.id,
                  };
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                }
                this.$router.push("/managers");
                location.reload();
                return 0;
              }
            });
        } else {
          axios
            .get(
              "http://localhost:3000/api/managers/existsEmail?email=" +
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
                    "http://localhost:3000/api/managers/existsPhone?phone=" +
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
                        "Tuổi của người quản lý nhỏ hơn 28!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else if (crypt.getAge(this.birthday) > 60) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của người quản lý lớn hơn 60!",
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
                          this.managerId +
                          this.selectedFile.name.slice(start, end);
                        if (this.imageEdit != null) {
                          const manager = {
                            managerId: this.managerId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            image: fileName,
                            position: this.position,
                            homeland: this.homeland,
                            status: this.status,
                            id: this.$route.params.id,
                          };
                          const url =
                            "http://localhost:3000/api/managers/" +
                            manager.id +
                            "/replace";
                          axios.post(url, manager);
                          axios
                            .delete(
                              "http://localhost:3000/api/Photos/manager/files/" +
                                this.imageEdit
                            )
                            .then((resp) => {
                              console.log(resp);
                            })
                            .catch((err) => console.log(err));
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        } else {
                          const manager = {
                            managerId: this.managerId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            image: fileName,
                            position: this.position,
                            homeland: this.homeland,
                            status: this.status,
                            id: this.$route.params.id,
                          };
                          const url =
                            "http://localhost:3000/api/managers/" +
                            manager.id +
                            "/replace";
                          axios.post(url, manager);
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        }
                      } else {
                        const manager = {
                          managerId: this.managerId,
                          christianName: this.christianName,
                          fullName: this.fullName,
                          birthday: this.birthday,
                          phone: this.phone,
                          email: this.email,
                          image: this.imageEdit,
                          position: this.position,
                          homeland: this.homeland,
                          status: this.status,
                          id: this.$route.params.id,
                        };
                        const url =
                          "http://localhost:3000/api/managers/" +
                          manager.id +
                          "/replace";
                        axios.post(url, manager);
                      }
                      this.$router.push("/managers");
                      location.reload();
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

    clearInputManagerForm() {
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

    toListManager() {
      this.$router.push("/managers");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Quản Lý</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditManagerForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Quản Lý:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều người Quản Lý</p>
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
              <option v-for="department in positions" v-bind:value="department.id" v-if="department.name == 'Headquarter' 
              || department.name == 'headquarter'" :selected="manager.position == department.id">{{ department.positionType }} - {{ department.name }}
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
            <label class=" font-weight-bold col-form-label" for="homeland">Quê Quán</label>
            <label class="text-danger">*</label>
            <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
            :value="homeland" v-on:keyup="homeland = $event.target.value"
              class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id" :selected="manager.status == status.id">{{ status.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editManagerFormIsValid" type="submit"
                class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormManager" @click="clearInputManagerForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListManager">
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
/*DEPARTMENT*/
const Department = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListDepartment = {
  data() {
    return {
      department: {},
      departments: [],
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Phòng ban",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Phòng Ban",
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.departments = response.data;
    });
  },
  computed: {},
  methods: {
    getDetailDepartment(department) {
      this.department = department;
    },

    getDataDepartmentUpdate(department) {
      this.$router.push({
        name: "editDepartment",
        params: { id: department.id },
      });
    },

    deleteDataDepartment(id) {
      axios
        .delete("http://localhost:3000/api/departments/" + id)
        .then((response) => {
          console.log(response);
          this.departments.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/departments");
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
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Phòng Ban</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addDepartment' }">
          <button :title="titleButtonAdd" class="btn text-size-15px rounded btn-hover-blue" style="background-color: #056299;color: white;">
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
              <th scope="col">ID</th>
              <th scope="col">Tên Phòng Ban</th>
              <th scope="col">Kiểu Chức Vụ</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên Phòng Ban</th>
              <th scope="col">Kiểu Chức Vụ</th>
              <th scope="col">Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(department, index) in departments" :key="department.id">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td>{{ department.name }}</td>
              <td>{{ department.positionType }}</td>
              <td class="align-middle">
                <div class="row">
                  <div class="col-sm-4">
                    <button :title="titleButtonEdit" @click="getDataDepartmentUpdate(department)" class="btn btn-warning btn-sm h-28px w-28px rounded"
                      type="submit">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-sm-4" style="margin-left:-37px;">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailDepartment(department)"
                      data-target="#deleteDepartmentModal" class="btn btn-danger btn-sm h-28px w-28px rounded">
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
    <div id="deleteDepartmentModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Chức Vụ</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Chức Vụ {{ department.positionType }}-{{ department.name }} </span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataDepartment(department.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddDepartment = {
  data() {
    return {
      name: null,
      positionType: null,
      titleName: "Nhập Tên Phòng Ban",
      titlePositionType: "Nhập Loại Chức Vụ",
    };
  },
  mounted() {},
  computed: {
    nameIsValid() {
      return !!this.name;
    },

    positionTypeIsValid() {
      return !!this.positionType;
    },

    addDepartmentFormIsValid() {
      return this.nameIsValid && this.positionTypeIsValid;
    },

    refreshAddDepartmentForm() {
      return this.nameIsValid || this.positionTypeIsValid;
    },
  },
  methods: {
    submitAddDepaertmentForm() {
      if (this.addDepartmentFormIsValid) {
        const department = {
          name: this.name,
          positionType: this.positionType,
        };
        const url = `http://localhost:3000/api/departments`;
        axios.post(url, department);
        this.$router.push("/departments");
        location.reload();
        return 0;
      } else {
        console.log("Invalid Form");
      }
    },

    clearInputDepartmentForm() {
      if (this.nameIsValid) {
        this.name = null;
      }
      if (this.positionTypeIsValid) {
        this.positionType = null;
      }
    },
    toListDepartment() {
      this.$router.push("/departments");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Phòng Ban</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddDepaertmentForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Phòng Ban:</label>
            <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Phòng Ban</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="name">Tên Phòng Ban</label>
            <label class="text-danger">*</label>
            <input type="text" v-bind:title="titleName" name="name" id="name" v-model="name"
              class="form-control text-size-13px " placeholder="Nhập Tên Phòng Ban..."
              style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="positionType">Kiểu Chức Vụ</label>
            <label class="text-danger">*</label>
            <input v-bind:title="titlePositionType" v-model="positionType" id="positionType" name="positionType" type="text"
              class="form-control  text-size-13px " placeholder="Nhập Kiểu Chức Vụ..."
              style="margin-top: -5px;">
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addDepartmentFormIsValid" type="submit" class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshAddDepartmentForm" @click="clearInputDepartmentForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListDepartment">
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

const EditDepartment = {
  data() {
    return {
      name: null,
      positionType: null,
      titleName: "Nhập Tên Phòng Ban",
      titlePositionType: "Nhập Loại Chức Vụ",
      departments: [],
      department: {},
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/departments").then((response) => {
      this.departments = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/departments/getDepartment?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.name = response.data.department.name;
        this.positionType = response.data.department.positionType;
      });
  },
  computed: {
    nameIsValid() {
      return !!this.name;
    },

    positionTypeIsValid() {
      return !!this.positionType;
    },

    editDepartmentFormIsValid() {
      return this.nameIsValid && this.positionTypeIsValid;
    },

    refreshEditDepartmentForm() {
      return this.nameIsValid || this.positionTypeIsValid;
    },
  },
  methods: {
    submitEditDepartmentForm() {
      if (this.editDepartmentFormIsValid) {
        const department = {
          name: this.name,
          positionType: this.positionType,
          id: this.$route.params.id,
        };
        const url =
          "http://localhost:3000/api/departments/" + department.id + "/replace";
        axios.post(url, department);
        this.$router.push("/departments");
        location.reload();
        return 0;
      } else {
        console.log("Invalid Form");
      }
    },

    clearInputDepartmentForm() {
      if (this.nameIsValid) {
        this.name = null;
      }
      if (this.positionTypeIsValid) {
        this.positionType = null;
      }
    },

    toListDepartment() {
      this.$router.push("/departments");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Phòng Ban</h6>
  </div>
  <div class="card-body">
    <form @submit.prevent="submitEditDepartmentForm" action="POST" method="" autocomplete="off">
      <div class="row mt-2">
        <div class="col-lg-4">
          <label class="font-weight-bold">Thông Tin Phòng Ban:</label>
          <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Phòng Ban</p>
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="name">Tên Phòng Ban</label>
          <label class="text-danger">*</label>
          <input type="text" v-bind:title="titleName" v-model="name" id="name"
            name="name" class="form-control text-size-13px " placeholder="Nhập Tên Phòng Ban..."
            :value="name" v-on:keyup="name = $event.target.value"
            style="margin-top: -5px;">
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="positionType">Kiểu Chức Vụ</label>
          <label class="text-danger">*</label>
          <input v-bind:title="titlePositionType" v-model="positionType" id="positionType" name="positionType"
            type="text" class="form-control  text-size-13px " placeholder="Nhập Kiểu Chức Vụ..."
            :value="positionType" v-on:keyup="positionType = $event.target.value" style="margin-top: -5px;">
        </div>
      </div>
      <div class="row" style="margin-top: 30px;">
        <div class="col-12">
          <div style="float:right">
            <button :disabled="!editDepartmentFormIsValid" type="submit"
              class="btn text-size-15px rounded btn-hover-blue"
              style="background-color: #056299;color: white;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right; margin-right: 10px;">
          <button :disabled="!refreshEditDepartmentForm" @click="clearInputDepartmentForm"
            class="btn btn-success text-size-15px rounded">
            <i class="fas fa-sync-alt"></i>
            &nbsp;Làm mới
          </button>
        </div>
        <div style="float:right; margin-right: 335px;">
          <button class="btn text-size-15px rounded btn-hover-blue"
            style="background-color: #056299;color: white;" @click="toListDepartment">
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
// CANDIDATE
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

    deleteDataCandidate(id) {
      axios
        .delete("http://localhost:3000/api/candidates/" + id)
        .then((response) => {
          console.log(response);
          this.candidates.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/candidates");
            location.reload();
          }, 10);
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
              <th>Cộng Đoàn</th>
              <th>Quê Quán</th>
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
              <td>{{ candidate.homeland }}</td>
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
                    <button :title="titleButtonEdit" @click="getDataCandidateUpdate(candidate)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -12.5px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailCandidate(candidate)"
                      data-target="#deleteCandidateModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -25.5px;">
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
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataCandidate(candidate.id)">
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
                    const account = {
                      userId: this.candidateId,
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
                          });
                      });
                    setTimeout(() => {
                      this.$router.push("/candidates");
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
                  id: this.$route.params.id,
                };
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
              const url =
                "http://localhost:3000/api/candidates/" +
                candidate.id +
                "/replace";
              axios.post(url, candidate);
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
              this.$router.push("/candidates");
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
                const candidate = {
                  candidateId: null,
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
                    this.candidateId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    candidate = {
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
                  } else {
                    candidate = {
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
                } else {
                  candidate = {
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
                            "http://localhost:3000/api/candidates/" +
                            candidate.id +
                            "/replace";
                          axios.post(url, candidate);
                        });
                    });
                }
                setTimeout(() => {
                  this.$router.push("/candidates");
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
                const candidate = {
                  candidateId: null,
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
                    this.candidateId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    candidate = {
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
                  } else {
                    candidate = {
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
                } else {
                  candidate = {
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
                            "http://localhost:3000/api/candidates/" +
                            candidate.id +
                            "/replace";
                          axios.post(url, candidate);
                        });
                    });
                }
                setTimeout(() => {
                  this.$router.push("/candidates");
                  location.reload();
                }, 100);
                return 0;
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
                      const candidate = {
                        candidateId: null,
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
                          this.candidateId +
                          this.selectedFile.name.slice(start, end);
                        if (this.imageEdit != null) {
                          candidate = {
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
                        } else {
                          candidate = {
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
                      } else {
                        candidate = {
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
                                  "http://localhost:3000/api/candidates/" +
                                  candidate.id +
                                  "/replace";
                                axios.post(url, candidate);
                              });
                          });
                      }
                      setTimeout(() => {
                        this.$router.push("/candidates");
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
//COMMUNITY
const Community = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListCommunity = {
  data() {
    return {
      community: {},
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Cộng đoàn",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Cộng đoàn",
      communities: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/communities").then((response) => {
      this.communities = response.data;
    });
  },
  computed: {},
  methods: {
    getDetailCommunity(community) {
      this.community = community;
    },

    getDataCommunityUpdate(community) {
      this.$router.push({
        name: "editCommunity",
        params: { id: community.id },
      });
    },

    deleteDataCommunity(id) {
      axios
        .delete("http://localhost:3000/api/communities/" + id)
        .then((response) => {
          console.log(response);
          this.communities.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/communities");
            location.reload();
          }, 5);
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Cộng Đoàn</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addCommunity' }">
          <button :title="titleButtonAdd" class="btn  rounded btn-hover-blue" style="background-color: #056299;color: white;font-size:14px;">
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
              <th scope="col">ID</th>
              <th scope="col">Tên Cộng Đoàn</th>
              <th scope="col">Ngày Bổn Mạng</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">Số Người</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên Cộng Đoàn</th>
              <th scope="col">Ngày Bổn Mạng</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">Số Người</th>
              <th scope="col">Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(community, index) in communities" :key="community.id">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td>{{ community.communityName }}</td>
              <td>{{ crypt.formatDate(community.patron) }}</td>
              <td>{{ community.address }}</td>
              <td>{{ community.amount }}</td>
              <td class="align-middle">
                <div class="row" style="margin-left:-15px;">
                  <div class="col-4" style="margin-left:-6px;">
                    <button :title="titleButtonEdit" @click="getDataCommunityUpdate(community)" class="btn btn-warning btn-sm h-28px w-28px rounded"
                      type="submit">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-4" style="margin-left:-7px;">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailCommunity(community)"
                      data-target="#deleteCommunityModal" class="btn btn-danger btn-sm h-28px w-28px rounded">
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
    <div id="deleteCommunityModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Cộng Đoàn</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Cộng đoàn {{ community.communityName }} </span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataCommunity(community.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddCommunity = {
  data() {
    return {
      communityName: null,
      patron: null,
      address: null,
      amount: 0,
      titleCommunityName: "Nhập thông tin tên cộng đoàn",
      titlePatron: "Nhập thông tin ngày bổn mạng",
      titleAddress: "Nhập thông tin địa chỉ",
      titleAmount: "Nhập thông tin số lượng người",
    };
  },
  mounted() {},
  computed: {
    communityNameIsValid() {
      return !!this.communityName;
    },

    patronIsValid() {
      return !!this.patron;
    },

    addressIsValid() {
      return !!this.address;
    },

    amountIsValid() {
      return !!(this.amount > -1);
    },

    addCommunityFormIsValid() {
      return (
        this.communityNameIsValid &&
        this.patronIsValid &&
        this.addressIsValid &&
        this.amountIsValid
      );
    },

    refreshCommunityForm() {
      return (
        this.communityNameIsValid ||
        this.patronIsValid ||
        this.addressIsValid ||
        this.amountIsValid
      );
    },
  },
  methods: {
    submitAddCommunityForm() {
      if (this.addCommunityFormIsValid) {
        const community = {
          communityName: this.communityName,
          patron: this.patron,
          address: this.address,
          amount: this.amount,
        };
        const url = `http://localhost:3000/api/communities`;
        axios.post(url, community);
        this.$router.push("/communities");
        location.reload();
        return 0;
      } else {
        console.log("Invalid Form");
      }
    },

    clearInputCommunityForm() {
      if (this.communityNameIsValid) {
        this.communityName = null;
      }
      if (this.patronIsValid) {
        this.patron = null;
      }
      if (this.addressIsValid) {
        this.address = null;
      }
      if (this.amountIsValid) {
        this.amount = 0;
      }
    },

    toListCommunity() {
      this.$router.push("/communities");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Cộng Đoàn</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddCommunityForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Cộng Đoàn:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc quản lý nhiều Cộng đoàn</p>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="communityName">Tên Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <input type="text" v-bind:title="titleCommunityName" name="communityName" id="communityName" v-model="communityName"
              class="form-control text-size-13px " placeholder="Nhập Tên Cộng Đoàn..."
              style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="patron">Ngày Bổn Mạng</label>
            <label class="text-danger">*</label>
            <input v-bind:title="titlePatron" v-model="patron" id="patron" name="patron" type="date"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="address">Địa Chỉ</label>
            <label class="text-danger">*</label>
            <input type="text" v-bind:title="titleAddress" name="address" id="address" v-model="address"
            class="form-control text-size-13px " placeholder="Nhập Địa Chỉ..."
            style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="amount">Số Người</label>
            <label class="text-danger">*</label>
            <input type="number" v-bind:title="titleAmount" name="amount" id="amount" v-model="amount"
            class="form-control text-size-13px " placeholder="Nhập Sồ Lượng Người..."
            style="margin-top: -5px;">
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addCommunityFormIsValid" type="submit" class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshCommunityForm" @click="clearInputCommunityForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;"  @click="toListCommunity">
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

const EditCommunity = {
  data() {
    return {
      communityName: null,
      patron: null,
      address: null,
      amount: -1,
      titleCommunityName: "Nhập thông tin tên cộng đoàn",
      titlePatron: "Nhập thông tin ngày bổn mạng",
      titleAddress: "Nhập thông tin địa chỉ",
      titleAmount: "Nhập thông tin số lượng người",
      community: {},
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/api/communities/getCommunity?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.communityName = response.data.community.communityName;
        this.patron = crypt.formatDate(response.data.community.patron);
        this.address = response.data.community.address;
        this.amount = response.data.community.amount;
      });
  },
  computed: {
    communityNameIsValid() {
      return !!this.communityName;
    },

    patronIsValid() {
      return !!this.patron;
    },

    addressIsValid() {
      return !!this.address;
    },

    amountIsValid() {
      return !!this.amount;
    },

    editCommunityFormIsValid() {
      return (
        this.communityNameIsValid &&
        this.patronIsValid &&
        this.addressIsValid &&
        this.amountIsValid
      );
    },

    refreshCommunityForm() {
      return (
        this.communityNameIsValid ||
        this.patronIsValid ||
        this.addressIsValid ||
        this.amountIsValid
      );
    },
  },
  methods: {
    submitEditCommunityForm() {
      if (this.editCommunityFormIsValid) {
        const community = {
          communityName: this.communityName,
          patron: this.patron,
          address: this.address,
          amount: this.amount,
          id: this.$route.params.id,
        };
        const url =
          "http://localhost:3000/api/communities/" + community.id + "/replace";
        axios.post(url, community);
        this.$router.push("/communities");
        location.reload();
        return 0;
      } else {
        console.log("Invalid Form");
      }
    },

    clearInputCommunityForm() {
      if (this.communityNameIsValid) {
        this.communityName = null;
      }
      if (this.patronIsValid) {
        this.patron = null;
      }
      if (this.addressIsValid) {
        this.address = null;
      }
      if (this.amountIsValid) {
        this.amount = 0;
      }
    },

    toListCommunity() {
      this.$router.push("/communities");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Cộng Đoàn</h6>
  </div>
  <div class="card-body">
    <form @submit.prevent="submitEditCommunityForm" action="POST" method="" autocomplete="off">
      <div class="row mt-2">
        <div class="col-lg-4">
          <label class="font-weight-bold" stylr="font-size:15px;">Thông Tin Cộng Đoàn:</label>
          <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Cộng Đoàn</p>
        </div>
        <div class="col-lg-4">
          <label class=" font-weight-bold col-form-label" for="communityName">Tên Cộng Đoàn</label>
          <label class="text-danger">*</label>
          <input type="text" v-bind:title="titleCommunityName" v-model="communityName" id="communityName"
            name="communityName" class="form-control text-size-13px " placeholder="Nhập Tên Cộng Đoàn..."
            :value="communityName" v-on:keyup="communityName = $event.target.value"
            style="margin-top: -5px;">
        </div>
        <div class="col-lg-4">
          <label class=" font-weight-bold col-form-label" for="patron">Ngày Bổn Mạng</label>
          <label class="text-danger">*</label>
          <input v-bind:title="titlePatron" v-model="patron" id="patron" name="patron"
            type="date" class="form-control  text-size-13px " placeholder="Nhập Mật khẩu..."
            :value="patron" v-on:keyup="patron = $event.target.value" style="margin-top: -5px;">
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <label class=" font-weight-bold col-form-label" for="address">Địa Chỉ</label>
          <label class="text-danger">*</label>
          <input type="text" v-bind:title="titleAddress" v-model="address" id="address"
            name="address" class="form-control text-size-13px " placeholder="Nhập Địa Chỉ..."
            :value="address" v-on:keyup="address = $event.target.value"
            style="margin-top: -5px;">
        </div>
        <div class="col-lg-4">
          <label class=" font-weight-bold col-form-label" for="amount">Số Lượng Người</label>
          <label class="text-danger">*</label>
          <input type="number" v-bind:title="titleAmount" v-model="amount" id="amount"
            name="amount" class="form-control text-size-13px " placeholder="Nhập Địa Chỉ..."
            :value="amount" v-on:keyup="amount = $event.target.value"
            style="margin-top: -5px;">
        </div>
      </div>
      <div class="row" style="margin-top: 30px;">
        <div class="col-12">
          <div style="float:right">
            <button :disabled="!editCommunityFormIsValid" type="submit"
              class="btn  rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right; margin-right: 10px;">
            <button :disabled="!refreshCommunityForm" @click="clearInputCommunityForm"
              class="btn btn-success  rounded" style="font-size:13px;">
              <i class="fas fa-sync-alt"></i>
              &nbsp;Làm mới
            </button>
          </div>
          <div style="float:right; margin-right: 360px;">
            <button class="btn  rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;" @click="toListCommunity">
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
//COMPANION
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
      image: null,
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
      this.image =
        `
      <img class="img-fluid img-thumbnail rounded-circle" src="../api/Photos/companion/download/` +
        this.companion.image +
        `" width="100px"
      height="100px" alt="companion-image"/>
      `;
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
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Người Đồng Hành</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addCompanion' }">
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
            <tr v-for="(companion, index) in companions" :key="companion.id">
              <th>{{ index + 1 }}</th>
              <td>{{ companion.fullName }}</td>
              <td>{{ companion.phone }}</td>
              <td>{{ companion.email }}</td>
              <td v-for="grCom in groupCommunities" v-if="grCom.id == companion.groupCommunity">{{ grCom.name }}</td>
              <td v-if="companion.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="companion.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td>
                <div class="row" style="margin-left:-19px;">
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
                      style="margin-left: -17px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailCompanion(companion)"
                      data-target="#deleteCompanionModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -34px;">
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
              <div class="col-sm-4 text-center" v-if="companion.image != null">
                <div v-html="image"></div>
                <p class="font-weight-bold" style="padding-top: 5px;">{{ companion.companionId }}</p>
              </div>
              <div class="col-sm-4 text-center" v-if="companion.image == null">
                <img class="img-fluid img-thumbnail rounded-circle" src="../images/default_image.png" width="100px"
                  height="100px" alt="companion-image"/>
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
      companions: [],
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
    submitAddCompanionForm() {
      if (this.addCompanionFormIsValid) {
        let lengthCompanions = this.companions.length;
        if (lengthCompanions == 0) {
          this.companionId = "DH001";
        } else {
          let currentId = this.companions[lengthCompanions - 1].id;
          if (currentId > -1 && currentId < 9) {
            this.companionId = "DH00" + (currentId + 1);
          }
          if (currentId > 8 && currentId < 99) {
            this.companionId = "DH0" + (currentId + 1);
          }
          if (currentId > 98 && currentId < 999) {
            this.companionId = "DH" + (currentId + 1);
          }
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
                  } else if (crypt.getAge(this.birthday) < 28) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của người đồng hành nhỏ hơn 28!",
                      function () {
                        alertify.success("Ok");
                      }
                    );
                  } else if (crypt.getAge(this.birthday) > 60) {
                    alertify.alert(
                      "Thông báo",
                      "Tuổi của người đồng hành lớn hơn 60!",
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
                        this.companionId +
                        this.selectedFile.name.slice(start, end);
                    }
                    const companion = {
                      companionId: this.companionId,
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
                          role = 8;
                        } else {
                          role = 9;
                        }
                        const url_1 = `http://localhost:3000/api/companions`;
                        axios.post(url_1, companion);
                        axios
                          .get(
                            "http://localhost:3000/api/companions/findOne?filter[where][email]=" +
                              this.email
                          )
                          .then((resp) => {
                            const account_companion = {
                              userId: resp.data.companionId,
                              username: resp.data.email,
                              password: crypt.encrypt(resp.data.phone),
                              role: role,
                              status: resp.data.status,
                              idTable: resp.data.id,
                            };
                            const url = "http://localhost:3000/api/accounts";
                            axios.post(url, account_companion);
                            if (this.selectedFile != null) {
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/companion/upload?filename=" +
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
      <h6 class="m-0 font-weight-bold text-dark">Thêm Người Đồng Hành</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Người Đồng Hành:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Người Đồng Hành</p>
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
        <div class="row mt-1">
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
              <option v-for="department in positions" v-bind:value="department.id" v-if="department.name == 'Đồng Hành' 
              || department.name == 'Đồng hành' || department.name == 'đồng hành'">{{ department.positionType }} - {{ department.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
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
        <div class="row mt-2">
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
        <div class="row mt-2">
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
              <button :disabled="!addCompanionFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormCompanion" @click="clearInputCompanionForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListCompanion">
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
      companion: {},
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
        "http://localhost:3000/api/companions/getCompanion?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.companionId = response.data.companion.companionId;
        this.christianName = response.data.companion.christianName;
        this.fullName = response.data.companion.fullName;
        this.birthday = crypt.formatDate(response.data.companion.birthday);
        this.phone = response.data.companion.phone;
        this.phoneEdit = response.data.companion.phone;
        this.email = response.data.companion.email;
        this.emailEdit = response.data.companion.email;
        this.groupCommunity = response.data.companion.groupCommunity;
        this.position = response.data.companion.position;
        this.imageEdit = response.data.companion.image;
        this.status = response.data.companion.status;
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

    editCompanionFormIsValid() {
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

    refreshFormCompanion() {
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
    submitEditCompanionForm() {
      if (this.editCompanionFormIsValid) {
        if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
          if (crypt.getAge(this.birthday) < 28) {
            alertify.alert(
              "Thông báo",
              "Tuổi của người đồng hành nhỏ hơn 28!",
              function () {
                alertify.success("Ok");
              }
            );
          } else if (crypt.getAge(this.birthday) > 60) {
            alertify.alert(
              "Thông báo",
              "Tuổi của người đồng hành lớn hơn 60!",
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
                this.companionId + this.selectedFile.name.slice(start, end);
              if (this.imageEdit != null) {
                const companion = {
                  companionId: this.companionId,
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
                const url =
                  "http://localhost:3000/api/companions/" +
                  companion.id +
                  "/replace";
                axios.post(url, companion);
                axios
                  .delete(
                    "http://localhost:3000/api/Photos/companion/files/" +
                      this.imageEdit
                  )
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => console.log(err));
                axios
                  .post(
                    "http://localhost:3000/api/Photos/companion/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              } else {
                const companion = {
                  companionId: this.companionId,
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
                const url =
                  "http://localhost:3000/api/companions/" +
                  companion.id +
                  "/replace";
                axios.post(url, companion);
                axios
                  .post(
                    "http://localhost:3000/api/Photos/companion/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              }
            } else {
              const companion = {
                companionId: this.companionId,
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
              const url =
                "http://localhost:3000/api/companions/" +
                companion.id +
                "/replace";
              axios.post(url, companion);
            }
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
              } else if (crypt.getAge(this.birthday) < 28) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 60) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành lớn hơn 60!",
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
                    this.companionId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const companion = {
                      companionId: this.companionId,
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
                    const url =
                      "http://localhost:3000/api/companions/" +
                      companion.id +
                      "/replace";
                    axios.post(url, companion);
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/companion/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/companion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    const companion = {
                      companionId: this.companionId,
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
                    const url =
                      "http://localhost:3000/api/companions/" +
                      companion.id +
                      "/replace";
                    axios.post(url, companion);
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/companion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  const companion = {
                    companionId: this.companionId,
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
                  const url =
                    "http://localhost:3000/api/companions/" +
                    companion.id +
                    "/replace";
                  axios.post(url, companion);
                }
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
              } else if (crypt.getAge(this.birthday) < 28) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành nhỏ hơn 28!",
                  function () {
                    alertify.success("Ok");
                  }
                );
              } else if (crypt.getAge(this.birthday) > 60) {
                alertify.alert(
                  "Thông báo",
                  "Tuổi của người đồng hành lớn hơn 60!",
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
                    this.companionId + this.selectedFile.name.slice(start, end);
                  if (this.imageEdit != null) {
                    const companion = {
                      companionId: this.companionId,
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
                    const url =
                      "http://localhost:3000/api/companions/" +
                      companion.id +
                      "/replace";
                    axios.post(url, companion);
                    axios
                      .delete(
                        "http://localhost:3000/api/Photos/companion/files/" +
                          this.imageEdit
                      )
                      .then((resp) => {
                        console.log(resp);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/companion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  } else {
                    const companion = {
                      companionId: this.companionId,
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
                    const url =
                      "http://localhost:3000/api/companions/" +
                      companion.id +
                      "/replace";
                    axios.post(url, companion);
                    axios
                      .post(
                        "http://localhost:3000/api/Photos/companion/upload?filename=" +
                          fileName,
                        fd
                      )
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }
                } else {
                  const companion = {
                    companionId: this.companionId,
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
                  const url =
                    "http://localhost:3000/api/companions/" +
                    companion.id +
                    "/replace";
                  axios.post(url, companion);
                }
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
                    } else if (crypt.getAge(this.birthday) < 28) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của người đồng hành nhỏ hơn 28!",
                        function () {
                          alertify.success("Ok");
                        }
                      );
                    } else if (crypt.getAge(this.birthday) > 60) {
                      alertify.alert(
                        "Thông báo",
                        "Tuổi của người đồng hành lớn hơn 60!",
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
                          this.companionId +
                          this.selectedFile.name.slice(start, end);
                        if (this.imageEdit != null) {
                          const companion = {
                            companionId: this.companionId,
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
                          const url =
                            "http://localhost:3000/api/companions/" +
                            companion.id +
                            "/replace";
                          axios.post(url, companion);
                          axios
                            .delete(
                              "http://localhost:3000/api/Photos/companion/files/" +
                                this.imageEdit
                            )
                            .then((resp) => {
                              console.log(resp);
                            })
                            .catch((err) => console.log(err));
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/companion/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        } else {
                          const companion = {
                            companionId: this.companionId,
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
                          const url =
                            "http://localhost:3000/api/companions/" +
                            companion.id +
                            "/replace";
                          axios.post(url, companion);
                          axios
                            .post(
                              "http://localhost:3000/api/Photos/companion/upload?filename=" +
                                fileName,
                              fd
                            )
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        }
                      } else {
                        const companion = {
                          companionId: this.companionId,
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
                        const url =
                          "http://localhost:3000/api/companions/" +
                          companion.id +
                          "/replace";
                        axios.post(url, companion);
                      }
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
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Người Đồng Hành</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px">Thông Tin Người Đồng Hành:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Người Đồng Hành</p>
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
        <div class="row mt-1">
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
              v-if="department.name == 'Đồng Hành' || department.name == 'Đồng hành' || department.name == 'đồng hành'"
              :selected="companion.position == department.id">{{ department.positionType }} - {{ department.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
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
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="groupCommunity">Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="groupCommunity" name="groupCommunity" id="groupCommunity"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Nhóm Cộng Đoàn ---</option>
              <option v-for="grCom in groupCommunities" v-bind:value="grCom.id" :selected="companion.groupCommunity == grCom.id">{{ grCom.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id" :selected="companion.status == status.id">{{ status.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
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
              <button :disabled="!editCompanionFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormCompanion" @click="clearInputCompanionForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListCompanion">
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
//SPIRITUAL_GUIDE
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

    deleteDataSpiritualGuide(id) {
      axios
        .delete("http://localhost:3000/api/spiritualGuides/" + id)
        .then((response) => {
          console.log(response);
          this.spiritualGuides.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/spiritualGuides");
            location.reload();
          }, 5);
        });
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
                    <button :title="titleButtonEdit" @click="getDataSpiritualGuideUpdate(spiritualGuide)"
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
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataSpiritualGuide(spiritualGuide.id)">
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
//GROUP_COMMUNITY
const GroupCommunity = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListGroupCommunity = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Nhóm Cộng đoàn",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Nhóm Cộng đoàn",
      groupCommunities: [],
      groupCommunity: {},
      communities: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/groupCommunities").then((response) => {
      this.groupCommunities = response.data;
    });
    axios.get("http://localhost:3000/api/communities").then((response) => {
      this.communities = response.data;
    });
  },
  computed: {},
  methods: {
    getDetailGroupCommunity(groupCommunity) {
      this.groupCommunity = groupCommunity;
    },

    getDataGroupCommunityUpdate(groupCommunity) {
      this.$router.push({
        name: "editGroupCommunity",
        params: { id: groupCommunity.id },
      });
    },

    deleteDataGroupCommunity(id) {
      axios
        .delete("http://localhost:3000/api/groupCommunities/" + id)
        .then((response) => {
          console.log(response);
          this.groupCommunities.splice(id, 1);
          this.$router.push("/");
          setTimeout(() => {
            this.$router.push("/groupCommunities");
            location.reload();
          }, 5);
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Nhóm Cộng Đoàn</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addGroupCommunity' }">
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
              <th>Tên Nhóm</th>
              <th>Cộng Đoàn 1</th>
              <th>Cộng Đoàn 2</th>
              <th>Cộng Đoàn 3</th>
              <th>Cộng Đoàn 4</th>
              <th>Cộng Đoàn 5</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Tên Nhóm</th>
              <th>Cộng Đoàn 1</th>
              <th>Cộng Đoàn 2</th>
              <th>Cộng Đoàn 3</th>
              <th>Cộng Đoàn 4</th>
              <th>Cộng Đoàn 5</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(groupCommunity, index) in groupCommunities" :key="groupCommunity.id">
              <th>{{ index + 1 }}</th>
              <td>{{ groupCommunity.name }}</td>
              <td v-for="com in communities" v-if="groupCommunity.firstCom != 0 && com.id == groupCommunity.firstCom">{{ com.communityName }}</td>
              <td v-if="groupCommunity.firstCom == 0"></td>
              <td v-for="com in communities" v-if="groupCommunity.secondCom != 0 && com.id == groupCommunity.secondCom">{{ com.communityName }}</td>
              <td v-if="groupCommunity.secondCom == 0"></td>
              <td v-for="com in communities" v-if="groupCommunity.thirdCom != 0 && com.id == groupCommunity.thirdCom">{{ com.communityName }}</td>
              <td v-if="groupCommunity.thirdCom == 0"></td>
              <td v-for="com in communities" v-if="groupCommunity.fourthCom != 0 && com.id == groupCommunity.fourthCom">{{ com.communityName }}</td>
              <td v-if="groupCommunity.fourthCom == 0"></td>
              <td v-for="com in communities" v-if="groupCommunity.fifthCom != 0 && com.id == groupCommunity.fifthCom">{{ com.communityName }}</td>
              <td v-if="groupCommunity.fifthCom == 0"></td>
              <td>
                <div class="row" style="margin-left:-15px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonEdit" @click="getDataGroupCommunityUpdate(groupCommunity)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -7px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailGroupCommunity(groupCommunity)"
                      data-target="#deleteGroupCommunityModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -10px;">
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
    <div id="deleteGroupCommunityModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Nhóm Cộng Đoàn</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Nhóm Cộng đoàn {{ groupCommunity.name }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataGroupCommunity(groupCommunity.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddGroupCommunity = {
  data() {
    return {
      id: 0,
      name: null,
      firstCom: 0,
      secondCom: 0,
      thirdCom: 0,
      fourthCom: 0,
      fifthCom: 0,
      titleName: "Nhập tên nhóm cộng đoàn",
      groupCommunities: [],
      communities: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/groupCommunities").then((response) => {
      this.groupCommunities = response.data;
    });
    axios.get("http://localhost:3000/api/communities").then((response) => {
      this.communities = response.data;
    });
  },
  computed: {
    nameIsValid() {
      return !!this.name;
    },

    firstComIsValid() {
      return !!this.firstCom;
    },

    secondComIsValid() {
      return !!this.secondCom;
    },

    thirdComIsValid() {
      return !!this.thirdCom;
    },

    fourthComIsValid() {
      return !!this.fourthCom;
    },

    fifthComIsValid() {
      return !!this.fifthCom;
    },

    addGroupCommunityFormIsValid() {
      return (
        (this.nameIsValid && this.firstComIsValid) ||
        (this.nameIsValid && this.secondComIsValid) ||
        (this.nameIsValid && this.thirdComIsValid) ||
        (this.nameIsValid && this.fourthComIsValid) ||
        (this.nameIsValid && this.fifthComIsValid)
      );
    },

    refreshFormGroupCommunity() {
      return (
        this.nameIsValid ||
        this.firstComIsValid ||
        this.secondComIsValid ||
        this.thirdComIsValid ||
        this.fourthComIsValid ||
        this.fifthComIsValid
      );
    },
  },
  methods: {
    submitAddGroupCommunityForm() {
      if (this.addGroupCommunityFormIsValid) {
        const groupCommunity = {
          name: this.name,
          firstCom: this.firstCom,
          secondCom: this.secondCom,
          thirdCom: this.thirdCom,
          fourthCom: this.fourthCom,
          fifthCom: this.fifthCom,
        };
        const url_1 = "http://localhost:3000/api/groupCommunities";
        axios.post(url_1, groupCommunity);
        this.$router.push("/groupCommunities");
        location.reload();
        return 0;
      } else {
        console.log("Invalid Form");
      }
    },

    clearInputGroupCommunityForm() {
      if (this.nameIsValid) {
        this.name = null;
      }
      if (this.firstComIsValid) {
        this.firstCom = 0;
      }
      if (this.secondComIsValid) {
        this.secondCom = 0;
      }
      if (this.thirdComIsValid) {
        this.thirdCom = 0;
      }
      if (this.fourthComIsValid) {
        this.fourthCom = 0;
      }
      if (this.fifthComIsValid) {
        this.fifthCom = 0;
      }
    },

    toListGroupCommunity() {
      this.$router.push("/groupCommunities");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Nhóm Cộng Đoàn</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddGroupCommunityForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Nhóm Cộng Đoàn:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Nhóm Cộng Đoàn</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="name">Tên Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <input type="text" id="name" name="name" v-model="name" :title="titleName"
              class="form-control text-size-13px " placeholder="Nhập Tên Nhóm Cộng Đoàn..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="firstCom">Cộng Đoàn 1</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="firstCom" name="firstCom"
              id="firstCom" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn 1 ---</option>
              <option v-for="com in communities" v-bind:value="com.id">{{ com.communityName }}</option>
            </select>
          </div>
        </div>
        <div class="row" mt-2>
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="secondCom">Cộng Đoàn 2</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="secondCom" name="secondCom"
              id="secondCom" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn 2 ---</option>
              <option v-for="com in communities" v-bind:value="com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="thirdCom">Cộng Đoàn 3</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="thirdCom" name="thirdCom"
              id="thirdCom" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn 3 ---</option>
              <option v-for="com in communities" v-bind:value="com.id">{{ com.communityName }}</option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fourthCom">Cộng Đoàn 4</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="fourthCom" name="fourthCom"
              id="fourthCom" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn 4 ---</option>
              <option v-for="com in communities" v-bind:value="com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fifthCom">Cộng Đoàn 5</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="fifthCom" name="fifthCom"
              id="fifthCom" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn 5 ---</option>
              <option v-for="com in communities" v-bind:value="com.id">{{ com.communityName }}</option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addGroupCommunityFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormGroupCommunity" @click="clearInputGroupCommunityForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListGroupCommunity">
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

const EditGroupCommunity = {
  data() {
    return {
      id: 0,
      name: null,
      firstCom: 0,
      secondCom: 0,
      thirdCom: 0,
      fourthCom: 0,
      fifthCom: 0,
      titleName: "Nhập tên nhóm cộng đoàn",
      groupCommunities: [],
      communities: [],
      groupCommunity: {},
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/communities").then((response) => {
      this.communities = response.data;
    });
    axios.get("http://localhost:3000/api/groupCommunities").then((response) => {
      this.groupCommunities = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/groupCommunities/getGroupCommunity?id=" +
          this.$route.params.id
      )
      .then((response) => {
        this.name = response.data.groupCommunity.name;
        this.firstCom = response.data.groupCommunity.firstCom;
        this.secondCom = response.data.groupCommunity.secondCom;
        this.thirdCom = response.data.groupCommunity.thirdCom;
        this.fourthCom = response.data.groupCommunity.fourthCom;
        this.fifthCom = response.data.groupCommunity.fifthCom;
      });
  },
  computed: {
    nameIsValid() {
      return !!this.name;
    },

    firstComIsValid() {
      return !!this.firstCom;
    },

    secondComIsValid() {
      return !!this.secondCom;
    },

    thirdComIsValid() {
      return !!this.thirdCom;
    },

    fourthComIsValid() {
      return !!this.fourthCom;
    },

    fifthComIsValid() {
      return !!this.fifthCom;
    },

    editGroupCommunityFormIsValid() {
      return this.nameIsValid;
    },

    refreshFormGroupCommunity() {
      return (
        this.nameIsValid ||
        this.firstComIsValid ||
        this.secondComIsValid ||
        this.thirdComIsValid ||
        this.fourthComIsValid ||
        this.fifthComIsValid
      );
    },
  },
  methods: {
    submitEditGroupCommunityForm() {
      if (this.editGroupCommunityFormIsValid) {
        const groupCommunity = {
          name: this.name,
          firstCom: this.firstCom,
          secondCom: this.secondCom,
          thirdCom: this.thirdCom,
          fourthCom: this.fourthCom,
          fifthCom: this.fifthCom,
          id: this.$route.params.id,
        };
        const url =
          "http://localhost:3000/api/groupCommunities/" +
          groupCommunity.id +
          "/replace";
        axios.post(url, groupCommunity);
        this.$router.push("/groupCommunities");
        location.reload();
        return 0;
      } else {
        console.log("Invalid Form");
      }
    },

    clearInputGroupCommunityForm() {
      if (this.nameIsValid) {
        this.name = null;
      }
      if (this.firstComIsValid) {
        this.firstCom = 0;
      }
      if (this.secondComIsValid) {
        this.secondCom = 0;
      }
      if (this.thirdComIsValid) {
        this.thirdCom = 0;
      }
      if (this.fourthComIsValid) {
        this.fourthCom = 0;
      }
      if (this.fifthComIsValid) {
        this.fifthCom = 0;
      }
    },

    toListGroupCommunity() {
      this.$router.push("/groupCommunities");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Nhóm Cộng Đoàn</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditGroupCommunityForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Nhóm Cộng Đoàn:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Nhóm Cộng Đoàn</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="name">Tên Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <input type="text" id="name" name="name" v-model="name" :title="titleName"
            :value="name" v-on:keyup="name = $event.target.value"
              class="form-control text-size-13px " placeholder="Nhập Tên Nhóm Cộng Đoàn..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="firstCom">Cộng Đoàn 1</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="firstCom" name="firstCom"
              id="firstCom" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn 1 ---</option>
              <option v-for="com in communities" v-bind:value="com.id" 
              :selected="groupCommunity.firstCom == com.id">{{ com.communityName }}</option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="secondCom">Cộng Đoàn 2</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="secondCom" name="secondCom"
              id="secondCom" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn 2 ---</option>
              <option v-for="com in communities" v-bind:value="com.id" 
              :selected="groupCommunity.secondCom == com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="thirdCom">Cộng Đoàn 3</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="thirdCom" name="thirdCom"
              id="thirdCom" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn 3 ---</option>
              <option v-for="com in communities" v-bind:value="com.id" 
              :selected="groupCommunity.thirdCom == com.id">{{ com.communityName }}</option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fourthCom">Cộng Đoàn 4</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="fourthCom" name="fourthCom"
              id="fourthCom" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn 4 ---</option>
              <option v-for="com in communities" v-bind:value="com.id" 
              :selected="groupCommunity.fourthCom == com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fifthCom">Cộng Đoàn 5</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="fifthCom" name="fifthCom"
              id="fifthCom" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn 5 ---</option>
              <option v-for="com in communities" v-bind:value="com.id" 
              :selected="groupCommunity.fifthCom == com.id">{{ com.communityName }}</option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editGroupCommunityFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormGroupCommunity" @click="clearInputGroupCommunityForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListGroupCommunity">
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
//TEACHER
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
      this.image =
        `
      <img class="img-fluid img-thumbnail rounded-circle" src="../api/Photos/teacher/download/` +
        this.teacher.image +
        `" width="100px"
      height="100px" alt="teacher-image"/>
      `;
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
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Giảng Viên</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addTeacher' }">
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
                      style="margin-left: -15.5px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailTeacher(teacher)"
                      data-target="#deleteTeacherModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
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
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    submitAddTeacherForm() {
      if (this.addTeacherFormIsValid) {
        let lengthTeachers = this.teachers.length;
        if (lengthTeachers == 0) {
          this.teacherId = "GV001";
        } else {
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
                      if (this.selectedFile != null) {
                        fd.append(
                          "image",
                          this.selectedFile,
                          this.selectedFile.name
                        );
                        var start = this.selectedFile.name.lastIndexOf(".");
                        var end = this.selectedFile.length;
                        fileName =
                          this.teacherId +
                          this.selectedFile.name.slice(start, end);
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
                          if (this.selectedFile != null) {
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
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
      <h6 class="m-0 font-weight-bold text-dark">Thêm Giảng Viên</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddTeacherForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Giảng Viên:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều người Giảng Viên</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
              class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="gender">Giới Tính</label>
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
            <label class="font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="subject">Bộ Môn</label>
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
        <div class="row mt-2">
          <div class="col-lg-4"></div>
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
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addTeacherFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormTeacher" @click="clearInputTeacherForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListTeacher">
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
            if (this.selectedFile != null) {
              const fd = new FormData();
              fd.append("image", this.selectedFile, this.selectedFile.name);
              var start = this.selectedFile.name.lastIndexOf(".");
              var end = this.selectedFile.length;
              var fileName =
                this.teacherId + this.selectedFile.name.slice(start, end);
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
                  "http://localhost:3000/api/teachers/" +
                  teacher.id +
                  "/replace";
                axios.post(url, teacher);
                axios
                  .delete(
                    "http://localhost:3000/api/Photos/teacher/files/" +
                      this.imageEdit
                  )
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => console.log(err));
                axios
                  .post(
                    "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
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
                  "http://localhost:3000/api/teachers/" +
                  teacher.id +
                  "/replace";
                axios.post(url, teacher);
                axios
                  .post(
                    "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                      fileName,
                    fd
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
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
                      this.teacherId + this.selectedFile.name.slice(start, end);
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
                        "http://localhost:3000/api/teachers/" +
                        teacher.id +
                        "/replace";
                      axios.post(url, teacher);
                      axios
                        .delete(
                          "http://localhost:3000/api/Photos/teacher/files/" +
                            this.imageEdit
                        )
                        .then((resp) => {
                          console.log(resp);
                        })
                        .catch((err) => console.log(err));
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
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
                        "http://localhost:3000/api/teachers/" +
                        teacher.id +
                        "/replace";
                      axios.post(url, teacher);
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
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
                      "http://localhost:3000/api/teachers/" +
                      teacher.id +
                      "/replace";
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
                      this.teacherId + this.selectedFile.name.slice(start, end);
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
                        "http://localhost:3000/api/teachers/" +
                        teacher.id +
                        "/replace";
                      axios.post(url, teacher);
                      axios
                        .delete(
                          "http://localhost:3000/api/Photos/teacher/files/" +
                            this.imageEdit
                        )
                        .then((resp) => {
                          console.log(resp);
                        })
                        .catch((err) => console.log(err));
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
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
                        "http://localhost:3000/api/teachers/" +
                        teacher.id +
                        "/replace";
                      axios.post(url, teacher);
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
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
                      "http://localhost:3000/api/teachers/" +
                      teacher.id +
                      "/replace";
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
                            this.teacherId +
                            this.selectedFile.name.slice(start, end);
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
                              "http://localhost:3000/api/teachers/" +
                              teacher.id +
                              "/replace";
                            axios.post(url, teacher);
                            axios
                              .delete(
                                "http://localhost:3000/api/Photos/teacher/files/" +
                                  this.imageEdit
                              )
                              .then((resp) => {
                                console.log(resp);
                              })
                              .catch((err) => console.log(err));
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
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
                              "http://localhost:3000/api/teachers/" +
                              teacher.id +
                              "/replace";
                            axios.post(url, teacher);
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
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
                            "http://localhost:3000/api/teachers/" +
                            teacher.id +
                            "/replace";
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
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Giảng Viên</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditTeacherForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px ">Thông Tin Giảng Viên:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều người Giảng Viên</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
            <label class="text-danger">*</label>
            <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
            :value="fullName" v-on:keyup="fullName = $event.target.value"
            class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="gender">Giới Tính</label>
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
            <label class="font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
            <label class="text-danger">*</label>
            <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
            :value="birthday" v-on:keyup="birthday = $event.target.value"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="subject">Bộ Môn</label>
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
            <label class="font-weight-bold col-form-label" for="status">Trạng Thái</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="status" name="status" id="status"
              style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Trạng Thái ---</option>
              <option v-for="status in statuses" v-bind:value="status.id" :selected="teacher.status == status.id">{{ status.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="image">Hình Ảnh</label>
            <input type="file" id="image" @change="onFileSelected" :title="titlePicture"
              class="form-control rounded text-size-13px" style="margin-top: -5px;" />
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editTeacherFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormTeacher" @click="clearInputTeacherForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListTeacher">
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

//SCHEDULE
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
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Lịch Học</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addSchedule' }">
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
        if (
          today.getFullYear() === dateS.getFullYear() &&
          today.getMonth() === dateS.getMonth() &&
          today.getDate() > dateS.getDate()
        ) {
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
      <h6 class="m-0 font-weight-bold text-dark">Thêm Lịch Học</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddScheduleForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px">Thông Tin Lịch Học:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Lịch Học</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="subject">Môn Học</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="subject" name="subject"
              id="subject" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Môn Học ---</option>
              <option v-for="subject in subjects" v-bind:value="subject.id">{{ subject.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="teacher">Giảng Viên</label>
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
            <label class="font-weight-bold col-form-label" for="dateStart">Ngày Bắt Đầu Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateStart" name="dateStart" id="dateStart" type="date" :title="titleDateStart"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="dateEnd">Ngày Kết Thúc Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateEnd" name="dateEnd" id="dateEnd" type="date" :title="titleDateEnd"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="dayOfWeek">Ngày Học Trong Tuần</label>
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
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormSchedule" @click="clearInputScheduleForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListSchedule">
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
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Lịch Học</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditScheduleForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px">Thông Tin Lịch Học:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Lịch Học</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="subject">Môn Học</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="subject" name="subject"
              id="subject" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Môn Học ---</option>
              <option v-for="subject in subjects" v-bind:value="subject.id" :selected="schedule.subject == subject.id">{{ subject.name }}
              </option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="teacher">Giảng Viên</label>
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
            <label class="font-weight-bold col-form-label" for="dateStart">Ngày Bắt Đầu Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateStart" name="dateStart" id="dateStart" type="date" :title="titleDateStart"
            :value="dateStart" v-on:keyup="dateStart = $event.target.value" class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="dateEnd">Ngày Kết Thúc Môn Học</label>
            <label class="text-danger">*</label>
            <input v-model="dateEnd" name="dateEnd" id="dateEnd" type="date" :title="titleDateEnd"
            :value="dateEnd" v-on:keyup="dateEnd = $event.target.value" class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="dayOfWeek">Ngày Học Trong Tuần</label>
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
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormSchedule" @click="clearInputScheduleForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListSchedule">
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
// ROLE
const Role = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListRole = {
  data() {
    return {
      titleButtonDelete: "Xóa Phân Quyền",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Phân Quyền",
      roles: [],
      role: {},
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/roles").then((response) => {
      this.roles = response.data;
    });
  },
  computed: {},
  methods: {
    getDetailRole(role) {
      this.role = role;
    },

    getDataRoleUpdate(role) {
      this.$router.push({ name: "editRole", params: { id: role.id } });
    },

    deleteDataRole(id) {
      axios.delete("http://localhost:3000/api/roles/" + id).then((response) => {
        console.log(response);
        this.roles.splice(id, 1);
        this.$router.push("/");
        setTimeout(() => {
          this.$router.push("/roles");
          location.reload();
        }, 5);
      });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Phân Quyền</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addRole' }">
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
              <th>Tên Phân Quyền</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Tên Phân Quyền</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(role, index) in roles" :key="role.id">
              <th>{{ index + 1 }}</th>
              <td>{{ role.roleName }}</td>
              <td>
                <div class="row" style="margin-left:-10px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonEdit" @click="getDataRoleUpdate(role)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -10px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonDelete" data-toggle="modal" @click="getDetailRole(role)"
                      data-target="#deleteRoleModal" class="btn btn-danger btn-sm h-28px w-28px rounded"
                      style="margin-left: -70px;">
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
    <div id="deleteRoleModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Xóa Phân Quyền</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <span style="font-size: large;">Bạn có chắc chắn muốn xóa Phân Quyền {{ role.roleName }}</span>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger rounded" data-dismiss="modal">
              Hủy
            </button>
            <button class="btn rounded text-white btn-hover-blue" style="background-color: #056299;" @click="deleteDataRole(role.id)">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddRole = {
  data() {
    return {
      id: 0,
      roleName: null,
      titleRole: "Nhập thông tin tên phân quyền",
    };
  },
  mounted() {},
  computed: {
    roleIsValid() {
      return !!this.roleName;
    },

    addRoleFormIsValid() {
      return this.roleIsValid;
    },

    refreshFormRole() {
      return this.roleIsValid;
    },
  },
  methods: {
    submitAddRoleForm() {
      if (this.addRoleFormIsValid) {
        const role = {
          roleName: this.roleName,
        };
        const url = `http://localhost:3000/api/roles`;
        axios.post(url, role);
        setTimeout(() => {
          this.$router.push("/roles");
          location.reload();
        }, 100);
        return 0;
      } else {
        alertify.alert("Thông báo", "Lưu dữ liệu thất bại!", function () {
          alertify.success("Ok");
        });
      }
    },

    clearInputRoleForm() {
      if (this.roleIsValid) {
        this.roleName = null;
      }
    },

    toListRole() {
      this.$router.push("/roles");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Phân Quyền</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddRoleForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px">Thông Tin Phân Quyền:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Phần Quyền</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="roleName">Tên Phân Quyền</label>
            <label class="text-danger">*</label>
            <input v-model="roleName" name="roleName" id="roleName" type="text" :title="titleRole"
            class="form-control  text-size-13px " style="margin-top: -5px;" placeholder="Nhập Tên Phân Quyền...">
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addRoleFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormRole" @click="clearInputRoleForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListRole">
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

const EditRole = {
  data() {
    return {
      id: 0,
      roleName: null,
      titleRole: "Nhập thông tin tên phân quyền",
      role: {},
      roles: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/roles").then((response) => {
      this.roles = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/roles/getRole?id=" + this.$route.params.id
      )
      .then((response) => {
        this.roleName = response.data.role.roleName;
      });
  },
  computed: {
    roleIsValid() {
      return !!this.roleName;
    },

    editRoleFormIsValid() {
      return this.roleIsValid;
    },

    refreshFormRole() {
      return this.roleIsValid;
    },
  },
  methods: {
    submitEditRoleForm() {
      if (this.editRoleFormIsValid) {
        const role = {
          roleName: this.roleName,
          id: this.$route.params.id,
        };
        const url = "http://localhost:3000/api/roles/" + role.id + "/replace";
        axios.post(url, role);
        setTimeout(() => {
          this.$router.push("/roles");
          location.reload();
        }, 100);
        return 0;
      } else {
        alertify.alert("Thông báo", "Lưu dữ liệu thất bại!", function () {
          alertify.success("Ok");
        });
      }
    },

    clearInputRoleForm() {
      if (this.roleIsValid) {
        this.roleName = null;
      }
    },

    toListRole() {
      this.$router.push("/roles");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Phân Quyền</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditRoleForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold text-size-15px">Thông Tin Phân Quyền:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Phân Quyền</p>
          </div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="roleName">Tên Phân Quyền</label>
            <label class="text-danger">*</label>
            <input v-model="roleName" name="roleName" id="roleName" type="text" :title="titleRole"
            :value="roleName" v-on:keyup="roleName = $event.target.value" class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!editRoleFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormRole" @click="clearInputRoleForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 360px;">
              <button class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;" @click="toListRole">
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
// LAYOUT
const Layout = {
  data() {
    return {};
  },
  template: `
  <div>
    <page-menu></page-menu>
    <div id="right-panel" class="right-panel">
      <page-header></page-header>
      <div class="breadcrumbs mt-2">
        <div class="col-sm-4">
          <div class="page-header float-left">
            <div class="page-title">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="page-header float-right">
            <div class="page-title">
              <ol class="breadcrumb text-right">
                <li class="active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="content mt-3">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  `,
};
// 404 PAGE
const Page404 = {
  methods: {
    backToHome() {
      this.$router.push({ name: "homePage" });
    },
  },
  template: `
  <div class="text-center">
    <h3>Errors</h3>
    <p>Have some errors.....</p>
    <button class="btn btn-primary" @click = "backToHome">Back To Home</button>
  </div>
  `,
};
// Schedule Companion
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
    var path =
      "http://localhost:3000/api/logins/findOne?filter[where][token]=token";
    function loadDataPromise(path) {
      return new Promise(function (res, rej) {
        axios
          .get(path)
          .then(function (response) {
            res(response.data);
          })
          .catch(function (err) {
            rej(err);
          });
      });
    }
    async function Loaddata() {
      let c = await loadDataPromise(path);
      return c;
    }
    Loaddata().then((data) => {
      console.log(data.idTable);
    });

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
      .get(
        "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=12"
      )
      .then((response) => {
        this.scheduleCompanions = response.data;
      });
    axios.get("http://localhost:3000/api/candidates").then((resp) => {
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
    axios.get("http://localhost:3000/api/metCompanions").then((resp) => {
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
          "http://localhost:3000/api/scheduleCompanions?filter[where][companion]=" +
            this.idTable
        )
        .then((resp) => {
          var arrayScheduleCompanions = resp.data;
          var lengthScheduleCompanions = arrayScheduleCompanions.length;
          if (lengthScheduleCompanions != 0) {
            var firstId = arrayScheduleCompanions[0].id;
            // var maxId = lengthScheduleCompanions + firstId
            var maxIdFirst = firstId + 60;
            for (i = firstId; i < maxIdFirst; i++) {
              axios
                .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                .then((response) => {
                  console.log(response);
                  this.scheduleCompanions.splice(i, 1);
                });
            }
            var maxIdSecond = maxIdFirst + 60;
            for (i = maxIdFirst; i < maxIdSecond; i++) {
              axios
                .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                .then((response) => {
                  console.log(response);
                  this.scheduleCompanions.splice(i, 1);
                });
            }
            if (lengthScheduleCompanions == 168) {
              var maxIdThird = maxIdSecond + 48;
              for (i = maxIdSecond; i < maxIdThird; i++) {
                axios
                  .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                  .then((response) => {
                    console.log(response);
                    this.scheduleCompanions.splice(i, 1);
                  });
              }
            }
            if (lengthScheduleCompanions == 174) {
              var maxIdThird = maxIdSecond + 54;
              for (i = maxIdSecond; i < maxIdThird; i++) {
                axios
                  .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                  .then((response) => {
                    console.log(response);
                    this.scheduleCompanions.splice(i, 1);
                  });
              }
            }
            if (lengthScheduleCompanions >= 180) {
              var maxIdThird = maxIdSecond + 60;
              for (i = maxIdSecond; i < maxIdThird; i++) {
                axios
                  .delete("http://localhost:3000/api/scheduleCompanions/" + i)
                  .then((response) => {
                    console.log(response);
                    this.scheduleCompanions.splice(i, 1);
                  });
              }
            }
            if (lengthScheduleCompanions == 186) {
              var maxIdFourth = maxIdThird + 6;
              for (i = maxIdThird; i < maxIdFourth; i++) {
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
            for (i = 0; i < max; i++) {
              if (
                this.scheduleCompanions[i].candidate == this.idTable &&
                this.scheduleCompanions[i].status == 1
              ) {
                check++;
              }
              if (
                this.scheduleCompanions[i].candidate == this.idTable &&
                this.scheduleCompanions[i].status == 2
              ) {
                axios
                  .get(
                    "http://localhost:3000/api/scheduleCompanions?filter[where][candidate]=" +
                      this.idTable +
                      "&filter[status]=2"
                  )
                  .then((resp) => {
                    axios
                      .get(
                        "http://localhost:3000/api/metCompanions?filter[where][idSchedule]=" +
                          resp.data[0].id
                      )
                      .then((response) => {
                        axios
                          .delete(
                            "http://localhost:3000/api/metCompanions/" +
                              response.data[0].id
                          )
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
            if (check != 0) {
              alertify.alert(
                "Thông báo",
                "Mỗi ứng sinh chỉ đăng ký một phiên!",
                function () {
                  alertify.success("Ok");
                }
              );
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
            if (scheduleCompanionOld.status == 2) {
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
            } else if (
              scheduleCompanionOld.candidate != null &&
              scheduleCompanionOld.status == 1
            ) {
              var emailCandidate = null;
              axios
                .get(
                  "http://localhost:3000/api/candidates?filter[where][id]=" +
                    scheduleCompanionOld.candidate
                )
                .then((resp) => {
                  emailCandidate = resp.data[0].email;
                  axios
                    .get(
                      "http://localhost:3000/api/companions?filter[where][id]=" +
                        scheduleCompanionOld.companion
                    )
                    .then((respCom) => {
                      Email.send({
                        Host: "smtp.gmail.com",
                        Username: "mancanhouse2020@gmail.com",
                        Password: "akyqnlcmanojglqb",
                        To: emailCandidate,
                        From: "mancanhouse2020@gmail.com",
                        Subject: "Thông Báo Hủy Lịch Gặp Đồng Hành",
                        Body:
                          "Xin lỗi vì sự bất tiện này. Người đồng hành của bạn" +
                          " đã có việc bận nên không thể có lịch gặp như bạn mong muốn. Vui lòng chọn một lịch gặp khác hoặc liên hệ" +
                          " với người đồng hành qua số điện thoại: " +
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
            for (i = 0; i < max; i++) {
              if (this.scheduleCompanions[i].candidate == this.idTable) {
                checkCancel++;
                idSchedule = this.scheduleCompanions[i].id;
              }
            }
            if (checkCancel != 0 && scheduleCompanionEdit.id != idSchedule) {
              alertify.alert(
                "Thông báo",
                "Hủy lịch gặp không hợp lệ. Vui lòng kiểm tra lại!",
                function () {
                  alertify.success("Ok");
                }
              );
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
                    .delete(
                      "http://localhost:3000/api/metCompanions/" +
                        response.data[0].id
                    )
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

const ReportCompanion = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListReportCompanion = {

},

const AddReportCompanion = {

};
// Schedule Spiritual Guide
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
      metSpiritualGuides: [],
    };
  },
  mounted() {
    // let promiseResponse = axios.get("http://localhost:3000/api/logins/findOne?filter[where][token]=token")
    //                     .then(response => response.data)
    //                     .then(data => {return data})
    // Promise.resolve(promiseResponse).then((jsonResults) => {
    //   console.log(jsonResults);
    //   this.idTable = jsonResults.idTable;
    //   console.log(this.idTable);
    // })
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        this.idTable = resp.data.idTable;
        this.role = resp.data.role;
      });
    axios
      .get(
        "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=8"
      )
      .then((response) => {
        this.scheduleSpiritualGuides = response.data;
      });
    axios.get("http://localhost:3000/api/candidates").then((resp) => {
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
    //           "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
    //             this.idTable
    //         )
    //         .then((response) => {
    //           this.scheduleSpiritualGuides = response.data;
    //           console.log(this.scheduleSpiritualGuides);
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
    //                     "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
    //                       idGroup
    //                   )
    //                   .then((respCom) => {
    //                     var spiritualGuide = respCom.data[0].id;
    //                     axios
    //                       .get(
    //                         "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
    //                           spiritualGuide
    //                       )
    //                       .then((respSchedule) => {
    //                         this.scheduleSpiritualGuides = respSchedule.data;
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
    //                         "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
    //                           idGroup
    //                       )
    //                       .then((respCom) => {
    //                         var spiritualGuide = respCom.data[0].id;
    //                         axios
    //                           .get(
    //                             "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
    //                               spiritualGuide
    //                           )
    //                           .then((resp) => {
    //                             this.scheduleSpiritualGuides = resp.data;
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
    //                               "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
    //                                 idGroup
    //                             )
    //                             .then((respCom) => {
    //                               var spiritualGuide = respCom.data[0].id;
    //                               axios
    //                                 .get(
    //                                   "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
    //                                     spiritualGuide
    //                                 )
    //                                 .then((respSchedule) => {
    //                                   this.scheduleSpiritualGuides = respSchedule.data;
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
    //                                     "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
    //                                       idGroup
    //                                   )
    //                                   .then((respCom) => {
    //                                     var spiritualGuide = respCom.data[0].id;
    //                                     axios
    //                                       .get(
    //                                         "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
    //                                           spiritualGuide
    //                                       )
    //                                       .then((respSchedule) => {
    //                                         this.scheduleSpiritualGuides = respSchedule.data;
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
    //                                           "http://localhost:3000/api/spiritualGuides?filter[where][groupCommunity]=" +
    //                                             idGroup
    //                                         )
    //                                         .then((respCom) => {
    //                                           var spiritualGuide = respCom.data[0].id;
    //                                           axios
    //                                             .get(
    //                                               "http://localhost:3000/api/scheduleSpiritualGuides?filter[where][spiritualGuide]=" +
    //                                                 spiritualGuide
    //                                             )
    //                                             .then((respSchedule) => {
    //                                               this.scheduleSpiritualGuides = respSchedule.data;
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
              }, 2000);
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
        <div class="col-md-2" style="padding-left:110px;" v-show="role == 6 || role == 7">
          <button class="btn rounded btn-danger" style="font-size:14px;" 
          data-toggle="modal" data-target="#deleteScheduleSpiritualGuideModal">
            <i class="fas fa-trash-alt"></i>
            &nbsp;Xóa lịch
          </button>
        </div>
        <div class="col-md-2" style="padding-left:50px;" v-show="role == 6 || role == 7">
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

//Profile
const Profile = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const DetailProfile = {
  data() {
    return {
      managerId: null,
      candidateId: null,
      companionId: null,
      spiritualGuideId: null,
      teacherId: null,
      fullName: null,
      christianName: null,
      birthday: null,
      phone: null,
      phoneEdit: null,
      email: null,
      emailEdit: null,
      image: null,
      imageEdit: null,
      position: 0,
      status: 0,
      community: 0,
      subject: 0,
      gender: 0,
      genders: [
        { id: 1, name: "Nam" },
        { id: 2, name: "Nữ" },
      ],
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
      groupCommunity: 0,
      role: 0,
      idTable: 0,
      selectedFile: null,
      htmlImage: null,
      fullNameShow: null,
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        const userInfo = {
          id: resp.data.id,
          userId: resp.data.userId,
          username: resp.data.username,
          password: crypt.decrypt(resp.data.password),
          role: resp.data.role,
          idTable: resp.data.idTable,
        };
        this.role = resp.data.role;
        this.idTable = resp.data.idTable;
        if (
          this.role == 1 ||
          this.role == 2 ||
          this.role == 3 ||
          this.role == 4
        ) {
          axios
            .get(
              "http://localhost:3000/api/managers/getManager?id=" + this.idTable
            )
            .then((response) => {
              this.managerId = response.data.manager.managerId;
              this.christianName = response.data.manager.christianName;
              this.fullName = response.data.manager.fullName;
              this.fullNameShow = response.data.manager.fullName;
              this.birthday = crypt.formatDate(response.data.manager.birthday);
              this.phone = response.data.manager.phone;
              this.phoneEdit = response.data.manager.phone;
              this.email = response.data.manager.email;
              this.emailEdit = response.data.manager.email;
              this.imageEdit = response.data.manager.image;
              this.position = response.data.manager.position;
              this.homeland = response.data.manager.homeland;
              this.status = response.data.manager.status;
              this.htmlImage =
                `
              <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image"
              src="../api/Photos/manager/download/` +
                this.imageEdit +
                `" alt="User Image">
              `;
            });
        }
        if (this.role == 5) {
          axios
            .get(
              "http://localhost:3000/api/candidates/getCandidate?id=" +
                this.idTable
            )
            .then((response) => {
              this.candidateId = response.data.candidate.candidateId;
              this.christianName = response.data.candidate.christianName;
              this.fullName = response.data.candidate.fullName;
              this.fullNameShow = response.data.candidate.fullName;
              this.birthday = crypt.formatDate(
                response.data.candidate.birthday
              );
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
              this.htmlImage =
                `
              <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image"
              src="../api/Photos/candidate/download/` +
                this.imageEdit +
                `" alt="User Image">
              `;
            });
        }
        if (this.role == 6 || this.role == 7) {
          axios
            .get(
              "http://localhost:3000/api/spiritualGuides/getSpiritualGuide?id=" +
                this.idTable
            )
            .then((response) => {
              this.spiritualGuideId =
                response.data.spiritualGuide.spiritualGuideId;
              this.christianName = response.data.spiritualGuide.christianName;
              this.fullName = response.data.spiritualGuide.fullName;
              this.fullNameShow = response.data.spiritualGuide.fullName;
              this.birthday = crypt.formatDate(
                response.data.spiritualGuide.birthday
              );
              this.phone = response.data.spiritualGuide.phone;
              this.phoneEdit = response.data.spiritualGuide.phone;
              this.email = response.data.spiritualGuide.email;
              this.emailEdit = response.data.spiritualGuide.email;
              this.groupCommunity = response.data.spiritualGuide.groupCommunity;
              this.position = response.data.spiritualGuide.position;
              this.imageEdit = response.data.spiritualGuide.image;
              this.status = response.data.spiritualGuide.status;
              this.htmlImage =
                `
              <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image"
              src="../api/Photos/spiritualGuide/download/` +
                this.imageEdit +
                `" alt="User Image">
              `;
            });
        }
        if (this.role == 8 || this.role == 9) {
          axios
            .get(
              "http://localhost:3000/api/companions/getCompanion?id=" +
                this.idTable
            )
            .then((response) => {
              this.companionId = response.data.companion.companionId;
              this.christianName = response.data.companion.christianName;
              this.fullName = response.data.companion.fullName;
              this.fullNameShow = response.data.companion.fullName;
              this.birthday = crypt.formatDate(
                response.data.companion.birthday
              );
              this.phone = response.data.companion.phone;
              this.phoneEdit = response.data.companion.phone;
              this.email = response.data.companion.email;
              this.emailEdit = response.data.companion.email;
              this.groupCommunity = response.data.companion.groupCommunity;
              this.position = response.data.companion.position;
              this.imageEdit = response.data.companion.image;
              this.status = response.data.companion.status;
              this.htmlImage =
                `
              <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image"
              src="../api/Photos/companion/download/` +
                this.imageEdit +
                `" alt="User Image">
              `;
            });
        }
        if (this.role == 10) {
          axios
            .get(
              "http://localhost:3000/api/teachers/getTeacher?id=" + this.idTable
            )
            .then((response) => {
              this.teacherId = response.data.teacher.teacherId;
              this.fullName = response.data.teacher.fullName;
              this.fullNameShow = response.data.teacher.fullName;
              this.gender = response.data.teacher.gender;
              this.birthday = crypt.formatDate(response.data.teacher.birthday);
              this.phone = response.data.teacher.phone;
              this.phoneEdit = response.data.teacher.phone;
              this.email = response.data.teacher.email;
              this.emailEdit = response.data.teacher.email;
              this.imageEdit = response.data.teacher.image;
              this.subject = response.data.teacher.subject;
              this.status = response.data.teacher.status;
              this.htmlImage =
                `
              <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image"
              src="../api/Photos/teacher/download/` +
                this.imageEdit +
                `" alt="User Image">
              `;
            });
        }
      });
  },
  computed: {
    fullNameIsValid() {
      return !!this.fullName;
    },

    christianNameIsValid() {
      return !!this.christianName;
    },

    genderIsValid() {
      return !!this.gender;
    },

    birthdayIsValid() {
      return !!this.birthday;
    },

    phoneIsValid() {
      return !!this.phone;
    },

    emailIsValid() {
      return !!this.email;
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

    homelandIsValid() {
      return !!this.homeland;
    },

    editProfileFormIsValid() {
      return (
        this.christianNameIsValid &&
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.emailIsValid &&
        this.homelandIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail
      );
    },

    editProfileFormWithTeacherIsValid() {
      return (
        this.fullNameIsValid &&
        this.phoneIsValid &&
        this.genderIsValid &&
        this.emailIsValid &&
        this.homelandIsValid &&
        this.birthdayIsValid &&
        !this.checkFormatPhone &&
        !this.checkFormatEmail
      );
    },

    refreshFormEditProfile() {
      return (
        this.christianNameIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.homelandIsValid ||
        this.birthdayIsValid
      );
    },

    refreshFormEditProfilewithTeacher() {
      return (
        this.genderIsValid ||
        this.fullNameIsValid ||
        this.phoneIsValid ||
        this.emailIsValid ||
        this.birthdayIsValid
      );
    },
  },
  methods: {
    submitEditProfileForm() {
      if (
        this.role == 1 ||
        this.role == 2 ||
        this.role == 3 ||
        this.role == 4
      ) {
        if (this.editProfileFormIsValid) {
          if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
            if (crypt.getAge(this.birthday) < 28) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người quản lý nhỏ hơn 28!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else if (crypt.getAge(this.birthday) > 60) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người quản lý lớn hơn 60!",
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
                  this.managerId + this.selectedFile.name.slice(start, end);
                if (this.imageEdit != null) {
                  const manager = {
                    managerId: this.managerId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    image: fileName,
                    position: this.position,
                    homeland: this.homeland,
                    status: this.status,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  axios
                    .delete(
                      "http://localhost:3000/api/Photos/manager/files/" +
                        this.imageEdit
                    )
                    .then((resp) => {
                      console.log(resp);
                    })
                    .catch((err) => console.log(err));
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/manager/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                } else {
                  const manager = {
                    managerId: this.managerId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    image: fileName,
                    position: this.position,
                    homeland: this.homeland,
                    status: this.status,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/managers/" +
                    manager.id +
                    "/replace";
                  axios.post(url, manager);
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/manager/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                }
              } else {
                const manager = {
                  managerId: this.managerId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  image: this.imageEdit,
                  position: this.position,
                  homeland: this.homeland,
                  status: this.status,
                  id: this.idTable,
                };
                const url =
                  "http://localhost:3000/api/managers/" +
                  manager.id +
                  "/replace";
                axios.post(url, manager);
              }
              this.$router.push("/managers");
              location.reload();
              return 0;
            }
          } else if (
            this.emailEdit != this.email &&
            this.phoneEdit == this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/managers/existsEmail?email=" +
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
                    "Tuổi của người quản lý nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người quản lý lớn hơn 60!",
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
                      this.managerId + this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      const manager = {
                        managerId: this.managerId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        position: this.position,
                        homeland: this.homeland,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/managers/" +
                        manager.id +
                        "/replace";
                      axios.post(url, manager);
                      axios
                        .delete(
                          "http://localhost:3000/api/Photos/manager/files/" +
                            this.imageEdit
                        )
                        .then((resp) => {
                          console.log(resp);
                        })
                        .catch((err) => console.log(err));
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/manager/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    } else {
                      const manager = {
                        managerId: this.managerId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        position: this.position,
                        homeland: this.homeland,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/managers/" +
                        manager.id +
                        "/replace";
                      axios.post(url, manager);
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/manager/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    }
                  } else {
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: this.imageEdit,
                      position: this.position,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/managers/" +
                      manager.id +
                      "/replace";
                    axios.post(url, manager);
                  }
                  this.$router.push("/managers");
                  location.reload();
                  return 0;
                }
              });
          } else if (
            this.emailEdit == this.email &&
            this.phoneEdit != this.phone
          ) {
            axios
              .get(
                "http://localhost:3000/api/managers/existsPhone?phone=" +
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
                    "Tuổi của người quản lý nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người quản lý lớn hơn 60!",
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
                      this.managerId + this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      const manager = {
                        managerId: this.managerId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        position: this.position,
                        homeland: this.homeland,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/managers/" +
                        manager.id +
                        "/replace";
                      axios.post(url, manager);
                      axios
                        .delete(
                          "http://localhost:3000/api/Photos/manager/files/" +
                            this.imageEdit
                        )
                        .then((resp) => {
                          console.log(resp);
                        })
                        .catch((err) => console.log(err));
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/manager/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    } else {
                      const manager = {
                        managerId: this.managerId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        image: fileName,
                        position: this.position,
                        homeland: this.homeland,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/managers/" +
                        manager.id +
                        "/replace";
                      axios.post(url, manager);
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/manager/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    }
                  } else {
                    const manager = {
                      managerId: this.managerId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      image: this.imageEdit,
                      position: this.position,
                      homeland: this.homeland,
                      status: this.status,
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/managers/" +
                      manager.id +
                      "/replace";
                    axios.post(url, manager);
                  }
                  this.$router.push("/managers");
                  location.reload();
                  return 0;
                }
              });
          } else {
            axios
              .get(
                "http://localhost:3000/api/managers/existsEmail?email=" +
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
                      "http://localhost:3000/api/managers/existsPhone?phone=" +
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
                          "Tuổi của người quản lý nhỏ hơn 28!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) > 60) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người quản lý lớn hơn 60!",
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
                            this.managerId +
                            this.selectedFile.name.slice(start, end);
                          if (this.imageEdit != null) {
                            const manager = {
                              managerId: this.managerId,
                              christianName: this.christianName,
                              fullName: this.fullName,
                              birthday: this.birthday,
                              phone: this.phone,
                              email: this.email,
                              image: fileName,
                              position: this.position,
                              homeland: this.homeland,
                              status: this.status,
                              id: this.idTable,
                            };
                            const url =
                              "http://localhost:3000/api/managers/" +
                              manager.id +
                              "/replace";
                            axios.post(url, manager);
                            axios
                              .delete(
                                "http://localhost:3000/api/Photos/manager/files/" +
                                  this.imageEdit
                              )
                              .then((resp) => {
                                console.log(resp);
                              })
                              .catch((err) => console.log(err));
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                          } else {
                            const manager = {
                              managerId: this.managerId,
                              christianName: this.christianName,
                              fullName: this.fullName,
                              birthday: this.birthday,
                              phone: this.phone,
                              email: this.email,
                              image: fileName,
                              position: this.position,
                              homeland: this.homeland,
                              status: this.status,
                              id: this.idTable,
                            };
                            const url =
                              "http://localhost:3000/api/managers/" +
                              manager.id +
                              "/replace";
                            axios.post(url, manager);
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/manager/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                          }
                        } else {
                          const manager = {
                            managerId: this.managerId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            image: this.imageEdit,
                            position: this.position,
                            homeland: this.homeland,
                            status: this.status,
                            id: this.idTable,
                          };
                          const url =
                            "http://localhost:3000/api/managers/" +
                            manager.id +
                            "/replace";
                          axios.post(url, manager);
                        }
                        this.$router.push("/managers");
                        location.reload();
                        return 0;
                      }
                    });
                }
              });
          }
        } else {
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
      if (this.role == 5) {
        if (this.editProfileFormIsValid) {
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
                    id: this.idTable,
                  };
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
                    id: this.idTable,
                  };
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
                  id: this.idTable,
                };
                const url =
                  "http://localhost:3000/api/candidates/" +
                  candidate.id +
                  "/replace";
                axios.post(url, candidate);
              }
              setTimeout(() => {
                this.$router.push("/candidates");
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
                  const candidate = {
                    candidateId: null,
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
                      this.candidateId +
                      this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      candidate = {
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
                        id: this.idTable,
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
                    } else {
                      candidate = {
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
                        id: this.idTable,
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
                    }
                  } else {
                    candidate = {
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
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/candidates/" +
                      candidate.id +
                      "/replace";
                    axios.post(url, candidate);
                  }
                  setTimeout(() => {
                    this.$router.push("/candidates");
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
                  const candidate = {
                    candidateId: null,
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
                      this.candidateId +
                      this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      candidate = {
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
                        id: this.idTable,
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
                    } else {
                      candidate = {
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
                        id: this.idTable,
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
                    }
                  } else {
                    candidate = {
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
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/candidates/" +
                      candidate.id +
                      "/replace";
                    axios.post(url, candidate);
                  }
                  setTimeout(() => {
                    this.$router.push("/candidates");
                    location.reload();
                  }, 100);
                  return 0;
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
                        const candidate = {
                          candidateId: null,
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
                            this.candidateId +
                            this.selectedFile.name.slice(start, end);
                          if (this.imageEdit != null) {
                            candidate = {
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
                              id: this.idTable,
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
                          } else {
                            candidate = {
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
                              id: this.idTable,
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
                          }
                        } else {
                          candidate = {
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
                            id: this.idTable,
                          };
                          const url =
                            "http://localhost:3000/api/candidates/" +
                            candidate.id +
                            "/replace";
                          axios.post(url, candidate);
                        }
                        setTimeout(() => {
                          this.$router.push("/candidates");
                          location.reload();
                        }, 100);
                        return 0;
                      }
                    });
                }
              });
          }
        } else {
          alertify.alert("Thông báo", "cập nhật liệu thất bại!", function () {
            alertify.success("Ok");
          });
        }
      }
      if (this.role == 6 || this.role == 7) {
        if (this.editProfileFormIsValid) {
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
                    id: this.idTable,
                  };
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
                    id: this.idTable,
                  };
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
                  id: this.idTable,
                };
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
                        id: this.idTable,
                      };
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
                        id: this.idTable,
                      };
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
                      id: this.idTable,
                    };
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
                        id: this.idTable,
                      };
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
                        id: this.idTable,
                      };
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
                      id: this.idTable,
                    };
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
                              id: this.idTable,
                            };
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
                              id: this.idTable,
                            };
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
                            id: this.idTable,
                          };
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
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
      if (this.role == 8 || this.role == 9) {
        if (this.editProfileFormIsValid) {
          if (this.emailEdit == this.email && this.phoneEdit == this.phone) {
            if (crypt.getAge(this.birthday) < 28) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người đồng hành nhỏ hơn 28!",
                function () {
                  alertify.success("Ok");
                }
              );
            } else if (crypt.getAge(this.birthday) > 60) {
              alertify.alert(
                "Thông báo",
                "Tuổi của người đồng hành lớn hơn 60!",
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
                  this.companionId + this.selectedFile.name.slice(start, end);
                if (this.imageEdit != null) {
                  const companion = {
                    companionId: this.companionId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    groupCommunity: this.groupCommunity,
                    position: this.position,
                    image: fileName,
                    status: this.status,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/companions/" +
                    companion.id +
                    "/replace";
                  axios.post(url, companion);
                  axios
                    .delete(
                      "http://localhost:3000/api/Photos/companion/files/" +
                        this.imageEdit
                    )
                    .then((resp) => {
                      console.log(resp);
                    })
                    .catch((err) => console.log(err));
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/companion/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                } else {
                  const companion = {
                    companionId: this.companionId,
                    christianName: this.christianName,
                    fullName: this.fullName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email,
                    groupCommunity: this.groupCommunity,
                    position: this.position,
                    image: fileName,
                    status: this.status,
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/companions/" +
                    companion.id +
                    "/replace";
                  axios.post(url, companion);
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/companion/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                }
              } else {
                const companion = {
                  companionId: this.companionId,
                  christianName: this.christianName,
                  fullName: this.fullName,
                  birthday: this.birthday,
                  phone: this.phone,
                  email: this.email,
                  groupCommunity: this.groupCommunity,
                  position: this.position,
                  image: this.imageEdit,
                  status: this.status,
                  id: this.idTable,
                };
                const url =
                  "http://localhost:3000/api/companions/" +
                  companion.id +
                  "/replace";
                axios.post(url, companion);
              }
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
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành lớn hơn 60!",
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
                      this.companionId +
                      this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      const companion = {
                        companionId: this.companionId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        groupCommunity: this.groupCommunity,
                        position: this.position,
                        image: fileName,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/companions/" +
                        companion.id +
                        "/replace";
                      axios.post(url, companion);
                      axios
                        .delete(
                          "http://localhost:3000/api/Photos/companion/files/" +
                            this.imageEdit
                        )
                        .then((resp) => {
                          console.log(resp);
                        })
                        .catch((err) => console.log(err));
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/companion/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    } else {
                      const companion = {
                        companionId: this.companionId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        groupCommunity: this.groupCommunity,
                        position: this.position,
                        image: fileName,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/companions/" +
                        companion.id +
                        "/replace";
                      axios.post(url, companion);
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/companion/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    }
                  } else {
                    const companion = {
                      companionId: this.companionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      groupCommunity: this.groupCommunity,
                      position: this.position,
                      image: this.imageEdit,
                      status: this.status,
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/companions/" +
                      companion.id +
                      "/replace";
                    axios.post(url, companion);
                  }
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
                } else if (crypt.getAge(this.birthday) < 28) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành nhỏ hơn 28!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else if (crypt.getAge(this.birthday) > 60) {
                  alertify.alert(
                    "Thông báo",
                    "Tuổi của người đồng hành lớn hơn 60!",
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
                      this.companionId +
                      this.selectedFile.name.slice(start, end);
                    if (this.imageEdit != null) {
                      const companion = {
                        companionId: this.companionId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        groupCommunity: this.groupCommunity,
                        position: this.position,
                        image: fileName,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/companions/" +
                        companion.id +
                        "/replace";
                      axios.post(url, companion);
                      axios
                        .delete(
                          "http://localhost:3000/api/Photos/companion/files/" +
                            this.imageEdit
                        )
                        .then((resp) => {
                          console.log(resp);
                        })
                        .catch((err) => console.log(err));
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/companion/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    } else {
                      const companion = {
                        companionId: this.companionId,
                        christianName: this.christianName,
                        fullName: this.fullName,
                        birthday: this.birthday,
                        phone: this.phone,
                        email: this.email,
                        groupCommunity: this.groupCommunity,
                        position: this.position,
                        image: fileName,
                        status: this.status,
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/companions/" +
                        companion.id +
                        "/replace";
                      axios.post(url, companion);
                      axios
                        .post(
                          "http://localhost:3000/api/Photos/companion/upload?filename=" +
                            fileName,
                          fd
                        )
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => console.log(err));
                    }
                  } else {
                    const companion = {
                      companionId: this.companionId,
                      christianName: this.christianName,
                      fullName: this.fullName,
                      birthday: this.birthday,
                      phone: this.phone,
                      email: this.email,
                      groupCommunity: this.groupCommunity,
                      position: this.position,
                      image: this.imageEdit,
                      status: this.status,
                      id: this.idTable,
                    };
                    const url =
                      "http://localhost:3000/api/companions/" +
                      companion.id +
                      "/replace";
                    axios.post(url, companion);
                  }
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
                      } else if (crypt.getAge(this.birthday) < 28) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người đồng hành nhỏ hơn 28!",
                          function () {
                            alertify.success("Ok");
                          }
                        );
                      } else if (crypt.getAge(this.birthday) > 60) {
                        alertify.alert(
                          "Thông báo",
                          "Tuổi của người đồng hành lớn hơn 60!",
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
                            this.companionId +
                            this.selectedFile.name.slice(start, end);
                          if (this.imageEdit != null) {
                            const companion = {
                              companionId: this.companionId,
                              christianName: this.christianName,
                              fullName: this.fullName,
                              birthday: this.birthday,
                              phone: this.phone,
                              email: this.email,
                              groupCommunity: this.groupCommunity,
                              position: this.position,
                              image: fileName,
                              status: this.status,
                              id: this.idTable,
                            };
                            const url =
                              "http://localhost:3000/api/companions/" +
                              companion.id +
                              "/replace";
                            axios.post(url, companion);
                            axios
                              .delete(
                                "http://localhost:3000/api/Photos/companion/files/" +
                                  this.imageEdit
                              )
                              .then((resp) => {
                                console.log(resp);
                              })
                              .catch((err) => console.log(err));
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/companion/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                          } else {
                            const companion = {
                              companionId: this.companionId,
                              christianName: this.christianName,
                              fullName: this.fullName,
                              birthday: this.birthday,
                              phone: this.phone,
                              email: this.email,
                              groupCommunity: this.groupCommunity,
                              position: this.position,
                              image: fileName,
                              status: this.status,
                              id: this.idTable,
                            };
                            const url =
                              "http://localhost:3000/api/companions/" +
                              companion.id +
                              "/replace";
                            axios.post(url, companion);
                            axios
                              .post(
                                "http://localhost:3000/api/Photos/companion/upload?filename=" +
                                  fileName,
                                fd
                              )
                              .then((res) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                          }
                        } else {
                          const companion = {
                            companionId: this.companionId,
                            christianName: this.christianName,
                            fullName: this.fullName,
                            birthday: this.birthday,
                            phone: this.phone,
                            email: this.email,
                            groupCommunity: this.groupCommunity,
                            position: this.position,
                            image: this.imageEdit,
                            status: this.status,
                            id: this.idTable,
                          };
                          const url =
                            "http://localhost:3000/api/companions/" +
                            companion.id +
                            "/replace";
                          axios.post(url, companion);
                        }
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
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
      if (this.role == 10) {
        if (this.editProfileFormWithTeacherIsValid) {
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
              if (this.selectedFile != null) {
                const fd = new FormData();
                fd.append("image", this.selectedFile, this.selectedFile.name);
                var start = this.selectedFile.name.lastIndexOf(".");
                var end = this.selectedFile.length;
                var fileName =
                  this.teacherId + this.selectedFile.name.slice(start, end);
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
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/teachers/" +
                    teacher.id +
                    "/replace";
                  axios.post(url, teacher);
                  axios
                    .delete(
                      "http://localhost:3000/api/Photos/teacher/files/" +
                        this.imageEdit
                    )
                    .then((resp) => {
                      console.log(resp);
                    })
                    .catch((err) => console.log(err));
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
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
                    id: this.idTable,
                  };
                  const url =
                    "http://localhost:3000/api/teachers/" +
                    teacher.id +
                    "/replace";
                  axios.post(url, teacher);
                  axios
                    .post(
                      "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                        fileName,
                      fd
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
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
                  id: this.idTable,
                };
                const url =
                  "http://localhost:3000/api/teachers/" +
                  teacher.id +
                  "/replace";
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
                        this.teacherId +
                        this.selectedFile.name.slice(start, end);
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
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/teachers/" +
                          teacher.id +
                          "/replace";
                        axios.post(url, teacher);
                        axios
                          .delete(
                            "http://localhost:3000/api/Photos/teacher/files/" +
                              this.imageEdit
                          )
                          .then((resp) => {
                            console.log(resp);
                          })
                          .catch((err) => console.log(err));
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
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
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/teachers/" +
                          teacher.id +
                          "/replace";
                        axios.post(url, teacher);
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
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
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/teachers/" +
                        teacher.id +
                        "/replace";
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
                        this.teacherId +
                        this.selectedFile.name.slice(start, end);
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
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/teachers/" +
                          teacher.id +
                          "/replace";
                        axios.post(url, teacher);
                        axios
                          .delete(
                            "http://localhost:3000/api/Photos/teacher/files/" +
                              this.imageEdit
                          )
                          .then((resp) => {
                            console.log(resp);
                          })
                          .catch((err) => console.log(err));
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
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
                          id: this.idTable,
                        };
                        const url =
                          "http://localhost:3000/api/teachers/" +
                          teacher.id +
                          "/replace";
                        axios.post(url, teacher);
                        axios
                          .post(
                            "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                              fileName,
                            fd
                          )
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => console.log(err));
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
                        id: this.idTable,
                      };
                      const url =
                        "http://localhost:3000/api/teachers/" +
                        teacher.id +
                        "/replace";
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
                              this.teacherId +
                              this.selectedFile.name.slice(start, end);
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
                                id: this.idTable,
                              };
                              const url =
                                "http://localhost:3000/api/teachers/" +
                                teacher.id +
                                "/replace";
                              axios.post(url, teacher);
                              axios
                                .delete(
                                  "http://localhost:3000/api/Photos/teacher/files/" +
                                    this.imageEdit
                                )
                                .then((resp) => {
                                  console.log(resp);
                                })
                                .catch((err) => console.log(err));
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                                    fileName,
                                  fd
                                )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.log(err));
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
                                id: this.idTable,
                              };
                              const url =
                                "http://localhost:3000/api/teachers/" +
                                teacher.id +
                                "/replace";
                              axios.post(url, teacher);
                              axios
                                .post(
                                  "http://localhost:3000/api/Photos/teacher/upload?filename=" +
                                    fileName,
                                  fd
                                )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.log(err));
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
                              id: this.idTable,
                            };
                            const url =
                              "http://localhost:3000/api/teachers/" +
                              teacher.id +
                              "/replace";
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
          alertify.alert(
            "Thông báo",
            "Cập nhật dữ liệu thất bại!",
            function () {
              alertify.success("Ok");
            }
          );
        }
      }
    },

    clearInputEditProfileForm() {
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
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
      if (this.homelandIsValid) {
        this.homeland = null;
      }
    },

    clearInputEditProfileFormWithTeacher() {
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
      if (this.birthdayIsValid) {
        this.birthday = null;
      }
    },

    toHome() {
      this.$router.push("/");
      location.reload();
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      var imgtag = document.getElementById("image");
      imgtag.title = this.selectedFile.name;
      reader.onload = function (event) {
        imgtag.src = event.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-dark">Thông Tin Cá Nhân</h6>
  </div>
  <div class="card-body">
    <form @submit.prevent="submitEditProfileForm" action="POST" method="" autocomplete="off">
      <div class="row mt-2">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-sm-3">
              <div class="text-center" v-if="imageEdit != null">
                <div v-html="htmlImage"></div>
              </div>
              <div class="text-center" v-if="imageEdit == null">
                <img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image"
                src="../images/default_image.png" alt="User Image">
              </div>
              <div class="row">
                <div class="col-sm-12 text-center mt-2">
                  <span class="font-weight-bold" style="font-size: large;">{{ fullNameShow }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 text-center mt-1 cl-darkgrey">
                  <span v-show="role == 1 || role == 2 || role == 3 || role == 4">{{ managerId }}</span>
                  <span v-show="role == 5">{{ candidateId }}</span>
                  <span v-show="role == 6 || role == 7">{{ spiritualGuideId }}</span>
                  <span v-show="role == 8 || role == 9">{{ companionId }}</span>
                  <span v-show="role == 10">{{ teacherId }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-9">
              <div class="row" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 7 || role == 8 || role == 9">
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
                  <label class="text-danger">*</label>
                  <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
                  :value="fullName" v-on:keyup="fullName = $event.target.value"
                  class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
                </div>
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="christianName">Tên Thánh</label>
                  <label class="text-danger">*</label>
                  <input type="text" :title="titleChristianName" name="christianName" id="christianName"
                    v-model="christianName" :value="christianName" v-on:keyup="christianName = $event.target.value" 
                    class="form-control  text-size-13px " placeholder="Nhập Tên Thánh..."
                    style="margin-top: -5px;">
                </div>
              </div>
              <div class="row" v-show="role == 10">
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="fullName">Họ và Tên</label>
                  <label class="text-danger">*</label>
                  <input type="text" id="fullName" name="fullName" v-model="fullName" :title="titleFullName"
                  :value="fullName" v-on:keyup="fullName = $event.target.value"
                  class="form-control text-size-13px " placeholder="Nhập Họ và Tên..." style=" margin-top: -5px;">
                </div>
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="gender">Giới Tính</label>
                  <label class="text-danger">*</label>
                  <select class="custom-select  text-size-13px  h-32px" v-model="gender" name="gender"
                    id="gender" style="margin-top: -5px;">
                    <option value="0" disabled>--- Chọn Giới Tính ---</option>
                    <option v-for="gender in genders" v-bind:value="gender.id" :selected="gender.id == gender">{{ gender.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mt-2" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5">
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
                  <label class="text-danger">*</label>
                  <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
                  :value="birthday" v-on:keyup="birthday = $event.target.value"
                    class="form-control  text-size-13px " style="margin-top: -5px;">
                </div>
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="homeland">Quê Quán</label>
                  <label class="text-danger">*</label>
                  <input v-model="homeland" name="homeland" id="homeland" type="text" :title="titleHomeland"
                  :value="homeland" v-on:keyup="homeland = $event.target.value"
                    class="form-control  text-size-13px " placeholder="Nhập Quê quán..." style="margin-top: -5px;">
                </div>
              </div>
              <div class="row mt-2" v-show="role == 10 || role == 6 || role == 7 || role == 8 || role == 9">
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="birthday">Ngày Sinh</label>
                  <label class="text-danger">*</label>
                  <input v-model="birthday" name="birthday" id="birthday" type="date" :title="titleBirthday"
                  :value="birthday" v-on:keyup="birthday = $event.target.value"
                    class="form-control  text-size-13px " style="margin-top: -5px;">
                </div>
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="image">Hình Ảnh</label>
                  <input type="file" id="image" :title="titlePicture"
                    class="form-control rounded text-size-13px" style="margin-top: -5px;" @input="onFileSelected(event)"/>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="phone">Số Điện Thoại</label>
                  <label class="text-danger">*</label>
                  <input v-model="phone" name="phone" id="phone" type="text" :title="titlePhone"
                    v-model="phone" :value="phone" v-on:keyup="phone = $event.target.value"
                    class="form-control  text-size-13px " placeholder="Nhập Số điện thoại..."
                    style="margin-top: -5px;">
                  <span v-if="checkFormatPhone" class="text-danger text-size-13px">Số điện thoại không đúng
                    định dạng</span>
                </div>
                <div class="col-lg-6">
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
              <div class="row mt-2" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5">
                <div class="col-lg-6">
                  <label class=" font-weight-bold col-form-label" for="image">Hình Ảnh</label>
                  <input type="file" id="image" :title="titlePicture"
                    class="form-control rounded text-size-13px" style="margin-top: -5px;" @input="onFileSelected(event)"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 30px;">
        <div class="col-12">
          <div style="float:right" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5 || role == 6 || role == 7 || role == 8 || role == 9">
            <button :disabled="!editProfileFormIsValid" type="submit"
              class="btn  rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right" v-show="role == 10">
            <button :disabled="!editProfileFormWithTeacherIsValid" type="submit"
              class="btn  rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right; margin-right: 10px;" v-show="role == 1 || role == 2 || role == 3 || role == 4 || role == 5">
            <button :disabled="!refreshFormEditProfile" @click="clearInputEditProfileForm"
              class="btn btn-success  rounded" style="font-size:13px;">
              <i class="fas fa-sync-alt"></i>
              &nbsp;Làm mới
            </button>
          </div>
          <div style="float:right; margin-right: 10px;" v-show="role == 10 || role == 6 || role == 7 || role == 8 || role == 9">
            <button :disabled="!refreshFormEditProfilewithTeacher" @click="clearInputEditProfileFormWithTeacher"
              class="btn btn-success  rounded" style="font-size:13px;">
              <i class="fas fa-sync-alt"></i>
              &nbsp;Làm mới
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
  `,
};

//CHANGE PASSWORD
const LayoutChangePassword = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ChangePassword = {
  data() {
    return {
      userId: null,
      role: 0,
      status: 0,
      idTable: 0,
      username: null,
      oldPassword: null,
      oldPasswordEdit: null,
      newPassword: null,
      renewPassword: null,
      titleOldPassword: "Nhập mật khẩu của bạn",
      titleNewPassword: "Nhập mật khẩu mới của bạn",
      titleRenewPassword: "Nhập lại mật khẩu mới của bạn",
      id: 0,
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        this.id = resp.data.idAccount;
        this.idTable = resp.data.idTable;
        this.username = resp.data.username;
        this.role = resp.data.role;
        this.oldPasswordEdit = resp.data.password;
        this.status = resp.data.status;
      });
  },
  computed: {
    oldPasswordIsValid() {
      return !!this.oldPassword;
    },

    oldPasswordEnoughLength() {
      return !!this.oldPasswordIsValid && !!(this.oldPassword.length < 10);
    },

    //New Password
    newPasswordIsValid() {
      return !!this.newPassword;
    },

    newPasswordEnoughLength() {
      return !!this.newPasswordIsValid && !!(this.newPassword.length < 10);
    },

    newPasswordHasNumber() {
      return /\d/.test(this.newPassword);
    },

    newPasswordHasLowercase() {
      return /[a-z]/.test(this.newPassword);
    },

    newPasswordHasUppercase() {
      return /[A-Z]/.test(this.newPassword);
    },

    newPasswordHasSpecial() {
      return /[!@#\$%\^\&*\)\(+=._-]/.test(this.newPassword);
    },

    newPasswordStrong() {
      return (
        !this.newPasswordEnoughLength &&
        this.newPasswordHasNumber &&
        this.newPasswordHasLowercase &&
        this.newPasswordHasUppercase &&
        this.newPasswordHasSpecial
      );
    },

    newPasswordMiddle() {
      return (
        (!this.newPasswordEnoughLength && this.newPasswordHasNumber) ||
        (!this.newPasswordEnoughLength && this.newPasswordHasUppercase) ||
        (!this.newPasswordEnoughLength && this.newPasswordHasSpecial)
      );
    },

    newPasswordWeak() {
      return !!this.newPasswordIsValid && !!(this.newPassword.length >= 10);
    },
    //Renew Password
    renewPasswordIsValid() {
      return !!this.renewPassword;
    },

    renewPasswordEnoughLength() {
      return !!this.renewPasswordIsValid && !!(this.renewPassword.length < 10);
    },
    //////////
    checkRenewPassword() {
      return (
        !!this.renewPasswordIsValid &&
        !!(this.newPassword != this.renewPassword)
      );
    },

    changePasswordFormIsValid() {
      return (
        this.oldPasswordIsValid &&
        this.newPasswordIsValid &&
        this.renewPasswordIsValid &&
        this.oldPassword.length >= 10 &&
        this.newPassword.length >= 10 &&
        this.renewPassword.length >= 10 &&
        !this.checkRenewPassword
      );
    },

    refreshFormChangePassword() {
      return (
        this.oldPasswordIsValid ||
        this.newPasswordIsValid ||
        this.renewPasswordIsValid
      );
    },
  },

  methods: {
    submitChangePasswordForm() {
      if (this.changePasswordFormIsValid) {
        if (this.oldPasswordEdit != this.oldPassword) {
          alertify.alert(
            "Thông báo",
            "Mật khẩu không đúng! Vui lòng nhập lại.",
            function () {
              alertify.success("Ok");
            }
          );
        } else {
          const account = {
            userId: this.userId,
            username: this.username,
            password: crypt.encrypt(this.newPassword),
            role: this.role,
            status: this.status,
            idTable: this.idTable,
            id: this.id,
          };
          const url =
            "http://localhost:3000/api/accounts/" + account.id + "/replace";
          axios.post(url, account);
          this.$router.push("/");
          location.reload();
          return 0;
        }
      } else {
        alertify.alert("Thông báo", "Cập nhật dữ liệu thất bại!", function () {
          alertify.success("Ok");
        });
      }
    },

    clearInputChangePasswordForm() {
      if (this.oldPasswordIsValid) {
        this.oldPassword = null;
      }
      if (this.newPasswordIsValid) {
        this.newPassword = null;
      }
      if (this.renewPasswordIsValid) {
        this.renewPassword = null;
      }
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thay Đổi Mật Khẩu</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitChangePasswordForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="oldPassword">Mật Khẩu Hiện Tại</label>
            <label class="text-danger">*</label>
            <input type="password" v-bind:title="titleOldPassword" v-model="oldPassword" id="oldPassword"
              name="oldPassword" class="form-control text-size-13px " placeholder="Nhập Tài khoản..."
              style="margin-top: -5px;">
            <span v-if="oldPasswordEnoughLength" class="text-danger text-size-13px">Mật khẩu phải trên 9 ký tự</span>
          </div>
          <div class="col-lg-4"></div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="newPassword">Mật Khẩu Mới</label>
            <label class="text-danger">*</label>
            <input v-bind:title="titleNewPassword" v-model="newPassword" id="newPassword" name="newPassword"
              type="password" class="form-control  text-size-13px " placeholder="Nhập Mật khẩu Mới..." style="margin-top: -5px;">
            <span v-if="newPasswordEnoughLength" class="text-danger text-size-13px">Mật khẩu phải trên 9 ký tự</span>
            <span v-else-if="newPasswordStrong" class="text-success text-size-13px">Mật khẩu mạnh</span>
            <span v-else-if="newPasswordMiddle" class="text-warning text-size-13px">Mật khẩu trung bình</span>
            <span v-else-if="newPasswordWeak" class="text-danger text-size-13px">Mật khẩu yếu</span>
          </div>
          <div class="col-lg-4"></div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="font-weight-bold col-form-label" for="renewPassword">Nhập Lại Mật Khẩu Mới</label>
            <label class="text-danger">*</label>
            <input v-bind:title="titleRenewPassword" v-model="renewPassword" id="renewPassword" name="renewPassword"
              type="password" class="form-control  text-size-13px " placeholder="Nhập Lại Mật khẩu Mới..." style="margin-top: -5px;">
            <span v-if="renewPasswordEnoughLength" class="text-danger text-size-13px">Mật khẩu phải trên 9 ký tự</span>
            <span v-else-if="checkRenewPassword" class="text-danger text-size-13px">Hai mật khẩu không giống nhau</span>
          </div>
          <div class="col-lg-4"></div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!changePasswordFormIsValid" type="submit"
                class="btn rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormChangePassword" @click="clearInputChangePasswordForm"
                class="btn btn-success rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
};

//Met Companion
const MetCompanion = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListMetCompanion = {
  data() {
    return {
      statuses: [
        { id: 1, name: "Chưa gặp người ĐH" },
        { id: 2, name: "Đã gặp người ĐH" },
      ],
      reportStatuses: [
        { id: 1, name: "Chưa làm báo cáo" },
        { id: 2, name: "Đã làm báo cáo" },
      ],
      metCompanions: [],
      titleButtonConfirm: "Xác nhận đã gặp",
      companions: [],
      candidates: [],
      idTable: 0,
      role: 0,
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
    //       "http://localhost:3000/api/metCompanions?filter[where][companion]=" +
    //         this.idTable
    //     )
    //     .then((response) => {
    //       this.metCompanions = response.data;
    //     });
    // } else if (this.role === 1 || this.role === 2) {
    //   axios.get("http://localhost:3000/api/metCompanions").then((response) => {
    //     this.metCompanions = response.data;
    //   });
    // }

    axios.get("http://localhost:3000/api/metCompanions").then((response) => {
      this.metCompanions = response.data;
    });
    axios.get("http://localhost:3000/api/companions").then((respCom) => {
      this.companions = respCom.data;
    });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
  },
  computed: {},
  methods: {
    ConfirmMetCompanion(metCompanion) {
      if (metCompanion.status == 1) {
        const newMetCompanion = {
          companion: metCompanion.companion,
          candidate: metCompanion.candidate,
          registeredDate: metCompanion.registeredDate,
          status: 2,
          reportStatus: metCompanion.reportStatus,
          idSchedule: metCompanion.idSchedule,
        };
        const url =
          "http://localhost:3000/api/metCompanions/" +
          metCompanion.id +
          "/replace";
        axios.post(url, newMetCompanion);
        setTimeout(() => {
          location.reload();
        }, 50);
      } else if (metCompanion.status == 2) {
        const newMetCompanion = {
          companion: metCompanion.companion,
          candidate: metCompanion.candidate,
          registeredDate: metCompanion.registeredDate,
          status: 1,
          reportStatus: metCompanion.reportStatus,
          idSchedule: metCompanion.idSchedule,
        };
        const url =
          "http://localhost:3000/api/metCompanions/" +
          metCompanion.id +
          "/replace";
        axios.post(url, newMetCompanion);
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
          <h6 class="m-0 font-weight-bold text-dark">Thống Kê Ứng Sinh Gặp Đồng Hành</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2"></div>
      </div>
    </div>
    <div class="card-body">
      <hr style="height:1px;color:lightgray;background-color:lightgray">
      <div class="table-responsive" style="margin-top:-8px">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Người Đồng Hành</th>
              <th scope="col">Ứng Sinh</th>
              <th scope="col">Ngày Đăng Ký</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Báo Cáo ĐH</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Người Đồng Hành</th>
              <th scope="col">Ứng Sinh</th>
              <th scope="col">Ngày Đăng Ký</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Báo Cáo ĐH</th>
              <th scope="col">Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(metCompanion, index) in metCompanions" :key="metCompanion.id">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td v-for="companion in companions" v-if="companion.id == metCompanion.companion">{{ companion.fullName }}</td>
              <td v-for="candidate in candidates" v-if="candidate.id == metCompanion.candidate">{{ candidate.fullName }}</td>
              <td>{{ crypt.formatDate(metCompanion.registeredDate) }}</td>
              <td v-for="status in statuses" v-if="metCompanion.status == status.id">{{ status.name }}</td>
              <td v-for="reportStatus in reportStatuses" v-if="metCompanion.reportStatus == reportStatus.id">{{ reportStatus.name }}</td>
              <td class="align-middle">
                <div class="row" style="margin-left:-15px;">
                  <div class="col-4">
                    <button :title="titleButtonConfirm" @click="ConfirmMetCompanion(metCompanion)" class="btn btn-primary btn-sm h-28px w-28px rounded"
                      type="submit">
                      <i class="fas fa-check fa-md ml--2px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

const MetSpiritualGuide = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListMetSpiritualGuide = {
  data() {
    return {
      statuses: [
        { id: 1, name: "Chưa gặp người LH" },
        { id: 2, name: "Đã gặp người LH" },
      ],
      reportStatuses: [
        { id: 1, name: "Chưa làm báo cáo" },
        { id: 2, name: "Đã làm báo cáo" },
      ],
      metSpiritualGuides: [],
      titleButtonConfirm: "Xác nhận đã gặp",
      spiritualGuides: [],
      candidates: [],
      idTable: 0,
      role: 0,
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
    //       "http://localhost:3000/api/metSpiritualGuides?filter[where][spiritualGuide]=" +
    //         this.idTable
    //     )
    //     .then((response) => {
    //       this.metSpiritualGuides = response.data;
    //     });
    // } else if (this.role === 1 || this.role === 2) {
    //   axios.get("http://localhost:3000/api/metSpiritualGuides").then((response) => {
    //     this.metSpiritualGuides = response.data;
    //   });
    // }
    axios
      .get("http://localhost:3000/api/metSpiritualGuides")
      .then((response) => {
        this.metSpiritualGuides = response.data;
      });
    axios
      .get("http://localhost:3000/api/spiritualGuides")
      .then((respSpirit) => {
        this.spiritualGuides = respSpirit.data;
      });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
  },
  computed: {},
  methods: {
    ConfirmMetSpiritualGuide(metSpiritualGuide) {
      if (metSpiritualGuide.status == 1) {
        const newMetSpiritualGuide = {
          spiritualGuide: metSpiritualGuide.spiritualGuide,
          candidate: metSpiritualGuide.candidate,
          registeredDate: metSpiritualGuide.registeredDate,
          status: 2,
          reportStatus: metSpiritualGuide.reportStatus,
          idSchedule: metSpiritualGuide.idSchedule,
        };
        const url =
          "http://localhost:3000/api/metSpiritualGuides/" +
          metSpiritualGuide.id +
          "/replace";
        axios.post(url, newMetSpiritualGuide);
        setTimeout(() => {
          location.reload();
        }, 50);
      } else if (metSpiritualGuide.status == 2) {
        const newMetSpiritualGuide = {
          spiritualGuide: metSpiritualGuide.spiritualGuide,
          candidate: metSpiritualGuide.candidate,
          registeredDate: metSpiritualGuide.registeredDate,
          status: 1,
          reportStatus: metSpiritualGuide.reportStatus,
          idSchedule: metSpiritualGuide.idSchedule,
        };
        const url =
          "http://localhost:3000/api/metSpiritualGuides/" +
          metSpiritualGuide.id +
          "/replace";
        axios.post(url, newMetSpiritualGuide);
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
          <h6 class="m-0 font-weight-bold text-dark">Thống Kê Ứng Sinh Gặp Linh Hướng</h6>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2"></div>
      </div>
    </div>
    <div class="card-body">
      <hr style="height:1px;color:lightgray;background-color:lightgray">
      <div class="table-responsive" style="margin-top:-8px">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Người Đồng Hành</th>
              <th scope="col">Ứng Sinh</th>
              <th scope="col">Ngày Đăng Ký</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Báo Cáo LH</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Người Đồng Hành</th>
              <th scope="col">Ứng Sinh</th>
              <th scope="col">Ngày Đăng Ký</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Báo Cáo LH</th>
              <th scope="col">Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(metSpiritualGuide, index) in metSpiritualGuides" :key="metSpiritualGuide.id">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td v-for="spiritualGuide in spiritualGuides" v-if="spiritualGuide.id == metSpiritualGuide.spiritualGuide">
                {{ spiritualGuide.fullName }}
              </td>
              <td v-for="candidate in candidates" v-if="candidate.id == metSpiritualGuide.candidate">
                {{ candidate.fullName }}
              </td>
              <td>{{ crypt.formatDate(metSpiritualGuide.registeredDate) }}</td>
              <td v-for="status in statuses" v-if="metSpiritualGuide.status == status.id">
                {{ status.name }}
              </td>
              <td v-for="reportStatus in reportStatuses" v-if="metSpiritualGuide.reportStatus == reportStatus.id">
                {{ reportStatus.name }}
              </td>
              <td class="align-middle">
                <div class="row" style="margin-left:-15px;">
                  <div class="col-4">
                    <button :title="titleButtonConfirm" @click="ConfirmMetSpiritualGuide(metSpiritualGuide)" class="btn btn-primary btn-sm h-28px w-28px rounded"
                      type="submit">
                      <i class="fas fa-check fa-md ml--2px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};
//ROUTES
const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      { path: "", name: "homePage", component: Home },
      {
        path: "/accounts",
        name: "accounts",
        component: Account,
        children: [
          { path: "", name: "listAccount", component: ListAccount },
          { path: "add", name: "addAccount", component: AddAccount },
          { path: ":id/edit", name: "editAccount", component: EditAccount },
        ],
      },
      {
        path: "/managers",
        name: "managers",
        component: Manager,
        children: [
          { path: "", name: "listManager", component: ListManager },
          { path: "add", name: "addManager", component: AddManager },
          { path: ":id/edit", name: "editManager", component: EditManager },
        ],
      },
      {
        path: "/departments",
        name: "departments",
        component: Department,
        children: [
          { path: "", name: "listDepartment", component: ListDepartment },
          { path: "add", name: "addDepartment", component: AddDepartment },
          {
            path: ":id/edit",
            name: "editDepartment",
            component: EditDepartment,
          },
        ],
      },
      {
        path: "/candidates",
        name: "candidates",
        component: Candidate,
        children: [
          { path: "", name: "listCandidate", component: ListCandidate },
          { path: "add", name: "addCandidate", component: AddCandidate },
          { path: ":id/edit", name: "editCandidate", component: EditCandidate },
        ],
      },
      {
        path: "/communities",
        name: "communities",
        component: Community,
        children: [
          { path: "", name: "listCommunity", component: ListCommunity },
          { path: "add", name: "addCommunity", component: AddCommunity },
          { path: ":id/edit", name: "editCommunity", component: EditCommunity },
        ],
      },
      {
        path: "/companions",
        name: "companions",
        component: Companion,
        children: [
          { path: "", name: "listCompanion", component: ListCompanion },
          { path: "add", name: "addCompanion", component: AddCompanion },
          { path: ":id/edit", name: "editCompanion", component: EditCompanion },
        ],
      },
      {
        path: "/spiritualGuides",
        name: "spiritualGuides",
        component: SpiritualGuide,
        children: [
          {
            path: "",
            name: "listSpiritualGuide",
            component: ListSpiritualGuide,
          },
          {
            path: "add",
            name: "addSpiritualGuide",
            component: AddSpiritualGuide,
          },
          {
            path: ":id/edit",
            name: "editSpiritualGuide",
            component: EditSpiritualGuide,
          },
        ],
      },
      {
        path: "/groupCommunities",
        name: "groupCommunities",
        component: GroupCommunity,
        children: [
          {
            path: "",
            name: "listGroupCommunity",
            component: ListGroupCommunity,
          },
          {
            path: "add",
            name: "addGroupCommunity",
            component: AddGroupCommunity,
          },
          {
            path: ":id/edit",
            name: "editGroupCommunity",
            component: EditGroupCommunity,
          },
        ],
      },
      {
        path: "/teachers",
        name: "teachers",
        component: Teacher,
        children: [
          { path: "", name: "listTeacher", component: ListTeacher },
          { path: "add", name: "addTeacher", component: AddTeacher },
          { path: ":id/edit", name: "editTeacher", component: EditTeacher },
        ],
      },
      {
        path: "/schedules",
        name: "schedules",
        component: Schedule,
        children: [
          { path: "", name: "listSchedule", component: ListSchedule },
          { path: "add", name: "addSchedule", component: AddSchedule },
          { path: ":id/edit", name: "editSchedule", component: EditSchedule },
        ],
      },
      {
        path: "/scheduleCompanions",
        name: "ScheduleCompanions",
        component: ScheduleCompanion,
        children: [
          {
            path: "",
            name: "listScheduleCompanions",
            component: RegisteringScheduleCompanion,
          },
        ],
      },
      {
        path: "/reportCompanions",
        name: "reportCompanions",
        component: ReportCompanion,
        children: [
          { path: "", name: "listReportCompanion", component: ListReportCompanion },
          { path: "add", name: "addReportCompanion", component: AddReportCompanion },
          { path: ":id/edit", name: "editReportCompanion", component: EditReportCompanion },
        ],
      },
      {
        path: "/scheduleSpiritualGuides",
        name: "ScheduleSpiritualGuides",
        component: ScheduleSpiritualGuide,
        children: [
          {
            path: "",
            name: "listScheduleSpiritualGuides",
            component: RegisteringScheduleSpiritualGuide,
          },
        ],
      },
      {
        path: "/reportSpiritualGuides",
        name: "reportSpiritualGuides",
        component: ReportSpiritualGuide,
        children: [
          { path: "", name: "listReportSpiritualGuide", component: ListReportSpiritualGuide },
          { path: "add", name: "addReportSpiritualGuide", component: AddReportSpiritualGuide },
          { path: ":id/edit", name: "editReportSpiritualGuide", component: EditReportSpiritualGuide },
        ],
      },
      {
        path: "/roles",
        name: "roles",
        component: Role,
        children: [
          { path: "", name: "listRole", component: ListRole },
          { path: "add", name: "addRole", component: AddRole },
          { path: ":id/edit", name: "editRole", component: EditRole },
        ],
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        children: [
          { path: "", name: "detailProfile", component: DetailProfile },
        ],
      },
      {
        path: "/changePassword",
        name: "layoutChangePassword",
        component: LayoutChangePassword,
        children: [
          { path: "", name: "changePassword", component: ChangePassword },
        ],
      },
      {
        path: "/metCompanions",
        name: "metCompanions",
        component: MetCompanion,
        children: [
          { path: "", name: "listMetCompanion", component: ListMetCompanion },
        ],
      },
      {
        path: "/metSpiritualGuides",
        name: "metSpiritualGuides",
        component: MetSpiritualGuide,
        children: [
          {
            path: "",
            name: "listMetSpiritualGuide",
            component: ListMetSpiritualGuide,
          },
        ],
      },
    ],
  },
  { path: "/login", name: "login", component: Login },
  { path: "/auth-redirect", redirect: { name: "homePage" } },
  { path: "/404", name: "errorPage", component: Page404 },
  { path: "*", redirect: "/404" },
];
//ROUTER
const router = new VueRouter({
  // mode: 'history',
  routes,
});
//CRYPT ASE
var crypt = {
  secret: "CIPHERKEY",
  encrypt: function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },

  decrypt: function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  },

  formatDate: function (dateFormat) {
    var date = new Date(dateFormat);
    return (
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) + "/" +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" + date.getFullYear()
      //  +
      // "-" +
      // (date.getMonth() > 8
      //   ? date.getMonth() + 1
      //   : "0" + (date.getMonth() + 1)) +
      // "-" +
      // (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
    );
  },
  getAge: function (birthday) {
    return Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e10);
  },
  getDateAndMonth: function (grSess) {
    var today = new Date();
    var dd = String(grSess).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    return dd + "/" + mm;
  },
};

//VUE
/*******************************************/ new Vue({
  el: "#myApp",
  store,
  router,
});
