import $ from 'jquery'
window.$ = $;




$(document).ready(function (){


  // click on dots box
  $('#__nuxt').on('click','.fixed-dots ul li',function (){
    $(this).parent().find('.active').removeClass();
    $(this).addClass('active');
    document.getElementById($(this).attr('to')).scrollIntoView();
  });

  // delete
  $('#__nuxt').on('click','.delete',function (){
    var target = $(event.target);
    Swal.fire({
      title: localStorage.lang == 'ar'?'هل أنت متأكد من عملية المسح':'are you sure from delete operation',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#035397',
      cancelButtonColor: '#aaa',
      confirmButtonText: localStorage.lang == 'ar'?'تأكيد':'confirm',
      cancelButtonText:localStorage.lang == 'ar'?'الغاء':'cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: 'success',
          title: localStorage.lang == 'ar'?'تمت عملية المسح بنجاح':'deleted operation done successfully'
        })
        console.log(target);
        console.log(target.hasClass('remove-element'));
        if(target.hasClass('remove-element')){
           target.parent().parent().parent().remove();
        }
      }
    })

  });


  // control show hide parent element
  $('#__nuxt').on('click','.section-title-control span:last-of-type',function (){
      $(this).parent().next().slideToggle();
      if($(this).find('i').hasClass('bi-arrow-down-short')){
          $(this).find('i').removeClass('bi-arrow-down-short').addClass('bi-arrow-up-short');
      }else{
        $(this).find('i').removeClass('bi-arrow-up-short').addClass('bi-arrow-down-short');
      }
  });

  // control of variety of data up and down
  $('#__nuxt').on('click','.variety_data .one_variety .heading p span:last-of-type',function (){
    $(this).parent().parent().next().slideToggle();
    if($(this).find('i').hasClass('bi-caret-down-fill')){
      $(this).find('i').removeClass('bi-caret-down-fill').addClass('bi-caret-up-fill');
    }else{
      $(this).find('i').removeClass('bi-caret-up-fill').addClass('bi-caret-down-fill');
    }
  });

  // choose checkbox item
  $('#__nuxt').on('change','.checkbox-item input',function (){
    $(this).parent().siblings().removeClass('active');
    $(this).parent().addClass('active');
  });

  // toggle between dynamic tabs
  $('#__nuxt').on('click','.dynamic_tabs ul li',function (){
    if(event.target.tagName.toLocaleLowerCase() == 'p'){
      $(event.target).parent().parent().addClass('active').siblings().removeClass('active')
    }else if(event.target.tagName.toLocaleLowerCase() == 'p'){
      $(event.target).parent().addClass('active').siblings().removeClass('active')
    }else{
      $(event.target).addClass('active').siblings().removeClass('active')
    }
  });

  // toggle open , close box modal
  $('#__nuxt').on('click','.open-box-modal',function (){
    console.log($('.modal'));
    // $('.modal').modal('show');
  });


  // show file name when uploaded
  $('#__nuxt').on('change','.file_upload input',function (){
    if(event.target?.files?.length > 0) {
      $(event.target.previousElementSibling).find('p').html(event.target.files[0]?.name);
    }else{
      $(event.target.previousElementSibling).find('p').html('')
    }
  });

  /*$('#__nuxt').on('click','*[data-bootstrap]',function (){
    let target = event.target.getAttribute('target')
    setTimeout(()=>{
      console.log(bootstrap.Modal.getOrCreateInstance(target))
      bootstrap.Modal.getOrCreateInstance(target).show()

    },600)
  })*/


  // toggle dots action slide up and down
  // start
  $('#__nuxt').on('click',function (){
    $('.dots-action li.dots > ul').slideUp();
  });
  $('#__nuxt').on('click','.dots-action li.dots',function (e){
    e.stopPropagation();
    $('.dots-action li.dots > ul').slideUp();
    $(this).find('>ul').slideToggle();
  });
  $('#__nuxt').on('click','.dots-action li.dots ul',function (e){
    e.stopPropagation();
    $('.dots-action li.dots > ul').slideUp();
  });

  // toggle profile section p show and hide
  $('#__nuxt').on('click','.toggle_p_show',function (e){
    if($(this).find('span').html().trim() == $(this).find('span').attr('show')){
       $(this).find('span').html($(this).find('span').attr('hide'));
    }else{
      $(this).find('span').html($(this).find('span').attr('show'));
    }
    $(this).parent().find('.toggle-show').toggleClass('d-none');
  });
  // end




  // see changes of id of url
/*  var main_sections = $('body #__nuxt #__layout > div').children();
  $(window).on('scroll',function (){
    let current_scroll = window.pageYOffset;
    for(let section of main_sections){
      if(section.classList.contains('current_page')){

      }else{
        if(current_scroll <= section.offsetHeight){
          console.log(section);
        }
      }
    }
  });*/
})
