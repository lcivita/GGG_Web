var body = document.body;
var layers = document.getElementsByClassName("parallaxLayer");
var ninoLayers = document.getElementsByClassName("ninoParallaxLayer");
var nino = document.getElementById("ninoParallaxWrapper");

let scrollUnit = 20; // Define your scroll unit size in pixels
let accumulatedScroll = 0; // To accumulate scroll input
let currentScrollPosition = 0;
let isAnimating = false;

function snapScrollPosition(direction) {
  currentScrollPosition += direction * scrollUnit;
  
  currentScrollPosition = Math.max(0, Math.min(currentScrollPosition, getTotalContentHeight() - window.innerHeight));
  
  window.scrollTo(0, currentScrollPosition);
  
  doParallax();
  
  isAnimating = false;
}

function getTotalContentHeight() {
  var lastLayer = layers[layers.length - 1];
  var lastLayerBottom = lastLayer.getBoundingClientRect().bottom + window.pageYOffset;
  return lastLayerBottom;
}

function doParallax() {
  var top = currentScrollPosition;
  topParallax(top);
  botParallax();
}

function topParallax(top) {
  var layer, speed, yPos;
  for (var i = 0; i < layers.length; i++) {
    layer = layers[i];
    speed = layer.dataset.speed;
    yPos = -(top * speed / 100);
    layer.style.transform = 'translate3d(0,' + yPos + 'px, 0)';
  }
}

function botParallax() {
  // Check if the nino element exists before proceeding
  if (!nino) return;

  var ninoRect = nino.getBoundingClientRect().height;
  var ninoPos = nino.getBoundingClientRect().top - window.innerHeight;
  var ninoLayer, ninoSpeed, ninoYPos;

  for (var i = 0; i < ninoLayers.length; i++) {
    ninoLayer = ninoLayers[i];
    ninoSpeed = ninoLayer.dataset.speed;
    if (ninoPos < 0) {
      ninoYPos = (ninoPos / ninoRect) * ninoSpeed;
      ninoLayer.style.transform = 'translate3d(0,' + -ninoYPos + 'px, 0)';
    } else {
      ninoLayer.style.transform = 'translate3d(0, 0px, 0)';
    }
  }
}

function onScroll(event) {
  // Prevent default scrolling behavior
  event.preventDefault();

  let delta = event.deltaY || -event.detail || event.wheelDelta;

  // Accumulate scroll delta but smooth the input
  accumulatedScroll += delta / 2;

  // Check if accumulated scroll exceeds a full scroll unit
  if (Math.abs(accumulatedScroll) >= scrollUnit && !isAnimating) {
    let direction = accumulatedScroll > 0 ? 1 : -1; // Determine the scroll direction
    accumulatedScroll = 0;
    snapScrollPosition(direction); // Snap to the next scroll unit
  }
}

window.addEventListener("wheel", onScroll, { passive: false });
window.addEventListener("touchstart", onTouchStart, { passive: false });
window.addEventListener("touchmove", onTouchMove, { passive: false });

let startY = 0;
let lastDeltaY = 0;

function onTouchStart(event) {
  startY = event.touches[0].clientY;
}

function onTouchMove(event) {
  event.preventDefault();

  let deltaY = startY - event.touches[0].clientY;
  
  deltaY = lastDeltaY + (deltaY - lastDeltaY) * 0.2;
  lastDeltaY = deltaY;
  
  accumulatedScroll += deltaY;
  
  if (Math.abs(accumulatedScroll) >= scrollUnit && !isAnimating) {
    let direction = accumulatedScroll > 0 ? 1 : -1;
    accumulatedScroll = 0;
    snapScrollPosition(direction);
  }

  startY = event.touches[0].clientY;
}

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

document.addEventListener('DOMContentLoaded', function () {
  startSlideshow('slideshow1');
  startSlideshow('slideshow2');
});
