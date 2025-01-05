let totalCost = 0;
const initialStock = {}; 

function updateTotalCost() {
    document.getElementById("totalCostLabel").textContent = `£${totalCost.toFixed(2)}`;
}

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

    alert(`${itemName} added! Total cost for this item: £${itemCost.toFixed(2)}`);
}

function resetOrder() {
    totalCost = 0;
    updateTotalCost();

    document.querySelectorAll(".menu-item").forEach((menuItem) => {
        const itemName = menuItem.querySelector("h2").textContent;
        const availabilityField = menuItem.querySelector(".availability");

        if (initialStock[itemName] !== undefined) {
            availabilityField.textContent = initialStock[itemName];
        }
    });

    document.querySelectorAll("input[type='text'], input[type='number']").forEach((input) => (input.value = ""));
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => (checkbox.checked = false));

    alert("Order has been reset.");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu-item").forEach((menuItem) => {
        const itemName = menuItem.querySelector("h2").textContent;
        const availabilityField = menuItem.querySelector(".availability");

        initialStock[itemName] = parseInt(availabilityField.textContent);
    });

    document.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", () => addItem(button));
    });

    document.getElementById("resetButton").addEventListener("click", resetOrder);
});
