gsap.registerPlugin(ScrollTrigger);

// Get viewport dimensions
const vw = window.innerWidth;
const vh = window.innerHeight;

// Create a timeline for the entire animation
const mainTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".main-container",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true,
    markers: true,
  },
});

// Define start positions (percentage of viewport)
const startPositions = [
  { x: -vw / 2, y: -vh / 2 }, // Top Left
  { x: -vw / 1, y: -vh / 2 },
  { x: -vw / 2, y: vh / 2 }, // bottom left
  { x: vw / 2, y: -vh / 2 }, // Top Right
  { x: vw / 2, y: vh / 2 }, // Bottom Right
];

// Set initial positions
gsap.set(".card", {
  opacity: 0,
  scale: 0.8,
});

// Initial positions for cards
document.querySelectorAll(".card").forEach((card, i) => {
  gsap.set(card, {
    left: "50%",
    top: "50%",
    x: startPositions[i].x,
    y: startPositions[i].y,
  });
});

// Build the animation timeline
mainTl
  // Heading animation
  .from(".heading", {
    scale: 4,
    duration: 4,
  })

  // Bring in cards from corners
  .to(
    ".card",
    {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1.2,
      stagger: {
        amount: 0.3,
      },
      duration: 2.5,
      ease: "power2.inOut",
    },
    1,
  )

  // Fade heading as cards approach
  .to(
    ".heading",
    {
      opacity: 0,
      scale: 1,
      duration: 1,
    },
    2,
  )

  // Final overlap at exact center
  .to(
    ".card",
    {
      x: (i) => i * 20,
      y: 0,
      rotation: (i) => i * 2,
      scale: 1.25,
      stagger: {
        amount: 0.2,
      },
      duration: 1,
      ease: "power2.inOut",
    },
    3,
  )

  // Final text fade
  .to(
    ".heading",
    {
      opacity: 0,
      duration: 0.5,
    },
    3.5,
  );

// Update positions on window resize
window.addEventListener("resize", () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  startPositions[0] = { x: -vw / 2, y: -vh / 2 };
  startPositions[1] = { x: vw / 2, y: -vh / 2 };
  startPositions[2] = { x: vw / 2, y: vh / 2 };

  // Reset timeline
  mainTl.invalidate().restart();
});
