// Variables and element references
var layers = document.getElementsByClassName("parallaxLayer");
var ninoLayers = document.getElementsByClassName("ninoParallaxLayer");
var nino = document.getElementById("ninoParallaxWrapper");

// Get the maximum scroll position to prevent over-scrolling
function getMaxScrollPosition() {
  var lastLayer = layers[layers.length - 1];
  var lastLayerBottom = lastLayer.getBoundingClientRect().bottom + window.pageYOffset;
  return lastLayerBottom - window.innerHeight;
}

// Parallax function
function doParallax(scrollPos) {
  topParallax(scrollPos);
  botParallax();
}

// Top parallax function
function topParallax(top) {
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var speed = layer.dataset.speed;
    var yPos = -(top * speed / 100);
    layer.style.transform = 'translate3d(0,' + yPos + 'px, 0)';
  }
}

// Bottom parallax function
function botParallax() {
  if (!nino) return;

  var ninoRect = nino.getBoundingClientRect().height;
  var ninoPos = nino.getBoundingClientRect().top - window.innerHeight;
  for (var i = 0; i < ninoLayers.length; i++) {
    var ninoLayer = ninoLayers[i];
    var ninoSpeed = ninoLayer.dataset.speed;
    var ninoYPos = ninoPos < 0 ? (ninoPos / ninoRect) * ninoSpeed : 0;
    ninoLayer.style.transform = 'translate3d(0,' + -ninoYPos + 'px, 0)';
  }
}

// On scroll, apply parallax and boundary
function onScroll() {
  var scrollPos = window.scrollY;
  var maxScroll = getMaxScrollPosition();

  // Ensure scroll position does not exceed boundaries
  if (scrollPos > maxScroll) {
    window.scrollTo(0, maxScroll); // Stop scrolling beyond max scroll
    scrollPos = maxScroll;
  } else if (scrollPos < 0) {
    window.scrollTo(0, 0); // Prevent scrolling above the top
    scrollPos = 0;
  }

  // Apply parallax based on bounded scroll position
  doParallax(scrollPos);
}

// Use natural scrolling with bounds
window.addEventListener("scroll", onScroll);

// Slideshow functionality
function startSlideshow(slideshowId, interval = 6000) {
  const slideshow = document.getElementById(slideshowId);
  if (!slideshow) return;

  const slides = slideshow.getElementsByClassName('slide');
  let currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  slides[0].classList.add('active');
  setInterval(showNextSlide, interval);
}

// Start the slideshow(s) on DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
  startSlideshow('slideshow1');
  startSlideshow('slideshow2');
});
