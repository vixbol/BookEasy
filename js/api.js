const API_TABLE = "http://localhost:3000/tables";
const API_FOOD = "http://localhost:3000/foods";
const API_ORDER = "http://localhost:3000/orders";
const API_BILLED = "http://localhost:3000/billed";
const API_ACCOUNT = "http://localhost:3000/accounts";
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// postData

async function updateData(url, newData) {
  try {
    const res = await fetch(`${url}/${newData.id}`, {
      method: "PATCH", // PATCH = chỉ update 1 phần, PUT = ghi đè toàn bộ object
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json(); // dữ liệu sau khi đã update
  } catch (error) {
    console.error("Lỗi update:", error);
  }
}

function add(url, object) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      // After successful creation, refresh the post list
      fetchPosts();
    })
    .catch((error) => console.error("Error creating post:", error));
}

async function deleteData(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    console.log(`Deleted item with id: ${id}`);
    fetchPosts(); // hoặc gọi lại getAllFood() để cập nhật UI
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
