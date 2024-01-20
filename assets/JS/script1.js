const themeBtn = document.getElementById("themePicker");
const themeContainer = document.getElementById("themeContainer");
let isThemeBtnClicked = false;
themeBtn.addEventListener("click", () => {
  if (!isThemeBtnClicked) {
    isThemeBtnClicked = true;
    themeContainer.style.right = "0%";
  } else {
    isThemeBtnClicked = false;
    themeContainer.style.right = "-50%";
  }
});

const currentLocation = document.querySelector(".currentLocation");
currentLocation.addEventListener("click", () => {
  if (!isThemeBtnClicked) {
    isThemeBtnClicked = true;
    setTimeout(() => {
      document.querySelector(".currentLocation p").innerHTML =
        "current Location";
    }, 2000);
    document.querySelector(".currentLocation p").innerHTML = "got it 👍";
  } else {
    isThemeBtnClicked = false;
    document.querySelector(".currentLocation p").innerHTML = "current Location";
  }
});

/// darkmode ==========================
const iconToggle = document.querySelector(".icon-toggle");
const toggleSwitch = document.getElementById("darmode"); // Use getElementById to get the checkbox
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    // Update the icon source based on the initial theme
    iconToggle.setAttribute("src", "./assets/media/mode-dark.svg");
  }
}

function switchTheme() {
  // Use toggleSwitch.checked to check the current state of the checkbox
  if (toggleSwitch.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    iconToggle.setAttribute("src", "./assets/media/mode-dark.svg");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    iconToggle.setAttribute("src", "./assets/media/mode-light.svg");
  }
}

let primaryClr1 = "#9575DE";
let primaryClr2 = "#EC8F5E";
let primaryClr3 = "#DC84F3";
let primaryClr4 = "#E6A4B4";
let primaryClr5 = "#50623A";

// Retrieve values from localStorage if they exist
primaryClr1 = localStorage.getItem("primaryClr1") || "#9575DE";
primaryClr2 = localStorage.getItem("primaryClr2") || "#EC8F5E";
primaryClr3 = localStorage.getItem("primaryClr3") || "#DC84F3";
primaryClr4 = localStorage.getItem("primaryClr4") || "#E6A4B4";
primaryClr5 = localStorage.getItem("primaryClr5") || "#50623A";

// Retrieve the selected color or use a default color
let selectedColor = localStorage.getItem("selectedColor") || primaryClr1;

const primryClrPicker = document.querySelector(".primryClrPicker");
let root = document.documentElement;
const PSsize = document.querySelectorAll(".PSsize");

// Function to set default color
function setDefaultColor() {
  root.style.setProperty("--primeColor", selectedColor);
  root.style.setProperty("--primeColor2", "#dfd1ff"); // You can customize this as needed
}

primryClrPicker.addEventListener("click", (e) => {
  const targeted = e.target;
  if (Array.from(PSsize).includes(targeted)) {
    PSsize.forEach((button) => {
      button.classList.remove("active-theme");
    });

    if (targeted === document.querySelector(".primary-default")) {
      root.style.setProperty("--primeColor", primaryClr1);
      root.style.setProperty("--primeColor2", "#dfd1ff");
      document.querySelector(".primary-default").classList.add("active-theme");
      selectedColor = primaryClr1;
    }
    if (targeted === document.querySelector(".primary-clr2")) {
      root.style.setProperty("--primeColor", primaryClr2);
      root.style.setProperty("--primeColor2", "#ffe0cf");
      document.querySelector(".primary-clr2").classList.add("active-theme");
      selectedColor = primaryClr2;
    }
    if (targeted === document.querySelector(".primary-clr3")) {
      root.style.setProperty("--primeColor", primaryClr3);
      root.style.setProperty("--primeColor2", "#f5cfff");
      document.querySelector(".primary-clr3").classList.add("active-theme");
      selectedColor = primaryClr3;
    }
    if (targeted === document.querySelector(".primary-clr4")) {
      root.style.setProperty("--primeColor", primaryClr4);
      root.style.setProperty("--primeColor2", "#ffd6e0");
      document.querySelector(".primary-clr4").classList.add("active-theme");
      selectedColor = primaryClr4;
    }
    if (targeted === document.querySelector(".primary-clr5")) {
      root.style.setProperty("--primeColor", primaryClr5);
      root.style.setProperty("--primeColor2", "#eeffd9");
      document.querySelector(".primary-clr5").classList.add("active-theme");
      selectedColor = primaryClr5;
    }

    // Save selected color to localStorage
    localStorage.setItem("selectedColor", selectedColor);
  }
});

// Set the default color on each page load
setDefaultColor();

// Attach the event listener to the checkbox
toggleSwitch.addEventListener("change", switchTheme);
