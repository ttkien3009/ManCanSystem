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