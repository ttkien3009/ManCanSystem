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