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

const getPages = document.querySelectorAll("li");
const getBoxs = document.querySelectorAll(".box");
const getItem = document.querySelectorAll("li .item");

getPages.forEach((page, index) => {
  page.addEventListener("click", () => {
    getBoxs.forEach((e) => (e.style.display = "none"));
    getBoxs[index].style.display = "block";

    getItem.forEach((item) => item.classList.remove("active"));
    getItem[index].classList.add("active");

    localStorage.setItem("index", index);
  });
});

const indexBox = localStorage.getItem("index");
console.log(indexBox);

if (indexBox) {
  getBoxs[indexBox].style.display = "block";
}
