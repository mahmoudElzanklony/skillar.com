import formValidation from '/validation/formValidation';
export const state = () => ({
  data_sections: [],
  profile_id:null,
  selected_section_box_info:null,
})



export const getters = {
  get_data_sections(state) {
    return state.data_sections
  },
  get_profile_id(state){
    return state.profile_id;
  },
  get_selected_section_box_info(state) {
    return state.selected_section_box_info
  },
}

export const mutations = {
  InitializeDataSections(state,payload){
    state.data_sections = payload;
  },
  SetProfileId(state,payload){
    state.profile_id = payload;
  },
  UpdateDataSections(state,payload){
    state.data_sections.push(payload)
  },
  InitializeSelectedSectionBoxInfo(state,payload){
    console.log(payload)
    state.selected_section_box_info = payload;
  }
}


export const actions = {
  async saveSectionInfoDataAction({ state,commit }) {
    let target = event.target;
    let data = new FormData(target)
    let router = this.$router;
    let page = window.location.pathname;
    this.$axios.post('/employee/save-info-item',data).then((e)=>{
      formValidation(e.data,target,page,true,router);
    })
  },
  async getDataSection({ state,commit },payload) {
     let find_section = payload;
     let section_check = state.data_sections.find((e)=> e['id'] == find_section);
     if(section_check == null){
        let output = {id:find_section};
        let form_data = new FormData();
        form_data.append('section_id',find_section);
        await this.$axios.post('/employee/get-info-data',form_data).then((e)=>{
          output['data'] = []
          for(let item of e?.data?.data){
            output['data'].push({profile_section_id:item['id'],items:item['attributes_data']})
          }
          commit('UpdateDataSections',output)
        })
     }

  },


  async saveProfileInfoDataAction({ state,commit }) {
    let target = event.target;
    let data = new FormData(target)
    await this.$axios.post('https://cvapi.skillar.com/api/user/update-personal-info',data)
      .then((e)=>{
        formValidation(e.data,target,'',true);
      })
    setTimeout(()=>this.$router.go(0),2000);
  },


}
