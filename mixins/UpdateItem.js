export default{
  name:'UpdateItem',
  data(){
    return {
       item:null
    }
  },
  methods:{
    update_item(item){
      console.log(item)
      this.item = item;
    },
  }
}


