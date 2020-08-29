const RateCandidate = {
  template: `
  <div>
    <router-view />
  </div>
  `,
};

const ListRateCandidate = {
  data() {
    return {
      rateCandidate: {},
      countMetCompanion: 0,
      countSpiritualGuide: 0,
      rateCandidates: [],
      candidates: [],
      countMets: [],
      titleButtonDisplay: "Xem thống kê",
      rateCandidateFollowCan: [],
      arrayYear: [],
      months: [
        { id: 1, month: 1 },
        { id: 2, month: 2 },
        { id: 3, month: 3 },
        { id: 4, month: 4 },
        { id: 5, month: 5 },
        { id: 6, month: 6 },
        { id: 7, month: 7 },
        { id: 8, month: 8 },
        { id: 9, month: 9 },
        { id: 10, month: 10 },
        { id: 11, month: 11 },
        { id: 12, month: 12 },
      ],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/rateCandidates").then((response) => {
      this.rateCandidates = response.data;
    });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
    axios.get("http://localhost:3000/api/countMets").then((respCountMet) => {
      this.countMets = respCountMet.data;
    });
  },
  computed: {},
  methods: {
    getDataRateCandidate(candidate) {
      axios
        .get(
          "http://localhost:3000/api/rateCandidates?filter[where][candidate]=" +
            candidate
        )
        .then((resp) => {
          var currentYear = resp.data[0].year;
          this.arrayYear = [];
          var yearAdd = {
            id: 0,
            year: currentYear,
          };
          this.arrayYear.push(yearAdd);
          var idArrayyear = 0;
          for (i = 0; i < resp.data.length; i++) {
            if (resp.data[i].year != currentYear) {
              var yearAdd1 = {
                id: idArrayyear + 1,
                year: resp.data[i].year,
              };
              this.arrayYear.push(yearAdd1);
              currentYear = resp.data[i].year;
              idArrayyear = idArrayyear + 1;
            }
          }
        });
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
    <div class="card-header py-3" style="margin-bottom:-40px">
      <div class="row">
        <div class="col-md-4">
          <h6 class="m-0 font-weight-bold text-dark">Thống kê thông số Ứng Sinh</h6>
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
              <th scope="col">Ứng Sinh</th>
              <th scope="col">Số Lấn Gặp Đồng Hành</th>
              <th scope="col">Số Lấn Gặp Linh Hướng</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Ứng Sinh</th>
              <th scope="col">Số Lấn Gặp Đồng Hành</th>
              <th scope="col">Số Lấn Gặp Linh Hướng</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Action</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(countMet, index) in countMets" :key="countMet.id">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td v-for="candidate in candidates" v-if="candidate.id == countMet.candidate">{{ candidate.fullName }}</td>
              <td>
                {{ countMet.countMetCompanion }}
              </td>
              <td>
                {{ countMet.countMetSpiritualGuide }}
              </td>
              <td v-for="candidate in candidates" v-if="candidate.id == countMet.candidate">
                <i v-show="candidate.status == 1" class="fas fa-toggle-on fa-lg text-success"></i>
                <i v-show="candidate.status == 2" class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td class="align-middle">
                <div class="row">
                  <div class="col-4">
                    <button :title="titleButtonDisplay" data-toggle="modal" @click="getDataRateCandidate(countMet.candidate)" data-target="#chartRateCandidateModal" class="btn btn-primary btn-sm h-28px w-28px rounded"
                      type="submit">
                      <i class="far fa-eye fa-md ml--2px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="chartRateCandidateModal" class="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header-color-modal bg-color-1">
            <h4 class="modal-title" style="margin-left: -30px;">Thông số giám sát ứng sinh hàng tháng</h4>
            <div class="modal-close-area modal-close-df" style="padding-left: -200px;padding-bottom:-200px;">
              <a class="close" data-dismiss="modal" href="#"><i class="fas fa-times"></i></a>
            </div>
          </div>
          <div class="modal-body">
            <table style="width:100%">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="m in months" class="text-center">{{ m.month }}</th>
                </tr>
              </thead>
              <tr v-for="year in arrayYear">
                <th class="text-center">{{year.year}}</th>
                <td class="text-center" v-for="rate in rateCandidates" v-if="rate.year == year.year">
                    {{ rate.score }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

const EditRateCandidate = {
  data() {
    return {
      candidate: null,
      month: 0,
      year: 0,
      score: 0,
      idSchedule: 0,
      titleScore: "Nhập điểm đánh giá cho ứng sinh",
      rateCandidates: [],
      candidates: [],
      rateCandidate: {},
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/candidates").then((response) => {
      this.candidates = response.data;
    });
    axios.get("http://localhost:3000/api/rateCandidates").then((response) => {
      this.rateCandidates = response.data;
    });
    axios
      .get(
        "http://localhost:3000/api/rateCandidates?filter[where][id]=" +
          this.$route.params.id
      )
      .then((respRate) => {
        this.candidate = respRate.data[0].candidate;
        this.month = respRate.data[0].month;
        this.year = respRate.data[0].year;
        this.score = respRate.data[0].score;
        this.idSchedule = respRate.data[0].idSchedule;
      });
  },

  computed: {
    refreshForm() {
      return this.score != 0;
    },
  },
  methods: {
    submitEditRateCandidateForm() {
      if (this.score < 0 || this.score > 100) {
        alertify.alert(
          "Thông báo",
          "Số điểm không hợp lệ! Vui lòng nhập lại. (0 -> 100)",
          function () {
            alertify.success("Ok");
          }
        );
      } else {
        const rateCandidate = {
          candidate: this.candidate,
          month: this.month,
          year: this.year,
          score: this.score,
          idSchedule: this.idSchedule,
        };
        const url =
          "http://localhost:3000/api/rateCandidates/" +
          this.$route.params.id +
          "/replace";
        axios.post(url, rateCandidate);
        this.$router.push("/reportCompanions");
        location.reload();
        return 0;
      }
    },

    clearInput() {
      if (this.score != 0) {
        this.score = 0;
      }
    },

    toListReportCompanion() {
      this.$router.push("/reportCompanions");
      location.reload();
    },
  },
  template: `
  <div class="card shadow mb-4" style="margin-top: -5px;">
  <div class="card-header py-3">
    <h6 class="m-0 font-weight-bold text-dark">Đánh Giá Ứng Sinh Tháng {{ month }} Năm {{ year }}</h6>
  </div>
  <div class="card-body">
    <form @submit.prevent="submitEditRateCandidateForm" action="POST" method="" autocomplete="off">
      <div class="row mt-2">
        <div class="col-lg-4">
          <label class="font-weight-bold text-size-15px">Thông Tin Đánh Giá:</label>
        </div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="candidate">Ứng Sinh</label>
          <select class="custom-select  text-size-13px  h-32px" v-model="candidate" id="candidate" name="candidate"
            style="margin-top: -5px;" disabled>
            <option v-for="candidate in candidates" v-bind:value ="candidate.id" :selected="candidate.id == candidate">{{ candidate.fullName }}</option>
          </select>
        </div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="score">Điểm Số</label>
          <input v-bind:title="titleScore" v-model="score" id="score" name="score"
            type="number" class="form-control  text-size-13px " placeholder="Nhập Điểm Số Đánh Giá..."
            :value="score" v-on:keyup="score = $event.target.value" style="margin-top: -5px;">
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="month">Tháng</label>
          <input v-model="month" id="month" name="month"
            type="number" class="form-control  text-size-13px "
            :value="month" v-on:keyup="month = $event.target.value" style="margin-top: -5px;" disabled>
        </div>
        <div class="col-lg-4">
          <label class="font-weight-bold col-form-label" for="year">Năm</label>
          <input v-model="year" id="year" name="year"
            type="number" class="form-control  text-size-13px "
            :value="year" v-on:keyup="year = $event.target.value" style="margin-top: -5px;" disabled>
        </div>
      </div>
      <div class="row" style="margin-top: 30px;">
        <div class="col-12">
          <div style="float:right">
            <button type="submit"
              class="btn rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;">
              <i class="far fa-save fa-lg"></i>
              &nbsp;Lưu
            </button>
          </div>
          <div style="float:right; margin-right: 10px;">
            <button :disabled="!refreshForm" @click="clearInput"
              class="btn btn-success rounded" style="font-size:13px;">
              <i class="fas fa-sync-alt"></i>
              &nbsp;Làm mới
            </button>
          </div>
          <div style="float:right; margin-right: 360px;">
            <button class="btn rounded btn-hover-blue"
              style="background-color: #056299;color: white;font-size:13px;" @click="toListReportCompanion">
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