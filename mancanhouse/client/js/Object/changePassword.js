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
      <h5 class="m-0 font-weight-bold text-primary">Thay Đổi Mật Khẩu</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitChangePasswordForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="oldPassword">Mật Khẩu Hiện Tại</label>
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
            <label class="text-size-15px font-weight-bold col-form-label" for="newPassword">Mật Khẩu Mới</label>
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
            <label class="text-size-15px font-weight-bold col-form-label" for="renewPassword">Nhập Lại Mật Khẩu Mới</label>
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
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormChangePassword" @click="clearInputChangePasswordForm"
                class="btn btn-success text-size-15px rounded">
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