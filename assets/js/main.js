/**
* Template Name: OnePage - v4.3.0
* Template URL: https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

$(".fontbtn").click(function(){
  change_font_size( parseInt($(this).data('csize')) );
  console.log("test");
});

function change_font_size(csize){
  var $cotent_html=$('section,h1,h2,h3,h4,h5,i,p,footer');
  $cotent_html.each(function(){
      var cur_size = parseInt($(this).css('font-size'));
      cur_size=cur_size+csize;
      console.log(cur_size);
      $(this).css('font-size', cur_size.toString()+'px');
  });

}

$("#reset").click(function(){
  var $cotent_html=$('section,h1,h2,h3,h4,h5,i,p,footer');
  $cotent_html.each(function(){
      $(this).css('font-size','10px');
  });
});



//calculator logic
var f = $('#fueltype');
var v = $('#vehicletype');
var e = $('#eurotype');
var r = $('#resetbutton');
var inp = $('#quantityval');
var calcbtn = $("#calcbutton");
f.prop('disabled','disabled');
e.prop('disabled','disabled');


v.change(function(){
  var selected = this.value;
  if(selected == 2){
    console.log("trans");
    f.val('3');
    f.prop('disabled','disabled');
    e.val('0');
    e.prop('disabled','disabled');
  }else{
    f.removeAttr("disabled");
    f.val('0');
    console.log("truck");

  }
}
);
f.change(function(){
  var selected = this.value;
  console.log("f");
  if(selected == 2){
    e.removeAttr("disabled");
  }else{
    e.prop('disabled','disabled');
  }
}
);
e.change(function(){
  console.log("e");
}
);

r.click(function(){
  v.val(0);
  e.val(0);
  f.val(0);
  inp.val('');
  f.prop('disabled','disabled');
  e.prop('disabled','disabled');
  $('#result').css('display','none');


});
calcbtn.click(function(){
  calculate();
});

function calculate(){
  var values = [];
  gas = [34.2,[67.01,0.6,1.6]];
  euro1 = [38.6,[69.9,0.2,0.4]];
  euro2 = [38.6,[69.9,0.1,0.4]];
  euro3 = [38.6,[69.9,0.2,0.4]];
  bio = [34.6,[69.9,0.07,0.4]];
  var em;
  var q = inp.val();
  
  if(v.val() == 2){
    em = getE(gas);
  }else{
    if(f.val() == 1){
      em = getE(bio);
    }
    if(f.val() == 2){
      if(e.val() == 1){
        em = getE(euro1);
      }
      if(e.val() == 2){
        em = getE(euro2);
      }
      if(e.val() == 3){
        em = getE(euro3);
      }
    }
  }
  
  if(em){
    console.log(em);
    //print result
    $('#result').css('display','block');
    $('#qinfo').text(q);
    $('#einfo').text(em.toFixed(3));
    generateChart(values);
  }

  

  function getE(type){
    var total = 0;
      for(var j = 0;j<3;j++){
        var em = q * type[0] * type[1][j] * 0.001;
        values.push(em);
        total += em;
      }
    return total;
  }


}

function generateChart(d){
    
  const data = {
    labels: ['CO2', 'CH4', 'NO2'],
    datasets: [
      {
        label: 'Dataset 1',
        data: d,
        backgroundColor: [
          'rgb(255, 99, 132)',
        'rgb(75, 192, 142)',
        'rgb(255, 205, 86)'
        ]
      }
    ]
  };

  const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Green house emmisson chart'
      }
    }
  },
};

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}



