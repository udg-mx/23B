const catalog = {

    /**
     * Array de productos
     */
    products: [],

    /**
     * Lista de categorías de productos
     */
    productCategories: {
        "electronicos": "Electrónicos",
        "ropa": "Ropa",
        "alimentos": "Alimentos",
        "juguetes": "Juguetes"
    },

    /**
     * Lista de características de productos
     */
    productFeatures: {
        "ecologico": "Ecológico",
        "importado": "Importado",
        "oferta": "En Oferta",
        "popular": "Popular",
        "nuevo": "Nuevo Lanzamiento"
    },

    /**
     * Interfaz de producto
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
     * Inicializa el catálogo
     */
    init: function() {

        // event listener de agregar producto
        document.getElementById("addProductBtn").addEventListener("click", () => {
            this.new();
        });

        // event listener de enviar formulario
        document.getElementById("submitBtn").addEventListener("click", () => {
            this.submit();
        });

        // event listener cerrar modal
        document.getElementById("cancelBtn").addEventListener("click", () => {
            this.closeModal();
        });

        // seed products
        this.seedProducts();
    },

    /**
     * devuelve el siguiente id de producto
     * @returns {*}
     */
    nextProductID: function() {
        // obtiene el id más alto del array de productos y le suma 1
        return (this.products.length === 0 ? 0 : Math.max(...this.products.map(product => product.id))) + 1;
    },

    /**
     * Siembra el catálogo con productos de ejemplo
     */
    seedProducts: function()
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
     * Muestra el modal y rellena los campos del formulario (categorías y características)
     */
    new: function() {

        // mostrar modal
        document.getElementById("productModal").style.display = "flex";

        // obtener dropdown de categorías
        const categoryDropdown = document.getElementById("productCategory");

        // eliminar opciones existentes
        while (categoryDropdown.firstChild) {
            categoryDropdown.removeChild(categoryDropdown.firstChild);
        }

        // crear opción por defecto
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione una categoría";
        categoryDropdown.appendChild(defaultOption);

        // rellenar el dropdown con categorías de productos
        for (const [key, value] of Object.entries(this.productCategories)) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = value;
            categoryDropdown.appendChild(option);
        }

        // obtener contenedor de características
        const featuresContainer = document.getElementById("featuresContainer");
        featuresContainer.innerHTML = '';

        // rellenar el contenedor de características
        for (const [key, value] of Object.entries(this.productFeatures)) {

            // crea label
            const label = document.createElement("label");
            label.className = "feature-label mr-2";

            // crea checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "features";
            checkbox.className = "mr-2";
            checkbox.value = key;

            // agrega checkbox y texto al label
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(value));

            // agrega label al contenedor de características
            featuresContainer.appendChild(label);
        }


    },

    /**
     * Cierra el modal y limpia el formulario
     */
    closeModal: function() {
        // ocultar modal
        document.getElementById("productModal").style.display = "none";

        // limpiar formulario
        this.resetForm();
    },

    /**
     * Agrega un producto al catálogo
     * @param product
     */
    add: function(product) {

        // noramiza el producto y agrega el id
        product = {...this.productInterface, ...product, id: this.nextProductID()}

        // agrega el producto al array de productos
        this.products.push(product);

        // renderiza la tabla
        this.render();
    },

    /**
     * Renderiza la tabla de productos
     */
    render: function() {

        // obtiene el objeto tbody de la tabla
        const tableBody = document.getElementById("productTable").querySelector("tbody");

        // limpia el tbody
        tableBody.innerHTML = '';

        // si no hay productos, muestra un mensaje
        if (this.products.length === 0)
        {

            // crea una celda con colspan 8 y muestra un mensaje
            const cell = document.createElement("td");
            cell.setAttribute("colspan", "8");
            cell.textContent = "No existen productos en el catálogo.";
            cell.classList.add("text-center", "italic");

            // crea una fila y agrega la celda
            const row = document.createElement("tr");
            row.appendChild(cell);

            // agrega la fila al tbody
            tableBody.appendChild(row);
        }
        else {

            // recorre el array de productos
            this.products.forEach(product => {

                // normaliza el producto
                product = {...this.productInterface, ...product};

                // crea una fila y le agrega clases de tailwind
                const row = document.createElement("tr");
                row.className = 'hover:bg-gray-50 transition duration-150';

                // crea una función para agregar celdas a la fila
                const appendToRow = (data, orientation) =>
                {
                    // crea una celda
                    const cell = document.createElement("td");

                    // agrega clases de tailwind
                    let cellClass = 'px-6 py-4 whitespace-no-wrap font-medium text-gray-500 text-sm leading-5';

                    // agrega clases dependiendo si es par o impar
                    cellClass += (tableBody.children.length % 2 === 0 ? ' bg-gray-50' : ' bg-white');

                    // agrega clases dependiendo de la orientación
                    if (orientation === 'end') cellClass += ' text-end';

                    // agrega clases a la celda y agrega el texto
                    cell.className = cellClass;
                    cell.textContent = data;

                    // agrega la celda a la fila
                    row.appendChild(cell);
                }

                // inserta el id del producto
                appendToRow(product.id);

                // inserta el nombre del producto
                appendToRow(product.productName);


                // inserta la descripción del producto
                appendToRow(product.productDescription);

                // inserta la cantidad de stock
                appendToRow(product.stockAmount);

                // inserta el precio del producto
                appendToRow(this.formatMoney(product.productPrice), 'end');

                // inserta la categoría del producto
                appendToRow(this.productCategories[product.productCategory]);

                // inserta las características del producto
                appendToRow(product.features.map(featureKey => this.productFeatures[featureKey]).join(", "));

                // inserta un botón de editar (proximo ejercicio)
                appendToRow("");

                // agrega la fila al tbody
                tableBody.appendChild(row);
            });
        }
    },

    /**
     * Agrega un producto al catálogo
     */
    submit: function() {

        // si el formulario no es válido, no hace nada
        if (this.validateForm()) {

            // crea un objeto producto
            const product = {
                ...this.productInterface,
                productName: document.getElementById("productName").value,
                productPrice: document.getElementById("productPrice").value,
                stockAmount: document.getElementById("stockAmount").value,
                productDescription: document.getElementById("productDescription").value,
                productCategory: document.getElementById("productCategory").value,
                features: Array.from(document.querySelectorAll("input[name='features']:checked")).map(checkbox => checkbox.value)
            };

            // inserta el producto en el catálogo
            this.add(product);

            // cierra el modal
            this.closeModal();
        }
    },

    /**
     * Limpia el formulario
     */
    // close modal
    resetForm: function() {

        // vacía los campos del formulario
        document.getElementById("productName").value = '';
        document.getElementById("productPrice").value = '';
        document.getElementById("stockAmount").value = '';
        document.getElementById("productDescription").value = '';
        document.getElementById("productCategory").value = '';
        document.querySelectorAll("input[name='features']").forEach(checkbox => checkbox.checked = false);

        // resetea los estilos de validación
        this.validateApplyStyles("productName");
        this.validateApplyStyles("productPrice");
        this.validateApplyStyles("stockAmount");
        this.validateApplyStyles("productDescription");
        this.validateApplyStyles("productCategory");
        this.validateApplyStyles("features");

    },

    /**
     * Valida campos del formulario
     * @returns {boolean}
     */
    validateForm: function() {

        // valida cada campo
        const productIsValid = this.validateField('productName');
        const priceIsValid = this.validateDecimal('productPrice');
        const stockIsValid = this.validateInteger('stockAmount');
        const descriptionIsValid = this.validateField('productDescription');
        const categoryIsValid = this.validateField('productCategory');
        const featuresAreValid = this.validateFeatures();

        // devuelve true si todos los campos son válidos
        return productIsValid && priceIsValid && stockIsValid && descriptionIsValid && categoryIsValid && featuresAreValid;
    },

    /**
     * Valida un campo
     * @param baseId
     * @returns {boolean}
     */
    validateField: function(baseId) {

        // obtiene el elemento
        const element = document.getElementById(baseId);

        // valida si está vacío
        const isError = element.value.trim() === "";

        // aplica estilos
        this.validateApplyStyles(baseId, isError);

        // devuelve true si no hay error
        return !isError;
    },

    /**
     * Valida un campo tipo entero
     * @param baseId
     * @returns {boolean}
     */
    validateInteger: function(baseId) {

        // obtiene el elemento
        const element = document.getElementById(baseId);

        // valida si está vacío o si no es un número entero
        const isError =  !element.value || !/^-?\d+$/.test(element.value.trim());

        // aplica estilos
        this.validateApplyStyles(baseId, isError);

        // devuelve true si no hay error
        return !isError;
    },

    /**
     * Valida un campo tipo decimal
     * @param fieldId
     * @returns {boolean}
     */
    validateDecimal: function(fieldId) {

        // obtiene el elemento
        const element = document.getElementById(fieldId);

        // obtiene el label
        const label = document.getElementById(fieldId + 'Label');

        // remueve los separadores de miles
        let value = element.value.trim();
        value = value.replace(/,/g, '');


        // valida si es un número decimal
        const isDecimal = /^(\d{1,3}(\.\d{3})*|\d+)(\.\d+)?$/.test(value);

        // valida si está vacío o si no es un número decimal
        const isError = !value || !isDecimal;

        // aplica estilos
        this.validateApplyStyles(fieldId, isError);

        // devuelve true si no hay error
        return !isError;
    },

    /**
     * Valida las características
     * @returns {boolean}
     */
    validateFeatures: function() {

        // obtiene las características seleccionadas
        const features = document.querySelectorAll("input[name='features']:checked");

        // valida si no hay características seleccionadas
        const isError = features.length < 1;

        // aplica estilos
        this.validateApplyStyles("features", isError)

        // devuelve true si no hay error
        return !isError;
    },

    /**
     * Aplica estilos de validación
     * @param fieldID
     * @param isError
     */
    validateApplyStyles: function(fieldID, isError) {

        // obtiene los elementos
        const element = document.getElementById(fieldID);
        const label = document.getElementById(fieldID + 'Label');
        const errorDiv = document.getElementById(fieldID + 'Error');

        // si el elemento existe
        if (element) {

            // si hay error
            if (isError === true) {
                element.classList.add('border-red-500');
                element.classList.remove('border-green-500');
            }
            // si no hay error
            else if (isError === false) {
                element.classList.remove('border-red-500');
                element.classList.add('border-green-500');
            }
            // si no se especifica error
            else
            {
                element.classList.remove('border-red-500');
                element.classList.remove('border-green-500');
            }
        }

        // si el label existe
        if (label) {


            // si hay error
            if (isError === true)
            {
                label.classList.add('text-red-500');
                label.classList.remove('text-green-500');
            }
            // si no hay error
            else if (isError === false)
            {
                label.classList.remove('text-red-500');
                label.classList.add('text-green-500');
            }
            // si no se especifica error
            else
            {
                label.classList.remove('text-red-500');
                label.classList.remove('text-green-500');
            }
        }

        // si el div de error existe
        if (errorDiv)
        {

            // si hay error, muestra el mensaje de error
            if (isError === true) {
                errorDiv.innerText = isError ? "Por favor, corrige el campo" : "";
            }
            // oculta el mensaje de error
            else {
                errorDiv.innerText = "";
            }
        }

    },

    /**
     * Formatea un número a moneda
     * @param number
     * @returns {string}
     */
    formatMoney: function(number) {

        // si no hay número, devuelve "$0.00"
        if (!number) return "$0.00";

        // si es un string, elimina los caracteres no numéricos
        if( typeof number === 'string' ) number = number.replace(/[^0-9.]/g, '');

        // convierte a float
        const floatValue = typeof number === "number" ? number : parseFloat(number);

        // si no es un número, devuelve "$0.00"
        if (isNaN(floatValue)) return "$0.00";

        // formatea el número
        const formattedNumber = floatValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        // devuelve el número formateado
        return "$" + formattedNumber;
    }
};

// inicializa el catálogo
catalog.init();