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
      console.log(this.departments);
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
    <div class="card-header py-3" style="margin-bottom:-40px">
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
      <hr style="height:1px;color:lightgray;background-color:lightgray">
      <div class="table-responsive" style="margin-top:-8px">
        <table id="dataTable" class="table table-bordered" style="width:100%">
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
        "http://localhost:3000/api/departments?filter[where][id]=" +
          this.$route.params.id
      )
      .then((response) => {
        this.name = response.data[0].name;
        this.positionType = response.data[0].positionType;
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
        };
        const url =
          "http://localhost:3000/api/departments/" +
          this.$route.params.id +
          "/replace";
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