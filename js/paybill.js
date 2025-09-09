// khi em bấm nút Card cho hàm truyền id vào => biến toàn cục => trong hàm gán biến toàn cục bằng id ;
// hàm tiếp  kiếm select paybill  , biến đó .value = biến toàn cục;
// viết i như hàm handleCart

const getPayBill = document.querySelector("#btn-pay-bill");
getPayBill.addEventListener("click", () => {
  const getBtnPayBill = document.querySelector("#select-table-bill");
  const getResult = document.querySelector("#result");
  console.log(getResult);

  const newBilled = {
    idTable: getBtnPayBill.value,
    price: getResult.innerText,
  };

  add(API_BILLED, newBilled);

  const newTable = {
    id: getBtnPayBill.value,
    customerName: "",
    quantity: "",
    status: false,
  };
  updateData(API_TABLE, newTable);

  deleteData(API_ORDER, getBtnPayBill.value);
});
