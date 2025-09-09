const tableHTML = document.querySelector("#table-order");
const getSelectTable = document.querySelector("#select-table");
const getSelectTableBill = document.querySelector("#select-table-bill");

async function getAllTables() {
  const datas = await getData(API_TABLE);

  datas.forEach((data) => {
    if (data.status) {
      getSelectTable.innerHTML += `
        <option value="${data.id}">Table ${data.id}</option>
      `;
      getSelectTableBill.innerHTML += `
        <option value="${data.id}">Table ${data.id}</option>
      `;
    }

    const img = data.status ? "../img/dinner-table.png" : "../img/dinner.png";
    const btn = data.status
      ? `
      <button id="btn-add" onclick="handleAdd(${data.id})" class="btn btn-success">
        <i class="fa-solid fa-plus"></i>
        ADD
      </button>
      <button id="btn-cart" onclick="handleCart(${data.id})" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalListOfOrderDishes">
        <i class="fa-solid fa-cart-shopping" ></i>
        CART
      </button>`
      : `
      <button id="btn-booking" onclick="handleBooking(${data.id})" class="btn btn-warning text-white" data-bs-toggle="modal" data-bs-target="#modalBooking">
        <i class="fa-solid fa-store"></i>
        BOOKING
      </button>`;
    tableHTML.innerHTML += `
      <div class="col">
        <div class="card">
          <h4>${data.id}</h4>
          <div>
            <img
              src=${img}
              class="card-img-top w-50 img-table"
              alt="..."
            />
          </div>
          <div class="card-body text-center">
            ${btn}
          </div>
        </div>
      </div>`;
  });
}

getAllTables();

let currentTableId = null;
let currentCartId = null;

function handleBooking(id) {
  currentTableId = id;
}

const getBtnSend = document.querySelector("#btn-send");
getBtnSend.addEventListener("click", async () => {
  const getInputCustomerName = document.querySelector("#input-customer-name");
  const getInputQuantity = document.querySelector("#input-quantity");

  const newDataTable = {
    id: currentTableId,
    customerName: getInputCustomerName.value,
    quantity: getInputQuantity.value,
    status: true,
  };

  await updateData(API_TABLE, newDataTable);
});

const getBtnAdd = document.querySelectorAll("#btn-add");

function handleAdd(id) {
  getBoxs[1].style.display = "none";
  getBoxs[2].style.display = "block";
  getItem[1].classList.remove("active");
  getItem[2].classList.add("active");
  const getSelectTable = document.querySelector("#select-table");
  getSelectTable.value = id;
}

const getBtnPayBill = document.querySelector("#pay-bill");
getBtnPayBill.addEventListener("click", () => {
  getBoxs[1].style.display = "none";
  getBoxs[3].style.display = "block";

  const getSelectTableBill = document.querySelector("#select-table-bill");
  getSelectTableBill.value = currentCartId;
  OnchangeSelectTableBill();
});

async function OnchangeSelectTableBill() {
  const datas = await getData(API_ORDER);
  const renderTbody = document.querySelector(".show-food-bill");
  const foodCart = datas.find((data) => data.id == getSelectTableBill.value);
  let result = 0;
  renderTbody.innerHTML = "";
  foodCart.bill.forEach((e, index) => {
    const food = dataFood.find((f) => f.id == e.idFood);
    result += food.price * e.quantity;
    renderTbody.innerHTML += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>
        <img
          src="${food.img}"
          style="width: 50px"
          alt=""
        />
      </td>
      <td>${food.name}</td>
      <td>${e.quantity}</td>
      <td>${food.price}</td>
    </tr>
  `;
  });
  renderTbody.innerHTML += `
  <tr>
    <th scope="col" colspan="4" >Total</th>
    <th scope="col" id="result" >${result}</th>
  </tr>`;
}

async function handleCart(id) {
  currentCartId = id;
  const datas = await getData(API_ORDER);
  const renderTbody = document.querySelector(".show-food-cart");
  const foodCart = datas.find((data) => data.id == id);

  let result = 0;
  renderTbody.innerHTML = "";
  foodCart.bill.forEach((e, index) => {
    const food = dataFood.find((f) => f.id == e.idFood);
    result += food.price * e.quantity;

    renderTbody.innerHTML += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>
        <img
          src="${food.img}"
          style="width: 50px"
          alt=""
        />
      </td>
      <td>${food.name}</td>
      <td>${e.quantity}</td>
      <td>${food.price}</td>
    </tr>
  `;
  });
  renderTbody.innerHTML += `
  <tr>
    <th scope="col" colspan="4" >Total</th>
    <th scope="col" >${result}</th>
  </tr>`;
}
