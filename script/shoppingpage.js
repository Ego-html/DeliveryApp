let button = document.getElementsByClassName("button");
let price = document.getElementsByClassName("product-price");

function addToCart(event) {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  let text = target.previousSibling;
  let currentPrice = text.previousSibling;
  localStorage.setItem(
    "burger1",
    JSON.stringify({ burger1: currentPrice.innerHTML })
  );
  let obj = JSON.parse(localStorage.burger1);
  console.log(obj.burger1);
}
document.addEventListener("click", addToCart);
