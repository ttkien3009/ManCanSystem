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
      titleButtonDisplay: "Xem thống kê",
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/rateCandidates").then((response) => {
      this.rateCandidates = response.data;
    });
    axios.get("http://localhost:3000/api/candidates").then((respCan) => {
      this.candidates = respCan.data;
    });
  },
  computed: {},
  methods: {
    getCountMetCompanion(idCandidate){
      axios
        .get("http://localhost:3000/api/metCompanions?filter[where][and][0][candidate]=" + idCandidate + "&filter[where][and][1][status]=2")
        .then((resp) => {
          return resp.data.length;
        });
    },

    getCountMetSpiritualGuide(idCandidate){
      axios
        .get("http://localhost:3000/api/metSpiritualGuides?filter[where][and][0][candidate]=" + idCandidate + "&filter[where][and][1][status]=2")
        .then((respSp) => {
          return respSp.data.length;
        });
    },

    goToRateCandidate(candidate){

    }
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
            <tr v-for="(candidate, index) in candidates" :key="candidate.id">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td>{{ candidate.fullName }}</td>
              <td>{{ rateCandidate.username }}</td>
              <td>
                {{ getCountMetCompanion(candidate.id) }}
              </td>
              <td>
                {{ getCountMetSpiritualGuide(candidate.id) }}
              </td>
              <td v-if="candidate.status == 1">
                <i class="fas fa-toggle-on fa-lg text-success"></i>
              </td>
              <td v-if="candidate.status == 2">
                <i class="fas fa-toggle-off fa-lg text-danger"></i>
              </td>
              <td class="align-middle">
                <div class="row">
                  <div class="col-4">
                    <button :title="titleButtonDisplay" @click="goToRateCandidate(candidate)" class="btn btn-primary btn-sm h-28px w-28px rounded"
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
        this.year = respRate.data[0].score;
        this.idSchedule = respRate.data[0].idSchedule;
      });
  },

  computed: {
    refreshForm() {
      return (this.score != 0);
    },
  },
  methods: {
    submitEditRateCandidateForm() {
      if(this.score < 0 || this.score > 100)
      {
        alertify.alert("Thông báo", "Số điểm không hợp lệ! Vui lòng nhập lại. (0 -> 100)", function () {
          alertify.success("Ok");
        });
      } else {
        const rateCandidate = {
          candidate: this.candidate,
          month: this.month,
          year: this.year,
          score: this.score,
          idSchedule: this.idSchedule,
          id: this.$route.params.id,
        };
        const url =
          "http://localhost:3000/api/rateCandidates/" + rateCandidate.id + "/replace";
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
    <h6 class="m-0 font-weight-bold text-dark">Đánh Giá Ứng Sinh Tháng {{ month }}</h6>
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