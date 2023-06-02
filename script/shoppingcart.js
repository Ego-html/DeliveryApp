let burgerPrice = document.querySelector(".product-item-price");

let parse = JSON.parse(localStorage.getItem("burgers"));
parse.forEach((order) => {
  renderingOrderBurgers(order.price, order.discription, order.name, order.img);
});

function renderingOrderBurgers(price, discription, name, imgburger) {
  let order = document.querySelector(".order");
  let burgerOrder = document.createElement("div");
  burgerOrder.classList.add("burger-order");
  let burgerImg = document.createElement("div");
  burgerOrder.appendChild(burgerImg).classList.add("burgers-img");
  let img = document.createElement("img");
  burgerImg.appendChild(img);
  img.setAttribute("src", imgburger);
  let productTextPriceCount = document.createElement("div");
  productTextPriceCount.classList.add("product-text-price-сount");
  burgerOrder.appendChild(productTextPriceCount);
  let burgerName = document.createElement("div");
  productTextPriceCount.appendChild(burgerName);
  burgerName.classList.add("burger-name");
  let textBurgerName = document.createTextNode(name);
  burgerName.appendChild(textBurgerName);
  let productItemText = document.createElement("div");
  productTextPriceCount.appendChild(productItemText);
  productItemText.classList.add("product-item-text");
  let textDisription = document.createTextNode(discription);
  productItemText.appendChild(textDisription);
  let productItemPrice = document.createElement("div");
  productTextPriceCount.appendChild(productItemPrice);
  productItemPrice.classList.add("product-item-price");
  let textPrice = document.createTextNode(price);
  productItemPrice.appendChild(textPrice);
  let counter = document.createElement("div");
  productTextPriceCount.appendChild(counter);
  counter.classList.add("counter");
  let inputArrows = document.createElement("div");
  counter.appendChild(inputArrows);
  inputArrows.classList.add("input-arrows");
  let inputCount = document.createElement("input");
  inputArrows.appendChild(inputCount);
  inputCount.classList.add("input-count");
  let arrows = document.createElement("arrows");
  inputArrows.appendChild(arrows);
  arrows.classList.add("arrows");
  let arrowApp = document.createElement("span");
  arrows.appendChild(arrowApp);
  arrowApp.innerHTML = "&#x25B2";
  let arrowDown = document.createElement("span");
  arrows.appendChild(arrowDown);
  arrowDown.innerHTML = "&#x25BC";

  order.appendChild(burgerOrder);
}
