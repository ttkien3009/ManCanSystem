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
                if (resp.data.status == 2) {
                  alertify.alert(
                    "Thông báo",
                    "Tài khoản không tồn tại!",
                    function () {
                      alertify.success("Ok");
                    }
                  );
                } else {
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