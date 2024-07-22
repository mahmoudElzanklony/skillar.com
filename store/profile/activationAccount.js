
export const actions = {
  async resend_activation_email({ state,commit,rootGetters }) {
    this.$axios.get('/profile/send-activation').then((e)=>{
      Toast.fire({
        icon:'success',
        title:e.data.message
      })
    })
  },
  async activation({ state,commit,rootGetters },payload) {
    await this.$axios.get('/profile/activation?serial_number='+payload).then((e)=>{
          Toast.fire({
            icon:'success',
            title:e.data.message
          })
        }).catch((e)=>{
          Toast.fire({
            icon:'error',
            title:e.response.data.errors
      })
    })
  },

}
