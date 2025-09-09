const foodHTML = document.querySelector("#food-order");
let dataFood;
async function getAllFood(search) {
  const datas = await getData(API_FOOD);
  dataFood = datas;
  foodHTML.innerHTML = "";
  const dataFilter = datas.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );
  dataFilter.forEach((data, value) => {
    const item = document.createElement("div");
    item.classList.add("col");
    item.innerHTML = `
      <div class="card">
       <input type="text" class="d-none idFood" value="${data.id}">
        <div class="food-order-top">
          <h4>${value + 1}</h4>
          <b>${data.name}</b>
          <div>
           <i data-bs-toggle="modal" data-bs-target="#modalFood" onclick="editFood(${
             data.id
           })" class="fa-solid fa-notes-medical"></i>
          <i id="delete-food" class="fa-regular fa-circle-xmark "></i>
          </div>
        </div>
        <div>
          <img
            src="${data.img}"
            class="card-img-top w-50 img-table"
            alt="..."
          />
        </div>
        <b class="text-center">$${data.price}</b>
        <div
          class="card-body text-center d-flex align-items-center justify-content-center gap-2"
        >
          <button type="button" class="btn btn-secondary minus">-</button>
          <input
            style="width: 30px"
            class="p-1 text-center quantity"
            value="0"
            type="text"
          />
          <button type="button" class="btn btn-secondary plus">+</button>
        </div>
      </div>`;
    foodHTML.appendChild(item);
    const getBtnMinus = item.querySelector(".minus");
    const getBtnPlus = item.querySelector(".plus");
    const getInputQuantity = item.querySelector(".quantity");
    getBtnPlus.addEventListener("click", () => {
      getInputQuantity.value = parseInt(getInputQuantity.value) + 1;
    });
    getBtnMinus.addEventListener("click", () => {
      if (getInputQuantity.value > 0) {
        getInputQuantity.value = parseInt(getInputQuantity.value) - 1;
      }
    });
    const getBtnDeleteFood = item.querySelector("#delete-food");
    getBtnDeleteFood.addEventListener("click", () => {
      if (confirm(`Bạn có chắc muốn xóa món "${data.name}"?`)) {
        deleteData(API_FOOD, data.id);
        item.remove();
      }
    });
  });
}
getAllFood("");

const getSearchFood = document.querySelector("#search-food");
getSearchFood.addEventListener("input", (e) => {
  getAllFood(e.target.value);
});

let file_food;
const getInputFile = document.querySelector("#inputGroupFile01");
getInputFile.addEventListener("change", fileBook);
function fileBook(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    document.getElementById("img_food").src = e.target.result;
  };
  file_food = file;
}

function generateRandomId(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
  }).join("");
}
let idEdit;
const getBtnAddNewFood = document.querySelector("#add-new-food");
getBtnAddNewFood.addEventListener("click", async () => {
  const getInputName = document.querySelector("#input-name");
  const getInputPrice = document.querySelector("#input-price");
  const img = await uploadImageToCloudinary(file_food);
  const newDataFood = {
    id: idEdit ? idEdit : generateRandomId(10),
    name: getInputName.value,
    img: img,
    price: getInputPrice.value,
  };
  if (idEdit) {
    updateData(API_FOOD, newDataFood);
  } else {
    add(API_FOOD, newDataFood);
  }
});

const getBtnAddFood = document.querySelector("#add-food");
getBtnAddFood.addEventListener("click", () => {
  const getInputName = document.querySelector("#input-name");
  const getInputPrice = document.querySelector("#input-price");
  const getImgFood = document.querySelector("#img_food");
  getInputName.value = "";
  getInputPrice.value = "";
  getImgFood.src = "";
});

function editFood(id) {
  idEdit = id;
  const food = dataFood.find((data) => data.id == id);
  const getInputName = document.querySelector("#input-name");
  const getInputPrice = document.querySelector("#input-price");
  const getImgFood = document.querySelector("#img_food");
  getInputName.value = food.name;
  getInputPrice.value = food.price;
  getImgFood.src = food.img;
}
