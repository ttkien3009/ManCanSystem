const Home = {
  data() {
    return {
      candidate: 0,
      community: 0,
      candidateOut: 0,
      candidateOuts: [],
      account: 0,
      fullNameGD: null,
      fullNameQL: null,
      fullNameGH: null,
      imageGH: null,
      imageGD: null,
      imageQL: null,
      emailGD: null,
      emailQL: null,
      emailGH: null,
      phoneGD: null,
      phoneQL: null,
      phoneGH: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/candidates/count").then((resp) => {
      this.candidate = resp.data.count;
    });
    axios.get("http://localhost:3000/api/communities/count").then((resp) => {
      this.community = resp.data.count;
    });
    axios
      .get("http://localhost:3000/api/candidates?filter[where][status]=2")
      .then((resp) => {
        this.candidateOuts = resp.data;
        this.candidateOut = this.candidateOuts.length;
      });
    axios.get("http://localhost:3000/api/accounts/count").then((resp) => {
      this.account = resp.data.count;
    });
    axios
      .get(
        "http://localhost:3000/api/departments?filter[where][positionType]=" +
          "Giám đốc"
      )
      .then((resp) => {
        axios
          .get(
            "http://localhost:3000/api/managers?filter[where][and][0][position]=" +
              resp.data[0].id +
              "&filter[where][and][1][status]=1"
          )
          .then((respGD) => {
            this.imageGD =
              `<img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image" src="../api/Photos/manager/download/` +
              respGD.data[0].image +
              `" alt="GD Image" style="margin-top: -70px;margin-left:85px;">`;
            this.fullNameGD = respGD.data[0].fullName;
            this.phoneGD = respGD.data[0].phone;
            this.emailGD = respGD.data[0].email;
          });
      });
    axios
      .get(
        "http://localhost:3000/api/departments?filter[where][positionType]=" +
          "Quản lý"
      )
      .then((resp) => {
        axios
          .get(
            "http://localhost:3000/api/managers?filter[where][and][0][position]=" +
              resp.data[0].id +
              "&filter[where][and][1][status]=1"
          )
          .then((respQL) => {
            this.imageQL =
              `<img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image" src="../api/Photos/manager/download/` +
              respQL.data[0].image +
              `" alt="QL Image" style="margin-top: -70px;margin-left:85px;">
          `;
            this.fullNameQL = respQL.data[0].fullName;
            this.phoneQL = respQL.data[0].phone;
            this.emailQL = respQL.data[0].email;
          });
      });
    axios
      .get(
        "http://localhost:3000/api/departments?filter[where][positionType]=" +
          "Giám học"
      )
      .then((resp) => {
        axios
          .get(
            "http://localhost:3000/api/managers?filter[where][and][0][position]=" +
              resp.data[0].id +
              "&filter[where][and][1][status]=1"
          )
          .then((respGH) => {
            this.imageGH =
              `<img class="profile-user-img img-fluid rounded-circle img-thumbnail" id="image" src="../api/Photos/manager/download/` +
              respGH.data[0].image +
              `" alt="GH Image" style="margin-top: -70px;margin-left:85px;">
          `;
            this.fullNameGH = respGH.data[0].fullName;
            this.phoneGH = respGH.data[0].phone;
            this.emailGH = respGH.data[0].email;
          });
      });
  },
  computed: {},
  methods: {},
  template: `
  <div>
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-warning card-header-icon">
            <div class="card-icon">
              <i class="fas fa-users"></i>
            </div>
            <p class="card-category">Ứng Sinh</p>
            <h3 class="card-title">{{ candidate }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-info-circle mt-1 text-info"></i>
              <a href="">&nbsp;Thông tin chi tiết</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-success card-header-icon">
            <div class="card-icon">
              <i class="fas fa-church"></i>
            </div>
            <p class="card-category">Cộng Đoàn</p>
            <h3 class="card-title">{{ community }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-info-circle mt-1 text-info"></i>
              <a href="">&nbsp;Thông tin chi tiết</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-danger card-header-icon">
            <div class="card-icon">
              <i class="fas fa-users"></i>
            </div>
            <p class="card-category">Ứng Sinh Rời</p>
            <h3 class="card-title">{{ candidateOut }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-exclamation-triangle mt-1 text-warning"></i>
              &nbsp; Số lượng Ứng sinh xin ra
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-info card-header-icon">
            <div class="card-icon">
              <i class="far fa-user"></i>
            </div>
            <p class="card-category">Người Dùng</p>
            <h3 class="card-title">{{ account }}</h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fas fa-info-circle mt-1 text-info"></i>
              <a href="">&nbsp;Thông tin chi tiết</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-4">
        <div class="card card-chart">
          <div v-html="imageGH"></div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ fullNameGH }}</h4>
            <h6 class="card-title text-center">(Giám Học)</h6>
            <p class="card-category text-center">
              <span class="align-middle"><i class="fas fa-mobile-alt text-dark"></i>&nbsp; {{ phoneGH }}</span><br/>
              <span class="align-middle"><i class="fas fa-envelope-open-text text-dark"></i></i>&nbsp; {{ emailGH }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-chart">
          <div v-html="imageGD"></div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ fullNameGD }}</h4>
            <h6 class="card-title text-center">(Giám Đốc)</h6>
            <p class="card-category text-center">
              <span class="align-middle"><i class="fas fa-mobile-alt text-dark"></i>&nbsp; {{ phoneGD }}</span><br/>
              <span class="align-middle"><i class="fas fa-envelope-open-text text-dark"></i>&nbsp; {{ emailGD }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-chart">
          <div v-html="imageQL"></div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ fullNameQL }}</h4>
            <h6 class="card-title text-center">(Quản Lý)</h6>
            <p class="card-category text-center">
              <span class="align-middle"><i class="fas fa-mobile-alt text-dark"></i>&nbsp; {{ phoneQL }}</span><br/>
              <span class="align-middle"><i class="fas fa-envelope-open-text text-dark"></i>&nbsp; {{ emailQL }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};
