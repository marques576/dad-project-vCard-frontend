<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Dashboard</h3>
    </div>
  </div>
  <hr />
 <div class="main-panel">
    <div class="row">
        <router-link class="col-md-4 stretch-card grid-margin" to="defaultCategories" tag="div" style="text-decoration: none;" >
            <div class="card bg-gradient-danger card-img-holder text-white">
                <div class="card-body">
                    <img src="../../assets/img/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3"><i class="bi bi-tag float-right"></i>
                    </h4>
                    <h2 class="mb-5">Default Categories</h2>
                    <h6 class="card-text"> </h6>
                </div>
            </div>
        </router-link>
        <router-link class="col-md-4 stretch-card grid-margin" to="vcards" tag="div" style="text-decoration: none;" >
            <div class="card bg-gradient-info card-img-holder text-white">
                <div class="card-body">
                    <img src="../../assets/img/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3"> <i class="bi bi-credit-card float-right"></i>
                    </h4>
                    <h2 class="mb-5">Vcards</h2>
                    <h6 class="card-text"> </h6>
                </div>
            </div>
        </router-link>
    </div>
    <div class="row">
          <router-link class="col-md-4 stretch-card grid-margin" to="users" tag="div" style="text-decoration: none;" >
            <div class="card bg-gradient-success card-img-holder text-white">
                <div class="card-body">
                    <img src="../../assets/img/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3"> <i class="bi bi-list-check float-right"></i>
                    </h4>
                    <h2 class="mb-5">Administrators</h2>
                    <h6 class="card-text"> </h6>
                </div>
            </div>
        </router-link>
        <router-link class="col-md-4 stretch-card grid-margin" to="statistics" tag="div" style="text-decoration: none;" >
            <div class="card bg-gradient-dark card-img-holder text-white">
                <div class="card-body">
                    <img src="../../assets/img/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3"><i class="bi bi-bar-chart-line float-right"></i>
                    </h4>
                    <h2 class="mb-5">Statistics</h2>
                    <h6 class="card-text"> </h6>
                </div>
            </div>
        </router-link>
</div>
</div>
</template>
<script>
export default {
  name: 'AdminDashboard',
}
</script>

<style>
.main-panel {
    vertical-align: middle;
    
  
  
  -ms-transform: translateY(50%);
  transform: translateY(50%);
        
}

.row{
      display: flex;
      justify-content: center;
}


.float-right {
  float: right !important; }

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
    margin-bottom: .5rem;
}

img {
    vertical-align: middle;
    border-style: none
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2
}

.h2,
h2 {
    font-size: 2rem
}

.h4,
h4 {
    font-size: 1.5rem
}

.h6,
h6 {
    font-size: 1rem
}

.col-md-4 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 33.33333%;
    flex: 0 0 33.33333%;
    max-width: 33.33333%
}

.card {
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .3125rem
}

.card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem
}

.card-text:last-child {
    margin-bottom: 0
}


.mb-3 {
    margin-bottom: 1rem!important
}

.mb-5 {
    margin-bottom: 3rem!important;
    font-size: 3rem;
}

.font-weight-normal {
    font-weight: 400!important
}

.text-white {
    color: #fff!important
}


div,
h1,
h2,
h3,
h4,
h5 {
    text-shadow: none
}


.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: ubuntu-medium, sans-serif
}

.h2,
h2 {
    font-size: 1.88rem
}

.h4,
h4 {
    font-size: 1.13rem
}

.h6,
h6 {
    font-size: .9375rem
}



.grid-margin {
    margin-bottom: 2.5rem
}

.stretch-card {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-box-pack: stretch;
    -ms-flex-pack: stretch;
    justify-content: stretch
}

.stretch-card>.card {
    width: 100%;
    min-width: 100%
}

.font-weight-normal {
    font-family: ubuntu-regular, sans-serif
}

.bg-gradient-primary {
  background: -webkit-gradient(linear, left top, right top, from(#da8cff), to(#9a55ff)) !important;
  background: linear-gradient(to right, #da8cff, #9a55ff) !important; }

.bg-gradient-secondary {
  background: -webkit-gradient(linear, left top, right top, from(#e7ebf0), to(#868e96)) !important;
  background: linear-gradient(to right, #e7ebf0, #868e96) !important; }

.bg-gradient-success {
  background: -webkit-gradient(linear, left top, right top, from(#84d9d2), to(#07cdae)) !important;
  background: linear-gradient(to right, #84d9d2, #07cdae) !important; }

.bg-gradient-info {
  background: -webkit-gradient(linear, left top, right top, from(#90caf9), color-stop(99%, #047edf)) !important;
  background: linear-gradient(to right, #90caf9, #047edf 99%) !important; }

.bg-gradient-warning {
  background: -webkit-gradient(linear, left top, right top, from(#f6e384), to(#ffd500)) !important;
  background: linear-gradient(to right, #f6e384, #ffd500) !important; }

.bg-gradient-danger {
  background: -webkit-gradient(linear, left top, right top, from(#ffbf96), to(#fe7096)) !important;
  background: linear-gradient(to right, #ffbf96, #fe7096) !important; }

.bg-gradient-light {
  background: -webkit-gradient(linear, left top, left bottom, from(#f4f4f4), to(#e4e4e9)) !important;
  background: linear-gradient(to bottom, #f4f4f4, #e4e4e9) !important; }

.bg-gradient-dark {
  background: linear-gradient(89deg, #5e7188, #3e4b5b) !important; }

.card {
    border: 0;
    background: #fff
}

.card .card-body {
    padding: 2.5rem 2.5rem
}

.card.card-img-holder {
    position: relative
}

.card.card-img-holder .card-img-absolute {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%
}


</style>
