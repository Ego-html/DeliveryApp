let button = document.getElementsByClassName("button");
let price = document.getElementsByClassName("product-price");
let arrayOrders = [];

function addToCart(event) {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  let text = target.previousSibling;
  let currentPrice = text.previousSibling;
  let sum = currentPrice.innerHTML.match(/[0-9]+/g);
  let productItemAction = currentPrice.parentElement;
  let productItemActionText = productItemAction.previousSibling;
  let productItemText = productItemActionText.previousSibling;
  let productItemTitleText = productItemText.previousSibling;
  let productItemTitle = productItemTitleText.previousSibling;
  let productItemPictureText = productItemTitle.previousSibling;
  let productItemPicture = productItemPictureText.previousSibling;
  let img = productItemPicture.children[0].src;
  if (localStorage.length != 0) {
    let parse = JSON.parse(localStorage.burgers);
    parse.push({
      price: sum[0],
      discription: productItemText.innerHTML,
      name: productItemTitle.innerHTML,
      img: img,
    });
    let uniqueObj = parse
      .reduce(function (map, orders) {
        map.has(orders.name) ? null : map.set(orders.name, orders);
        return map;
      }, new Map())
      .values();
    let uniqueOrders = [...uniqueObj];
    localStorage.clear();
    localStorage.setItem("burgers", JSON.stringify(uniqueOrders));
  } else {
    localStorage.setItem(
      "burgers",
      JSON.stringify([
        {
          price: sum[0],
          discription: productItemText.innerHTML,
          name: productItemTitle.innerHTML,
          img: img,
        },
      ])
    );
  }
}

document.addEventListener("click", addToCart);

for (let i = 0; i < button.length; i++) {
  button[i].setAttribute("onclick", "document.location='./shoppingcart.html'");
}
