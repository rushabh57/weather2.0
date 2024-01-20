const loadingTimeline = gsap.timeline({
  paused: true,
  defaults: {
    yoyo: true,
    duration: 0.78,
    ease: "elastic",
  },
});
const curICON = document.querySelector("#curICON");
const curBtn = document.querySelector(".curBtn");

curBtn.addEventListener("click", () => {
  // Create a new GSAP timeline for each click
  const curTimeline = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "elastic",
    },
  });

  // Clear the transform properties before each animation
  gsap.set(curICON, { clearProps: "all" });

  curTimeline
    .to(curICON, {
      rotate: 90,
      transformOrigin: "center",
    })
    .to(
      curICON,
      {
        scale: 1,
      },
      "<"
    )
    .to(
      curICON,
      {
        scale: 0.7,
      },
      "<"
    )
    .to(
      curICON,
      {
        scale: 1,
      },
      "<"
    );
});
const stik = document.getElementById("stik");
const circle = document.getElementById("circle");
const usersrch = document.querySelector(".usersrch");

usersrch.addEventListener("focus", () => {
  loadingTimeline.play();

  loadingTimeline
    .to(stik, {
      autoAlpha: 0,
    })
    .to(
      circle,
      {
        repeat: -1, // Repeat indefinitely
        transformOrigin: "center",
        scale: 1.25,
      },
      "<"
    )

    .to(
      circle,
      {
        scale: 1,
      },
      "<"
    );
});
usersrch.addEventListener("blur", () => {
  loadingTimeline.pause();

  loadingTimeline
    .to(stik, {
      autoAlpha: 1,
    })
    .to(
      circle,
      {
        repeat: -1, // Repeat indefinitely
        transformOrigin: "center",
        scale: 1,
      },
      "<"
    )

    .to(
      circle,
      {
        scale: 1,
      },
      "<"
    );
});
