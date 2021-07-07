$(window).on('load',function () {
  
  $(".loader-wrapper").css('display','none');
  $("#overlayer").css('display','none');
  $('.loading').removeClass('loading'); 
});

// main-slider
$('.slider1').owlCarousel({
  loop:true,
  margin:0,
  nav:true,
 items:1,
 autoplaySpeed:800,
 autoplay:true,
 smartSpeed:800,
 rtl:true,
//  animateOut: 'fadeOut',
 navText: ["<i class='fas fa-chevron-circle-right'></i>","<i class='fas fa-chevron-circle-left'></i>"]
})


// courses slider 
$('.slider2').owlCarousel({
  rtl:true,
  loop:true,
  margin:30,
  nav:false,
  dots:false,
  autoplaySpeed:800,
  autoplay:true,
  smartSpeed:800,
  responsive:{
      0:{
          items:1
      },
      575:{
        items:2
    },
      768:{
          items:3
      },
      991:{
        items:4
      },
      1280:{
          items:5
      }
  }
})









// play responsable for playing/pause videos
var play = function (x) {
  if(x.get(0).paused){    
      
    x.get(0).play();
    
    x.next(".playpause").fadeOut();
    // $(this).children(".video").attr("controls","controls");
   
    x.parent().next().find('.play-pause i').removeClass('fa-play').addClass('fa-pause');
  }else{      
    x.get(0).pause();
    x.next(".playpause").fadeIn();
   
   
    // $(this).children(".video").removeAttr("controls");
    x.parent().next().find('.play-pause i').removeClass('fa-pause').addClass('fa-play');
    }
}

//inner red play button 
var playpause = $('.playpause');
playpause.each(function () {
  $(this).click(function () {
    var singbtn = $(this).prev('.video');
    play($(singbtn));
  })
})

// resize btn 
var resizeBtn = $('.resize-btn');
resizeBtn.each(function () {
  $(this).click(function () {
    
    var elem = $(this).parents('.v-holder').find('.video').get(0);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  })
})


// fullscreen mode 
document.addEventListener("fullscreenchange", function(event) {
  if (document.fullscreenElement != null) {
    console.log('Entering Full Screen Toggle');
    $(event.target).click(function () {
      if($(this).get(0).paused){    
        $(this).get(0).play();
      }else{      
        $(this).get(0).pause();
        }
    })
  } else {
    console.log('out')
    $(event.target).click(function () {
      play($(this));
    })
  
  }
});

// video entertain
$('.video').each(function () {

  $(this).parent().next().css('bottom',0)
  $(this).parents('.v-holder').on('mouseenter',function () {
    $(this).find('.video-control').css('bottom',0)
    console.log('enter')
  })
  $(this).parents('.v-holder').on('mouseleave',function () {
    if ($(this).find('.video').get(0).paused) {
      $(this).find('.video-control').css('bottom',0)
    }else {
    $(this).find('.video-control').css('bottom',-200)
    console.log('leave')
   }
  })
  this.onended = function () {
    $(this).parent().next().find('.play-pause i').removeClass('fa-pause').addClass('fa-play');
    $(this).parent().next().css('bottom',0)
    $(this).next(".playpause").fadeIn();
  }

 var set = this;
setTimeout(function () {
  var durat = set.duration;
  console.log(set.duration)
    if (parseInt(durat)/60>=1) {
      var hd = Math.floor(durat / 3600);
      durat = durat - hd * 3600;               
      var md = Math.floor(durat / 60);
      var sd = Math.floor(durat % 60);
      if(hd.toString().length<2){hd=hd;}
      if(md.toString().length<2){md=md;}
      if(sd.toString().length<2){sd=sd;}
      $(set).parent().next().find('.duration').get(0).innerHTML = hd+":"+md + ":"+sd
    
  } else {
      var md = Math.floor(durat / 60);
      var sd = Math.floor(durat % 60);
      if(md.toString().length<2){md=md;}
      if(sd.toString().length<2){sd=sd;}
      $(set).parent().next().find('.duration').get(0).innerHTML = md + ":"+sd
      
  }
},1000);

$(this).click(function () {
    
      play($(this));
    });
})



// control play btn
$('.play-pause').each(function () {
  $(this).click(function () {
    play($(this).parents('.v-holder').find('.video'));
  })
})

// calculate video time and set progress bar
function myFunction(event) {
  // The currentTime property returns the current position of the audio/video playback

  var timenow = event.currentTime;
 var durat = event.duration;
console.log(timenow)
 var percentage = ( timenow / durat ) * 100;
$(event).parent().next().find('.custom-seekbar span').css("width", percentage+"%");
if (parseInt(durat)/60>=1) {
        var hd = Math.floor(durat / 3600);
        durat = durat - hd * 3600;               
        var md = Math.floor(durat / 60);
        var sd = Math.floor(durat % 60);
        if(hd.toString().length<2){hd='0'+hd;}
        if(md.toString().length<2){md='0'+md;}
        if(sd.toString().length<2){sd='0'+sd;}
        $(event).parent().next().find('.duration').get(0).innerHTML = hd+":"+md + ":"+sd
      
    } else {
        var md = Math.floor(durat / 60);
        var sd = Math.floor(durat % 60);
        if(md.toString().length<2){md='0'+md;}
        if(sd.toString().length<2){sd='0'+sd;}
        $(event).parent().next().find('.duration').get(0).innerHTML = md + ":"+sd
        
}

if (parseInt(timenow)/60>=1) {
        var h = Math.floor(timenow / 3600);
        timenow = timenow - h * 3600;               
        var m = Math.floor(timenow / 60);
        var s = Math.floor(timenow % 60);
        if(h.toString().length<2){h='0'+h;}
        if(m.toString().length<2){m='0'+m;}
        if(s.toString().length<2){s='0'+s;}
     
        $(event).parent().next().find('.duration').get(0).innerHTML =(hd-h)+':'+(md-m)+':'+(sd-s) 
    } else {
        var m = Math.floor(timenow / 60);
        var s = Math.floor(timenow % 60);
        if(m.toString().length<2){m='0'+m;}
        if(s.toString().length<2){s='0'+s;}
        $(event).parent().next().find('.duration').get(0).innerHTML =(md-m)+':'+(sd-s)

}

}


// custome progress bar control
$(".custom-seekbar").on("click", function(e){
  
  var durat = $(this).parents('.v-holder').find('.video').get(0).duration;
  var offset = $(this).offset();
  var left = (e.pageX - offset.left);
  var totalWidth = $(".custom-seekbar").width();
  var percentage = ( left / totalWidth );
  var vidTime = durat * percentage;

  $(this).parents('.v-holder').find('.video').get(0).currentTime = vidTime;

});



// file upload input 
$('#file-upload-hide').on('change',function () {
  // console.log( $('#file-upload').val())
  $('#file-upload').val($(this).val().split('\\').pop()) 
})

$('#ans-upload-hide').on('change',function () {
  // console.log( $('#file-upload').val())
  $('#file-upload1').val($(this).val().split('\\').pop()) 
})

// upload image user profile 
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#imagePreview').css('background-image', 'url('+e.target.result +')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function() {
  readURL(this);
});


// toggle visability psw
$('.visable').each(function () {
  $(this).on('click',function () {
    if($(this).prev().attr('type') == 'password') {
      $(this).prev().attr('type','text')
    }else {
      $(this).prev().attr('type','password')
    }
  })
})

// filtering with select options
$('#sel1').change(function () {
  $('.user-courses').find($(this).get(0).value).each(function () {
    console.log(this)
    $(this).show();
    
  })
  $('.user-courses').find('.grid').not($('#sel1').get(0).value).each(function () {
    console.log(this)
    $(this).hide();
    
  });

    
 
})




// categs modal 
$('.categ-box').each(function () {
  $(this).click(function () {
    $('#categs-modal').find('.levels').empty()
     $(this).find('.inner-levels').clone().appendTo($('#categs-modal').find('.levels'));
  })
})



// chat search filter 

$(document).ready(function(){
  $(".chat-search > input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(this).parent().next().find('li').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// chat text area 
// $('textarea').on('input', function() {
//   $(this).outerHeight(20).outerHeight(this.scrollHeight);
// });
// $('textarea').trigger('input');

// chat moving active user to top
$('.chat-collapse span:first-child').click(function () {
  $(this).toggleClass('run')
  $(this).parent().next().find('.contacts').slideToggle();
  $(this).parent().next().find('.chat-area').toggle();
})
$('.collapsed-elm .contacts ul li').each(function () {
 $(this).click(function () {
  $(this).parents('.collapsed-elm').prev().children('span:first-child').toggleClass('run')
  $(this).parents('.contacts').slideToggle();
  $(this).parents('.contacts').next().toggle();
  $(this).parents('.collapsed-elm').prev().addClass('new-conv')
  $(this).parents('.collapsed-elm').prev().find('span').eq(1).contents().remove();
  $(this).parents('.collapsed-elm').prev().find('span').eq(2).contents().remove();
   var nameAndTitle = $(this).children().eq(1).contents();
   var img = $(this).children().eq(2).contents();

   nameAndTitle.clone(true,true).appendTo($(this).parents('.collapsed-elm').prev().find('span').eq(1))
   img.clone(true,true).appendTo($(this).parents('.collapsed-elm').prev().find('span').eq(2))
   console.log('asdfasf')
 })
})




if ($(".audio-player").length != 0) {
  // custom audio 
// Possible improvements:
// - Change timeline and volume slider into input sliders, reskinned
// - Change into Vue or React component
// - Be able to grab a custom title instead of "Music Song"
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector(".audio-player");
var recorded_url = $('#audio-url2').text()
const audio = new Audio(
  recorded_url
);
//credit for song: Adrian kreativaweb@gmail.com

console.dir(audio);

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = .75;
  },
  false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
// const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
// volumeSlider.addEventListener('click', e => {
//   const sliderWidth = window.getComputedStyle(volumeSlider).width;
//   const newVolume = e.offsetX / parseInt(sliderWidth);
//   audio.volume = newVolume;
//   audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
// }, false)

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = 
  getTimeCodeFromNum(audio.currentTime) ;
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  },
  false
);

// audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
//   const volumeEl = audioPlayer.querySelector(".volume-container .volume");
//   audio.muted = !audio.muted;
//   if (audio.muted) {
//     volumeEl.classList.remove("icono-volumeMedium");
//     volumeEl.classList.add("icono-volumeMute");
//   } else {
//     volumeEl.classList.add("icono-volumeMedium");
//     volumeEl.classList.remove("icono-volumeMute");
//   }
// });

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
}



// chat and content side btnz 
$('#content-side').click(function () {
  $(window).scrollTop(0);
  $('.content-side').toggleClass('slide');
  $('.chat-side').removeClass('slide');
 if ($('.content-side').hasClass('slide')) {

  

   $(this).css('background','#e5001978');
   $(this).parent().find('button:last-child').css('background','transparent')
  $(this).find('i').removeClass('fa-bars').addClass('fa-times-circle');
  $(this).parent().find('button:last-child i').removeClass('fa-times-circle').addClass('fa-bars');
 }else {
  $(this).css('background','transparent')
  $(this).find('i').removeClass('fa-times-circle').addClass('fa-bars');
 }
})
$('#chat-side').click(function () {
  $(window).scrollTop(0);
  $('.chat-side').toggleClass('slide');
  $('.content-side').removeClass('slide');
  if ($('.chat-side').hasClass('slide')) {
    $(this).css('background','#e5001978');
    $(this).parent().find('button:first-child').css('background','transparent')
    $(this).find('i').removeClass('fa-bars').addClass('fa-times-circle');
    $(this).parent().find('button:first-child i').removeClass('fa-times-circle').addClass('fa-bars');
   }else {
    $(this).css('background','transparent')
    $(this).find('i').removeClass('fa-times-circle').addClass('fa-bars');
   }
})

$(window).scroll(function () {


  if ($('.chat-side').hasClass('slide') || $('.content-side').hasClass('slide')) {
    var sideH = 
    Number($('.course-list').outerHeight()) + (Number($('body').css('padding-top').replace(/\D/g,''))/2);
    // $('header').outerHeight() +
    // $('.slide-btn-cont').outerHeight() + $('.breadd').outerHeight();
    console.log(sideH)
    if ($(window).scrollTop() > sideH) {
      $('.chat-side').removeClass('slide');
  $('.content-side').removeClass('slide');
  $('.slide-btn-cont button').css('background','transparent')
$('.slide-btn-cont button i').removeClass('fa-times-circle').addClass('fa-bars');
  console.log(sideH)
    }
  }
})

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
        $('.slide-btn-cont').addClass('slider-btn-up')
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
            $('.slide-btn-cont').removeClass('slider-btn-up')
        }
    }
    
    lastScrollTop = st;
}


// confirm delet file 
$('.answer-item i').each(function () {
  $(this).click(function () {
    $('#confirm-delete-modal').modal('show')
  })
})


// ------- foregt psw steps ---------
if ($('#stepped').length == 1) {
  document.addEventListener("DOMContentLoaded", () => {
    class MultiStep {
     constructor(formId) {
      let myForm = document.querySelector(formId),
       steps = myForm.querySelectorAll(".stepspsw"),
       btnPrev = myForm.querySelector(".btnPrev"),
       btnNext = myForm.querySelector(".btnNext"),
       indicators = myForm.querySelectorAll(".rounded-circle"),
       inputClasses = ".form-control",
       currentTab = 0;
   
      // we'll need 4 different functions to do this
      showTab(currentTab);
   
      function showTab(n) {
       steps[n].classList.add("activepsw");
      //  if (n == 0) {
      //   btnPrev.classList.add("hiddenpsw");
      //   btnPrev.classList.remove("showpsw");
      //  } else {
      //   btnPrev.classList.add("showpsw");
      //   btnPrev.classList.remove("hiddenpsw");
      //  }
       if (n == steps.length - 1) {
         console.log(n)
        btnNext.textContent = "تم";
        btnNext.type = "submit";
       } else if (n == 1) {
        btnNext.textContent = "تأكيد";
       }
       showIndicators(n);
      }
   
      function showIndicators(n) {
       for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.replace("bg-warning", "bg-success");
       }
       indicators[n].className += " bg-danger";
      }
   
      function clickerBtn(n) {
       if (n == 1 && !validateForm()) return false;
       steps[currentTab].classList.remove("activepsw");
       currentTab = currentTab + n;
       if (currentTab >= steps.length) {
        myForm.submit();
        return false;
       }
       showTab(currentTab);
      }
   // Do whatever validation you want
      function validateForm() {
       let input = steps[currentTab].querySelectorAll(inputClasses),
        valid = true;
       for (let i = 0; i < input.length; i++) {
        if (input[i].value == "") {
         if (!input[i].classList.contains("invalidpsw")) {
          input[i].classList.add("invalidpsw");
         }
         valid = false;
        }
        if (!input[i].value == "") {
         if (input[i].classList.contains("invalidpsw")) {
          input[i].classList.remove("invalidpsw");
         }
        }
       }
       return valid;
      }
      // btnPrev.addEventListener("click", () => {
      //  clickerBtn(-1);
      // });
      btnNext.addEventListener("click", () => {
       clickerBtn(1);
      });
     }
    }
    let MS = new MultiStep("#stepped");
   });
}
 