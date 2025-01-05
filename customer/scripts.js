let totalCost = 0;
const initialStock = {};

if (!localStorage.getItem('customerData')) {
    const customerData = {
        customers: 25, 
        income: 1500.0
    };
    localStorage.setItem('customerData', JSON.stringify(customerData));
}

function updateCustomerData(orderAmount) {
    let customerData = JSON.parse(localStorage.getItem('customerData')) || { customers: 25, income: 1500.0 };

    customerData.customers += 1;  
    customerData.income += orderAmount;  

    localStorage.setItem('customerData', JSON.stringify(customerData));

    console.log('Updated Customer Data:', customerData);
}

function updateTotalCost() {
    document.getElementById("totalCostLabel").textContent = `£${totalCost.toFixed(2)}`;
}

function addItem(button) {
    const menuItem = button.closest(".menu-item");
    const itemName = menuItem.querySelector("h2").textContent;
    const price = parseFloat(menuItem.querySelector(".price").textContent.slice(1)); 
    const quantityField = menuItem.querySelector(".quantity");
    const availabilityField = menuItem.querySelector(".availability");
    const spicyCheck = menuItem.querySelector(".spicy-check").checked;
    const cheeseCheck = menuItem.querySelector(".cheese-check").checked;

    const quantity = parseInt(quantityField.value) || 0;
    let availableStock = parseInt(availabilityField.textContent);

    if (quantity <= 0) {
        alert(`Please enter a valid quantity for ${itemName}.`);
        return;
    }

    if (quantity > availableStock) {
        alert(`Only ${availableStock} ${itemName}(s) are available. Please reduce your quantity.`);
        return;
    }

    let itemCost = price * quantity;

    if (spicyCheck) itemCost += 2 * quantity; 
    if (cheeseCheck) itemCost += 5 * quantity; 

    totalCost += itemCost; 
    updateTotalCost();

    availableStock -= quantity;
    availabilityField.textContent = availableStock;

    updateCustomerData(itemCost);

    alert(`${itemName} added! Total cost for this item: £${itemCost.toFixed(2)}`);
}

function resetOrder() {
    totalCost = 0;
    updateTotalCost();

    document.querySelectorAll(".menu-item").forEach((menuItem) => {
        const itemName = menuItem.querySelector("h2").textContent;
        const availabilityField = menuItem.querySelector(".availability");

        // Reset availability back to initial stock
        if (initialStock[itemName] !== undefined) {
            availabilityField.textContent = initialStock[itemName];
        }
    });

    document.querySelectorAll("input[type='text'], input[type='number']").forEach((input) => (input.value = ""));
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => (checkbox.checked = false));

    alert("Order has been reset.");
}

function placeOrder() {
    if (totalCost === 0) {
        alert("Your cart is empty! Please add items to place an order.");
        return;
    }

    alert(`Order placed successfully!\n\nTotal Cost: £${totalCost.toFixed(2)}`);

    resetOrder();
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize stock for each menu item
    document.querySelectorAll(".menu-item").forEach((menuItem) => {
        const itemName = menuItem.querySelector("h2").textContent;
        const availabilityField = menuItem.querySelector(".availability");

        // Store initial stock values for each item
        initialStock[itemName] = parseInt(availabilityField.textContent);
    });

    // Add event listeners for "Add" buttons
    document.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", () => addItem(button));
    });

    // Add event listener for "Reset" button
    document.getElementById("resetButton").addEventListener("click", resetOrder);

    // Add event listener for "Place Order" button
    document.getElementById("placeOrderButton").addEventListener("click", placeOrder);
});
