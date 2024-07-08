export default {
  name:'NotForClient',
  async asyncData({ $auth , redirect}) {
    if(!$auth.loggedIn || !($auth?.user?.role?.name === 'admin' || $auth?.user?.role?.name === 'company')){
      return redirect('/')
    }
  },
}
