const catalog = {

    /**
     * Catalog products
     */
    products: [],

    /**
     * Product categories
     */
    productCategories: {
        "electronicos": "Electrónicos",
        "ropa": "Ropa",
        "alimentos": "Alimentos",
        "juguetes": "Juguetes"
    },

    /**
     * Product features
     */
    productFeatures: {
        "ecologico": "Ecológico",
        "importado": "Importado",
        "oferta": "En Oferta",
        "popular": "Popular",
        "nuevo": "Nuevo Lanzamiento"
    },

    /**
     * Product interface
     */
    productInterface: {
        id: 0,
        productName: "",
        productPrice: "",
        stockAmount: "",
        productDescription: "",
        productCategory: "",
        features: []
    },

    /**
     * Initializes the catalog
     */
    init: function() {

        // event listener modal
        document.getElementById("addProductBtn").addEventListener("click", () => {
            this.new();
        });

        // event listener submit
        document.getElementById("submitBtn").addEventListener("click", () => {
            this.submit();
        });

        // event listener close modal
        document.getElementById("cancelBtn").addEventListener("click", () => {
            this.closeModal();
        });

        // seed products
        this.seedProducts();
    },

    /**
     * Returns the next product id
     * @returns {*}
     */
    nextProductID: function() {
        // get the highest id from the products array and add 1
        return (this.products.length === 0 ? 0 : Math.max(...this.products.map(product => product.id))) + 1;
    },

    /**
     * Seeds the catalog with sample products
     */
    seedProducts: function ()
    {

        const sampleProducts = [
            {
                productName: "Camiseta Ecológica",
                productPrice: "15",
                stockAmount: "50",
                productDescription: "Una camiseta hecha de materiales reciclados",
                productCategory: "ropa",
                features: ["ecologico"]
            },
            {
                productName: "Laptop Importada",
                productPrice: "1200",
                stockAmount: "20",
                productDescription: "Una laptop importada de alto rendimiento",
                productCategory: "electronicos",
                features: ["importado", "popular"]
            },
            {
                productName: "Juego de Mesa Ecológico",
                productPrice: "45",
                stockAmount: "100",
                productDescription: "Juego de mesa fabricado con materiales sostenibles y tintas naturales.",
                productCategory: "juguetes",
                features: ["ecologico", "nuevo"]
            }
        ];

        sampleProducts.forEach(product => {
            this.add(product);
        });



    },

    /**
     * Displays the modal to add a new product
     */
    new: function() {

        // display modal
        document.getElementById("productModal").style.display = "flex";

        // get category dropdown
        const categoryDropdown = document.getElementById("productCategory");

        // clear existing options
        while (categoryDropdown.firstChild) {
            categoryDropdown.removeChild(categoryDropdown.firstChild);
        }

        // add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione una categoría";
        categoryDropdown.appendChild(defaultOption);

        // fill the dropdown with categories from productCategories
        for (const [key, value] of Object.entries(this.productCategories)) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = value;
            categoryDropdown.appendChild(option);
        }

        // clear existing features
        const featuresContainer = document.getElementById("featuresContainer");
        featuresContainer.innerHTML = '';

        // fill the container with features from productFeatures
        for (const [key, value] of Object.entries(this.productFeatures)) {

            const label = document.createElement("label");
            label.className = "feature-label mr-2";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "features";
            checkbox.className = "mr-2";
            checkbox.value = key;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(value));
            featuresContainer.appendChild(label);
        }


    },

    /**
     * Closes the modal
     */
    closeModal: function() {
        // hide modal
        document.getElementById("productModal").style.display = "none";

        // clear form
        this.resetForm();
    },

    /**
     * Adds a product to the catalog
     * @param product
     */
    add: function(product) {

        // normalize product and add id
        product = {...this.productInterface, ...product, id: this.nextProductID()}

        // add product to array
        this.products.push(product);

        // render table
        this.render();
    },

    /**
     * Renders the catalog
     */
    render: function() {

        // get table body
        const tableBody = document.getElementById("productTable").querySelector("tbody");
        // clear table body
        tableBody.innerHTML = '';

        // if no products, display message
        if (this.products.length === 0)
        {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.setAttribute("colspan", "8");
            cell.textContent = "No existen productos en el catálogo.";
            cell.classList.add("text-center", "italic");
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
        else {

            // for each product, create a row and add it to the table body
            this.products.forEach(product => {

                // normalize product
                product = {...this.productInterface, ...product};

                // create row
                const row = document.createElement("tr");
                row.className = 'hover:bg-gray-50 transition duration-150';

                const appendToRow = (data, orientation) =>
                {
                    const cell = document.createElement("td");

                    let cellClass = 'px-6 py-4 whitespace-no-wrap font-medium text-gray-500 text-sm leading-5';
                    cellClass += (tableBody.children.length % 2 === 0 ? ' bg-gray-50' : ' bg-white');
                    if (orientation === 'end') cellClass += ' text-end';

                    // set zebra style
                    cell.className = cellClass;
                    cell.textContent = data;
                    row.appendChild(cell);
                }

                // product id
                appendToRow(product.id);

                // product name
                appendToRow(product.productName);


                // product description
                appendToRow(product.productDescription);

                // product stock
                appendToRow(product.stockAmount);

                // product price
                appendToRow(this.formatMoney(product.productPrice), 'end');

                // product category
                appendToRow(this.productCategories[product.productCategory]);

                // product features
                appendToRow(product.features.map(featureKey => this.productFeatures[featureKey]).join(", "));

                // product actions
                appendToRow("");

                // add row to table body
                tableBody.appendChild(row);
            });
        }
    },

    /**
     * Submits the form
     */
    submit: function() {

        // if form is valid, add product and close modal
        if (this.validateForm()) {

            // create product object
            const product = {
                productName: document.getElementById("productName").value,
                productPrice: document.getElementById("productPrice").value,
                stockAmount: document.getElementById("stockAmount").value,
                productDescription: document.getElementById("productDescription").value,
                productCategory: document.getElementById("productCategory").value,
                features: Array.from(document.querySelectorAll("input[name='features']:checked")).map(checkbox => checkbox.value)
            };

            // add product
            this.add(product);

            // close modal
            this.closeModal();
        }
    },

    /**
     * Resets the form
     */
    // close modal
    resetForm: function() {

        document.getElementById("productName").value = '';
        document.getElementById("productPrice").value = '';
        document.getElementById("stockAmount").value = '';
        document.getElementById("productDescription").value = '';
        document.getElementById("productCategory").value = '';
        document.querySelectorAll("input[name='features']").forEach(checkbox => checkbox.checked = false);

        this.validateApplyStyles("productName");
        this.validateApplyStyles("productPrice");
        this.validateApplyStyles("stockAmount");
        this.validateApplyStyles("productDescription");
        this.validateApplyStyles("productCategory");
        this.validateApplyStyles("features");

    },

    /**
     * Validates the form
     * @returns {*}
     */
    validateForm: function() {
        // validate each field
        const productIsValid = this.validateField('productName');
        const priceIsValid = this.validateDecimal('productPrice');
        const stockIsValid = this.validateInteger('stockAmount');
        const descriptionIsValid = this.validateField('productDescription');
        const categoryIsValid = this.validateField('productCategory');
        const featuresAreValid = this.validateFeatures();

        return productIsValid && priceIsValid && stockIsValid && descriptionIsValid && categoryIsValid && featuresAreValid;
    },

    /**
     * Validates a field
     * @param baseId
     * @returns {boolean}
     */
    validateField: function(baseId) {
        const element = document.getElementById(baseId);
        const isError = element.value.trim() === "";

        // apply styles
        this.validateApplyStyles(baseId, isError);
        return !isError;
    },

    /**
     * Validates an integer
     * @param baseId
     * @returns {boolean}
     */
    validateInteger: function(baseId) {
        const element = document.getElementById(baseId);
        const isError =  !element.value || !/^-?\d+$/.test(element.value.trim());

        // apply styles
        this.validateApplyStyles(baseId, isError);
        return !isError;
    },

    /**
     * Validates a decimal
     * @param fieldId
     * @returns {boolean}
     */
    validateDecimal: function(fieldId) {
        // get element and label
        const element = document.getElementById(fieldId);
        const label = document.getElementById(fieldId + 'Label');
        let value = element.value.trim();
        value = value.replace(/,/g, '');


        // Use regex to check if the value is a float (with point as decimal and comma as thousand separators)
        const isDecimal = /^(\d{1,3}(\.\d{3})*|\d+)(\.\d+)?$/.test(value);
        console.log(value, isDecimal);
        const isError = !value || !isDecimal;

        // apply styles
        this.validateApplyStyles(fieldId, isError);
        return !isError;
    },

    /**
     * Validates features
     * @returns {boolean}
     */
    validateFeatures: function() {
        // get label and error elements
        const features = document.querySelectorAll("input[name='features']:checked");
        const label = document.getElementById("featuresLabel");
        const errorDiv = document.getElementById("featuresError");
        const isError = features.length < 1;
        this.validateApplyStyles("features", isError)
        return !isError;
    },

    /**
     * Applies styles to a field
     * @param fieldID
     * @param isError
     */
    validateApplyStyles: function(fieldID, isError) {

        const element = document.getElementById(fieldID);
        const label = document.getElementById(fieldID + 'Label');
        const errorDiv = document.getElementById(fieldID + 'Error');

        // element exists
        if (element) {

            if (isError === true) {
                element.classList.add('border-red-500');
                element.classList.remove('border-green-500');
            } else if (isError === false) {
                element.classList.remove('border-red-500');
                element.classList.add('border-green-500');
            }
            else
            {
                element.classList.remove('border-red-500');
                element.classList.remove('border-green-500');
            }
        }

        // label exists
        if (label) {
            if (isError === true)
            {
                label.classList.add('text-red-500');
                label.classList.remove('text-green-500');
            }
            else if (isError === false)
            {
                label.classList.remove('text-red-500');
                label.classList.add('text-green-500');
            }
            else
            {
                label.classList.remove('text-red-500');
                label.classList.remove('text-green-500');
            }
        }

        // error container exists
        if (errorDiv)
        {
            if (isError === true) {
                errorDiv.innerText = isError ? "Por favor, corrige el campo" : "";
            } else {
                errorDiv.innerText = "";
            }
        }

    },

    /**
     * Formats a number as money
     * @param number
     * @returns {string}
     */
    formatMoney: function(number) {

        // if no number, return "$0.00"
        if (!number) return "$0.00";

        // remove all non-numeric characters except dots
        if( typeof number === 'string' ) number = number.replace(/[^0-9.]/g, '');

        // convert to string
        const floatValue = typeof number === "number" ? number : parseFloat(number);

        // if not a number, return "$0.00"
        if (isNaN(floatValue)) return "$0.00";

        // format number
        const formattedNumber = floatValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        // return formatted number
        return "$" + formattedNumber;
    }
};

// initialize catalog
catalog.init();