$(document).ready(function () {
    
    $('.menu_bar').click(function () {
      if ($('.menu_bar').attr('class').includes('menu_close')) {
        $('.menu').css('left', '100%');
      }
      else {
        $('.menu').css('left', '0%');
      }
      $('.menu_bar').toggleClass('menu_close');
    })
    $('.menu_list li a').click(function () {
      $('.menu_list li a.active_menu').removeClass('active_menu')
      $(this).addClass('active_menu');
    })
    
  // SAMPLE.pdf
  // $('.sample-box').on('click', function () {
  //   let path = 'samples/',
  //   name = `${$(this).attr('data-pdfname')}.pdf#toolbar=0`,
  //   url = path + name,
  //   frame=$('#frame');
  //   frame.attr('src',url);
  //   $('.pdf-viewer').css('display', 'block');
  // })
  // $('.close').click(function(){
  //   let frame=$('#frame');
  //   frame.attr('src','');
  //   $('.pdf-viewer').css('display', 'none');
  // })



});
