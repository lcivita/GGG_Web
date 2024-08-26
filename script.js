// Parallax header
var body = document.body;
var layers = document.getElementsByClassName("parallaxLayer");
var ninoLayers = document.getElementsByClassName("ninoParallaxLayer");
var container = document.getElementById("container");

var nino = document.getElementById("ninoParallaxWrapper");

function topParallax() {
    var top = window.pageYOffset;
    
    var layer, speed, yPos;

    for (var i = 0; i < layers.length; i++)
    {
      layer = layers[i];
      speed = layer.dataset.speed;
      var yPos = -(top * speed / 1000);
      layer.style.transform = 'translate3d(0,' + yPos + 'rem, 0)';
    }
  }
  
var ninoPos, ninoRect, ninoEnd;

function botParallax() {
  
    ninoRect = nino.getBoundingClientRect().height;
    ninoEnd = nino.getBoundingClientRect().bottom - window.innerHeight;
    ninoPos = nino.getBoundingClientRect().top - window.innerHeight;
    
    var ninoLayer, ninoSpeed, ninoYPos;

    for (var i = 0; i < ninoLayers.length; i++) {
      ninoLayer = ninoLayers[i];
      ninoSpeed = ninoLayer.dataset.speed;
      if (ninoPos < 0)
      {
        var ninoYPos = (ninoPos / ninoRect) * ninoSpeed ;
        ninoLayer.style.transform = 'translate3d(0,' + -ninoYPos + 'vw, 0)';

      }
      else
      {
        ninoLayer.style.transform = 'translate3d(0, 0vw, 0)';
      }
    }
  }

function doParallax() {
  topParallax();
  botParallax();
}

window.addEventListener("scroll", doParallax);


// Screenshots

function toggleViewer(e) {
  ev = e;
  ev.preventDefault();
  if (body.classList.contains("viewer"))
  {
    body.classList.remove("viewer");
    body.dataset.viewer = "";
  }
  else
  {
    body.classList.add("viewer");
    body.dataset.viewer = ev.target.id;
  }
}

var screenshots = document.getElementsByClassName("screenshot");
var screenshot;

for (var i = 0; i < screenshots.length; i++) {  
  screenshot = screenshots[i];
  screenshot.addEventListener("click", toggleViewer);
}

document.getElementById("viewer").addEventListener("click",toggleViewer);

// Trailer video

var trailer, playerElement, videoId;

function loadVideo() {
  document.getElementById("trailer").classList.add('loading');
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  trailer.removeEventListener("click",loadVideo);
}

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '100%',
    width: '100%',
    videoId: videoId,
    playerVars: {
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      enablejsapi: 1,
      controls: 1,
      widgetid: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event){
  event.target.playVideo();
  document.getElementById("trailer").classList.remove('poster');
  document.getElementById("trailer").classList.remove('loading');
}

function onPlayerStateChange(event){
  document.getElementById("trailer").classList.add('playing');

}
  
function initVideo() {
  trailer = document.getElementById("trailer");
  playerElement = document.querySelector('#ytplayer');
  videoId = playerElement.dataset.id;
  trailer.addEventListener("click",loadVideo);
}

document.addEventListener('DOMContentLoaded', initVideo);