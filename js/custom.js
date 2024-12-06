$(window).on('load', function() {
    "use strict";

    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');
    // Because only Chrome supports offset-path, feGaussianBlur for now
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if(!isChrome) {
        document.getElementsByClassName('infinityChrome')[0].style.display = "none";
        document.getElementsByClassName('infinity')[0].style.display = "block";
    }

    /*=========================================================================
     Wow Initialize
     =========================================================================*/
    // Here will be the WoW Js implementation.
    setTimeout(function(){new WOW().init();}, 0);

    var dynamicDelay = [
      200,
      400,
      600,
      800,
      1000,
      1200,
      1400,
      1600,
      1800,
      2000
    ];
    var fallbackValue = "200ms";
  
    $(".blog-item.wow").each(function(index) {
      $(this).attr("data-wow-delay", typeof dynamicDelay[index] === 'undefined' ? fallbackValue : dynamicDelay[index] + "ms");
    });

    /*=========================================================================
     Isotope
     =========================================================================*/
    $('.portfolio-filter').on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded( function() {
      $('.portfolio-wrapper').isotope({
          // options
          itemSelector: '[class*="col-"]',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '[class*="col-"]'
          }
      });
    });

    var bolbyPopup = function(){
      /*=========================================================================
              Magnific Popup
      =========================================================================*/
      $('.work-image').magnificPopup({
        type: 'image',
        closeBtnInside: false,
        mainClass: 'my-mfp-zoom-in',
      });

      $('.work-content').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
      });

      $('.work-video').magnificPopup({
        type: 'iframe',
        closeBtnInside: false,
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                      '<div class="mfp-close"></div>'+
                      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div>', 

            patterns: {
              youtube: {
                index: 'youtube.com/',

                id: 'v=',

                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
              },
              vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: '//player.vimeo.com/video/%id%?autoplay=1'
              },
              gmaps: {
                index: '//maps.google.',
                src: '%id%&output=embed'
              }

            },

            srcAction: 'iframe_src',
          }
      });

      $('.gallery-link').on('click', function () {
          $(this).next().magnificPopup('open');
      });

      $('.gallery').each(function () {
          $(this).magnificPopup({
              delegate: 'a',
              type: 'image',
              closeBtnInside: false,
              gallery: {
                  enabled: true,
                  navigateByImgClick: true
              },
              fixedContentPos: false,
              mainClass: 'my-mfp-zoom-in',
          });
      });
    }

    bolbyPopup();

    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
        itemSelector: '.grid-item',
        nextSelector: '.portfolio-pagination li a',
        navSelector: '.portfolio-pagination',
        extraScrollPx: 0,
        bufferPx: 0,
        maxPage: 6,
        loading: {
            finishedMsg: "No more works",
            msgText: '',
            speed: 'slow',
            selector: '.load-more',
        }
    },
    // trigger Masonry as a callback
    function( newElements ) {

      var $newElems = $( newElements );
      $newElems.imagesLoaded(function(){  
        $newElems.animate({ opacity: 1 });
        $container.isotope( 'appended', $newElems );
      });

      bolbyPopup();

      // Check last page
      curPage++;
      if(curPage == pagesNum) {
        $( '.load-more' ).remove();
      }

    });

    $container.infinitescroll( 'unbind' );

    $( '.load-more .btn' ).on('click', function() {
      $container.infinitescroll( 'retrieve' );
      // display loading icon
      $( '.load-more .btn i' ).css('display', 'inline-block');
      $( '.load-more .btn i' ).addClass('fa-spin');

      $(document).ajaxStop(function () {
        setTimeout(function(){
               // hide loading icon
          $( '.load-more .btn i' ).hide();
        }, 1000);
      });
      return false;
    });

    /* ======= Mobile Filter ======= */

    // bind filter on select change
    $('.portfolio-filter-mobile').on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
});

$(document).on('ready', function() {
    "use strict";

    /*=========================================================================
                Slick Slider
    =========================================================================*/
    $('.testimonials-wrapper').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000
    });

});

$(function(){
    "use strict";

    /*=========================================================================
            Mobile Menu Toggle
    =========================================================================*/
    $('.menu-icon button').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').toggleClass('open');
    });

    $('main.content').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').removeClass('open');
    });

    $('.vertical-menu li a').on( 'click', function() {
        $('header.desktop-header-1, main.content, header.mobile-header-1').removeClass('open');
    });

    $('.menu-icon button').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').toggleClass('open');
    });

    $('main.content-2').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').removeClass('open');
    });

    $('.vertical-menu li a').on( 'click', function() {
        $('header.desktop-header-2, main.content-2, header.mobile-header-2').removeClass('open');
    });

    /*=========================================================================
     One Page Scroll with jQuery
     =========================================================================*/
    $('a[href^="#"]:not([href="#"]').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });

    /*=========================================================================
     Parallax layers
     =========================================================================*/
     if ($('.parallax').length > 0) { 
      var scene = $('.parallax').get(0);
      var parallax = new Parallax(scene, { 
        relativeInput: true,
      });
    }

     /*=========================================================================
     Text Rotating
     =========================================================================*/
    $(".text-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "bounceIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 4000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });

    /*=========================================================================
     Add (nav-link) class to main menu.
     =========================================================================*/
    $('.vertical-menu li a').addClass('nav-link');

    /*=========================================================================
     Bootstrap Scrollspy
     =========================================================================*/
    $("body").scrollspy({ target: ".scrollspy"});

    /*=========================================================================
     Counterup JS for facts
     =========================================================================*/
    $('.count').counterUp({
      delay: 10,
      time: 2000
    });

    /*=========================================================================
     Progress bar animation with Waypoint JS
     =========================================================================*/
    if ($('.skill-item').length > 0) { 
      var waypoint = new Waypoint({
        element: document.getElementsByClassName('skill-item'),
        handler: function(direction) {
          
          $('.progress-bar').each(function() {
            var bar_value = $(this).attr('aria-valuenow') + '%';                
            $(this).animate({ width: bar_value }, { easing: 'linear' });
          });

          this.destroy()
        },
        offset: '50%'
      });
    }

    /*=========================================================================
     Spacer with Data Attribute
     =========================================================================*/
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

    /*=========================================================================
     Background Color with Data Attribute
     =========================================================================*/
     var list = document.getElementsByClassName('data-background');

     for (var i = 0; i < list.length; i++) {
       var color = list[i].getAttribute('data-color');
       list[i].style.backgroundColor = "" + color + "";
     }

    /*=========================================================================
            Main Menu
    =========================================================================*/
    $( ".submenu" ).before( '<i class="ion-md-add switch"></i>' );

    $(".vertical-menu li i.switch").on( 'click', function() {
        var $submenu = $(this).next(".submenu");
        $submenu.slideToggle(300);
        $submenu.parent().toggleClass("openmenu");
    });

    /*=========================================================================
            Scroll to Top
    =========================================================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 350) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').on('click', function(event) {     // When arrow is clicked
      event.preventDefault();
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 400);
    });

});


const newsData = {
  1: {
      title: "Building Smart Infrastructure for the Future",
      details: "As urbanization accelerates, the need for efficient, sustainable infrastructure is paramount. Smart cities use cutting-edge technologies like IoT, AI, and Big Data to optimize traffic management, reduce energy consumption, and improve public services. Recent projects in Singapore and Barcelona have demonstrated how smart infrastructure can enhance the quality of urban life. These initiatives not only benefit residents but also contribute significantly to achieving global sustainability goals. Governments are collaborating with private tech firms to deploy sensors and smart grids to monitor city operations in real-time. For example:Barcelona has integrated IoT solutions into parking management, reducing traffic by 20%.Singapore's 'Smart Nation' program uses AI for flood detection and efficient energy use."
  },
  2: {
      title: "Innovation in Green Energy",
      details: "Renewable energy innovations are transforming the energy sector. With breakthroughs in solar panel efficiency and wind turbine technology, renewable energy sources are becoming more accessible and cost-effective. Recent advancements in battery technology are addressing energy storage challenges, allowing for consistent power supply even during periods of low generation.Major breakthroughs include: 1)Perovskite solar cells, which are cheaper and more efficient than traditional silicon panels. 2)Offshore wind farms, like those in the North Sea, are setting new standards for energy production. 3)Tesla’s Gigafactory has ramped up lithium-ion battery production, enabling longer-lasting energy storage."
  },
  3: {
    title: "Industry 4.0: Revolutionizing Manufacturing",
    details: "The Fourth Industrial Revolution (Industry 4.0) is integrating technologies such as robotics, the Internet of Things (IoT), and artificial intelligence into manufacturing processes. This transformation is enhancing productivity, reducing waste, and enabling customized production.Automation: Factories are becoming 'smart' with machines that communicate with each other, reducing downtime.3D Printing: Companies are now prototyping and manufacturing parts on-demand, drastically cutting costs and lead times. Case Study: BMW's smart factories have reduced operational costs by 30%, thanks to advanced robotics and AI."
},
  4: {
    title: "Building Resilient Infrastructure Post-Pandemic",
    details: "The COVID-19 pandemic highlighted the vulnerabilities in global infrastructure. As the world recovers, there is a push for resilience-focused projects, such as adaptive healthcare facilities and robust supply chains.Investments are being made in modular healthcare units that can be deployed during emergencies.Governments are focusing on digitizing supply chains to improve efficiency and prevent disruptions.Example: Japan has implemented earthquake-resistant technologies in new construction projects, safeguarding communities against natural disasters."
},
  5: {
    title: "AI and Automation Driving Industry Transformation",
    details: "Artificial intelligence (AI) and automation are transforming industries worldwide. These technologies are being used to predict market trends, automate repetitive tasks, and even create new products.AI-powered algorithms are helping industries optimize production and reduce costs by analyzing vast amounts of data.Companies like Amazon and Alibaba are using robots for warehouse operations, enhancing efficiency.In agriculture, AI is being used for precision farming, which minimizes waste and boosts crop yields."
},
  6: {
    title: "Sustainable Manufacturing Practices",
    details: "As environmental concerns grow, industries are adopting sustainable practices to reduce their carbon footprint. This shift includes using renewable materials, recycling industrial waste, and implementing circular economy principles.Adidas is creating shoes from ocean plastic, showcasing how waste can become a resource.Steel companies are exploring hydrogen as a cleaner alternative to coal in the production process.Circular economy initiatives are being promoted globally, encouraging industries to design products that can be reused or recycled."
}
}
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', function () {
      const category = this.getAttribute('data-category');
      filterNews(category);
  });
});

// Function to filter news items based on category
function filterNews(category) {
  const allCards = document.querySelectorAll('.news-card');
  allCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';  // Show the card
      } else {
          card.style.display = 'none';   // Hide the card
      }
  });
}

// Event listeners for read more buttons
document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', function () {
      const newsId = this.getAttribute('data-news-id');
      const newsItem = newsData[newsId];  // Subtract 1 to match the array index

      if (newsItem) {
          // Set news details in the modal
          document.getElementById('news-title').innerText = newsItem.title;
          document.getElementById('news-details').innerText = newsItem.details;

          // Show the modal
          const modal = document.getElementById('news-modal');
          modal.style.display = "block";
      }
  });
});

// Close the modal when clicking the close button
document.querySelector('.close-btn').addEventListener('click', function () {
  document.getElementById('news-modal').style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', function (event) {
  const modal = document.getElementById('news-modal');
  if (event.target === modal) {
      modal.style.display = "none";
  }
});

// Sample function to handle adding comments (could be added in the modal for each news item)
document.getElementById('add-comment-btn').addEventListener('click', function () {
  const commentText = document.getElementById('new-comment').value.trim();
  if (commentText) {
      const commentList = document.getElementById('comments-list');
      const newComment = document.createElement('li');
      newComment.textContent = commentText;
      commentList.appendChild(newComment);

      // Clear the input field
      document.getElementById('new-comment').value = '';
  } else {
      alert('Please write a comment before adding.');
  }
});

// Event listeners for filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', function () {
      const category = this.getAttribute('data-category');
      filterChallenges(category);
  });
});

// Event listener for Info button
document.querySelector('.info-btn').addEventListener('click', function () {
  showInfoModal();
});

// Function to filter challenges based on category
function filterChallenges(category) {
  const allCards = document.querySelectorAll('.challenge-card');
  allCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';  // Show the card
      } else {
          card.style.display = 'none';   // Hide the card
      }
  });
}

// Event listener for participate buttons
document.querySelectorAll('.participate-btn').forEach(button => {
  button.addEventListener('click', function () {
      const challengeTitle = this.closest('.challenge-card').querySelector('.card-title').innerText;
      alert(`You are now participating in: ${challengeTitle}`);
  });
});

document.querySelector('.info-btn').addEventListener('click', function () {
  alert(`This page highlights various tasks, competitions, or activities designed to test users' skills, creativity, and problem-solving abilities. It serves as an engaging platform for individuals or teams to participate, learn, and grow through challenges across different domains.

Key features include:
Categories: Challenges are grouped based on topics or difficulty levels to suit a wide audience.
Participation: Users can join challenges, track progress, and showcase their achievements.
Community Interaction: An interactive space for participants to share experiences, exchange ideas, and collaborate.

This page aims to motivate users to take on challenges, improve themselves, and foster a sense of accomplishment and community engagement.`);
});

document.addEventListener("DOMContentLoaded", () => {
  // Select modal and its components
  const modal = document.getElementById("sdg9-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeModal = document.getElementById("close-modal");

  // Show Modal Function
  function showModal(title, content) {
    modalTitle.textContent = title;
    modalContent.innerHTML = content; // Insert content dynamically
    modal.style.display = "block"; // Show the modal
  }

  // Close Modal Function
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });

  // Close Modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Add event listeners to buttons
  document.getElementById("learn-more").addEventListener("click", () => {
    showModal(
      "Learn About SDG 9",
      `
        <p>Sustainable Development Goal 9 aims to:</p>
        <ul>
          <li>Build resilient infrastructure to withstand environmental and human impacts.</li>
          <li>Promote inclusive and sustainable industrialization for equitable growth.</li>
          <li>Encourage innovation and technological advancements for a better future.</li>
        </ul>
        <p>Explore how you can contribute to achieving these goals through education and action.</p>
      `
    );
  });

  document.getElementById("success-stories").addEventListener("click", () => {
    showModal(
      "Success Stories",
      `
        <p>Here are some inspiring success stories:</p>
        <ul>
          <li>A community in Africa using solar energy for sustainable industrialization.</li>
          <li>Innovative startups tackling waste management with cutting-edge technology.</li>
          <li>Global collaborations to improve infrastructure in disaster-prone areas.</li>
        </ul>
        <p>These stories show that every step towards SDG 9 counts!</p>
      `
    );
  });

  document.getElementById("global-challenges").addEventListener("click", () => {
    showModal(
      "Global Challenges",
      `
        <p>SDG 9 faces several challenges:</p>
        <ul>
          <li>Limited access to modern technology and infrastructure in developing nations.</li>
          <li>Climate change threatening existing industrial frameworks.</li>
          <li>Lack of collaboration and resources for large-scale innovation.</li>
        </ul>
        <p>Understanding these challenges is the first step to overcoming them.</p>
      `
    );
  });

  document.getElementById("collaborate-tools").addEventListener("click", () => {
    showModal(
      "Collaborate for Change",
      `
        <p>Collaboration is key to achieving SDG 9. Here's how you can participate:</p>
        <ul>
          <li>Join forums and discussions to share your ideas.</li>
          <li>Partner with organizations and policymakers for actionable solutions.</li>
          <li>Contribute to open-source projects focused on sustainability.</li>
        </ul>
        <p>Together, we can make a lasting impact!</p>
      `
    );
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const commentInput = document.getElementById("comment-input");
  const commentsList = document.getElementById("comments-list");
  const addCommentBtn = document.getElementById("add-comment-btn");

  const feedbackForm = document.getElementById("feedback-form");
  const feedbackName = document.getElementById("feedback-name");
  const feedbackInput = document.getElementById("feedback-input");
  const feedbackList = document.getElementById("feedback-list");

  // Add Comment Functionality
  addCommentBtn.addEventListener("click", () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
      const commentItem = document.createElement("li");
      commentItem.className = "list-group-item";
      commentItem.innerHTML = `
        <div>
          <span>${commentText}</span>
          <button class="btn btn-link reply-btn">Reply</button>
        </div>
        <ul class="list-group mt-2 reply-list" style="display: none;"></ul>
        <div class="reply-form mt-2" style="display: none;">
          <textarea class="form-control reply-input" placeholder="Write a reply..."></textarea>
          <button class="btn btn-primary mt-2 submit-reply-btn">Submit Reply</button>
        </div>
      `;
      commentsList.appendChild(commentItem);

      // Clear input
      commentInput.value = "";

      // Handle Reply Button
      const replyBtn = commentItem.querySelector(".reply-btn");
      const replyList = commentItem.querySelector(".reply-list");
      const replyForm = commentItem.querySelector(".reply-form");
      const replyInput = commentItem.querySelector(".reply-input");
      const submitReplyBtn = commentItem.querySelector(".submit-reply-btn");

      replyBtn.addEventListener("click", () => {
        replyList.style.display = replyList.style.display === "none" ? "block" : "none";
        replyForm.style.display = replyForm.style.display === "none" ? "block" : "none";
      });

      submitReplyBtn.addEventListener("click", () => {
        const replyText = replyInput.value.trim();
        if (replyText) {
          const replyItem = document.createElement("li");
          replyItem.className = "list-group-item";
          replyItem.textContent = replyText;
          replyList.appendChild(replyItem);

          // Clear input
          replyInput.value = "";
        } else {
          alert("Please enter a reply before submitting.");
        }
      });
    } else {
      alert("Please enter a comment before submitting.");
    }
  });

  // Add Feedback Functionality
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const name = feedbackName.value.trim();
    const feedback = feedbackInput.value.trim();

    if (name && feedback) {
      const feedbackItem = document.createElement("div");
      feedbackItem.className = "alert alert-secondary";
      feedbackItem.innerHTML = `
        <strong>${name}:</strong> ${feedback}
      `;
      feedbackList.appendChild(feedbackItem);

      // Clear inputs
      feedbackName.value = "";
      feedbackInput.value = "";
    } else {
      alert("Please fill out both name and feedback.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all project images
  const projectImages = document.querySelectorAll(".project-image");

  // Get all modals
  const modals = {
    "Project 1": document.getElementById("project-modal1"),
    "Project 2": document.getElementById("project-modal2"),
    "Project 3": document.getElementById("project-modal3"),
    "Project 4": document.getElementById("project-modal4"),
    "Project 5": document.getElementById("project-modal5"),
    "Project 6": document.getElementById("project-modal6"),
    "Project 7": document.getElementById("project-modal7"),
  };

  // Add click event listener to each project image
  projectImages.forEach((image) => {
    image.addEventListener("click", () => {
      const projectTitle = image.getAttribute("data-title"); // Get the project title from the data attribute
      const modal = modals[projectTitle]; // Get the corresponding modal

      if (modal) {
        modal.style.display = "block"; // Show the modal
      }
    });
  });

  // Add close functionality for modals
  window.addEventListener("click", (event) => {
    Object.values(modals).forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"; // Close the modal when clicking outside
      }
    });
  });
});
