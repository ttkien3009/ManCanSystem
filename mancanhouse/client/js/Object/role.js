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