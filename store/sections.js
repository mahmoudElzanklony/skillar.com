import formValidation from '/validation/formValidation';
export const state = () => ({
  sections_names: [],
  section_properties:null,
})



export const getters = {
  get_sections_names(state) {
    return state.sections_names
  },
  get_section_properties(state) {
    return state.section_properties
  },
}

export const mutations = {
  InitializeSectionsNames(state,payload){
    state.sections_names = payload;
  },
  InitializeSectionProperties(state,payload){
    state.section_properties = payload;
  },
}


export const actions = {
  async sectionsNamesAction({ state,commit }) {
     return this.$axios.get('https://cvapi.skillar.com/api/sections/names').then((e)=>{
       commit('InitializeSectionsNames',e.data.data)
     })
  },
  async sectionPropertiesAction({state,commit},payload){
    commit('InitializeSectionProperties',null)
    this.$axios.get('https://cvapi.skillar.com/api/sections/properties?id='+payload).then((e)=>{
      commit('InitializeSectionProperties',e.data.data)
    })
  }

}
