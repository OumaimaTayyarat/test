

const svg = document.querySelector("svg");
const buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach((btn) => {
  const btnId = btn.id;
  btn.addEventListener("click", () => nextStep(btnId));
});

const startButton = document.querySelector(".title button")

startButton.addEventListener("click", () => startTest())

const q1 = svg.getElementById("q1");
const q1Box = q1.getBBox();
const newViewBox = getViewBox(q1Box);

gsap.set(["[id^=path-q]", ".decoration", ".blob"], {
  autoAlpha: 0,
  drawSVG: false,
});

gsap.to(".icon", {
  y: "10%",
  repeat: -1,
  yoyo: true,
  ease: "linear",
  duration: 2,
});

function startTest() {
  gsap.timeline()
  .to('.title', {y: "100%", autoAlpha: 0})
  .to("svg", { attr: { viewBox: newViewBox }, duration: 1 })
}

function getViewBox(viewbox) {
  return `${Math.round(viewbox.x)} ${Math.round(viewbox.y)} ${Math.round(
    viewbox.width
  )} ${Math.round(viewbox.height)}`;
}

function nextStep(id) {
  const currentVB = svg.viewBox.baseVal;
  const newViewBox = `${Math.round(
    currentVB.x - currentVB.width / 2
  )} ${Math.round(currentVB.y - currentVB.height / 2)} ${Math.round(
    currentVB.width * 2
  )} ${Math.round(currentVB.height * 2)}`;

  const targetId = id.startsWith("to")
    ? id.slice(3).replaceAll("_", "")
    : id.split("_")[1];

  const targetBox = document.getElementById(targetId).getBBox();
  const targetViewBox = getViewBox(targetBox);

  if (id.startsWith("to")) {
    gsap
      .timeline()
      .to("svg", { attr: { viewBox: "0 0 529.2 264.6" }, duration: 1 })
      .fromTo(
        `#${targetId} .blob`,
        { autoAlpha: 1, scale: 0.1, transformOrigin: "50% 50%" },
        {
          autoAlpha: 1,
          scale: 1.5,
          duration: 1,
          transformOrigin: "50% 50%",
        }
      )
      .to("svg", { attr: { viewBox: targetViewBox }, duration: 1 })
      .to(`#${targetId} .blob`, {
        scale: 1,
      });
  } else {
    gsap
      .timeline()
      .to("svg", { attr: { viewBox: newViewBox }, duration: 1 })
      .fromTo(
        `#path-${id}`,
        { autoAlpha: 1, drawSVG: false },
        { autoAlpha: 1, drawSVG: true, duration: 2 }
      )
      .to("svg", { attr: { viewBox: targetViewBox }, duration: 2 }, "-=1.5")
      .fromTo(
        ".decoration",
        { autoAlpha: 1, drawSVG: false },
        { autoAlpha: 1, drawSVG: true, duration: 2 }
      );
  }
}