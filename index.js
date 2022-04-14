console.log(products)
const items = document.querySelector(".items");
const cart = document.querySelector(".cart");
const total = document.querySelector(".total");
const totalItem = document.querySelector(".totalItems");
const bx_cart = document.querySelector(".icon-show");
const modal = document.getElementById("modal")
const hide = document.querySelector(".hide");



window.addEventListener("load",function(){
    modal.style.display="none"
})

hide.addEventListener("click",function(){
     modal.style.display="none"
})

bx_cart.addEventListener("click",function(){
    modal.style.display="block"
    
})





function getProducts() {
    products.forEach((prd) => {
        items.innerHTML += `
        <div class="item">
           <img src=${prd.img} alt="">
           <span>${prd.name}</span>
           <span>${prd.price}$</span>
           <button onclick="addToCart(${prd.id})">+<ion-icon class="icon-cart" name="cart-outline"></ion-icon></button>           
        </div>
        `
    })
}

getProducts();






let cartItems = JSON.parse(localStorage.getItem("cart",)) || [];
updateCart()

function Sear (){
    if(cartItems.length<1){
        modal.style.display="none"
        
    }
} 



function addToCart(id) {
    
    if (cartItems.some((item) => item.id === id)) {
        changeUnits("plus", id)
    } else {
        const item = products.find((prd) => prd.id === id)
        cartItems.push({
            ...item,
            numberUnits: 1,
        })
    }
    console.log(id)
    updateCart()

}

function totalPrice() {
    let price = 0;
    totalItems = 0;
    cartItems.forEach((item) => {
        price += item.price * item.numberUnits
        totalItems += item.numberUnits
    })

    total.innerHTML = `Total price:${price}$`
    totalItem.innerHTML = `${totalItems}`
}


function removeItems(id) {
    cartItems = cartItems.filter((item) => item.id !== id);
    updateCart()

}



function updateCart() {
    renderItems()
    totalPrice()
   Sear()
    //localStorage.setItem("CART", JSON.stringify(cartItems));
    localStorage.setItem("cart", JSON.stringify(cartItems))
}





function renderItems() {
    cart.innerHTML = ""
    if(cartItems<1){
        cart.innerHTML=`
        <div class="empty">Empty</div>
        `
    }
    cartItems.forEach((item) => {
        cart.innerHTML += `
        <div class="cart-item">
          <img src=${item.img} alt="">
          <h3>${item.name}</h3>
          <h3>${item.price}AZN</h3>
          <div class="btn-icon">
          <button> <ion-icon onclick=changeUnits("minus",${item.id}) name="remove-outline"></ion-icon></button>
          <h2>${item.numberUnits}</h2>
          <button><ion-icon onclick=changeUnits("plus",${item.id}) name="add-outline"></ion-icon></button>
          <i onclick="removeItems(${item.id})" class='bx bxs-box'></i>
         </div>
        </div>
        `
    })
}


function changeUnits(action, id) {
    cartItems = cartItems.map((item) => {
        let numberUnits = item.numberUnits

        if (item.id === id) {
            if (action === "minus" && numberUnits > 1) {
                numberUnits--;

            } else if (action === "plus" && numberUnits < item.stock) {
                numberUnits++;
            }
        }
        return { ...item, numberUnits, }

    })
    updateCart()

}

