// Product data (as an example)
const products = [
    { id: 1, name: "Product 1", image: "images/product1.jpg", price: "$50" },
    { id: 2, name: "Product 2", image: "images/product2.jpg", price: "$75" },
    { id: 3, name: "Product 3", image: "images/product3.jpg", price: "$60" },
    { id: 4, name: "Product 4", image: "images/product4.jpg", price: "$40" },
    { id: 4, name: "Product 5", image: "images/product5.jpg", price: "$40" },
    { id: 4, name: "Product 6", image: "images/product6.jpg", price: "$40" },
    { id: 4, name: "Product 7", image: "images/product7.jpg", price: "$40" }
];

let cart = [];
let favorites = [];
let orders = [];

// Load products dynamically into the page
const productContainer = document.getElementById('productContainer');
products.forEach(product => {
    const productCard = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <div class="product-options">
                <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="add-to-favorite" onclick="addToFavorite(${product.id})">❤</button>
            </div>
        </div>
    `;
    productContainer.innerHTML += productCard;
});

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    alert(`${product.name} added to cart`);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Favorite functionality
function addToFavorite(productId) {
    const product = products.find(p => p.id === productId);
    favorites.push(product);
    alert(`${product.name} added to favorites`);
}

// Buy Now functionality with form
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    showModal(`
        <h2>Buy Now - ${product.name}</h2>
        <form id="buyNowForm">
            <label>Name: <input type="text" id="name" required></label><br><br>
            <label>Address: <input type="text" id="address" required></label><br><br>
            <label>Phone No: <input type="text" id="phone" required></label><br><br>
            <label>Payment Mode: 
                <select id="paymentMode">
                    <option>Cash on Delivery</option>
                    <option>Phone Pay</option>
                    <option>Google Pay</option>
                </select>
            </label><br><br>
            <button type="submit">Confirm Purchase</button>
        </form>
    `);
    document.getElementById('buyNowForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const paymentMode = document.getElementById('paymentMode').value;

        orders.push({ name, address, phone, product, paymentMode });
        alert(`Order placed successfully for ${product.name}`);
        hideModal();
    });
}

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

function showModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function hideModal() {
    modal.style.display = 'none';
}

document.querySelector('.close-btn').addEventListener('click', hideModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});


// Functionality for Navbar items
document.getElementById('myOrdersBtn').addEventListener('click', function() {
    if (orders.length === 0) {
        alert('No orders have been placed yet.');
    } else {
        let orderList = '<h2>My Orders</h2><ul>';
        orders.forEach(order => {
            orderList += `
                <li>
                    <strong>Product:</strong> ${order.product.name}<br>
                    <strong>Address:</strong> ${order.address}<br>
                    <strong>Payment Mode:</strong> ${order.paymentMode}
                </li><br>`;
        });
        orderList += '</ul>';
        showModal(orderList);
    }
});

document.getElementById('favoriteBtn').addEventListener('click', function() {
    if (favorites.length === 0) {
        alert('No favorites added yet.');
    } else {
        let favoriteList = '<h2>Favorites</h2><ul>';
        favorites.forEach(fav => {
            favoriteList += `<li>${fav.name}</li>`;
        });
        favoriteList += '</ul>';
        showModal(favoriteList);
    }
});

document.getElementById('myAccountBtn').addEventListener('click', function() {
    showModal(`
        <h2>My Account</h2>
        <p>Account details would be shown here (e.g., Name, Email, etc.)</p>
    `);
});

document.getElementById('cartBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        let cartList = '<h2>Cart</h2><ul>';
        cart.forEach(item => {
            cartList += `<li>${item.name} - ${item.price}</li>`;
        });
        cartList += '</ul>';
        showModal(cartList);
    }
});


