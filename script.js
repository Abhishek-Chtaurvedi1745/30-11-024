const sliderTrack = document.getElementById("sliderTrack");
            function startSlider() {
                const screenWidth = window.innerWidth; 
                let translatePercentage;

                if (screenWidth <= 450) {
                    translatePercentage = 34.2; 
                } else if (screenWidth <= 768) {
                    translatePercentage = 26.9; 
                } else {
                    translatePercentage = 12.43;
                }

                setInterval(() => {
                    const firstImage = sliderTrack.querySelector("img");
                    sliderTrack.style.transition = "transform 1s ease-out"; 
                    sliderTrack.style.transform = `translateX(-${translatePercentage}%)`;
    
                    setTimeout(() => {
                        sliderTrack.style.transition = "none";
                        sliderTrack.style.transform = "translateX(0%)";
                        sliderTrack.appendChild(firstImage); 
                    }, 1000); 
                }, 2000); 
            }            
            startSlider();
            window.addEventListener("resize", () => {
                location.reload(); 
            });
            const slides = document.querySelector('.mySlider_slides');
            const dotsContainer = document.querySelector('.mySlider_dots');
            let currentIndex = 0;
            const totalSlides = document.querySelectorAll('.mySlider_slide').length;
    
            function getSlidesPerView() {
                if (window.innerWidth <= 458) return 1;
                if (window.innerWidth <= 992) return 2;
                return 3;
            }
    
            function createDots() {
                const slidesPerView = getSlidesPerView();
                const totalPages = Math.ceil(totalSlides / slidesPerView);
                dotsContainer.innerHTML = '';
    
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('mySlider_dot');
                    dot.addEventListener('click', () => setCurrentSlide(i));
                    dotsContainer.appendChild(dot);
                }
                updateDots();
            }
    
            function showSlide(index) {
                const slidesPerView = getSlidesPerView();
                const slideWidth = slides.clientWidth / slidesPerView;
                slides.style.transform = `translateX(${-index * slideWidth}px)`;
            }
            function updateDots() {
                const slidesPerView = getSlidesPerView();
                const totalPages = Math.ceil(totalSlides / slidesPerView);
                const activeDotIndex = Math.floor(currentIndex / slidesPerView);
    
                const dots = document.querySelectorAll('.mySlider_dot');
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[activeDotIndex]) dots[activeDotIndex].classList.add('active');
            }
    
            function autoSlide() {
                const slidesPerView = getSlidesPerView();
                const totalPages = Math.ceil(totalSlides / slidesPerView);
    
                currentIndex = (currentIndex + 1) % totalPages;
                showSlide(currentIndex * slidesPerView);
                updateDots();
            }
            function setCurrentSlide(index) {
                clearInterval(autoSlideInterval);
                currentIndex = index * getSlidesPerView();
                showSlide(currentIndex);
                updateDots();
                autoSlideInterval = setInterval(autoSlide, 5000);
            }
            let autoSlideInterval = setInterval(autoSlide, 5000);
    
            window.addEventListener('resize', () => {
                createDots();
                showSlide(currentIndex);
            });
            createDots();
            showSlide(currentIndex);
            $(document).ready(function () {
                const owl = $(".owl-carousel");
          
                let autoplayTimer;
          
                owl.owlCarousel({
                  loop: true,
                  margin: 13,
                  nav: false,
                  dots: false,
                  autoplay: true,
                  autoplayTimeout: 2000,
                  autoplayHoverPause: true,
                  smartSpeed: 1000,
                  responsive: {
                    0: { items: 1 },
                    500: { items: 2 },
                    1000: { items: 3 }
                  }
                });
          
                function restartAutoplay() {
                  owl.trigger('stop.owl.autoplay');
                  clearTimeout(autoplayTimer);
          
                  autoplayTimer = setTimeout(function () {
                    owl.trigger('play.owl.autoplay', [3000]); 
                  }, 3000); 
                }
          
                $(".owl-prev").click(function () {
                  owl.trigger("prev.owl.carousel");
                  owl.trigger('stop.owl.autoplay'); 
                  restartAutoplay(); 
                });
          
                $(".owl-next").click(function () {
                  owl.trigger("next.owl.carousel");
                  owl.trigger('stop.owl.autoplay');
                  restartAutoplay(); 
                });
          
                restartAutoplay();
              });
              const navbar = document.querySelector('.navbar');
              const logo = document.querySelector('.navbar-brand img');
              const menuIcon = document.querySelector('.menu-icon');
              const sideMenu = document.querySelector('.side-menu');
              const mm = document.querySelector('.mobile-number');
          
              window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                  navbar.classList.add('scrolled');
                  navbar.classList.remove('transparent');
                  logo.src = 'logo/Maison Infratech-25.png';
                  mm.style.backgroundColor = 'black';

                } else {
                  navbar.classList.add('transparent');
                  navbar.classList.remove('scrolled');
                  logo.src = 'img/Maison_Infratech-26[1].png';
                  mm.style.backgroundColor = 'white';
                }
              });
          
              menuIcon.addEventListener('click', () => {
                menuIcon.classList.toggle('open');
                sideMenu.classList.toggle('open');
              });
              $(document).ready(function () {
                const $sliderTrack = $('.slider-track');
                const slideWidth = $('.slider-track img').outerWidth(true); 
                const animationSpeed = 30; 
      
                $sliderTrack.append($sliderTrack.html());
          
                let currentPosition = 0;
          
                function animateSlider() {
                  currentPosition -= 1; 
                  if (Math.abs(currentPosition) >= slideWidth * ($sliderTrack.children().length / 2)) {
                    currentPosition = 0;
                  }
                  $sliderTrack.css('transform', `translateX(${currentPosition}px)`);
                }
          
                let sliderInterval = setInterval(animateSlider, animationSpeed);
          
                $('.slider-container').hover(
                  function () {
                    clearInterval(sliderInterval); 
                  },
                  function () {
                    sliderInterval = setInterval(animateSlider, animationSpeed); 
                  }
                );
              });
              $(document).ready(function () {
                let currentIndex = 0;
                const sliderWrapper = $('.slider-wrapper');
                const slides = $('.testimonial-item');
                const slidesToShow = 1; 
                const intervalTime = 3000;
                let autoSlideInterval;
              
                sliderWrapper.append(slides.clone().addClass('clone'));
                sliderWrapper.prepend(slides.clone().addClass('clone'));
              
                function calculateSlideWidth() {
                  return $('.testimonial-item').outerWidth(true);
                }
              
                function updateSlider(skipTransition = false) {
                  const slideWidth = calculateSlideWidth();
                  const offset = -(currentIndex * slideWidth);
              
                  if (skipTransition) {
                    sliderWrapper.css('transition', 'none');
                  } else {
                    sliderWrapper.css('transition', 'transform 0.5s ease');
                  }
              
                  sliderWrapper.css('transform', `translateX(${offset}px)`);
                }
              
                function startAutoSlide() {
                  autoSlideInterval = setInterval(() => {
                    moveToNextSlide();
                  }, intervalTime);
                }
              
                function stopAutoSlide() {
                  clearInterval(autoSlideInterval);
                }
              
                function moveToNextSlide() {
                  const totalSlides = $('.testimonial-item').length;
                  currentIndex++;
                  updateSlider();
              
                  if (currentIndex >= totalSlides - slidesToShow) {
                    setTimeout(() => {
                      currentIndex = slides.length;
                      updateSlider(true);
                    }, 500);
                  }
                }
              
                function moveToPreviousSlide() {
                  const totalSlides = $('.testimonial-item').length;
                  currentIndex--;
                  updateSlider();
              
                  if (currentIndex < slidesToShow) {
                    setTimeout(() => {
                      currentIndex = slides.length - slidesToShow;
                      updateSlider(true);
                    }, 500);
                  }
                }
              
                $('.left-arrow').click(function () {
                  stopAutoSlide();
                  moveToPreviousSlide();
                  startAutoSlide();
                });
              
                $('.right-arrow').click(function () {
                  stopAutoSlide();
                  moveToNextSlide();
                  startAutoSlide();
                });
              
                $(window).resize(function () {
                  updateSlider(true);
                });
              
                currentIndex = slides.length;
                updateSlider(true);
                startAutoSlide();
              });
              const imageWrappers = document.querySelectorAll('.image-wrapper');
              const overlayTexts = document.querySelectorAll('.overlay-text');
          
              const firstWrapper = imageWrappers[0];
              firstWrapper.classList.add('active');
          
              imageWrappers.forEach((wrapper, index) => {
                  wrapper.addEventListener('click', () => {
                      const isActive = wrapper.classList.contains('active');
                      
                      imageWrappers.forEach((wr) => wr.classList.remove('active'));
                      overlayTexts.forEach((text) => text.classList.remove('visible'));
          
                      if (!isActive) {
                          wrapper.classList.add('active');
                      }
                  });
          
                  wrapper.addEventListener('dblclick', () => {
                      if (wrapper.classList.contains('active')) {
                          wrapper.classList.remove('active');
                      }
                  });
              });
              $(document).ready(function () {
                function initializeSlider(sliderClass) {
                    let currentIndex = 0;
                    const images = $(`${sliderClass} .image-wrapper .image-overlay`);
                    const dots = $(`${sliderClass} .dots .dot`);
                    const totalImages = images.length;
                    let sliderInterval;
    
                    function showImage(index) {
                        const offset = -index * 100;
                        $(`${sliderClass} .image-wrapper`).css("transform", `translateX(${offset}%)`);
                        dots.removeClass("active");
                        $(dots[index]).addClass("active");
                    }
    
                    function startSlider() {
                        sliderInterval = setInterval(() => {
                            currentIndex = (currentIndex + 1) % totalImages;
                            showImage(currentIndex);
                        }, 2000);
                    }
    
                    function stopSlider() {
                        clearInterval(sliderInterval);
                    }
    
                    dots.click(function () {
                        currentIndex = $(this).data("index");
                        showImage(currentIndex);
                    });
    
                    $(sliderClass).hover(stopSlider, startSlider);
                    startSlider();
                }
    initializeSlider('.slider-1');
    initializeSlider('.slider-2');
    initializeSlider('.slider-3');
    initializeSlider('.slider-4');
    initializeSlider('.slider-5');
    initializeSlider('.slider-6');
    initializeSlider('.slider-7');
    initializeSlider('.slider-8');
    initializeSlider('.slider-9');
            });