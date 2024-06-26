import cookie from 'cookie'

export default ({ $axios, req }, inject) => {

  $axios.setHeader("api_key","skillar2023");

  $axios.setHeader("lang",process.client ?
    localStorage.getItem('lang'):cookie.parse(req.headers.cookie || '').lang);

  //$axios.setHeader("auth-token",process.client ? localStorage.getItem('token'):null);
  $axios.setHeader("token",process.client ?
    localStorage.getItem('token'):cookie.parse(req.headers.cookie || '').token);

  $axios.onResponse(res => {
    console.log(res)
    if(res.data.hasOwnProperty('errors')){
    }
  })



}
