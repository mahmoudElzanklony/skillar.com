import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  data: [],
  messages_per_chat:{messages:[],receiver:null},
  total:0,
  status:true,
})



export const getters = {
  get_data(state) {
    return state.data
  },
  get_messages(state) {
    return state.messages_per_chat
  },
  getTotal(state){
    return state.total;
  },
}

export const mutations = {
  InitializeData(state,payload){
    state.data = payload;
  },
  InitializeMessages(state,payload){
    state.messages_per_chat = payload;
  },
  PushMessages(state,payload){
    state.messages_per_chat?.messages.push(payload)
  },
  ChangeStatus(state,payload){
    state.status = payload;
  },
  SetTotal(state,payload){
    state.total = payload;
  },
  UpdateData(state,payload){
    if(payload.length > 0) {
      state.data = [...state.data, ...payload]
    }
  },
  EmptyData(state){
    state.status = true;
    state.jobs = [];
  },
}


export const actions = {


  async getFriendsAction({ state,commit,rootGetters },payload = '') {
    return this.$axios.post('/chat/get-friends').then((e) => {
      commit('InitializeData', e.data.data);
    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },

  async getMessagesAction({ state,commit,rootGetters },payload = '') {
    let data = new FormData();
    data.append('receiver_id',payload?.receiver_id);
    data.append('conversation_id',payload?.conversation_id);
    return this.$axios.post('/chat/get-conversation',data).then((e) => {
      commit('InitializeMessages', e.data.data);
    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },

  async sendMessageAction({ state,commit,rootGetters }) {
    let data = new FormData(event.target);
    let obj = {};
    let data_keys_vals = data.entries();
    obj.sender_id = this.$auth?.state.user.id;
    obj.receiver_id = data_keys_vals.find((e)=> e[0] === 'receiver_id')[1];
    obj.message = data_keys_vals.find((e)=> e[0] === 'message')[1];
    obj.created_at = new Date().toLocaleDateString();
    console.log(obj)
    return this.$axios.post('/chat/send-message',data).then((e) => {
      commit('InitializeData', e.data.data);
      commit('PushMessages',obj)
      document.forms[0].message.value = ''
    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },



}
