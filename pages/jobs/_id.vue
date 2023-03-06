<template>
  <section class="job_details current_page">
      <div class="container">
        <div class="row">
        <div class="col-lg-8 col-md-6 mb-3">
           <div class="description box-shadow">
              <div class="image">
                <img src="/images/companies/1.png">
              </div>
              <p class="fw-bold">Full stack engineer</p>
              <p>
                <span class="gray">Some Description about algorithma company Some Description about algorithma company Some Description about algorithma company Some Description about algorithma company Some Description about algorithma company Some Description about algorithma company </span>
              </p>
              <div class="mb-3 d-flex align-items-center justify-content-between">
                <nuxt-link to="#">{{ words.read_more }}</nuxt-link>
                <button class="btn btn-primary" to="#">{{ words.apply_job }}</button>
              </div>
              <div class="another_info">
                <ul>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-info"></i></span>
                    <span>Algorithma Company</span>
                  </li>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-people"></i></span>
                    <span>{{ words.employees_number_at_company }}</span>
                    <span>55</span><span>{{ words.employee }}</span>
                  </li>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-briefcase"></i></span>
                    <span>{{ words.job_way }}</span>
                    <span>Remotely</span>
                  </li>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-geo-alt"></i></span>
                    <span>مصر , القاهره , الحي الخامس بجوار مسجد الامام الشافعي</span>
                  </li>
                </ul>
              </div>
             <p class="fw-bold">{{ words.job_description }}</p>
             <p class="gray end-border-bottom">
               Deploy, Configure, Manage and Troubleshoot large scale enterprise Microsoft Windows Environment running in Windows 2008, 2012, 2016, 2019. Install and configure and maintain server operating systems and repair server hardware Install and manage VMWare VSphere 5. x & 6. x Proactively maintain and develop all infrastructure technology to maintain a 24x7x365 uptime service Engineering of systems administration-related solutions for various project and operational needs Maintain best practices on managing systems and services across all environments Provide a point of escalation and support to the Service Desk Team. Participate in weekend maintenance activities, as required. Perform routine system administration duties. Monitor servers and troubleshoot problems.
             </p>
             <div class="skills">
               <p class="fw-bold">{{ words.required_skills }}</p>
               <ul class="d-flex align-items-center flex-wrap">
                 <li v-for="i in 10" class="mrl-half mb-2"><nuxt-link to="#">programming</nuxt-link></li>
               </ul>
             </div>
           </div>
        </div>
          <div class="col-lg-4 col-md-6">
            <div class="statistics box-shadow mb-3">
              <div class="mb-3 d-flex statistics_type align-items-center flex-wrap justify-content-between end-border-bottom">
                <p class="mb-1">
                  <span class="top-3 position-relative gray"><i class="bi bi-eye"></i></span>
                  <span>{{ words.no_seen }}</span>
                </p>
                <span class="fw-bold">40</span>
                <div class="percentage w-100 progress">
                  <p style="width: 50%" class="progress-bar progress-bar-animated progress-bar-striped"></p>
                </div>
              </div>
              <div class="mb-3 d-flex statistics_type align-items-center flex-wrap justify-content-between end-border-bottom">
                <p class="mb-1">
                  <span class="top-3 position-relative gray"><i class="bi bi-people"></i></span>
                  <span>{{ words.no_people_applied }}</span>
                </p>
                <span class="fw-bold">15</span>
                <div class="percentage w-100 progress">
                  <p style="width: 20%" class="progress-bar progress-bar-animated progress-bar-striped"></p>
                </div>
              </div>
              <div class="mb-3 d-flex statistics_type align-items-center flex-wrap justify-content-between end-border-bottom">
                <p class="mb-1">
                  <span class="top-3 position-relative gray"><i class="bi bi-person-check"></i></span>
                  <span>{{ words.matching_job_profile }}</span>
                </p>
                <span class="fw-bold">90%</span>
                <div class="percentage w-100 progress">
                  <p style="width: 90%" class="progress-bar progress-bar-animated progress-bar-striped"></p>
                </div>
              </div>
          </div>
            <div class="similar_jobs box-shadow">
              <p class="fw-bold">{{ words.similar_jobs }}</p>
              <div class="mb-3" v-for="i in 5" :key="i">
                <job-component
                  title="Full stack"
                  company_name="Algorithma"
                  time="30M ago"
                  id="1"
                  :skills="skills"
                  :show_details="words.open"
                  img="/images/companies/1.png"
                ></job-component>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import WordsLang from "../../mixins/WordsLang";
export default {
  name: "job_id",
  mixins:[WordsLang],
  data(){
    return {
      file_name:'job_details',
      skills:['php','laravel','oop','design pattern','mysql']

    }
  },
  validate({params}){
    return !(isNaN(params.id));
  },
    created() {
    console.log(this.$route);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.job_details{
  background-color: $main_color_more_white_bk;
  padding: 20px 0px;
  .description{
    background-color: white;
    padding: 15px;
    box-shadow: 1px 1px 6px 1px #ddd;
    border-radius: 8px;
    .image{
      margin-bottom: 10px;
      img{
        height: 50px;
      }
    }
    >p{
      margin-bottom: 10px;
    }
    >p:last-of-type{
        span,button{
          font-size: $button;
        }
    }
    .another_info{
      ul{
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
    }
    .skills{
      ul{
        li{
          border: 1px solid $main_color;
          border-radius: 15px;
          padding: 5px 10px;
          transition: 0.5s all;
          &:hover{
            background-color: $main_color;
          }
          &:hover a{
            color:white;
          }
        }
      }
    }
  }
  .statistics{
    .statistics_type{
      p{
        margin-bottom: 0px;
      }
      p:first-of-type{
        span:first-of-type{
          color:$gray;
        }
      }
      .percentage{
        height: 10px;
        p{
          background-image: linear-gradient(45deg, #0a58ca, transparent);
        }
      }
    }
  }
  .similar_jobs{
    max-height: 550px;
    overflow: auto;
  }
}
</style>
