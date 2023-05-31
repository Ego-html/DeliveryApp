let burgerPrice = document.querySelector('.product-item-price');

function order() {
    let obj = JSON.parse(localStorage.getItem('burger1'));
    let price = obj.burger1;
    burgerPrice.innerHTML = price;
}

order();

