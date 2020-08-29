const ReportCompanion = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListReportCompanion = {
  data() {
    return {
      titleButtonDisplay: "Xem chi tiết",
      titleButtonDelete: "Xóa Báo Cáo",
      titleButtonEdit: "Chỉnh sửa",
      titleButtonAdd: "Thêm Báo Cáo",
      titleButtonConfirm: "Duyệt Báo Cáo",
      titleButtonScore: "Đánh giá",
      isReads: [
        { id: 1, name: "Chưa duyệt" },
        { id: 2, name: "Đã duyệt" },
      ],
      reportCompanions: [],
      reportCompanion: {},
      companions: [],
      candidates: [],
      communities: [],
      role: 0,
      idTable: 0,
      roleName: null,
      roleName: null,
      metCompanions: [],
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
    axios.get("http://localhost:3000/api/reportCompanions").then((response) => {
      this.reportCompanions = response.data;
    });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
    axios.get("http://localhost:3000/api/companions").then((respCom) => {
      this.companions = respCom.data;
    });
    axios.get("http://localhost:3000/api/communities").then((respComm) => {
      this.communities = respComm.data;
    });
    axios.get("http://localhost:3000/api/metCompanions").then((respMet) => {
      this.metCompanions = respMet.data;
    });
  },
  computed: {},
  methods: {
    getDetailReportCompanion(reportCompanion) {
      this.reportCompanion = reportCompanion;
    },

    getDataReportCompanionUpdate(reportCompanion) {
      this.$router.push({
        name: "editReportCompanion",
        params: { id: reportCompanion.id },
      });
    },

    EvaluateCandidate(reportCompanion) {
      axios
        .get(
          "http://localhost:3000/api/metCompanions?filter[where][id]=" +
            reportCompanion.idMetCompanion
        )
        .then((resp) => {
          var date = new Date(resp.data[0].registeredDate);
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          axios
            .get(
              "http://localhost:3000/api/rateCandidates?filter[where][and][0][candidate]=" +
                reportCompanion.candidate +
                "&filter[where][and][1][month]=" +
                month +
                "&filter[where][and][2][year]=" +
                year
            )
            .then((resp) => {
              var idRateCandidate = resp.data[0].id;
              this.$router.push({
                name: "editRateCandidate",
                params: { id: idRateCandidate },
              });
            });
        });
    },

    ConfirmReportCompanion(reportCompanion) {
      if (reportCompanion.isRead == 1) {
        const newReportCompanion = {
          companion: reportCompanion.companion,
          candidate: reportCompanion.candidate,
          reportDate: reportCompanion.reportDate,
          brightTL: reportCompanion.brightTL,
          brightNB: reportCompanion.brightNB,
          brightTT: reportCompanion.brightTT,
          brightCD: reportCompanion.brightCD,
          brightTD: reportCompanion.brightTD,
          darkTL: reportCompanion.darkTL,
          darkNB: reportCompanion.darkNB,
          darkTT: reportCompanion.darkTT,
          darkCD: reportCompanion.darkCD,
          darkTD: reportCompanion.darkTD,
          targetNextMonth: reportCompanion.targetNextMonth,
          idMetCompanion: reportCompanion.idMetCompanion,
          isRead: 2,
        };
        const url =
          "http://localhost:3000/api/reportCompanions/" +
          reportCompanion.id +
          "/replace";
        axios.post(url, newReportCompanion);
        setTimeout(() => {
          location.reload();
        }, 50);
      } else if (reportCompanion.isRead == 2) {
        const newReportCompanion = {
          companion: reportCompanion.companion,
          candidate: reportCompanion.candidate,
          reportDate: reportCompanion.reportDate,
          brightTL: reportCompanion.brightTL,
          brightNB: reportCompanion.brightNB,
          brightTT: reportCompanion.brightTT,
          brightCD: reportCompanion.brightCD,
          brightTD: reportCompanion.brightTD,
          darkTL: reportCompanion.darkTL,
          darkNB: reportCompanion.darkNB,
          darkTT: reportCompanion.darkTT,
          darkCD: reportCompanion.darkCD,
          darkTD: reportCompanion.darkTD,
          targetNextMonth: reportCompanion.targetNextMonth,
          idMetCompanion: reportCompanion.idMetCompanion,
          isRead: 1,
        };
        const url =
          "http://localhost:3000/api/reportCompanions/" +
          reportCompanion.id +
          "/replace";
        axios.post(url, newReportCompanion);
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
          <h6 class="m-0 font-weight-bold text-dark">Danh sách Báo Cáo</h6>
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
              <th>STT</th>
              <th>Ứng Sinh</th>
              <th>Người Đồng Hành</th>
              <th>Ngày Báo Cáo</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Ứng Sinh</th>
              <th>Người Đồng Hành</th>
              <th>Ngày Báo Cáo</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(reportCompanion, index) in reportCompanions" :key="reportCompanion.id" v-show="role === 1 || role === 2">
              <th>{{ index + 1 }}</th>
              <td v-for="candidate in candidates" v-if="candidate.id == reportCompanion.candidate">{{ candidate.fullName }}</td>
              <td v-for="companion in companions" v-if="companion.id == reportCompanion.companion">{{ companion.fullName }}</td>
              <td>{{ crypt.formatDateDisplay(reportCompanion.reportDate) }}</td>
              <td v-for="isRead in isReads" v-if="isRead.id == reportCompanion.isRead">{{ isRead.name }}</td>
              <td>
                <div class="row" style="margin-left:-15px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailReportCompanion(reportCompanion)"
                      data-target="#detailReportCompanionModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonConfirm" @click="ConfirmReportCompanion(reportCompanion)"
                       class="btn btn-info btn-sm h-28px w-28px rounded"
                      style="margin-left: -12px;">
                      <i class="far fa-check-circle fa-md ml--1px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonScore" v-show="reportCompanion.isRead === 2" @click="EvaluateCandidate(reportCompanion)"
                       class="btn btn-warning btn-sm h-28px w-28px rounded"
                      style="margin-left: -25px;">
                      <i class="fas fa-star-half-alt fa-md ml--1px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="(reportCompanion, index) in reportCompanions" v-if="reportCompanion.companion === idTable" :key="reportCompanion.id" v-show="role === 8 || role === 9">
              <th>{{ index + 1 }}</th>
              <td v-for="candidate in candidates" v-if="candidate.id == reportCompanion.candidate">{{ candidate.fullName }}</td>
              <td v-for="companion in companions" v-if="companion.id == reportCompanion.companion">{{ companion.fullName }}</td>
              <td>{{ crypt.formatDateDisplay(reportCompanion.reportDate) }}</td>
              <td v-for="isRead in isReads" v-if="isRead.id == reportCompanion.isRead">{{ isRead.name }}</td>
              <td>
                <div class="row" style="margin-left:-15px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailReportCompanion(reportCompanion)"
                      data-target="#detailReportCompanionModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonConfirm" @click="ConfirmReportCompanion(reportCompanion)"
                      class="btn btn-info btn-sm h-28px w-28px rounded"
                      style="margin-left: -13px;">
                      <i class="far fa-check-circle fa-md ml--1px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4">
                    <button :title="titleButtonScore"  v-show="reportCompanion.isRead === 2" @click="EvaluateCandidate(reportCompanion)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded"
                      style="margin-left: -25px;">
                      <i class="fas fa-star-half-alt fa-md ml--1px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="(reportCompanion, index) in reportCompanions" v-if="reportCompanion.candidate === idTable" :key="reportCompanion.id" v-show="role === 5">
              <th>{{ index + 1 }}</th>
              <td v-for="candidate in candidates" v-if="candidate.id == reportCompanion.candidate">{{ candidate.fullName }}</td>
              <td v-for="companion in companions" v-if="companion.id == reportCompanion.companion">{{ companion.fullName }}</td>
              <td>{{ crypt.formatDateDisplay(reportCompanion.reportDate) }}</td>
              <td v-for="isRead in isReads" v-if="isRead.id == reportCompanion.isRead">{{ isRead.name }}</td>
              <td>
                <div class="row" style="margin-left:-15px;">
                  <div class="col-lg-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDetailReportCompanion(reportCompanion)"
                      data-target="#detailReportCompanionModal"
                      class="btn btn-primary btn-sm align-middle h-28px w-28px rounded" type="submit">
                      <i class="far fa-eye fa-md ml--3px"></i>
                    </button>
                  </div>
                  <div class="col-lg-4" v-show="role === 5">
                    <button :title="titleButtonEdit" @click="getDataReportCompanionUpdate(reportCompanion)"
                      class="btn btn-warning btn-sm h-28px w-28px rounded" type="submit"
                      style="margin-left: -12.5px;">
                      <i class="fas fa-edit fa-md ml--2px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="detailReportCompanionModal" class="modal modal-edu-general default-popup-PrimaryModal fade rounded"
      role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" style="width:800px;margin-left:-125px;">
          <div class="modal-body">
            <div class="container-fluid mt-5" style="margin-left:35px;">
              <div class="row">
                <div class="col-md-10">
                  <span class="text-danger">Nhà Ứng Sinh Dòng Tên Việt Nam</span>
                  <hr style="height:1px;color:lightgray;background-color:lightgray;margin-top: -1px;">
                </div>
                <div class="col-md-2">
                  <img src="../images/logoungsinh.png"
                    style="width: 80px;height: 80px;margin-top: -43px;margin-left: -35px;" alt="logo-nus" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-11 text-center">
                  <strong style="font-size: larger;">NỘI DUNG GẶP ĐỒNG HÀNH</strong>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-11">
                  <table style="width:60%;border: 1.5px dashed black;border-collapse: collapse;text-align: center;"
                    class="mx-auto w-auto">
                    <tr>
                      <td
                        style="width: 40%;border: 1.5px dashed black;border-collapse: collapse;text-align: center;padding: 5px;">
                        Họ và tên</td>
                      <td style="border: 1.5px dashed black;border-collapse: collapse;text-align: center;padding: 5px;" v-for="candidate in candidates" v-if="candidate.id == reportCompanion.candidate">{{ candidate.fullName }}</td>
                    </tr>
                    <tr>
                      <td style="border: 1.5px dashed black;border-collapse: collapse;text-align: center;padding: 5px;">Cộng đoàn
                      </td>
                      <td style="border: 1.5px dashed black;border-collapse: collapse;text-align: center;padding: 5px;" v-for="candidate in candidates" v-if="candidate.id == reportCompanion.candidate">
                        <span v-for="community in communities" v-if="community.id == candidate.community">{{ community.communityName }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="border: 1.5px dashed black;border-collapse: collapse;text-align: center;padding: 5px;">Ngày,
                        tháng, năm đồng hành</td>
                      <td style="border: 1.5px dashed black;border-collapse: collapse;text-align: center;padding: 5px;" v-for="metCompanion in metCompanions" v-if="metCompanion.id == reportCompanion.idMetCompanion">{{ metCompanion.dateMet }}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-md-11">
                  <strong>1. <u>Những kinh nghiệm giúp tôi lớn lên hơn, dấn thân hơn trong đời sống ơn gọi.</u></strong>
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-md-11 table-report-content">
                  <table style="width:100%" class="mx-auto w-auto">
                    <tr>
                      <th>STT</th>
                      <th style="width: 20%;">PHƯƠNG DIỆN</th>
                      <th>KINH NGHIỆM</th>
                    </tr>
                    <tr>
                      <td>1</td>
                      <th>Thiêng liêng</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ reportCompanion.brightTL }}
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <th>Nhân bản</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.brightNB }}
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <th>Tri thức</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.brightTT }}
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <th>Cộng đoàn</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.brightCD }}
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <th>Tông đồ</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.brightTD }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-11">
                  <strong>2. <u>Những kinh nghiệm khiến đời sống tôi bị trì trệ, cản trở tôi dấn thân trong đời sống ơn
                      gọi.</u></strong>
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-md-11 table-report-content">
                  <table style="width:100%" class="mx-auto w-auto">
                    <tr>
                      <th>STT</th>
                      <th style="width: 20%;">PHƯƠNG DIỆN</th>
                      <th>KINH NGHIỆM</th>
                    </tr>
                    <tr>
                      <td>1</td>
                      <th>Thiêng liêng</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ reportCompanion.darkTL }}
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <th>Nhân bản</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.darkNB }}
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <th>Tri thức</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.darkTT }}
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <th>Cộng đoàn</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.darkCD }}
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <th>Tông đồ</th>
                      <td class="text-left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ reportCompanion.darkTD }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-12">
                  <strong>3. <u>Dựa trên nhận định tháng vừa qua, tôi có những ước ao hay quyết tâm gì cho tháng sắp tới.</u></strong>
                </div>
              </div>
              <div class="row">
                <div class="col-md-11">
                  {{ reportCompanion.targetNextMonth }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const AddReportCompanion = {
  data() {
    return {
      id: 0,
      companion: 0,
      candidate: 0,
      brightTL: null,
      brightNB: null,
      brightTT: null,
      brightCD: null,
      brightTD: null,
      darkTL: null,
      darkNB: null,
      darkTT: null,
      darkCD: null,
      darkTD: null,
      targetNextMonth: null,
      idMetCompanion: 0,
      isRead: 1,
      isReads: [
        { id: 1, name: "Chưa duyệt" },
        { id: 2, name: "Đã duyệt" },
      ],
      titleBrightTL: "Nhập điểm sáng về phương diện thiêng liêng",
      titleBrightNB: "Nhập điểm sáng về phương diện nhân bản",
      titleBrightTT: "Nhập điểm sáng về phương diện tri thức",
      titleBrightCD: "Nhập điểm sáng về phương diện cộng đoàn",
      titleBrightTD: "Nhập điểm sáng về phương diện tông đồ",
      titleDarkTL: "Nhập điểm tối về phương diện thiêng liêng",
      titleDarkNB: "Nhập điểm tối về phương diện nhân bản",
      titleDarkTT: "Nhập điểm tối về phương diện tri thức",
      titleDarkCD: "Nhập điểm tối về phương diện cộng đoàn",
      titleDarkTD: "Nhập điểm tối về phương diện tông đồ",
      titleTargetNextMonth: "Nhập mục tiêu cho tháng tới",
      companions: [],
      candidates: [],
      scheduleCompanions: [],
      reportCompanions: [],
      idTable: 0,
      role: 0,
      roleName: null,
      idSchedule: 0,
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
        axios
          .get(
            "http://localhost:3000/api/scheduleCompanions?filter[where][and][0][status]=1&filter[where][and][1][candidate]=" +
              this.idTable
          )
          .then((respSche) => {
            this.idSchedule = respSche.data[0].id;
            this.companion = respSche.data[0].companion;
            this.candidate = respSche.data[0].candidate;
          });
      });
    axios.get("http://localhost:3000/api/companions").then((response) => {
      this.companions = response.data;
    });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
  },
  computed: {
    refreshFormReportCompanion() {
      return (
        this.brightTL != null ||
        this.brightNB != null ||
        this.brightTT != null ||
        this.brightCD != null ||
        this.brightTD != null ||
        this.darkTL != null ||
        this.darkNB != null ||
        this.darkTT != null ||
        this.darkCD != null ||
        this.darkTD != null ||
        this.targetNextMonth != null
      );
    },
  },
  methods: {
    submitAddReportCompanionForm() {
      axios
        .get(
          "http://localhost:3000/api/metCompanions?filter[where][idSchedule]=" +
            this.idSchedule
        )
        .then((respMet) => {
          var currentDate = new Date();
          const reportCompanion = {
            candidate: this.idTable,
            companion: this.companion,
            reportDate: currentDate,
            brightTL: this.brightTL,
            brightNB: this.brightNB,
            brightTT: this.brightTT,
            brightCD: this.brightCD,
            brightTD: this.brightTD,
            darkTL: this.darkTL,
            darkNB: this.darkNB,
            darkTT: this.darkTT,
            darkCD: this.darkCD,
            darkTD: this.darkTD,
            targetNextMonth: this.targetNextMonth,
            idMetCompanion: respMet.data[0].id,
            isRead: 1,
          };
          const metCompanion = {
            companion: respMet.data[0].companion,
            candidate: respMet.data[0].candidate,
            registeredDate: respMet.data[0].registeredDate,
            status: respMet.data[0].status,
            dateMet: respMet.data[0].dateMet,
            reportStatus: 2,
            idSchedule: respMet.data[0].idSchedule,
          };
          const url_1 =
            "http://localhost:3000/api/metCompanions/" +
            respMet.data[0].id +
            "/replace";
          axios.post(url_1, metCompanion);
          const url = `http://localhost:3000/api/reportCompanions`;
          axios.post(url, reportCompanion);
          this.$router.push("/");
          return 0;
        });
    },

    clearInputReportCompanionForm() {
      if (this.brightTL != null) {
        this.brightTL = null;
      }
      if (this.brightNB != null) {
        this.brightNB = null;
      }
      if (this.brightTT != null) {
        this.brightTT = null;
      }
      if (this.brightCD != null) {
        this.brightCD = null;
      }
      if (this.brightTD != null) {
        this.brightTD = null;
      }
      if (this.darkTL != null) {
        this.darkTL = null;
      }
      if (this.darkNB != null) {
        this.darkNB = null;
      }
      if (this.darkTT != null) {
        this.darkTT = null;
      }
      if (this.darkCD != null) {
        this.darkCD = null;
      }
      if (this.darkTD != null) {
        this.darkTD = null;
      }
      if (this.targetNextMonth != null) {
        this.targetNextMonth = null;
      }
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Thêm Báo Cáo</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitAddReportCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Báo Cáo:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc xếp hạng ứng sinh hàng tháng</p>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="candidate">Ứng Sinh</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="candidate" name="candidate" id="candidate"
              style="margin-top: -5px;" disabled>
              <option v-for="candidate in candidates" :value="candidate.id" :selected="candidate.id == candidate">
                {{ candidate.fullName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="companion">Người Đồng Hành</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="companion" name="companion" id="companion"
              style="margin-top: -5px;" disabled>
              <option v-for="companion in companions" v-bind:value="companion.id"
                :selected="companion.id == companion">{{ companion.fullName }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <strong style="font-size:17px;">1. Những kinh nghiệm giúp tôi lớn lên hơn, dấn thân hơn trong đời sống ơn gọi.</strong>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightTL">Thiêng Liêng</label>
            <textarea class="form-control text-size-13px" :title="titleBrightTL" id="brightTL" v-model="brightTL"
              name="brightTL" rows="4" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightNB">Nhân Bản</label>
            <textarea class="form-control text-size-13px" :title="titleBrightNB" id="brightNB" v-model="brightNB"
              name="brightNB" rows="4" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightTT">Tri Thức</label>
            <textarea class="form-control text-size-13px" :title="titleBrightTT" id="brightTT" v-model="brightTT"
              name="brightTT" rows="4" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightCD">Cộng Đoàn</label>
            <textarea class="form-control text-size-13px" :title="titleBrightCD" id="brightCD" v-model="brightCD"
              name="brightCD" rows="4" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightTD">Tông Đồ</label>
            <textarea class="form-control text-size-13px" :title="titleBrightTD" id="brightTD" v-model="brightTD"
              name="brightTD" rows="4" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6"></div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <strong style="font-size:17px;">2. Những kinh nghiệm khiến đời sống tôi bị trì trệ, cản trở tôi dấn thân trong đời sống ơn
                gọi.</strong>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkTL">Thiêng Liêng</label>
            <textarea class="form-control text-size-13px" :title="titleDarkTL" id="darkTL" v-model="darkTL"
              name="darkTL" rows="4" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkNB">Nhân Bản</label>
            <textarea class="form-control text-size-13px" :title="titleDarkNB" id="darkNB" v-model="darkNB"
              name="darkNB" rows="4" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkTT">Tri Thức</label>
            <textarea class="form-control text-size-13px" :title="titleDarkTT" id="darkTT" v-model="darkTT"
              name="darkTT" rows="4" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkCD">Cộng Đoàn</label>
            <textarea class="form-control text-size-13px" :title="titleDarkCD" id="darkCD" v-model="darkCD"
              name="darkCD" rows="4" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkTD">Tông Đồ</label>
            <textarea class="form-control text-size-13px" :title="titleDarkTD" id="darkTD" v-model="darkTD"
              name="darkTD" rows="4" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6"></div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <strong style="font-size:17px;">3. Dựa trên nhận định tháng vừa qua, tôi có những ước ao hay quyết tâm gì cho tháng sắp tới.</strong>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-12">
            <label class=" font-weight-bold col-form-label" for="targetNextMonth">Mục Tiêu</label>
            <textarea class="form-control text-size-13px" :title="titleTargetNextMonth" id="targetNextMonth" v-model="targetNextMonth"
              name="targetNextMonth" rows="4" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-4"></div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button type="submit" class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormReportCompanion" @click="clearInputReportCompanionForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
};

const EditReportCompanion = {
  data() {
    return {
      id: 0,
      companion: 0,
      candidate: 0,
      brightTL: null,
      brightNB: null,
      brightTT: null,
      brightCD: null,
      brightTD: null,
      darkTL: null,
      darkNB: null,
      darkTT: null,
      darkCD: null,
      darkTD: null,
      targetNextMonth: null,
      idMetCompanion: 0,
      isRead: 1,
      isReads: [
        { id: 1, name: "Chưa duyệt" },
        { id: 2, name: "Đã duyệt" },
      ],
      titleBrightTL: "Nhập điểm sáng về phương diện thiêng liêng",
      titleBrightNB: "Nhập điểm sáng về phương diện nhân bản",
      titleBrightTT: "Nhập điểm sáng về phương diện tri thức",
      titleBrightCD: "Nhập điểm sáng về phương diện cộng đoàn",
      titleBrightTD: "Nhập điểm sáng về phương diện tông đồ",
      titleDarkTL: "Nhập điểm tối về phương diện thiêng liêng",
      titleDarkNB: "Nhập điểm tối về phương diện nhân bản",
      titleDarkTT: "Nhập điểm tối về phương diện tri thức",
      titleDarkCD: "Nhập điểm tối về phương diện cộng đoàn",
      titleDarkTD: "Nhập điểm tối về phương diện tông đồ",
      titleTargetNextMonth: "Nhập mục tiêu cho tháng tới",
      companions: [],
      candidates: [],
      scheduleCompanion: {},
      scheduleCompanions: [],
      reportCompanions: [],
      idTable: 0,
      role: 0,
      roleName: null,
      reportCompanion: {},
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
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
    axios.get("http://localhost:3000/api/companions").then((respCom) => {
      this.companions = respCom.data;
    });
    axios
      .get(
        "http://localhost:3000/api/reportCompanions?filter[where][id]=" +
          this.$route.params.id
      )
      .then((response) => {
        this.candidate = response.data[0].candidate;
        this.companion = response.data[0].companion;
        this.reportDate = response.data[0].reportDate;
        this.brightTL = response.data[0].brightTL;
        this.brightNB = response.data[0].brightNB;
        this.brightTT = response.data[0].brightTT;
        this.brightCD = response.data[0].brightCD;
        this.brightTD = response.data[0].brightTD;
        this.darkTL = response.data[0].darkTL;
        this.darkNB = response.data[0].darkNB;
        this.darkTT = response.data[0].darkTT;
        this.darkCD = response.data[0].darkCD;
        this.darkTD = response.data[0].darkTD;
        this.targetNextMonth = response.data[0].targetNextMonth;
        this.idMetCompanion = response.data[0].idMetCompanion;
        this.isRead = response.data[0].isRead;
      });
  },
  computed: {
    refreshFormReportCompanion() {
      return (
        this.brightTL != null ||
        this.brightNB != null ||
        this.brightTT != null ||
        this.brightCD != null ||
        this.brightTD != null ||
        this.darkTL != null ||
        this.darkNB != null ||
        this.darkTT != null ||
        this.darkCD != null ||
        this.darkTD != null ||
        this.targetNextMonth != null
      );
    },
  },
  methods: {
    submitEditReportCompanionForm() {
      var currentDate = new Date();
      const reportCompanion = {
        candidate: this.candidate,
        companion: this.companion,
        reportDate: currentDate,
        brightTL: this.brightTL,
        brightNB: this.brightNB,
        brightTT: this.brightTT,
        brightCD: this.brightCD,
        brightTD: this.brightTD,
        darkTL: this.darkTL,
        darkNB: this.darkNB,
        darkTT: this.darkTT,
        darkCD: this.darkCD,
        darkTD: this.darkTD,
        targetNextMonth: this.targetNextMonth,
        idMetCompanion: this.idMetCompanion,
        isRead: 1,
      };
      const url =
        "http://localhost:3000/api/reportCompanions/" +
        this.$route.params.id +
        "/replace";
      axios.post(url, reportCompanion);
      this.$router.push("/");
      location.reload();
      return 0;
    },

    clearInputReportCompanionForm() {
      if (this.brightTL != null) {
        this.brightTL = null;
      }
      if (this.brightNB != null) {
        this.brightNB = null;
      }
      if (this.brightTT != null) {
        this.brightTT = null;
      }
      if (this.brightCD != null) {
        this.brightCD = null;
      }
      if (this.brightTD != null) {
        this.brightTD = null;
      }
      if (this.darkTL != null) {
        this.darkTL = null;
      }
      if (this.darkNB != null) {
        this.darkNB = null;
      }
      if (this.darkTT != null) {
        this.darkTT = null;
      }
      if (this.darkCD != null) {
        this.darkCD = null;
      }
      if (this.darkTD != null) {
        this.darkTD = null;
      }
      if (this.targetNextMonth != null) {
        this.targetNextMonth = null;
      }
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-dark">Chỉnh sửa Báo Cáo Đồng Hành</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitEditReportCompanionForm" action="POST" method="" autocomplete="off">
        <div class="row mt-2">
          <div class="col-lg-4">
            <label class="font-weight-bold" style="font-size:15px;">Thông Tin Báo Cáo:</label>
            <p style="font-size: 12px;">Thông tin phục vụ cho việc xếp hạng ứng sinh hàng tháng</p>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="candidate">Ứng Sinh</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="candidate" name="candidate" id="candidate"
              style="margin-top: -5px;" disabled>
              <option v-for="candidate in candidates" v-bind:value="candidate.id" :selected="candidate.id == candidate">
                {{ candidate.fullName }}</option>
            </select>
          </div>
          <div class="col-lg-4">
            <label class=" font-weight-bold col-form-label" for="companion">Người Đồng Hành</label>
            <select class="custom-select  text-size-13px  h-32px" v-model="companion" name="companion" id="companion"
              style="margin-top: -5px;" disabled>
              <option v-for="companion in companions" v-bind:value="companion.id"
                :selected="companion.id == companion">{{ companion.fullName }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <strong style="font-size:15px;">1. <u style="font-size:15px;">Những kinh nghiệm giúp tôi lớn lên hơn, dấn thân hơn trong đời sống ơn gọi.</u></strong>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightTL">Thiêng Liêng</label>
            <textarea class="form-control text-size-13px" :title="titleBrightTL" id="brightTL" v-model="brightTL"
              name="brightTL" rows="4" :value="brightTL" v-on:keyup="brightTL = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightNB">Nhân Bản</label>
            <textarea class="form-control text-size-13px" :title="titleBrightNB" id="brightNB" v-model="brightNB"
              name="brightNB" rows="4" :value="brightNB" v-on:keyup="brightNB = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightTT">Tri Thức</label>
            <textarea class="form-control text-size-13px" :title="titleBrightTT" id="brightTT" v-model="brightTT"
              name="brightTT" rows="4" :value="brightTT" v-on:keyup="brightTT = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightCD">Cộng Đoàn</label>
            <textarea class="form-control text-size-13px" :title="titleBrightCD" id="brightCD" v-model="brightCD"
              name="brightCD" rows="4" :value="brightCD" v-on:keyup="brightCD = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="brightTD">Tông Đồ</label>
            <textarea class="form-control text-size-13px" :title="titleBrightTD" id="brightTD" v-model="brightTD"
              name="brightTD" rows="4" :value="brightTD" v-on:keyup="brightTD = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <strong style="font-size:15px;">2. <u style="font-size:15px;">Những kinh nghiệm khiến đời sống tôi bị trì trệ, cản trở tôi dấn thân trong đời sống ơn
                gọi.</u></strong>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkTL">Thiêng Liêng</label>
            <textarea class="form-control text-size-13px" :title="titleDarkTL" id="darkTL" v-model="darkTL"
              name="darkTL" rows="4" :value="darkTL" v-on:keyup="darkTL = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkNB">Nhân Bản</label>
            <textarea class="form-control text-size-13px" :title="titleDarkNB" id="darkNB" v-model="darkNB"
              name="darkNB" rows="4" :value="darkNB" v-on:keyup="darkNB = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkTT">Tri Thức</label>
            <textarea class="form-control text-size-13px" :title="titleDarkTT" id="darkTT" v-model="darkTT"
              name="darkTT" rows="4" :value="darkTT" v-on:keyup="darkTT = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkCD">Cộng Đoàn</label>
            <textarea class="form-control text-size-13px" :title="titleDarkCD" id="darkCD" v-model="darkCD"
              name="darkCD" rows="4" :value="darkCD" v-on:keyup="darkCD = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-6">
            <label class=" font-weight-bold col-form-label" for="darkTD">Tông Đồ</label>
            <textarea class="form-control text-size-13px" :title="titleDarkTD" id="darkTD" v-model="darkTD"
              name="darkTD" rows="4" :value="darkTD" v-on:keyup="darkTD = $event.target.value" style="margin-top: -5px;"></textarea>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <strong style="font-size:15px;">3. <u style="font-size:15px;">Dựa trên nhận định tháng vừa qua, tôi có những ước ao hay quyết tâm gì cho tháng sắp tới.</u></strong>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-lg-12">
            <label class=" font-weight-bold col-form-label" for="targetNextMonth">Mục Tiêu</label>
            <textarea class="form-control text-size-13px" :title="titleTargetNextMonth" id="targetNextMonth" v-model="targetNextMonth"
              name="targetNextMonth" rows="4"
              :value="targetNextMonth" v-on:keyup="targetNextMonth = $event.target.value"
              style="margin-top: -5px;"></textarea>
          </div>
          <div class="col-lg-4"></div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-12">
            <div style="float:right">
              <button type="submit"
                class="btn  rounded btn-hover-blue"
                style="background-color: #056299;color: white;font-size:13px;">
                <i class="far fa-save fa-lg"></i>
                &nbsp;Lưu
              </button>
            </div>
            <div style="float:right; margin-right: 10px;">
              <button :disabled="!refreshFormReportCompanion" @click="clearInputReportCompanionForm"
                class="btn btn-success  rounded" style="font-size:13px;">
                <i class="fas fa-sync-alt"></i>
                &nbsp;Làm mới
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
};