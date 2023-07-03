let burgerPrice = document.querySelector(".product-item-price");

let parse = JSON.parse(localStorage.getItem("burgers"));
parse.forEach((order) => {
  renderingOrderBurgers(order.price, order.discription, order.name, order.img);
});

function renderingOrderBurgers(price, discription, name, imgburger) {
  let order = document.querySelector(".order");
  let burgerOrder = document.createElement("div");
  burgerOrder.classList.add("burger-order");
  let buttonRemove = document.createElement("input");
  burgerOrder.appendChild(buttonRemove);
  buttonRemove.classList.add("button-remove");
  buttonRemove.setAttribute("type", "button");
  buttonRemove.value = "X";
  buttonRemove.setAttribute("title", "Remove item from basket");
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
  let textPrice = document.createElement("span");
  productItemPrice.appendChild(textPrice);
  textPrice.textContent = price + " " + "грн";
  let counter = document.createElement("div");
  productTextPriceCount.appendChild(counter);
  counter.classList.add("counter");
  let inputArrows = document.createElement("div");
  counter.appendChild(inputArrows);
  inputArrows.classList.add("input-arrows");
  let inputCount = document.createElement("input");
  inputArrows.appendChild(inputCount);
  inputCount.classList.add("input-count");
  inputCount.value = 1;
  let arrows = document.createElement("arrows");
  inputArrows.appendChild(arrows);
  arrows.classList.add("arrows");
  let arrowUp = document.createElement("span");
  arrows.appendChild(arrowUp);
  arrowUp.innerHTML = "&#x25B2";
  arrowUp.classList.add("arrow-up");
  let arrowDown = document.createElement("span");
  arrows.appendChild(arrowDown);
  arrowDown.innerHTML = "&#x25BC";
  arrowDown.classList.add("arrow-down");

  order.appendChild(burgerOrder);
}

let orderBurgers = document.querySelector(".order");
let orderMoreBurgers = document.createElement("button");
orderMoreBurgers.classList.add("order-more-burgers");
orderMoreBurgers.setAttribute(
  "onclick",
  "document.location='./shoppingpage.html'"
);
orderBurgers.appendChild(orderMoreBurgers);
orderMoreBurgers.innerHTML = "Order another burgers";

let totalPrice = document.querySelector(".total-sum-price");

let countSum = 0;

function getTotalSum(price) {
  countSum += Number(price);
  totalPrice.innerHTML = countSum + " " + "грн";
}

parse.forEach((price) => getTotalSum(price.price));

let arrowUp = document.getElementsByClassName("arrow-up");
let arrowDown = document.getElementsByClassName("arrow-down");
let inputArrows = document.querySelectorAll(".input-arrows");
let inputs = document.querySelectorAll(".input-count");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function () {
    this.value = this.value.replace(/^[^1-9]+$/g, "");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute("title", "You can order up to 10 burgers at time");
      inputs[i].setAttribute("maxlength", "1");
    }
  });
}

let currentValue = 1;

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("click", function (event) {
    if (event.target.value === "") return;
    currentValue = event.target.value;
  });
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (event) {
    let target = event.target;
    if (target.value === "") return;
    let inputArrows = target.parentElement;
    let counter = inputArrows.parentElement;
    let productItemPrice = counter.previousSibling;
    let span = productItemPrice.firstChild;
    let price = span.innerHTML.match(/[0-9]+/g);
    let sum = null;
    if (currentValue < this.value) {
      sum = (Number(this.value) - currentValue) * price[0];
      totalPrice.innerHTML =
        +totalPrice.innerHTML.match(/[0-9]+/g)[0] + sum + " " + "грн";
      currentValue = target.value;
    } else {
      let newValue = currentValue - this.value;
      let newSum = newValue * price[0];
      totalPrice.innerHTML =
        +totalPrice.innerHTML.match(/[0-9]+/g)[0] - newSum + " " + "грн";
      currentValue = target.value;
    }
  });
}

for (let i = 0; i < inputArrows.length; i++) {
  inputArrows[i].addEventListener("click", function (event) {
    if (event.target.classList.contains("arrow-up")) {
      let target = event.target;
      let arrows = target.parentElement;
      let inputArrows = arrows.parentElement;
      let counter = inputArrows.parentElement;
      let productTextPriceCount = counter.parentElement;
      let childProductTextPriceCount = productTextPriceCount.childNodes;
      let productItemPrice = childProductTextPriceCount[2];
      let priceInCurrency = productItemPrice.firstChild.innerHTML;
      let priceSeveralSimilarBurgers = priceInCurrency.match(/[0-9]+/g);
      let inputCount = inputArrows.firstChild;
      inputCount.value = Number(inputCount.value) + 1;
      if (inputCount.value > 1) {
        let currency = totalPrice.innerHTML.match(/[0-9]+/g);
        totalPrice.innerHTML =
          Number(currency[0]) +
          Number(priceSeveralSimilarBurgers[0]) +
          " " +
          "грн";
      }
    }
  });
}

for (let i = 0; i < inputArrows.length; i++) {
  inputArrows[i].addEventListener("click", function (event) {
    if (event.target.classList.contains("arrow-down")) {
      let target = event.target;
      let arrows = target.parentElement;
      let inputArrows = arrows.parentElement;
      let inputValue = inputArrows.firstChild;
      let counter = inputArrows.parentElement;
      let productItemPrice = counter.previousSibling;
      let span = productItemPrice.firstChild;
      let currencyPrice = span.innerHTML;
      let price = currencyPrice.match(/[0-9]+/g);
      if (inputValue.value == 1) {
        return;
      } else {
        inputValue.value -= 1;
      }
      let totalCurrencyPrice = totalPrice.innerHTML;
      let totalSum = totalCurrencyPrice.match(/[0-9]+/g);
      totalPrice.innerHTML = totalSum[0];
      let deductionTotalSum = totalSum[0] - price[0];
      totalPrice.innerHTML = deductionTotalSum + " " + "грн";
    }
  });
}

let order = document.querySelectorAll(".order");
let buttonRemove = document.querySelectorAll(".button-remove");
//Continue
//===========================================================
// let inputName = document.getElementById("user-name");
// inputName = document.addEventListener("input", function (event) {
//   let inputValue = event.target.value;
//   let regex = /^[а-яА-Яa-zA-Z\s-]*$/;
//   if (!regex.test(inputValue)) {
//     event.target.value = inputValue.replace(/[^а-яА-Яa-zA-Z\s-]/g, "");
//   }
// });

// let email = document.getElementById("email-user");

// email.addEventListener("blur", function (event) {
//   let emailValue = event.target.value;
//   let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//   if (!regex.test(emailValue)) {
//     email.value = "";
//     email.placeholder = `An email address hasn't been entered properly`;
//   }
// });
let newParse;

for (let i = 0; i < order.length; i++) {
  order[i].addEventListener("click", function (event) {
    if (event.target.classList.contains("button-remove")) {
      let target = event.target;
      let parentElement = target.parentElement;
      parentElement.remove();
      let productTextPriceCount = parentElement.children[2];
      let productItemPrice = productTextPriceCount.children[2];
      let productTextPriceNameCollections = parentElement.childNodes[2];
      let productName = productTextPriceNameCollections.firstChild;
      let parse = JSON.parse(localStorage.burgers);
      newParse = parse.filter((x) => x.name != productName.innerHTML);
      countSum = 0;
      let price = productItemPrice.innerHTML.match(/[0-9]+/g);
      let counter = productItemPrice.nextSibling;
      let inputArrows = counter.firstChild;
      let inputValue = inputArrows.firstChild;
      let sumSeveralBurgers = Number(inputValue.value) * Number(price[0]);
      let arr = totalPrice.innerHTML.match(/[0-9]+/g);
      totalPrice.innerHTML = Number(arr[0]) - sumSeveralBurgers + " " + "грн";
      localStorage.clear();
      localStorage.setItem("burgers", JSON.stringify(newParse));
      if (newParse.length == 0) {
        displayBasket();
      }
    }
  });
}

let arrayCheckLocalStorageLength = JSON.parse(localStorage.getItem("burgers"));

if (arrayCheckLocalStorageLength == 0) {
  window.onload = displayBasket;
}

function displayBasket() {
  countSum = 0;
  getTotalSum("0");
  let orderBlock = document.querySelector(".order");
  let imgBasket = document.createElement("img");
  orderBlock.appendChild(imgBasket);
  let p = document.createElement("p");
  orderBlock.appendChild(p);
  let text = document.createTextNode("Shoping сart is empty");
  p.appendChild(text);
  p.classList.add("shopingcart-is-empty");
  imgBasket.src = "../DeliveryApp/images/cart.png";
  imgBasket.style.width = "220px";
  imgBasket.style.height = "auto";
  imgBasket.classList.add("img-basket");
  orderBlock.classList.toggle("empty-cart");
  let buttonFirstPage = document.createElement("button");
  buttonFirstPage.classList.add("button-first-page");
  orderBlock.appendChild(buttonFirstPage);
  buttonFirstPage.innerHTML = "Back to shop page";
  buttonFirstPage.setAttribute(
    "onclick",
    "document.location='./shoppingpage.html'"
  );
  orderMoreBurgers.remove();
}

let submit = document.querySelector(".button-submit");
let inputsForm = document.querySelectorAll(".input-form");
let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let userPhone = document.getElementById("phone");
let userAddress = document.getElementById("address");

let burgersName = document.getElementsByClassName("burger-name");
let burgersOrder = [];

submit.addEventListener("click", function () {
  for (let i = 0; i < burgersName.length; i++) {
    let text = burgersName[i].nextSibling;
    let productItemPrice = text.nextSibling;
    let price = productItemPrice.firstChild.innerHTML;
    let counter = productItemPrice.nextSibling;
    let inputArrows = counter.firstChild;
    let inputCount = inputArrows.firstChild;
    let countBurgersOrder = inputCount.value;

    let priceAmount = price.match(/[0-9]+/g);

    burgersOrder.push({
      name: burgersName[i].innerHTML,
      discription: text.innerHTML,
      price: priceAmount[0],
      ["count-burgers-order"]: countBurgersOrder,
    });
  }

  let data = {
    ["user-name"]: userName.value,
    email: userEmail.value,
    phone: userPhone.value,
    adress: userAddress.value,
    ["burgers-order"]: burgersOrder,
  };

  let burgers = JSON.stringify(data);
  console.log(burgers);

  let jsonHeaders = new Headers({
    "Content-Type": "application/json",
  });

  fetch("/send-me-json", {
    method: "POST",
    body: burgers,
    headers: jsonHeaders,
  });
});


//
// submit.addEventListener("click", function () {
//   let burgersOrder = JSON.parse(localStorage.getItem("burgers"));
//   let countBurgersOrder = null;

//   for (let i = 0; i < burgersName.length; i++) {
//     let text = burgersName[i].nextSibling;
//     let productItemPrice = text.nextSibling;
//     let price = productItemPrice.firstChild.innerHTML;
//     let counter = productItemPrice.nextSibling;
//     let inputArrows = counter.firstChild;
//     let inputCount = inputArrows.firstChild;
//     countBurgersOrder = inputCount.value;
//   }
//   burgersOrder.forEach(
//     (count) => (count["count-burgers-orger"] = countBurgersOrder)
//   );
//   console.log(burgersOrder);
// });
