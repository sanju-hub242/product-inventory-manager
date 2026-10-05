"use strict";
let products = [
    {
        id: 1,
        name: "Laptop",
        price: "55000",
        inStock: true,
        tags: ["Electronics", "Computer"]
    },
    {
        id: 2,
        name: "Mouse",
        price: "5000",
        inStock: true,
        tags: ["Accessory"]
    },
    {
        id: 3,
        name: "Keyboard",
        price: "1500",
        inStock: false,
        tags: ["Accessory"]
    },
    {
        id: 4,
        name: "Monitor",
        price: "12000",
        inStock: true,
        tags: ["Display"]
    }
];
function getAvailableProducts(products) {
    return products.filter((product) => product.inStock);
}
function applyDiscountToProducts(products) {
    const discountPercent = 10;
    return products.map((product) => {
        const discountedPrice = Number(product.price) -
            (Number(product.price) * discountPercent / 100);
        return {
            ...product,
            discountedPrice: discountedPrice,
            discountPercent: discountPercent
        };
    });
}
function calculateDiscount(price, discountPercent = 10) {
    const number = Number(price);
    return number -
        (number * discountPercent / 100);
}
function displayProducts() {
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>${product.inStock ? "Yes" : "No"}</td>
                <td>${product.tags?.join(", ") || "None"}</td>
            `;
        tableBody.appendChild(row);
    });
    displayAvailableProducts();
}
function displayAvailableProducts() {
    const available = getAvailableProducts(products);
    const container = document.getElementById("availableProducts");
    container.innerHTML = "";
    available.forEach((product) => {
        const div = document.createElement("div");
        div.className = "available";
        div.innerHTML =
            `<strong>${product.name}</strong>
                 - ₹${product.price}`;
        container.appendChild(div);
    });
}
function addProduct() {
    const nameInput = document.getElementById("productName");
    const priceInput = document.getElementById("productPrice");
    const stockInput = document.getElementById("productStock");
    const tagsInput = document.getElementById("productTags");
    const name = nameInput.value.trim();
    // Price is stored as a string
    const price = priceInput.value.trim();
    const inStock = stockInput.checked;
    const tags = tagsInput.value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    if (name === "" || price === "" || Number(price) <= 0) {
        alert("Please enter a valid product name and price.");
        return;
    }
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        inStock: inStock,
        tags: tags
    };
    products.push(newProduct);
    displayProducts();
    nameInput.value = "";
    priceInput.value = "";
    stockInput.checked = false;
    tagsInput.value = "";
}
displayProducts();
