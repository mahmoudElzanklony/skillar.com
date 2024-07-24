<template>
  <p
    class="alert alert-info m-3 d-flex align-items-center justify-content-between"
    v-if="$auth.$state.user?.email_verified_at === null">
                  <span>
                    <i class="bi bi-info"></i>
                    {{ $parent.$parent.$attrs.words.profile.main.please_activate_your_acc }}
                  </span>
    <span class="blue cursor-pointer" @click="resend_activation_email">{{ $parent.$parent.$attrs.words.profile.main.resend_activation }}</span>
  </p>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name:'ResendActivation',
  methods:{
    ...mapActions({
      'resend_activation_email':'profile/activationAccount/resend_activation_email',
    })
  }
}
</script>
