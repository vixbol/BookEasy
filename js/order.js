const getBtnOrder = document.querySelector("#order-food");
getBtnOrder.addEventListener("click", async () => {
  const datas = await getData(API_ORDER);

  const getSelectTable = document.querySelector("#select-table");
  const foodTable = datas.find((data) => data.id == getSelectTable.value);
  const getAllFoodOrder = document.querySelectorAll("#food-order .col");
  const bill = foodTable ? foodTable.bill : [];
  getAllFoodOrder.forEach((e) => {
    const quantity = e.querySelector(".quantity").value;
    if (quantity > 0) {
      const idFood = e.querySelector(".idFood").value;
      const index = bill.findIndex((e) => e.idFood == idFood);
      if (index == -1) {
        bill.push({ idFood, quantity });
      } else {
        bill[index].quantity =
          parseInt(bill[index].quantity) + parseInt(quantity);
      }
    }
  });
  const order = {
    id: getSelectTable.value,
    bill,
  };
  if (foodTable) {
    updateData(API_ORDER, order);
  } else {
    add(API_ORDER, order);
  }
});

