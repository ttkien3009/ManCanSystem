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
        { id: 1, name: "Chưa gặp ĐH" },
        { id: 2, name: "Đã gặp ĐH" },
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
      roleName: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/companions").then((respCom) => {
      this.companions = respCom.data;
    });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
    axios
      .get(
        "http://localhost:3000/api/logins/findOne?filter[where][token]=token"
      )
      .then((resp) => {
        this.idTable = resp.data.idTable;
        axios
          .get(
            "http://localhost:3000/api/roles?filter[where][id]=" +
              resp.data.role
          )
          .then((respRole) => {
            this.roleName = respRole.data[0].roleName;
            if (this.roleName == "Quản trị viên") {
              this.role = 1;
            } else if (this.roleName == "Giám đốc") {
              this.role = 2;
            } else if (this.roleName == "Quản lý") {
              this.role = 3;
            } else if (this.roleName == "Giám học") {
              this.role = 4;
            } else if (this.roleName == "Ứng sinh") {
              this.role = 5;
            } else if (this.roleName == "Trưởng linh hướng") {
              this.role = 6;
            } else if (this.roleName == "Linh hướng") {
              this.role = 7;
            } else if (this.roleName == "Trưởng đồng hành") {
              this.role = 8;
            } else if (this.roleName == "Đồng hành") {
              this.role = 9;
            } else if (this.roleName == "Giảng viên") {
              this.role = 10;
            }
          });
      });
    axios.get("http://localhost:3000/api/metCompanions").then((response) => {
      this.metCompanions = response.data;
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
          dateMet: metCompanion.dateMet,
          reportStatus: metCompanion.reportStatus,
          idSchedule: metCompanion.idSchedule,
        };
        axios
          .get(
            "http://localhost:3000/api/countMets?filter[where][candidate]=" +
              metCompanion.candidate
          )
          .then((respCountMet) => {
            const countMet = {
              candidate: metCompanion.candidate,
              countMetCompanion: respCountMet.data[0].countMetCompanion + 1,
              countMetSpiritualGuide:
                respCountMet.data[0].countMetSpiritualGuide,
              id: respCountMet.data[0].id,
            };
            console.log(countMet);
            const url_3 =
              "http://localhost:3000/api/countMets/" + countMet.id + "/replace";
            axios.post(url_3, countMet);
            const url =
              "http://localhost:3000/api/metCompanions/" +
              metCompanion.id +
              "/replace";
            axios.post(url, newMetCompanion);
            setTimeout(() => {
              location.reload();
            }, 50);
          });
      } else if (metCompanion.status == 2) {
        const newMetCompanion = {
          companion: metCompanion.companion,
          candidate: metCompanion.candidate,
          registeredDate: metCompanion.registeredDate,
          status: 1,
          dateMet: metCompanion.dateMet,
          reportStatus: metCompanion.reportStatus,
          idSchedule: metCompanion.idSchedule,
        };
        axios
          .get(
            "http://localhost:3000/api/countMets?filter[where][candidate]=" +
              metCompanion.candidate
          )
          .then((respCountMet) => {
            const countMet = {
              candidate: metCompanion.candidate,
              countMetCompanion: respCountMet.data[0].countMetCompanion - 1,
              countMetSpiritualGuide:
                respCountMet.data[0].countMetSpiritualGuide,
              id: respCountMet.data[0].id,
            };
            const url_3 =
              "http://localhost:3000/api/countMets/" + countMet.id + "/replace";
            axios.post(url_3, countMet);
            const url =
              "http://localhost:3000/api/metCompanions/" +
              metCompanion.id +
              "/replace";
            axios.post(url, newMetCompanion);
            setTimeout(() => {
              location.reload();
            }, 50);
          });
      }
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
  <div class="card-header py-3" style="margin-bottom:-40px">
    <div class="row">
      <div class="col-md-4">
        <h6 class="m-0 font-weight-bold text-dark">Thống kê Gặp Đồng hành</h6>
      </div>
      <div class="col-md-6"></div>
      <div class="col-md-2" style="padding-left:68px;">
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
          <tr v-for="(metCompanion, index) in metCompanions" v-if="metCompanion.companion === idTable" :key="metCompanion.id" v-show="role === 8 || role === 9">
            <th class="align-middle" scope="row">{{ index + 1 }}</th>
            <td v-for="companion in companions" v-if="companion.id == metCompanion.companion">{{ companion.fullName }}</td>
            <td v-for="candidate in candidates" v-if="candidate.id == metCompanion.candidate">{{ candidate.fullName }}</td>
            <td>{{ crypt.formatDateDisplay(metCompanion.registeredDate) }}</td>
            <td v-for="status in statuses" v-if="status.id == metCompanion.status">{{ status.name }}</td>
            <td v-for="reportStatus in reportStatuses" v-if="reportStatus.id == metCompanion.reportStatus">{{ reportStatus.name }}</td>
            <td class="align-middle">
              <div class="row">
                <div class="col-4">
                  <button :title="titleButtonConfirm" @click="ConfirmMetCompanion(metCompanion)" class="btn btn-primary btn-sm h-28px w-28px rounded"
                    type="submit">
                    <i class="fas fa-check fa-md ml--2px"></i>
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr v-for="(metCompanion, index) in metCompanions" :key="metCompanion.id" v-show="role === 1 || role === 2">
            <th class="align-middle" scope="row">{{ index + 1 }}</th>
            <td v-for="companion in companions" v-if="companion.id == metCompanion.companion">{{ companion.fullName }}</td>
            <td v-for="candidate in candidates" v-if="candidate.id == metCompanion.candidate">{{ candidate.fullName }}</td>
            <td>{{ crypt.formatDateDisplay(metCompanion.registeredDate) }}</td>
            <td v-for="status in statuses" v-if="status.id == metCompanion.status">{{ status.name }}</td>
            <td v-for="reportStatus in reportStatuses" v-if="reportStatus.id == metCompanion.reportStatus">{{ reportStatus.name }}</td>
            <td class="align-middle">
              <div class="row">
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
</div>
  `,
};