let button = document.getElementsByClassName("button");
let price = document.getElementsByClassName("product-price");

function addToCart(event) {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  let text = target.previousSibling;
  let currentPrice = text.previousSibling;
  let productItemAction = currentPrice.parentElement;
  let productItemActionText = productItemAction.previousSibling;
  let productItemText = productItemActionText.previousSibling;
  let productItemTitleText = productItemText.previousSibling;
  let productItemTitle = productItemTitleText.previousSibling;
  let productItemPictureText = productItemTitle.previousSibling;
  let productItemPicture = productItemPictureText.previousSibling;
  let img = productItemPicture.children[0].src;
  if (localStorage.length !== 0) {
    let parse = JSON.parse(localStorage.burgers);
    parse.push({
      price: currentPrice.innerHTML,
      discription: productItemText.innerHTML,
      name: productItemTitle.innerHTML,
      img: img,
    });
    localStorage.clear();
    localStorage.setItem("burgers", JSON.stringify(parse));
  } else {
    localStorage.setItem(
      "burgers",
      JSON.stringify([
        {
          price: currentPrice.innerHTML,
          discription: productItemText.innerHTML,
          name: productItemTitle.innerHTML,
          img: img,
        },
      ])
    );
  }
}

document.addEventListener("click", addToCart);
