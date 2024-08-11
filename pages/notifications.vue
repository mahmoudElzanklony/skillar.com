<template>
  <div class="notifications current_page">
    <div class="container mt-4 mb-4">
      <h2>{{ $parent.$attrs.words.general.admin.notifications }}</h2>
      <div class="outer infinite_scroll"
           action_path="notifications/notificationsAction" method="get">
        <div class="notification unread d-flex align-items-center" v-for="(i,key) in data" :key="key">
          <nuxt-link tag="img" :src="'https://cvapi.skillar.com/images/users/'+i?.data?.sender?.image?.name"
                     :to="'/profile/'+i?.data?.sender?.id" class="mrl-1 cursor-pointer"></nuxt-link>
          <div class="noti-info position-relative top-6">
            <a :href="'/profile/'+i?.data?.sender?.id" target="_blank" class="d-flex align-items-center justify-content-between">
              <span class="black fw-bold">{{ i?.data?.info }}</span>
              <span v-if="i?.read_at == null" class="dot-unread"></span>
            </a>
            <ul class="d-flex justify-content-between mb-2 mt-1">
              <li class="gray" :title="i?.data?.sender?.bio">
                <span><i class="bi bi-info"></i></span>
                {{ i?.data?.sender?.bio.slice(0,50) }}...
              </li>
              <li class="gray mrl-1">
                <span><i class="bi bi-calendar"></i></span>
                {{ i?.created_at }}
              </li>
            </ul>
          </div>
        </div>

      </div>
      <img v-if="data.length == 0" class="w-100" src="/images/no_data.gif">
    </div>
  </div>
</template>

<script>
import {mapActions , mapGetters} from "vuex";
import animateData from "@/mixins/animateData";
export default {
  name: 'notifications',
  mixins:[animateData],
  async asyncData({store}){

    await store.commit('notifications/EmptyData');
    await store.commit('notifications/ChangeStatus',true);
    await store.commit('notifications/InitializeData',[]);
    await store.dispatch('notifications/notificationsAction','?page=1')
  },
  computed:{
    ...mapGetters({
      'data':'notifications/get_data',
    })
  },
  methods:{
    ...mapActions({
      'notificationsAction':'notifications/notificationsAction',
    }),
  },
  mounted() {
    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  },
}
</script>

<style lang="scss">
@import "~style/variables";
.noti-info{
  width:calc(100% - 100px)
}
</style>
