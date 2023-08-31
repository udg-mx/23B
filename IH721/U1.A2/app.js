// form submit listener
document.getElementById("submitBtn").addEventListener("click", function () {
    validateForm();
});

function validateForm() {

    // get elements from the form
    let productName = document.getElementById("productName");
    let productPrice = document.getElementById("productPrice");
    let stockAmount = document.getElementById("stockAmount");
    let productDescription = document.getElementById("productDescription");
    let productCategory = document.getElementById("productCategory");
    let features = document.querySelectorAll("input[name='features']:checked");

    // validate each field
    validateField(productName, "productNameLabel");
    validateField(productPrice, "productPriceLabel");
    validateField(stockAmount, "stockAmountLabel");
    validateField(productDescription, "productDescriptionLabel");
    validateField(productCategory, "productCategoryLabel");

    // validate features
    validateFeatures(features, "featuresLabel", "featuresError");
}

function validateField(field, labelId) {
    // get label element
    let label = document.getElementById(labelId);

    // if empty, set border color to red, else set to green
    if (field.value.trim() === "") {
        field.style.borderColor = "red";
        label.style.color = "red";
    } else {
        field.style.borderColor = "green";
        label.style.color = "green";
    }
}

function validateFeatures(features, labelId, errorId) {

    // get label and error elements
    let label = document.getElementById(labelId);
    let errorDiv = document.getElementById(errorId);

    // if no features are selected, set border color to red, else set to green
    if (features.length == 0) {
        errorDiv.innerText = "Por favor, selecciona al menos una característica.";
        label.style.color = "red";
    } else {
        errorDiv.innerText = "";
        label.style.color = "green";
    }
}
