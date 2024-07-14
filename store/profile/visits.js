

export const actions = {
  async visitProfileAction({ state,commit },payload) {
    let data = new FormData();
    data.append('user_id',payload);
    this.$axios.post('/profile/visit',data).then((e)=>{

    })
  },


}
