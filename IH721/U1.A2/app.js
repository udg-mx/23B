document.getElementById("submitBtn").addEventListener("click", function () {
    validateForm();
});

function validateForm() {
    let productName = document.getElementById("productName");
    let productPrice = document.getElementById("productPrice");
    let stockAmount = document.getElementById("stockAmount");
    let productDescription = document.querySelector("#productDescription");
    let productCategory = document.querySelector("#productCategory");
    let features = document.querySelectorAll("input[name='features']:checked");

    validateField(productName, "productNameLabel");
    validateField(productPrice, "productPriceLabel");
    validateField(stockAmount, "stockAmountLabel");
    validateField(productDescription, "productDescriptionLabel");
    validateField(productCategory, "productCategoryLabel");
    validateFeatures(features, "featuresLabel", "featuresError");
}

function validateField(field, labelId) {
    let label = document.getElementById(labelId);
    if (field.value.trim() === "") {
        field.style.borderColor = "red";
        label.style.color = "red";
    } else {
        field.style.borderColor = "green";
        label.style.color = "green";
    }
}

function validateFeatures(features, labelId, errorId) {
    let label = document.getElementById(labelId);
    let errorDiv = document.getElementById(errorId);

    if (features.length == 0) {
        errorDiv.innerText = "Por favor, selecciona al menos una característica.";
        label.style.color = "red";
    } else {
        errorDiv.innerText = "";
        label.style.color = "green";
    }
}
