const Layout = {
  data() {
    return {};
  },
  template: `
  <div>
    <page-menu></page-menu>
    <div id="right-panel" class="right-panel">
      <page-header></page-header>
      <div class="breadcrumbs mt-2">
        <div class="col-sm-4">
          <div class="page-header float-left">
            <div class="page-title">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="page-header float-right">
            <div class="page-title">
              <ol class="breadcrumb text-right">
                <li class="active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="content mt-3">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  `,
};