export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
// export function addToCart(item) {
//   return new Promise(async (resolve) => {
//     const response = await axios.post(
//       "http://localhost:4000/cart",
//       JSON.stringify(item),
//       {
//         headers: { "content-type": "application/json" },
//         withCredentials: true,
//       }
//     );
//     const data = await response;
//     resolve({ data });
//   });
// }
export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart/" + update.id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart/" + itemId, {
      method: "DELETE",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
