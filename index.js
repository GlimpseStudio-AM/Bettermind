// Scroll LENIS

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


// Mouse Follower

const cursor = new MouseFollower({
  el: null,
  container: document.body,
  className: 'mf-cursor',
  innerClassName: 'mf-cursor-inner',
  textClassName: 'mf-cursor-text',
  mediaClassName: 'mf-cursor-media',
  mediaBoxClassName: 'mf-cursor-media-box',
  iconSvgClassName: 'mf-svgsprite',
  iconSvgNamePrefix: '-',
  iconSvgSrc: '',
  dataAttr: 'cursor',
  hiddenState: '-hidden',
  textState: '-text',
  iconState: '-icon',
  activeState: '-active',
  mediaState: '-media',
  stateDetection: {
      '-pointer': '.link',
      '-hidden': 'a, button, p, img, .arrow-r, .arrow-l'
  },
  visible: true,
  visibleOnState: false,
  speed: 0.55,
  ease: 'expo.out',
  overwrite: true,
  skewing: 1,
  skewingText: 0,
  skewingIcon: 2,
  skewingMedia: 0,
  skewingDelta: 0.005,
  skewingDeltaMax: 0.15,
  stickDelta: 0.15,
  showTimeout: 20,
  hideOnLeave: true,
  hideTimeout: 300,
  hideMediaTimeout: 300
});


const avt = document.querySelectorAll('.avatar');

avt.forEach(element => {
  
    element.addEventListener('mouseenter', () => {
      cursor.setImg('/Assets/rating.svg')
  });

  element.addEventListener('mouseleave', () => {
      cursor.removeImg()
  });

});

  

// GSAP ANIMATION

// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {

  gsap.registerPlugin(ScrollTrigger)
  // gsap code here!
  gsap.to(".step-heading", {
     y:525,
     scrollTrigger:{
      trigger: ".container-blue",
      start:"10% top",
      end:"80% top",
      scrub:1,
     }

  })

  gsap.to(".step-heading-2", {
    y:525,
    scrollTrigger:{
     trigger: ".blue-2",
     start:"10% top",
     end:"80% top",
     scrub:1,
    }

 })

 gsap.to(".step-heading-3", {
  y:525,
  scrollTrigger:{
   trigger: ".blue-3",
   start:"10% top",
   end:"80% top",
   scrub:1,
  }

})

 });


 
// BUTTON ANIMATION
