const products = [
    {
        id: 0,
        image: 'assets/chocolate-cake.jpg',
        alt: 'chocolate-cake', 
        name: 'Sjokolade kake',
        price: 500.00,
    },
    {
        id: 1,
        image: 'assets/croissant.jpg',
        alt: 'croissant',
        name: 'Croissant',
        price: 40.00,
    },
    {
        id: 2,
        image: 'assets/chocolate-truffles.jpg',
        alt: 'chocolate truffles',
        name: 'Sjokolade trøfler',
        price: 100.00,
    },
    {
        id: 3,
        image: 'assets/cupcake.jpg',
        alt: 'cupcake',
        name: 'Muffin',
        price: 30.00,
    },
    {
        id: 4,
        image: 'assets/makarons.jpg',
        alt: 'makarons',
        name: 'Makarons',
        price: 200.00,
    },
    {
        id: 5,
        image: 'assets/atumn-cake.jpg',
        alt: 'autumn cake',
        name: 'Høst kake',
        price: 450.00,
    }
]

function showProducts() {
    products.forEach(product => {
        const bestsellerProducts = document.querySelector('.bestseller-products-container');

        const bestsellerItem = document.createElement('div');
        const bestsellerImg = document.createElement('img');
        const bestsellerTitle = document.createElement('h5');
        const bestsellerPrice = document.createElement('p');
        const bestsellerDescription = document.createElement('p');
        const buttonBuy = document.createElement('button');

        bestsellerItem.className = 'bestseller-item';

        bestsellerImg.src = product.image;
        bestsellerImg.alt = product.alt;

        bestsellerTitle.innerText = product.name;

        bestsellerPrice.innerText = product.price.toFixed(2) + ' ' + 'NOK';

        bestsellerDescription.innerText = 'per stk';

        buttonBuy.id = product.id;
        buttonBuy.className = 'bestseller-item-button';
        buttonBuy.innerText = 'Kjøp!';

        bestsellerItem.appendChild(bestsellerImg);
        bestsellerItem.appendChild(bestsellerTitle);
        bestsellerItem.appendChild(bestsellerPrice);
        bestsellerItem.appendChild(bestsellerDescription);
        bestsellerItem.appendChild(buttonBuy);

        bestsellerProducts.appendChild(bestsellerItem);
    })
}

showProducts();

let cart = [];
let prices = []
let totalPrice = 0;

function addToCart(product) {
    cart.push(product);
    prices.push(product.price);        
    return cart;      
} 

function calculatePrice() {
    totalPrice = prices.reduce(function (a, b) {
        return a + b;
    },0);
} 

function removeFromCart(idOfDelete) {
    const indexOfMatch = cart.findIndex(product => product.id === idOfDelete);//does not function properly because my cart is being emptied in the setUpControls function
    cart.splice(indexOfMatch, 1); 
    prices.splice(indexOfMatch, 1); 
    calculatePrice();
    showTotalPrice();         
}

function removeAll() {
    cart = [];
    prices = [];
    calculatePrice();
    updateView(); 
    showTotalPrice();   
}

function setUpControls() { 
    
    const buttons = document.querySelectorAll('.bestseller-item-button');
    const buttonsArray = [...buttons]

    buttonsArray.forEach(button =>  {
        button.addEventListener('click', e => {       
            let index = e.target.id;
            addToCart(products[index]);
            console.log(prices);
            calculatePrice(); 
            updateView();
            showTotalPrice();
            cart = [];            
        });        
    })
}
    
setUpControls();

function updateView() {

    cart.forEach(product => {
        const cartOfProducts = document.querySelector('.item-list');

        const itemContainer = document.createElement('li');
        const img = document.createElement('img')
        const title = document.createElement('h3')
        const price = document.createElement('div')
        const buttonDel = document.createElement('button');

        itemContainer.className = 'cart-list';

        img.src = product.image;
        img.alt = product.alt;
        img.className = 'cart-item-img';

        title.className = 'cart-item-name';
        title.innerText = product.name;

        price.className = 'cart-item-price';
        price.innerText = product.price.toFixed(2);

        buttonDel.type = 'button';
        buttonDel.className = 'cart-item-del-button';
        buttonDel.id = product.id;
        buttonDel.innerText = 'X';
        buttonDel.dataset.product = product.name;

        itemContainer.appendChild(img);
        itemContainer.appendChild(title);
        itemContainer.appendChild(price);
        itemContainer.appendChild(buttonDel);

        cartOfProducts.appendChild(itemContainer);
    })     
}

/* Show price */

function showTotalPrice() {
    const totalAmount = document.querySelector('#cart-total-value');
        totalAmount.innerText = totalPrice.toFixed(2);

        const totalAmountMain = document.getElementById('amount');
        totalAmountMain.innerText = totalPrice.toFixed(2);
}

showTotalPrice();

/* Remove one item from the cart */

function remove() {
    const container = document.querySelector('.item-list');  
    
    container.addEventListener('click', e => {
        let idOfDelete = e.target.id;
        removeFromCart(idOfDelete);
        e.target.parentNode.remove();
    })

     updateView();
}

remove();

/* Remove all items from the cart */

function removeTotal() {
    const deleteAllButton = document.querySelector('.remove-all-button');

    deleteAllButton.addEventListener('click', (e) => {
        console.log(e.target.parentNode.previousElementSibling.previousElementSibling);
        removeAll(); 
        e.target.parentNode.previousElementSibling.previousElementSibling.remove();      
    })
}

removeTotal();   

/* Open and close cart */

const cartView = document.querySelector('.cart-container');
const cartIcon = document.querySelector('.shopping-cart-icon');
const closeIcon= document.querySelector('.close-cart');
const menuIcon = document.querySelector('.hamburger-menu-icon');

function showCart(e) {
    cartView.classList.remove('hide-cart');
    e.preventDefault();
}

cartIcon.addEventListener('click', showCart);

function hideCart() {
    cartView.classList.add('hide-cart');
}

closeIcon.addEventListener('click', hideCart);


