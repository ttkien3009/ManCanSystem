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
    <div class="card-header py-3">
      <div class="row">
        <div class="col-md-4">
          <h5 class="m-0 font-weight-bold text-primary">Danh sách Cộng Đoàn</h5>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addCommunity' }">
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
                  <div class="col-4" style="margin-left:-5px;">
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
      <h5 class="m-0 font-weight-bold text-primary">Thêm Cộng Đoàn</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddCommunityForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Cộng Đoàn:</label>
            <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Cộng đoàn</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="communityName">Tên Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <input type="text" v-bind:title="titleCommunityName" name="communityName" id="communityName" v-model="communityName"
              class="form-control text-size-13px " placeholder="Nhập Tên Cộng Đoàn..."
              style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="patron">Ngày Bổn Mạng</label>
            <label class="text-danger">*</label>
            <input v-bind:title="titlePatron" v-model="patron" id="patron" name="patron" type="date"
              class="form-control  text-size-13px " style="margin-top: -5px;">
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="address">Địa Chỉ</label>
            <label class="text-danger">*</label>
            <input type="text" v-bind:title="titleAddress" name="address" id="address" v-model="address"
            class="form-control text-size-13px " placeholder="Nhập Địa Chỉ..."
            style="margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="amount">Số Người</label>
            <label class="text-danger">*</label>
            <input type="number" v-bind:title="titleAmount" name="amount" id="amount" v-model="amount"
            class="form-control text-size-13px " placeholder="Nhập Sồ Lượng Người..."
            style="margin-top: -5px;">
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button :disabled="!addCommunityFormIsValid" type="submit" class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshCommunityForm" @click="clearInputCommunityForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;"  @click="toListCommunity">
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
    <h5 class="m-0 font-weight-bold text-primary">Chỉnh sửa Cộng Đoàn</h5>
  </div>
  <div class="card-body">
    <form @submit.prevent="submitEditCommunityForm" action="POST" method="" autocomplete="off">
      <div class="row mt-2">
        <div class="col-lg-4">
          <label class="font-weight-bold">Thông Tin Cộng Đoàn:</label>
          <p style="font-size: 15px;">Thông tin phục vụ cho việc quản lý nhiều Cộng Đoàn</p>
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="communityName">Tên Cộng Đoàn</label>
          <label class="text-danger">*</label>
          <input type="text" v-bind:title="titleCommunityName" v-model="communityName" id="communityName"
            name="communityName" class="form-control text-size-13px " placeholder="Nhập Tên Cộng Đoàn..."
            :value="communityName" v-on:keyup="communityName = $event.target.value"
            style="margin-top: -5px;">
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="patron">Ngày Bổn Mạng</label>
          <label class="text-danger">*</label>
          <input v-bind:title="titlePatron" v-model="patron" id="patron" name="patron"
            type="date" class="form-control  text-size-13px " placeholder="Nhập Mật khẩu..."
            :value="patron" v-on:keyup="patron = $event.target.value" style="margin-top: -5px;">
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="address">Địa Chỉ</label>
          <label class="text-danger">*</label>
          <input type="text" v-bind:title="titleAddress" v-model="address" id="address"
            name="address" class="form-control text-size-13px " placeholder="Nhập Địa Chỉ..."
            :value="address" v-on:keyup="address = $event.target.value"
            style="margin-top: -5px;">
        </div>
        <div class="col-lg-4">
          <label class="text-size-15px font-weight-bold col-form-label" for="amount">Số Lượng Người</label>
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
              class="btn text-size-15px rounded btn-hover-blue"
              style="background-color: #056299;color: white;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right; margin-right: 10px;">
            <button :disabled="!refreshCommunityForm" @click="clearInputCommunityForm"
              class="btn btn-success text-size-15px rounded">
              <i class="fas fa-sync-alt"></i>
              &nbsp;Làm mới
            </button>
          </div>
          <div style="float:right; margin-right: 335px;">
            <button class="btn text-size-15px rounded btn-hover-blue"
              style="background-color: #056299;color: white;" @click="toListCommunity">
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