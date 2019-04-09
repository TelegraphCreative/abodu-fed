
   // ---------------------------------------------------------------------------
   // Menu Toggle
   var body      = document.querySelector("body");
   var hamburger = document.querySelector('.hamburger');
   var nav_wrap       = document.querySelector('#nav_wrap');
   var nav       = document.querySelector('#site_nav');

   hamburger.onclick = function(){
      body.classList.toggle("menu_open");
      hamburger.classList.toggle('is-active');
      nav.classList.toggle('is-visible');
   };

   // ---------------------------------------------------------------------------
   // #js-menu  Show/Hide
   var navButton = document.querySelector('#nav_btn');

   navButton.addEventListener('click', function() {
      let expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
   });


   // ---------------------------------------------------------------------------
   // Add Shadow to Nav on Scroll
   var scrollPosition = window.scrollY;
   var nav_wrap = document.getElementById('nav_wrap');

   window.addEventListener('scroll', function() {
      scrollPosition = window.scrollY;

      if (scrollPosition >= 32) {
         nav_wrap.classList.add('--active');
      } else {
         nav_wrap.classList.remove('--active');
      }
   });


   // ---------------------------------------------------------------------------
   // Show/hide Nav on Scroll
   window.addEventListener('scroll', function() {
      scrollPosition = window.scrollY;

      if (scrollPosition >= 200) {
         nav_wrap.classList.remove('at-top--true');
         nav_wrap.classList.add('at-top--false');
      } else {
         nav_wrap.classList.remove('at-top--false');
         nav_wrap.classList.add('at-top--true');
      }
   });

   $.scrollDetection=function(o){var l=$.extend({scrollDown:function(){},scrollUp:function(){}},o);var n=0;$(window).scroll(function(){var o=$(this).scrollTop();if(o>n){l.scrollDown()}else if(o<n){l.scrollUp()}n=o})};

   $.scrollDetection({
      scrollDown: function() {
         nav_wrap.classList.remove('scroll-direction--up');
         nav_wrap.classList.add('scroll-direction--down');
      },
      scrollUp: function() {
         nav_wrap.classList.remove('scroll-direction--down');
         nav_wrap.classList.add('scroll-direction--up');
      }
   });
   