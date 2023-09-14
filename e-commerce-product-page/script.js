function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expnd_img");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }

  function displayInitialImage() {
    // Get the expanded image
    var expandImg = document.getElementById("expnd_img");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Get the first thumbnail image
    var firstThumbnail = document.querySelector(".product_img_col img:first-child");

    // Use the src and alt of the first thumbnail image to initialize the expanded image and text
    expandImg.src = firstThumbnail.src;
    imgText.innerHTML = firstThumbnail.alt;

    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
}

// Call the function to display the initial image when the page loads
displayInitialImage();


const cartItem = document.querySelector('.cart');
const cartImg = document.querySelector('.cart-img');
const cartContainer = document.querySelector('.cart-container');
const incrementCounter = document.getElementById('increment');
const addToCartButton = document.getElementById("a2c");
addToCartButton.addEventListener('click', addtoCartClicked);

function addtoCartClicked(event) {
    event.preventDefault(); // Prevent the anchor tag from navigating to a different page

    // Get the product information
    const productPrice = document.getElementById('product-price').textContent;
    const productName = document.getElementById('prod-name').textContent; 
    const productImageSrc = document.getElementById('product-image').src;

    // Add the product to the cart
    addItemToCart(productPrice, productName, productImageSrc);
}

function addItemToCart(price, name, imageSrc) { // Include 'name' as a parameter
    // Check if the item is already in the cart
    const cartItems = document.querySelectorAll('.product-row');
    for (const cartItem of cartItems) {
        if (cartItem.querySelector('img').src === imageSrc) {
            alert('This item has already been added to the cart');
            return;
        }
    }

    // Create a new cart item
    const cartRow = document.createElement('div');
    cartRow.classList.add('product-row');
    const cartItemsContainer = document.getElementById('product-row');
    const cartRowContent = `
        <img class="1" src="${imageSrc}" alt="">
        <span class="2">${price}</span>
        <span class="3">${name}</span> 
        <input type="number" value="1" class="product-quantity">
        <a class="remove-btn"><span class="material-symbols-outlined" style="cursor: pointer; color: hsl(26, 100%, 55%)">
        delete
        </span></a>
        <style>
        .1{
            border-radius: 50%;
            border: solid black ;
        }
    `;
    cartRow.innerHTML = cartRowContent;

    // Add event listeners for the remove button and quantity input
    cartRow.querySelector('.remove-btn').addEventListener('click', removeItem);
    cartRow.querySelector('.product-quantity').addEventListener('input', updateCartPrice);

    // Append the cart row to the cart container
    cartItemsContainer.appendChild(cartRow);

    // Update the cart total price
    updateCartPrice();
}

function removeItem(event) {
    const cartItem = event.target.closest('.product-row');
    if (cartItem) {
        cartItem.remove();
        updateCartPrice();
    }
}

function updateCartPrice() {
    const cartRows = document.querySelectorAll('.product-row');
    let total = 0;

    for (const cartRow of cartRows) {
        const price = parseFloat(cartRow.querySelector('span').textContent.replace('$', ''));
        const quantity = parseInt(cartRow.querySelector('.product-quantity').value);
        total += price * quantity;
    }

    // Update the total price
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
}

let isCartOpen = false;

cartImg.addEventListener('click', function () {
    if (!isCartOpen) {
        cartContainer.style.display = 'block'; // Display the cart container
    } else {
        cartContainer.style.display = 'none'; // Hide the cart container
    }

    isCartOpen = !isCartOpen; // Toggle the cart state
});