const Page404 = {
  methods: {
    backToHome() {
      this.$router.push({ name: "homePage" });
    },
  },
  template: `
  <div class="text-center">
    <h3>Errors</h3>
    <p>Have some errors.....</p>
    <button class="btn btn-primary" @click = "backToHome">Back To Home</button>
  </div>
  `,
};