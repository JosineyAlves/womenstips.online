// Script para interatividade da página
document.addEventListener('DOMContentLoaded', () => {

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // ===== GENERIC CAROUSEL LOGIC =====
  function setupCarousel(carouselSelector) {
    const carouselElem = document.querySelector(carouselSelector);
    if (!carouselElem) return;

    const track = carouselElem.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carouselElem.querySelector('.next');
    const prevButton = carouselElem.querySelector('.prev');
    const dotsContainer = carouselElem.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let slideWidth = slides[0].getBoundingClientRect().width;
    let slidesPerView = Math.round(track.parentElement.getBoundingClientRect().width / slideWidth);
    
    // Create dots if a container exists
    if (dotsContainer) {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i <= slides.length - slidesPerView; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }
    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

    function updateCarousel() {
        // Recalculate on update
        slideWidth = slides[0].getBoundingClientRect().width;
        let gap = parseInt(getComputedStyle(track).gap) || 0;
        let totalWidth = slideWidth + gap;
        
        track.style.transform = `translateX(-${currentIndex * totalWidth}px)`;

        // Update dots
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if(dots[currentIndex]) dots[currentIndex].classList.add('active');
        }

        // Update buttons
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= slides.length - slidesPerView;
    }

    function recalculate() {
        slideWidth = slides[0].getBoundingClientRect().width;
        slidesPerView = Math.round(track.parentElement.getBoundingClientRect().width / slideWidth);
        if(currentIndex > slides.length - slidesPerView) {
            currentIndex = Math.max(0, slides.length - slidesPerView);
        }
        updateCarousel();
    }
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - slidesPerView) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', recalculate);
    recalculate(); // Initial setup
  }

  // Initialize both carousels
  setupCarousel('.gallery-section .carousel');
  setupCarousel('.testimonials-section .carousel');

  // ===== AUTOPLAY FOR GALLERY CAROUSEL =====
  const galleryCarouselElem = document.querySelector('.gallery-section .carousel');
  if (galleryCarouselElem) {
    const track = galleryCarouselElem.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = galleryCarouselElem.querySelector('.next');
    let currentIndex = 0;
    let slidesPerView = 1;
    function getSlidesPerView() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      return Math.round(track.parentElement.getBoundingClientRect().width / slideWidth);
    }
    function goToNextSlide() {
      slidesPerView = getSlidesPerView();
      currentIndex = (currentIndex < slides.length - slidesPerView) ? currentIndex + 1 : 0;
      const gap = parseInt(getComputedStyle(track).gap) || 0;
      const totalWidth = slides[0].getBoundingClientRect().width + gap;
      track.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
    }
    setInterval(goToNextSlide, 3000);
  }

  // ===== SALE NOTIFICATION POPUP =====
  const salePopup = document.querySelector('.sale-notification');
  if(salePopup){
      const names = [
  "Juliana F.", "Camila R.", "Patrícia A.", "Lorena D.", "Bruna M.",
  "Tatiane V.", "Vanessa S.", "Gabriela N.", "Renata K.", "Luana E.",
  "Mariane C.", "Letícia H.", "Nathalia Z.", "Rafaela T.", "Carla B."
];
const locations = [
  "Fortaleza, CE", "Manaus, AM", "Brasília, DF", "Porto Alegre, RS", "João Pessoa, PB",
  "Recife, PE", "Campinas, SP", "Florianópolis, SC", "São Luís, MA", "Vitória, ES",
  "Aracaju, SE", "Campo Grande, MS", "Teresina, PI", "Maceió, AL", "Belém, PA"
];
      const plans = ["Pacote Premium"];

      function showSaleNotification() {
          const randomName = names[Math.floor(Math.random() * names.length)];
          const randomLocation = locations[Math.floor(Math.random() * locations.length)];
          const randomPlan = plans[Math.floor(Math.random() * plans.length)];
          
          salePopup.innerHTML = `<p><i class="fas fa-check-circle"></i><strong>${randomName}</strong> de ${randomLocation} acabou de comprar o <strong>${randomPlan}</strong>!</p>`;
          
          salePopup.classList.add('show');
          setTimeout(() => {
              salePopup.classList.remove('show');
          }, 5000); // Hide after 5 seconds
      }
      
      setTimeout(() => {
          showSaleNotification();
          setInterval(showSaleNotification, Math.random() * 20000 + 10000);
      }, 5000);
  }

  // ===== SCROLL ANIMATIONS =====
  const animatedElements = document.querySelectorAll('.benefit-card, .pricing-card, .testimonial-card, .section-title');
  if(window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('fade-in-up-visible');
                  observer.unobserve(entry.target);
              }
          });
      }, {
          threshold: 0.1
      });
      
      animatedElements.forEach(el => {
          observer.observe(el);
      });
  }

  // ===== TESTIMONIALS CAROUSEL SCRIPT =====
(function(){
  const track = document.querySelector('.testimonials-carousel-track');
  const slides = Array.from(document.querySelectorAll('.testimonial-chat'));
  const prevBtn = document.getElementById('testimonialsPrevBtn');
  const nextBtn = document.getElementById('testimonialsNextBtn');
  let current = 0;
  let slidesToShow = 1;

  function updateSlidesToShow() {
    if(window.innerWidth >= 900) slidesToShow = 3;
    else if(window.innerWidth >= 700) slidesToShow = 2;
    else slidesToShow = 1;
  }
  function updateCarousel() {
    updateSlidesToShow();
    const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight);
    track.style.transform = `translateX(-${current * slideWidth}px)`;
  }
  function moveTestimonialsCarousel(dir) {
    updateSlidesToShow();
    if(dir === 1 && current < slides.length - slidesToShow) current++;
    else if(dir === -1 && current > 0) current--;
    updateCarousel();
  }
  window.moveTestimonialsCarousel = moveTestimonialsCarousel;
  // Swipe (touch)
  let startX = 0;
  if(track) {
    track.addEventListener('touchstart', e=>{startX = e.touches[0].clientX;});
    track.addEventListener('touchend', e=>{
      let dx = e.changedTouches[0].clientX - startX;
      if(dx < -30) moveTestimonialsCarousel(1);
      else if(dx > 30) moveTestimonialsCarousel(-1);
    });
  }
  window.addEventListener('resize', ()=>{
    updateSlidesToShow();
    if(current > slides.length-slidesToShow) current = slides.length-slidesToShow;
    updateCarousel();
  });
  // Botões
  if(prevBtn) prevBtn.onclick = ()=>moveTestimonialsCarousel(-1);
  if(nextBtn) nextBtn.onclick = ()=>moveTestimonialsCarousel(1);
  updateCarousel();
})();
}); 