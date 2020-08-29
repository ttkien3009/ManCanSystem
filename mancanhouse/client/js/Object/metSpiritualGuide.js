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
        { id: 1, name: "Chưa gặp LH" },
        { id: 2, name: "Đã gặp LH" },
      ],
      metSpiritualGuides: [],
      titleButtonConfirm: "Xác nhận đã gặp",
      spiritualGuides: [],
      candidates: [],
      idTable: 0,
      role: 0,
      roleName: null,
    };
  },
  mounted() {
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
          idSchedule: metSpiritualGuide.idSchedule,
        };
        axios
          .get(
            "http://localhost:3000/api/countMets?filter[where][candidate]=" +
              metSpiritualGuide.candidate
          )
          .then((respCountMet) => {
            const countMet = {
              candidate: respCountMet.data[0].candidate,
              countMetCompanion: respCountMet.data[0].countMetCompanion,
              countMetSpiritualGuide:
                respCountMet.data[0].countMetSpiritualGuide + 1,
              id: respCountMet.data[0].id,
            };
            const url_3 =
              "http://localhost:3000/api/countMets/" + countMet.id + "/replace";
            axios.post(url_3, countMet);
            const url =
              "http://localhost:3000/api/metSpiritualGuides/" +
              metSpiritualGuide.id +
              "/replace";
            axios.post(url, newMetSpiritualGuide);
            setTimeout(() => {
              location.reload();
            }, 50);
          });
      } else if (metSpiritualGuide.status == 2) {
        const newMetSpiritualGuide = {
          spiritualGuide: metSpiritualGuide.spiritualGuide,
          candidate: metSpiritualGuide.candidate,
          registeredDate: metSpiritualGuide.registeredDate,
          status: 1,
          idSchedule: metSpiritualGuide.idSchedule,
        };
        axios
          .get(
            "http://localhost:3000/api/countMets?filter[where][candidate]=" +
              metSpiritualGuide.candidate
          )
          .then((respCountMet) => {
            const countMet = {
              candidate: this.idTable,
              countMetCompanion: respCountMet.data[0].countMetCompanion,
              countMetSpiritualGuide:
                respCountMet.data[0].countMetSpiritualGuide - 1,
              id: respCountMet.data[0].id,
            };
            const url_3 =
              "http://localhost:3000/api/countMets/" + countMet.id + "/replace";
            axios.post(url_3, countMet);
            const url =
              "http://localhost:3000/api/metSpiritualGuides/" +
              metSpiritualGuide.id +
              "/replace";
            axios.post(url, newMetSpiritualGuide);
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
              <th scope="col">Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(metSpiritualGuide, index) in metSpiritualGuides" v-if="metSpiritualGuide.spiritualGuide === idTable" :key="metSpiritualGuide.id" v-show="role === 6 || role === 7">
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
            <tr v-for="(metSpiritualGuide, index) in metSpiritualGuides" :key="metSpiritualGuide.id" v-show="role === 1 || role === 2">
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