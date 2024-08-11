<template>
  <div class="welcome_home current_page">
    <div v-if="Object.keys($parent?.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <header-component></header-component>

      <section id="number_of_users" class="number_of_users mt-2">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="users mb-3">
                <img  src="/images/users/1.webp">
                <img  src="/images/users/2.webp">
                <img  src="/images/users/3.webp">
                <img  src="/images/users/1.webp">
                <img  src="/images/users/2.webp">
              </div>
              <p>
                <span>{{ $parent.$attrs.words.home.over }}</span>
                <span class="blue fw-bold">200,000+</span>
                <span>{{ $parent.$attrs.words.home.users_believe_that_skillar }}</span><br>
                <span>{{ $parent.$attrs.words.home.greatest_place }}</span>
              </p>
            </div>
            <div class="col-md-6">
              <h2 class="gray fw-bold mb-3">{{ $parent.$attrs.words.home.trusted_by }}</h2>
              <div class="d-flex align-items-center justify-content-between">
                <span class="gray fw-bold">Google</span>
                <span class="gray fw-bold">FaceBook</span>
                <span class="gray fw-bold">Twitter</span>
                <span class="gray fw-bold">DropBox</span>
                <span class="gray fw-bold">First Meeting</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="explore_categories" class="explore_categories">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <h2 class="fw-bold mb-3 text-center-mobile">{{ $parent.$attrs.words.home.explore_by_category }}</h2>
              <p class="gray text-center-mobile">{{ $parent.$attrs.words.home.we_provide_many_categories }}</p>
              <div class="row">
                <div class="col-lg-6 mb-3" v-for="(i,index) in categories" :key="index" v-if="index < 4">
                  <nuxt-link :to="'/jobs?category_id='+i?.id">
                    <div class="category d-flex align-items-center justify-content-between bk-white p-3 rounded">
                      <img v-if="i?.image == null" :src="'/images/icons/'+icons[index]" class="mrl-1">
                      <image-component v-else :src="'/categories/'+i?.image?.name"></image-component>
                      <p>{{ i?.name }}</p>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-md-4 popular_cats">
                <div class="popular-cats p-3 rounded bk-white">
                  <h3 class="fw-bold mb-3">{{ $parent.$attrs.words.home.popular_categories }}</h3>
                  <ul>
                    <li  v-for="(i,index) in categories" :key="index" v-if="index < 4">
                      <nuxt-link class="d-flex justify-content-between p-2 w-100" :to="'/jobs?category_id='+i?.id">
                        <span class="fw-bold">{{ i?.name }}</span>
                        <span>{{ i?.jobs_count }}</span>
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
                <div class="rounded bk-white all_cats mt-3 p-3">
                  <nuxt-link to="/jobs" class="d-flex align-items-center justify-content-between">
                    <div>
                      <img src="/images/icons/Paper_Plus.png" class="mrl-1">
                      <span>{{ $parent.$attrs.words.home.see_all_categories }}</span>
                    </div>
                    <span class="gray" v-if="current_lang == 'en'"><i class="bi bi-arrow-right position-relative top-1"></i></span>
                    <span class="gray" v-else><i class="bi bi-arrow-left position-relative top-1"></i></span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="expand_connections" class="expand_connections pt-5 pb-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 mb-2">
              <div class="bk">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <img src="~/assets/images/22.png">
                  </div>
                  <div class="col-lg-6">
                    <div class="box_card">
                      <div class="box-header d-flex align-items-center justify-content-between">
                        <p class="fw-bold">Sara Ali</p>
                        <span class="btn btn-primary">{{ $parent.$attrs.words.home.open_to_work }}</span>
                      </div>
                      <div class="box-body d-flex align-items-center justify-content-between">
                        <div class="info">
                          <p><strong class="mrl-half">10</strong><span>{{ $parent.$attrs.words.home.project }}</span></p>
                          <div class="line"></div>
                        </div>
                        <div class="info">
                          <p><strong class="mrl-half">10</strong><span>{{ $parent.$attrs.words.home.year }}</span></p>
                          <div class="line"></div>
                        </div>
                      </div>
                      <div class="box-footer d-flex align-items-center justify-content-between" v-if="false">
                        <nuxt-link to="#">{{ $parent.$attrs.words.home.open_profile }}</nuxt-link>
                        <div class="line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-2">
              <div class="info_about_expand text-center-mobile">
                <h1 class="mb-3 fw-bold">{{ $parent.$attrs.words.home.expand_your_connections }}</h1>
                <p class="gray mb-3">{{$parent.$attrs.words.home.connection_note}}</p>
                <nuxt-link to="/colleagues" class="btn btn-primary d-inline-flex align-items-center">
                  <span class="p-relative white mrl-1">{{ $parent.$attrs.words.home.increase_my_connections }}</span>
                  <span class="white" v-if="current_lang == null || current_lang == 'ar'"><i class="bi bi-arrow-left position-relative top-1"></i></span>
                  <span class="white" v-else><i class="bi bi-arrow-right position-relative top-1"></i></span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="lastest_jobs" class="lastest_jobs mt-3 pt-3 pb-3">
        <div class="container">
          <h2 class="fw-bold black text-center">{{ $parent.$attrs.words.home.newest_jobs_for_you }}</h2>
          <p class="gray text-center">{{ $parent.$attrs.words.home.get_the_fastest_jobs }}</p>
          <ul class="d-flex align-items-center justify-content-center mb-3 flex-wrap">
            <li class="text-center mx-3" v-for="(i,index) in categories" :key="index">
              <span @click="get_jobs(i?.id)" class="gray cursor-pointer line-hover position-relative">{{ i?.name }}</span>
            </li>
          </ul>
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-2" v-for="(i,index) in jobs_data" :key="index">
              <job-component
                :title="i?.name"
                :company_name="i?.company?.username"
                :time="i?.published"
                :id="i?.id"
                :skills="i?.skills"
                :show_details="i?.status"
                :img="i?.company?.image?.name"
              ></job-component>
            </div>
          </div>
          <nuxt-link to="/jobs" class="d-block m-auto btn-bk-primary fit-content">{{ $parent.$attrs.words.home.all_jobs }}</nuxt-link>
        </div>
      </section>

      <section id="get_last_information"
               v-if="false"
               class="get_last_information mt-5">
        <div class="container">
          <div class="box">
            <div class="row align-items-center">
              <div class="col-lg-6 mb-3">
                <div class="info text-center-mobile">
                  <h2 class="fw-bold">{{ $parent.$attrs.words.home.get_last_information }}</h2>
                  <p class="gray">{{ $parent.$attrs.words.home.join_our_daily }}</p>
                </div>
                <form class="position-relative form-has-submit-absolute">
                  <input class="form-control" :placeholder="$parent.$attrs.words.home.your_email">
                  <input type="submit" class="btn btn-primary absolute-submit" :value="$parent.$attrs.words.home.subscribe">
                </form>
              </div>
              <div class="col-lg-6 mb-3">
                <img src="/images/alerts.png" class="w-100">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="services pt-4 pb-4">
        <div class="container">
          <div class="text-center mb-5">
            <img src="/images/home/line1.png">
            <h2 class="d-inline fw-bold black text-center">{{ $parent.$attrs.words.home.services.title }}</h2>
            <img src="/images/home/line2.png">
          </div>
          <div class="row">
            <div class="col-lg-6 col-12 mb-2" v-for="(i,index) in $parent.$attrs.words.home.services.boxes" :key="index">
              <div class="box d-flex align-items-center justify-content-between">
                <img :src="'/images/home/'+i['image']">
                <div>
                  <h2 class="semi_big fw-bold">{{ i['title'] }}</h2>
                  <p class="small gray">{{ i['content'] }}</p>
                  <a target="_blank"  :href="i['link']['url']">
                    <span class="blue">{{ i['link']['name'] }}</span>
                    <span class="position-relative blue top-1"><i :class="$parent.$attrs.words.header.ready_class"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <dots-scroll-component :dots="dots"></dots-scroll-component>
    </div>

  </div>
</template>

<script>
import CurrentLang from "../mixins/CurrentLang";
import JobComponent from "../components/JobComponent";
import HeaderComponent from "../components/HeaderComponent";
import DotsScrollComponent from "../components/DotsScrollComponent";
import {mapGetters , mapActions} from "vuex";

export default {
  name: 'home',
  mixins:[CurrentLang],
  data(){
    return {
      icons:['Wallet.png','Profile.png','Gallery.png','Tick.png'],
      skills:['php','mysql','laravel'],
      dots:['header','number_of_users','explore_categories','expand_connections','lastest_jobs','get_last_information'],
    }
  },
  computed:{
    ...mapGetters({
      'categories':'jobs/categories/get_data',
      'jobs_data':'jobs/get_jobs'
    })
  },
  methods:{
    ...mapActions({
      'categoriesAction':'jobs/categories/getDataAction',
      'jobsAction':'jobs/getJobsAction'
    }),
    clear_jobs(){
      this.$store.commit('jobs/ChangeStatus',true)
      this.$store.commit('jobs/EmptyData');
    },
    get_jobs(id){
      this.clear_jobs()
      this.jobsAction('?category_id='+id+'&page=1')
    }
  },
  mounted() {
    this.clear_jobs()
    this.jobsAction('?page=1')
  },
  components:{HeaderComponent,DotsScrollComponent, JobComponent},
}
</script>

<style lang="scss">
@import "~style/variables";

/*----------------start of users section------------------------*/

.number_of_users{
  .users{
    img{
      position: relative;
      width: 50px;
      height: 50px;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}

@media (max-width: 767px) {
  .number_of_users{
    text-align: center;
  }
}
/*----------------end of users section------------------------*/

/*----------------start of explore_categories section------------------------*/
.explore_categories{
  background-color: $main_color_more_white_bk;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: 30px;
  >div.container{
    >div.row{
      .category{
          text-align: left;
          img{
            height: 50px;
            width: 50px;
            object-fit: contain;
          }
          p{
            font-weight: bold;
            margin: 0px;
            width:calc(100% - 65px);
          }
      }
    }
    .popular-cats{
      ul{
        li{
          border-bottom: 1px solid #ddd;
          align-items: center;
          margin-bottom: 10px;
          span:last-of-type{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color:$main_color_white_bk;
            color: $main_color;
            font-size: $small;
            font-weight: bold;

          }
          &:last-of-type{
            border-bottom: none;
            margin-bottom: 0px;
          }
        }
      }
    }
    .all_cats{
      img{
        height: 40px;
      }
    }
  }
  .popular_cats{
    ul{
      li{
        a{
          color:$black;
        }
      }
    }
  }
}
/*----------------end of explore_categories section------------------------*/
/*----------------start of expand_connections------------------------*/
.expand_connections{
  .bk{
    background-image: url("/images/bk-header.webp");
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: auto;
    background-position: bottom;
    position: relative;
    padding-right: 15px;
    .box_card{
      padding: 10px;
      box-shadow: 1px 1px 6px 0px #ddd;
      border-radius: 10px;
      background-color: white;
      .box-header{
        border-bottom: 1px solid #dddddd;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
      p{
        margin-bottom: 0px;
      }
      .box-body{
        margin-bottom: 10px;
      }
      .box-footer{
        background-color: $main_color_more_white_bk;
        padding: 10px;
        border-radius: 10px;
        margin-top: 10px;
      }
    }
  }
  img{
    max-height: 300px;
    object-fit: contain;
    width: fit-content;
    display: block;
    margin: auto;
  }
}
/*----------------end of expand_connections------------------------*/
/*----------------start of lastest_jobs------------------------*/
.lastest_jobs{
  background-color: $main_color_more_white_bk;
}

/*----------------start of lastest_jobs------------------------*/
/*----------------start of get_last_information------------------------*/
.get_last_information{
  .info{
    form{
      input:first-of-type{
        padding: 10px;
      }
    }
  }
}
/*----------------end of get_last_information------------------------*/

.services{
  .box{
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    img{
      height: 150px;
    }
  }
}
</style>
