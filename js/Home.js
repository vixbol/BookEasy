if (window.matchMedia("(min-width: 741px)").matches) {
  const getIcon = document.querySelector(".icon");
  const getItem = document.querySelectorAll(".item");

  getIcon.addEventListener("click", () => {
    getItem.forEach((e) => e.classList.toggle("d-none"));
  });
}
if (window.matchMedia("(max-width: 740px)").matches) {
  const getIcon = document.querySelector(".icon");
  const getUl = document.querySelector("ul");

  getIcon.addEventListener("click", () => {
    getUl.classList.toggle("d-none");
  });
}

const getIconBars = document.querySelectorAll(".icon i");

getIconBars.forEach((icon) => {
  icon.addEventListener("click", () => {
    getIconBars.forEach((e) => {
      e.classList.toggle("d-none");
    });
  });
});

document.querySelector("#toggle-header").addEventListener("click", () => {
  document.querySelector("header").classList.toggle("closed");
});
