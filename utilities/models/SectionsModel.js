export default{
  names(context){
    console.log(axios())
    console.log(axios().get('https://cvapi.skillar.com/api/sections/names'))
    //return this.$axios.get('https://cvapi.skillar.com/api/sections/names');
  }
}
