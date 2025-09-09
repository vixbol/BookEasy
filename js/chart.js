
async function showChart () {
const ctx = document.createElement("canvas");
    document.querySelector(".bar-chart").appendChild(ctx);
    const tables = await getData(API_TABLE);
    new Chart(ctx, {
        type: "bar",
        data: {
          labels: tables.map(e => `Table ${e.id}`),
          datasets: [
            {
              label: "REVENUE TOTAL",
              data: tables.map(e => e.quantity),
              backgroundColor: "#c5487a",
              borderColor: "#c5487a",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
}
showChart ()

// logout
// chart của Bills
// dang nhap thanh cong luu ten nguoi dang login lên tren dropdown
