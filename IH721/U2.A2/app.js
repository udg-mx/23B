const formConverter = new class {

    /**
     * Constructor de la clase.
     */
    constructor() {

        // Inicializa los event listeners
        this.loadListeners();

        this.initForm();

        // Rellena los datos del formulario con una publicación de ejemplo
        this.seedForm();

        // Convierte los datos del formulario a JSON
        this.form2Json();
    }

    postInterface = {
        postTitle: "",
        postDescription: "",
        postAuthor: "",
        postCategory: "",
        postTags: [],
        postContent: "",
        postDate: "",
        postImage: ""

    }

    /**
     * Categorías de publicaciones de blog de videojuegos
     */
    postCategories = {'review': 'Review', 'new': 'Noticias', 'analysis': 'Análisis', 'opinion': 'Opinión', 'guide': 'Guías', 'other': 'Otro'};

    /**
     * Tags de publicaciones de blog de videojuegos
     */
    // tags de publicaciones de blog de videojuegos
    postTags = {'ps4': 'PS4', 'ps5': 'PS5', 'xbox': 'Xbox', 'nintendo': 'Nintendo', 'pc': 'PC', 'mobile': 'Mobile', 'indie': 'Indie', 'retro': 'Retro', 'other': 'Otro'}


    /**
     * Autores de publicaciones de blog de videojuegos
     */
    portAuthors = {"shigeru_miyamoto": "Shigeru Miyamoto", "sid_meier": "Sid Meier", "john_carmack": "John Carmack", "jane_mcgonigal": "Jane McGonigal"}


    /**
     * Inicializa los event listeners para los botones de convertir a JSON y a tabla.
     */
    loadListeners() {

        // event listener para el botón de convertir a JSON
        document.getElementById('btnToJson').addEventListener('click', () => this.form2Json());

        // event listener para el botón de convertir a tabla
        document.getElementById('btnToTable').addEventListener('click', () => this.json2Table());
    }

    /**
     * Inicializa el formulario con los datos disponibles.
     */
    initForm() {


        // llenar las categorías del formulario con las categorías disponibles
        this.populateFormSelect('postCategory', this.postCategories, 'Selecciona una categoría');

        // llena los autores del formulario con los autores disponibles
        this.populateFormSelect('postAuthor', this.portAuthors, 'Selecciona un autor');


        // llenar los tags del formulario con los tags disponibles
        const tagsContainer = document.getElementById('tagsDiv');
        tagsContainer.innerHTML = '';

        // recorre los tags disponibles
        for (const key in this.postTags) {

            // crea un elemento checkbox
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = key;
            input.name = 'postTags';
            input.className = 'mr-2';

            // crea un elemento label
            const label = document.createElement('label');
            label.className = 'mr-4';
            label.appendChild(input);
            label.appendChild(document.createTextNode(this.postTags[key]));

            // agrega el elemento label al div
            tagsContainer.appendChild(label);
        }

    }

    populateFormSelect(selectId, options, placeholder) {

        // obtiene el select
        const select = document.getElementById(selectId);
        select.innerHTML = '';

        // crea un elemento option para el placeholder
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.innerText = placeholder;
        select.appendChild(placeholderOption);

        // recorre las opciones
        for (const key in options) {

            // crea un elemento option
            const option = document.createElement('option');
            option.value = key;
            option.innerText = options[key];

            // agrega el elemento option al select
            select.appendChild(option);
        }
    }

    /**
     * Convierte los datos del formulario a un objeto JSON.
     */
    form2Json() {

        // crea un objeto con los datos del formulario
        const formData = {
            postTitle: document.getElementById('postTitle').value,
            postDescription: document.getElementById('postDescription').value,
            postAuthor: document.getElementById('postAuthor').value,
            postCategory: document.getElementById('postCategory').value,
            postTags: Array.from(document.querySelectorAll('input[name="postTags"]:checked')).map(cb => cb.value),
            postContent: document.getElementById('postContent').value,
            postDate: document.getElementById('postDate').value,
            postImage: document.getElementById('postImage').value
        };


        // muestra el objeto JSON en el textarea
        document.getElementById('jsonOutput').value = JSON.stringify(formData, null, 4);

        // convierte el objeto JSON a una tabla
        this.json2Table();
    }

    /**
     * Rellena los datos del formulario con una publicación de ejemplo.
     */
    seedForm() {

        // envia json
        this.populateForm( {
            postTitle: "Descubre el mundo de Galaxy Raiders 2",
            postDescription: "Un vistazo detallado al título de la saga Galaxy Raiders.",
            postAuthor: "shigeru_miyamoto",
            postCategory: "review",
            postContent: "Desde la primera vez que pusimos nuestras manos en 'Galaxy Raiders', supimos que estábamos ante algo especial. Ahora, con el lanzamiento de su secuela, el juego lleva todo a un nuevo nivel. Las gráficas, la historia y las mecánicas de juego han sido mejoradas para ofrecer una experiencia inigualable...",
            postDate: new Date().toISOString().split('T')[0], // Fecha actual
            postImage: "https://placehold.co/600x400",
            postTags: ["ps4", "nintendo", "pc"]
        })


    }

    populateForm(post) {

        // normaliza el objeto post
        post = {...this.postInterface, ...post}

        // rellena los campos del formulario con los datos de la publicación
        document.getElementById('postTitle').value = post.postTitle;
        document.getElementById('postDescription').value = post.postDescription;
        document.getElementById('postAuthor').value = post.postAuthor;
        document.getElementById('postCategory').value = post.postCategory;
        document.getElementById('postContent').value = post.postContent;
        document.getElementById('postDate').value = post.postDate;
        document.getElementById('postImage').value = post.postImage;

        // si el post tiene tags y es un array
        if (post.postTags && Array.isArray(post.postTags))
        {
            // recorre los tags del post y marca los checkboxes correspondientes
            post.postTags.forEach(tag => {
                document.querySelector(`input[name="postTags"][value="${tag}"]`).checked = true;
            });
        }

    }


    /**
     * Convierte el objeto JSON a una tabla HTML.
     */
    json2Table() {

        // obtiene el textarea
        const textarea = document.getElementById('jsonOutput');

        // convierte el texto del textarea a un objeto JSON de forma segura
        const jsonObj = (() => {
            try { return JSON.parse(textarea.value); }
            catch (e) { return {}; }
        })();

        // obtiene el elemento tbody de la tabla
        const tableBody = document.getElementById('tableOutput');
        tableBody.innerHTML = ''; // limpia el contenido del tbody

        // si el objeto JSON tiene datos, los muestra en la tabla
        if (Object.keys(jsonObj).length > 0) {
            for (const key in jsonObj) {

                // obtiene el valor de la propiedad
                let value = jsonObj[key];

                // si el valor es un array, lo convierte a string
                if (Array.isArray(value)) {
                    value = value.join(', ');
                }

                // crea un elemento tr
                const tr = document.createElement('tr');
                tr.classList.add('even:bg-gray-50', 'odd:bg-gray-100');

                // crea un elemento td para la clave
                const tdKey = document.createElement('td');
                tdKey.className = 'px-6 py-4 whitespace-nowrap font-bold';
                tdKey.innerText = key;

                // agrega el elemento td a la fila
                tr.appendChild(tdKey);


                // crea un elemento td para el valor
                const tdValue = document.createElement('td');
                tdValue.className = 'px-6 py-4 whitespace-normal';
                tdValue.innerText = value;

                // agrega el elemento td a la fila
                tr.appendChild(tdValue);

                // agrega la fila al tbody
                tableBody.appendChild(tr);
            }
        }
        // si el objeto JSON no tiene datos, muestra un mensaje
        else {

            // crea un elemento tr
            const tr = document.createElement('tr');
            tr.className = 'bg-gray-50';

            // crea un elemento td para el mensaje
            const td = document.createElement('td');
            td.className = 'px-6 py-4 whitespace-nowrap text-center italic';
            td.innerText = 'No existen datos.';

            // agrega el atributo colspan al elemento td
            td.setAttribute("colspan", "8");



            // agrega el elemento td a la fila
            tr.appendChild(td);

            // agrega la fila al tbody
            tableBody.appendChild(tr);
        }
    }
}