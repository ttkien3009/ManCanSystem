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
    <div class="card-header py-3">
      <div class="row">
        <div class="col-md-4">
          <h5 class="m-0 font-weight-bold text-primary">Danh sách Nhóm Cộng Đoàn</h5>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2" style="padding-left:68px;">
          <router-link :to="{ name: 'addGroupCommunity' }">
            <button :title="titleButtonAdd" class="btn text-size-15px rounded btn-hover-blue"
              style="background-color: #056299;color: white;">
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
              <td v-for="com in communities" v-if="com.id == groupCommunity.firstCom">{{ com.communityName }}</td>
              <td v-for="com in communities" v-if="com.id == groupCommunity.secondCom">{{ com.communityName }}</td>
              <td v-for="com in communities" v-if="com.id == groupCommunity.thirdCom">{{ com.communityName }}</td>
              <td v-for="com in communities" v-if="com.id == groupCommunity.fourthCom">{{ com.communityName }}</td>
              <td v-for="com in communities" v-if="com.id == groupCommunity.fifthCom">{{ com.communityName }}</td>
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
      <h5 class="m-0 font-weight-bold text-primary">Thêm Nhóm Cộng Đoàn</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddGroupCommunityForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Nhóm Cộng Đoàn:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Nhóm Cộng Đoàn</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="name">Tên Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <input type="text" id="name" name="name" v-model="name" :title="titleName"
              class="form-control text-size-13px " placeholder="Nhập Tên Nhóm Cộng Đoàn..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="firstCom">Cộng Đoàn 1</label>
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
            <label class="text-size-15px font-weight-bold col-form-label" for="secondCom">Cộng Đoàn 2</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="secondCom" name="secondCom"
              id="secondCom" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn 2 ---</option>
              <option v-for="com in communities" v-bind:value="com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="thirdCom">Cộng Đoàn 3</label>
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
            <label class="text-size-15px font-weight-bold col-form-label" for="fourthCom">Cộng Đoàn 4</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="fourthCom" name="fourthCom"
              id="fourthCom" style="margin-top: -5px;">
              <option value="0" disabled selected>--- Chọn Cộng Đoàn 4 ---</option>
              <option v-for="com in communities" v-bind:value="com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="fifthCom">Cộng Đoàn 5</label>
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
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormGroupCommunity" @click="clearInputGroupCommunityForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListGroupCommunity">
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
      return !!this.fifthCom;
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
      <h5 class="m-0 font-weight-bold text-primary">Chỉnh sửa Nhóm Cộng Đoàn</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditGroupCommunityForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold">Thông Tin Nhóm Cộng Đoàn:</label>
            <p style="font-size: 11px;">Thông tin phục vụ cho việc quản lý nhiều Nhóm Cộng Đoàn</p>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="name">Tên Nhóm Cộng Đoàn</label>
            <label class="text-danger">*</label>
            <input type="text" id="name" name="name" v-model="name" :title="titleName"
            :value="name" v-on:keyup="name = $event.target.value"
              class="form-control text-size-13px " placeholder="Nhập Tên Nhóm Cộng Đoàn..." style=" margin-top: -5px;">
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="firstCom">Cộng Đoàn 1</label>
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
            <label class="text-size-15px font-weight-bold col-form-label" for="secondCom">Cộng Đoàn 2</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="secondCom" name="secondCom"
              id="secondCom" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn 2 ---</option>
              <option v-for="com in communities" v-bind:value="com.id" 
              :selected="groupCommunity.secondCom == com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="thirdCom">Cộng Đoàn 3</label>
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
            <label class="text-size-15px font-weight-bold col-form-label" for="fourthCom">Cộng Đoàn 4</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="fourthCom" name="fourthCom"
              id="fourthCom" style="margin-top: -5px;">
              <option value="0" disabled>--- Chọn Cộng Đoàn 4 ---</option>
              <option v-for="com in communities" v-bind:value="com.id" 
              :selected="groupCommunity.fourthCom == com.id">{{ com.communityName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class="text-size-15px font-weight-bold col-form-label" for="fifthCom">Cộng Đoàn 5</label>
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
                class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormGroupCommunity" @click="clearInputGroupCommunityForm"
                class="btn btn-success text-size-15px rounded">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
            <div style="float:right; margin-right: 335px;">
              <button class="btn text-size-15px rounded btn-hover-blue"
                style="background-color: #056299;color: white;" @click="toListGroupCommunity">
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