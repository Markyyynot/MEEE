// Get references to the HTML elements
const container = document.querySelector('.container');
const productList = document.querySelector('#product-list');
const cartTab = document.querySelector('.cart-tab');
const cartList = document.querySelector('#cart-list');
const cartIcon = document.querySelector('.cart-icon');
const cartIconCounter = document.querySelector('.cart-icon span');

// Define the products array
const products = [
  { id: 1, name: 'BLOSSOM PLUSHIE', price: 800, image: 'img/BlossomPlush.png' },
  { id: 2, name: 'BUBBLES PLUSHIE', price: 800, image: 'img/BubblesPlush.png' },
  { id: 3, name: 'BUTTERCUP PLUSHIE', price: 800, image: 'img/ButtercupPlush.png' },
  { id: 4, name: 'MOJOJOJO PLUSHIE', price: 800, image: 'img/MojojojoPlush.png' },
  { id: 5, name: 'BLOSSOM PHONECASE', price: 300, image: 'img/PhonecaseBlossom.png' },
  { id: 6, name: 'BUBBLES PHONECASE', price: 300, image: 'img/PhonecaseBubbles.png' },
  { id: 7, name: 'BUTTERCUP PHONECASE', price: 300, image: 'img/PhonecaseButtercup.png' },
  { id: 8, name: 'LEGO BUTTERCUP', price: 500, image: 'img/BUTTERCUPSTUFFTOY.png' },
  { id: 9, name: 'LEGO BUBBLES', price: 500, image: 'img/BUBBLESSTUFFTOY.png' },
  { id: 10, name: 'LEGO BLOSSOM ', price: 500, image: 'img/BLOSSOMSTUFFTOY.png' },
  // Add more products as needed
];

// Define the cart array
let cart = [];

// Add the products to the product list
function addProductsToList() {
  products.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.dataset.id = product.id;

    const productImage = document.createElement('img');
    productImage.src = product.image;

    const productName = document.createElement('h2');
    productName.textContent = product.name;

    const productPrice = document.createElement('div');
    productPrice.classList.add('price');
    productPrice.textContent = `P${product.price}`;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', () => addToCart(product.id));

    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(productPrice);
    productItem.appendChild(addToCartButton);

    productList.appendChild(productItem);
  });
}

// Add a product to the cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  const existingProductIndex = cart.findIndex((product) => product.id === productId);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update the cart UI
function updateCart() {
  cartTab.style.right = '0';
  container.classList.add('showCart');

  cartList.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.classList.add('item');

    const productImage = document.createElement('img');
    productImage.src = product.image;

    const productName = document.createElement('div');
    productName.textContent = product.name;

    const productQuantity = document.createElement('div');
    productQuantity.classList.add('quantity');
    productQuantity.textContent = `Quantity: ${product.quantity}`;

    const productPrice = document.createElement('div');
    productPrice.classList.add('price');
    productPrice.textContent = `P${product.price * product.quantity}`;

    const removeFromCartButton = document.createElement('button');
    removeFromCartButton.textContent = 'Remove from Cart';
    removeFromCartButton.addEventListener('click', () => removeFromCart(product.id));

    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(productQuantity);
    productItem.appendChild(productPrice);
    productItem.appendChild(removeFromCartButton);

    cartList.appendChild(productItem);

    totalPrice += product.price * product.quantity;
  });

  const totalPriceElement = document.createElement('div');
  totalPriceElement.classList.add('total-price');
  totalPriceElement.textContent = `Total Price: P${totalPrice}`;

  cartList.appendChild(totalPriceElement);

  cartIconCounter.textContent = cart.length;

  // Add event listener to cart tab to close it when clicked outside of it
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.cart-tab') && !event.target.closest('.cart-icon')) {
      container.classList.remove('showCart');
    }
  });

  // Add event listener to close-cart button to close the cart tab
  const closeCartButton = document.querySelector('.close-cart');
  closeCartButton.addEventListener('click', () => {
    container.classList.remove('showCart');
  });
}

// Remove a product from the cart
function removeFromCart(productId) {
  const productIndex = cart.findIndex((product) => product.id === productId);
  cart.splice(productIndex, 1);

  updateCart();
}

// Initialize the app
addProductsToList();