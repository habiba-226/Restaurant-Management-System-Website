let totalCost = 0;
const initialStock = {}; // To store the initial stock values

// Function to update the total cost display
function updateTotalCost() {
    document.getElementById("totalCostLabel").textContent = `£${totalCost.toFixed(2)}`;
}

// Function to add items to the order
function addItem(button) {
    const menuItem = button.closest(".menu-item");
    const itemName = menuItem.querySelector("h2").textContent;
    const price = parseFloat(menuItem.querySelector(".price").textContent.slice(1));
    const quantityField = menuItem.querySelector(".quantity");
    const availabilityField = menuItem.querySelector(".availability");
    const spicyCheck = menuItem.querySelector(".item-options input[type='checkbox']:first-of-type").checked;
    const cheeseCheck = menuItem.querySelector(".item-options input[type='checkbox']:last-of-type").checked;

    const quantity = parseInt(quantityField.value) || 0;
    let availableStock = parseInt(availabilityField.textContent);

    // Check if the quantity is valid
    if (quantity <= 0) {
        alert(`Please enter a valid quantity for ${itemName}.`);
        return;
    }

    // Check if the requested quantity is available
    if (quantity > availableStock) {
        alert(`Only ${availableStock} ${itemName}(s) are available. Please reduce your quantity.`);
        return;
    }

    // Calculate item cost
    let itemCost = price * quantity;
    if (spicyCheck) itemCost += 2 * quantity;
    if (cheeseCheck) itemCost += 5 * quantity;

    // Update total cost
    totalCost += itemCost;
    updateTotalCost();

    // Decrease available stock
    availableStock -= quantity;
    availabilityField.textContent = availableStock;

    alert(`${itemName} added! Total cost for this item: £${itemCost.toFixed(2)}`);
}

// Function to reset all fields and restore stock
function resetOrder() {
    totalCost = 0;
    updateTotalCost();

    // Reset stock to its original values
    document.querySelectorAll(".menu-item").forEach((menuItem) => {
        const itemName = menuItem.querySelector("h2").textContent;
        const availabilityField = menuItem.querySelector(".availability");

        if (initialStock[itemName] !== undefined) {
            availabilityField.textContent = initialStock[itemName];
        }
    });

    // Clear all input fields and uncheck checkboxes
    document.querySelectorAll("input[type='text'], input[type='number']").forEach((input) => (input.value = ""));
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => (checkbox.checked = false));

    alert("Order has been reset.");
}

// Initialize the stock values on page load
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu-item").forEach((menuItem) => {
        const itemName = menuItem.querySelector("h2").textContent;
        const availabilityField = menuItem.querySelector(".availability");

        // Store the initial stock value
        initialStock[itemName] = parseInt(availabilityField.textContent);
    });

    // Add event listeners for buttons
    document.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", () => addItem(button));
    });

    document.getElementById("resetButton").addEventListener("click", resetOrder);
});
