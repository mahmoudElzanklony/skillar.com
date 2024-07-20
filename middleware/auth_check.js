


export default function ({ redirect, route , $auth}) {
  var auth = ['login','register','forget'];
  let unauth = ['privacy','terms','conditions','reset','new_password','about','home','index'];

  if (route.path.indexOf('dashboard') >= 0) {
    if ($auth.loggedIn != true) {
      return redirect('/')
    } else if ($auth.$state.user.hasOwnProperty('role') && $auth.$state.user.role.name != 'admin') {
      return redirect('/')
    }
  }else if ($auth.loggedIn != true) {

    let check_unauth_page = false;
    if(route.path === '/'){
      check_unauth_page = true;
    }else{
      for (let page of unauth) {
        if (route.path.indexOf(page) >= 0) {
          check_unauth_page = true;
          break;
        }
      }
    }
    if (check_unauth_page == false && (!(route.path.indexOf('login') >= 0 || route.path.indexOf('register') >= 0) )) {
      return redirect('/auth/login')
    }


  }





}
