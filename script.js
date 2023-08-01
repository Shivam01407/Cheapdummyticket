document.querySelector('.menu_bar').addEventListener('click', function () {
  if (document.querySelector('.menu_bar').getAttribute('class').includes('menu_close')) {
    document.querySelector('.menu').style.left = '100%';
  }
  else {
    document.querySelector('.menu').style.left = '0%';
  }
  document.querySelector('.menu_bar').classList.toggle('menu_close');
});

let allQuestions = document.querySelectorAll('.question')
for (let i = 0; i < allQuestions.length; i++) {
  allQuestions[i].addEventListener('click', function () {

    if (this.getAttribute('class').includes('q_active')) {
      for (let j = 0; j < allQuestions.length; j++) {
        allQuestions[j].classList.remove('q_active');
      }
      this.style.height = `${this.children[0].offsetHeight + 40}px`;
    }
    else {
      for (let j = 0; j < allQuestions.length; j++) {
        allQuestions[j].classList.remove('q_active');
      }
      this.classList.add('q_active');

      for (let k = 0; k < allQuestions.length; k++) {
        if (allQuestions[k].getAttribute('class').includes('q_active')) {
          this.style.height = `${allQuestions[k].scrollHeight - 29}px`;
        } else {
            allQuestions[k].style.height = `${allQuestions[k].children[0].offsetHeight + 40}px`;
        }
      }

    }

  })
}

for (let i = 0; i < allQuestions.length; i++) {
  allQuestions[i].style.height=`${allQuestions[i].children[0].offsetHeight +40}px`;
}
window.addEventListener('resize',function(){
  for (let i = 0; i < allQuestions.length; i++) {
    allQuestions[i].style.height=`${allQuestions[i].children[0].offsetHeight +40}px`;
    allQuestions[i].classList.remove('q_active');
  }
})