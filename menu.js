// Menu items data 
const menuItems = {
    // Pasta menu items
    pasta: [
        {
            name: "Spaghetti Carbonara",
            price: 19.99,
            description: "Delicious Carbonara served with creamy carbonara ssauce.",
            ingredients: ["Spaghetti", "Eggs" , "Parmesan chese", "Bacon"]
        },
        {
            name: "Penne Arrabiata",
            price: 11.99,
            description: "Penne Arrabiata cooked with a spicy tomato sauce and fresh basil",
            ingredients: ["Penne pasta" , "Tomato sauce" , "Garlic" , "Chilli flakes"]
        },
        {
            name:"Ravioli with Spinach",
            price: 10.99,
            description:"Ravioli with Spinach cooked with Spinach and cotagge cheese",
            ingredients: ["Ravioli with Spinach", "Cheese" , "Oil"]  
        }
    ],
    // Pizza menu items
    pizza: [
        {
            name: "Margherita",
            price: 14.99,
            description: "Classic pizza topped with tomato sauce and mozzarella cheese",
            ingredients: ["Pizza dough" , "Tomato sauce" , "Mozarella" , "Basil"]
        },
        {
            name: "Pepperoni",
            price: 16.99,
            description: "Pizza topped with spicy pepperoni slices and mozzarella cheese",
            ingredients:["Pepperoni", "Mozarella cheese" ,"Tomato sauce"]
        },
        {
            name: "Tuna",
            price: 17.99,
            description: "Tuna pizza made with mozzarella cheese and fresh tuna",
            ingredients:["Tuna", "Tomato sauce","Mozzarella cheese"]
        }
    ],
    // Desserts menu items
    desserts: [
        {
            name:"Tiramisu",
            price: 8.99,
            description: "Traditional Italian desserts made with ladyfingers, coffee and cheese",
            ingredients:["Masarpone cheese" , "Ladyfingers" , "Coffee"]
        },
        {
            name: "Raffaelo Cake",
            price: 9.99,
            description: "Cake made with cocount, almond and white chocolate",
            ingredients:["Coconut" , "Milk" , "Almond"]
        },
        {
            name: "Chocolate Lava Cake",
            pice: 10.99,
            description: "Decandent chocolate cake with chocolate center",
            ingredients:["Chocolate", "Suggar" , "Butter"]
        }
    ]
};

// Function to update menu items based on the selected menu
function updateMenuItems() {
    // Get references to HTML elements
    const menu = document.getElementById("menu");
    const menuItemsList = document.getElementById("menu-items");

    // Clear existing menu items
    menuItemsList.innerHTML = "";

    // Get selected menu value
    const menuValue = menu.value;

    // Get items for the selected menu
    const items = menuItems[menuValue];

    // Add items to the list
    items.forEach((item) => {
        // Create HTML elements
        const li = document.createElement("li");
        const name = document.createElement("span");
        const price = document.createElement("span");
        const description = document.createElement("p");
        const ingredients = document.createElement("p");
        const addButton = document.createElement("button");

        // Set text content and attributes
        name.textContent = item.name;
        price.textContent = `$${item.price.toFixed(2)}`;
        description.textContent = `Description: ${item.description}`;
        ingredients.textContent = `Ingredients: ${item.ingredients.join(",")}`;
        addButton.textContent = "+";
        addButton.setAttribute("data-name", item.name);
        addButton.setAttribute("data-price", item.price.toFixed(2));

        // Add event listener for adding to basket
        addButton.addEventListener("click", addToBasket);

        // Append elements to the list item
        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(description);
        li.appendChild(ingredients);
        li.appendChild(addButton);

        // Append list item to the menu items list
        menuItemsList.appendChild(li);
    });

    // Apply search functionality to filter menu items
    applySearchFunctionality();
}

// Function to apply search functionality to filter menu items
function applySearchFunctionality() {
    const searchInput = document.getElementById("search");
    const menuItemsList = document.getElementById("menu-items");
    const menuItems = menuItemsList.getElementsByTagName("li");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(menuItems).forEach((item) => {
            const itemName = item.querySelector("span").textContent.toLowerCase();

            if (itemName.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}

// Function to add an item to the basket
function addToBasket(event) {
    // Get item details from the clicked button
    const itemName = event.target.getAttribute("data-name");
    const itemPrice = parseFloat(event.target.getAttribute("data-price"));

    // Get reference to the basket items list
    const basketList = document.getElementById("basket-items");

    // Create HTML elements for the basket item
    const li = document.createElement("li");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const removeButton = document.createElement("button");
    const addButton = document.createElement("button");

    // Set text content and attributes
    name.textContent = itemName;
    price.textContent = `$${itemPrice.toFixed(2)}`;
    removeButton.textContent = "-";
    addButton.textContent = "+";
    removeButton.classList.add("remove");
    addButton.classList.add("add");
    addButton.setAttribute("data-name", itemName);
    addButton.setAttribute("data-price", itemPrice.toFixed(2));

    // Add event listeners for removing and adding to basket
    removeButton.addEventListener("click", removeFromBasket);
    addButton.addEventListener("click", addToBasket);

    // Append elements to the list item
    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(removeButton);
    li.appendChild(addButton);

    // Append list item to the basket items list
    basketList.appendChild(li);

    // Calculate total order amount
    calculateTotal();

    // Check minimum order requirement
    checkMinimumOrder();
}

// Function to remove an item from the basket
function removeFromBasket(event) {
    // Remove the clicked basket item from the list
    event.target.parentElement.remove();

    // Recalculate total order amount
    calculateTotal();

    // Check minimum order requirement
    checkMinimumOrder();
}

// Function to calculate and update total order amount
function calculateTotal() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
    let tax = 0;
    let total = 0;
    const taxRate = 0.1; // 10%

    // Calculate subtotal based on basket items
    basketItems.forEach((item) => {
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
        subtotal += itemPrice;
    });

    // Calculate tax and total
    tax = subtotal * taxRate;
    total = subtotal + tax;

    // Update displayed prices
    document.querySelector("#subtotal-price").textContent = `${subtotal.toFixed(2)}`;
    document.querySelector("#tax-price").textContent = `${tax.toFixed(2)}`;
    document.querySelector("#totali-price").textContent = `${total.toFixed(2)}`;
}

// Function to check if the minimum order requirement is met
function checkMinimumOrder() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;

    // Calculate subtotal based on basket items
    basketItems.forEach((item) => {
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
        subtotal += itemPrice;
    });

    // Set minimum order value
    const minimumOrderValue = 20.0;

    // Get reference to the basket message element
    const basketMessage = document.getElementById("basket-message");

    // Display or hide basket message based on the minimum order requirement
    if (subtotal < minimumOrderValue) {
        basketMessage.style.display = "block";
    } else {
        basketMessage.style.display = "none";
    }
}

// Call checkMinimumOrder() function initially to determine if the minimum order message should be displayed
checkMinimumOrder();

// Add event listener to update menu items whenever the value of the dropdown menu changes
const menu = document.getElementById("menu");
menu.addEventListener("change", updateMenuItems);

// Call updateMenuItems() function to initially populate the menu items
updateMenuItems();

// Get reference to the basket items list and add event listener for clicks on add or remove buttons
const basketList = document.getElementById("basket-items");
basketList.addEventListener("click", (event) => {
    if (event.target.classList.contains("add") || event.target.classList.contains("remove")) {
        calculateTotal();
    }
});

// Calculate total initially
calculateTotal();

// Get reference to the checkout button and add a click event listener
var checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", function () {
    // Get total price
    var totalPrice = parseFloat(document.getElementById("totali-price").textContent);

    // Confirm payment
    var confirmation = confirm("Do you want to continue with payment?");

    // Redirect to payment page if confirmed
    if (confirmation) {
        // Store order history
        const basketItems = document.querySelectorAll("#basket-items li");
        const orderItems = Array.from(basketItems).map((item) => {
            const itemName = item.querySelector("span:nth-child(1)").textContent;
            const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
            return { name: itemName, price: itemPrice };
        });
        window.location.href = "payment.html";
    } else {
        // Clear basket items and reset total if not confirmed
        var basketItems = document.getElementById("basket-items");
        basketItems.innerHTML = "";
        document.getElementById("totali-price").textContent = "0.00";
    }
});