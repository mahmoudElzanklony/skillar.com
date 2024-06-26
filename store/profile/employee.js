import formValidation from '/validation/formValidation';
export const state = () => ({
  data_sections: [],
  selected_section_box_info:null,
})



export const getters = {
  get_data_sections(state) {
    return state.data_sections
  },
  get_selected_section_box_info(state) {
    return state.selected_section_box_info
  },
}

export const mutations = {
  InitializeDataSections(state,payload){
    state.data_sections = payload;
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
    this.$axios.post('/employee/save-info-item',data).then((e)=>{
      formValidation(e.data,target,'',true);
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


}
