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
    <div class="card-header py-3">
      <div class="row">
        <div class="col-md-4">
          <h5 class="m-0 font-weight-bold text-primary">Danh sách Tài Khoản</h5>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addAccount' }">
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
              <th scope="col">Mã TK</th>
              <th scope="col">Tài Khoản</th>
              <th scope="col">Phân Quyền</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col">ID</th>
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
              <td v-for="role in roles" v-if="role.id == account.role">{{ role.name }}</td>
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
                  <div class="col-4" style="margin-left:-10px;">
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
      <h5 class="m-0 font-weight-bold text-primary">Thêm Tài Khoản</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddAccountForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Tài Khoản:</label>
            <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Tài Khoản</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="username">Tài Khoản</label>
            <label class="text-danger">*</label>
            <input type="text" v-bind:title="titleUsername" name="username" id="username" v-model="username"
              class="form-control text-size-13px " placeholder="Nhập Tài khoản..."
              style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="password">Mật Khẩu</label>
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
            <label class="text-size-15px font-weight-bold col-form-label" for="role">Phân Quyền</label>
            <label class="text-danger">*</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="role" id="role" name="role"
              style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Phân quyền ---</option>
              <option v-for="role in roles" v-bind:value="role.id">{{ role.name }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="status">Tình Trạng</label>
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
              <button :disabled="!addAccountFormIsValid" type="submit" class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshAccountForm" @click="clearInputAccountForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListAccount">
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
      usernameEdit: null,
      passwordEdit: null,
      roleEdit: 0,
      statusEdit: 0,
      userIdEdit: null,
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
        this.usernameEdit = response.data.account.username;
        this.passwordEdit = crypt.decrypt(response.data.account.password);
        this.roleEdit = response.data.account.role;
        this.statusEdit = response.data.account.status;
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
          username: this.usernameEdit,
          password: crypt.encrypt(this.passwordEdit),
          role: this.roleEdit,
          status: this.statusEdit,
          userId: this.userIdEdit,
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
    <h5 class="m-0 font-weight-bold text-primary">Chỉnh sửa Tài Khoản</h5>
  </div>
  <div class="card-body">
    <form @submit.prevent="submitEditAccountForm" action="POST" method="" autocomplete="off">
      <div class="row mt-2">
        <div class="col-lg-4">
          <label class="font-weight-bold">Thông Tin Tài Khoản:</label>
          <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Tài Khoản</p>
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="usernameEdit">Tài Khoản</label>
          <label class="text-danger">*</label>
          <input type="text" v-bind:title="titleUsername" v-model="usernameEdit" id="usernameEdit"
            name="usernameEdit" class="form-control text-size-13px " placeholder="Nhập Tài khoản..."
            :value="usernameEdit" v-on:keyup="usernameEdit = $event.target.value"
            style="margin-top: -5px;">
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="passwordEdit">Mật Khẩu</label>
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
          <label class="text-size-15px font-weight-bold col-form-label" for="roleEdit">Phân Quyền</label>
          <label class="text-danger">*</label>
          <select class="custom-select  text-size-13px  h-32px" v-model="roleEdit" id="roleEdit" name="roleEdit"
            style="margin-top: -5px;">
            <option value="0" disabled>--- Chọn Phân quyền ---</option>
            <option v-for="role in roles" v-bind:value ="role.id" :selected="role.id == roleEdit">{{ role.name }}</option>
          </select>
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="statusEdit">Tình Trạng</label>
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
              class="btn text-size-15px rounded btn-hover-blue"
              style="background-color: #056299;color: white;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right; margin-right: 10px;">
            <button :disabled="!refreshForm" @click="clearInput"
              class="btn btn-success text-size-15px rounded">
              <i class="fas fa-sync-alt"></i>
              &nbsp;Làm mới
            </button>
          </div>
          <div style="float:right; margin-right: 335px;">
            <button class="btn text-size-15px rounded btn-hover-blue"
              style="background-color: #056299;color: white;" @click="toListAccount">
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