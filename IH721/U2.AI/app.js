const app = new class {
    constructor() {
        // Element references
        this.userSelect = document.getElementById('userSelect');
        this.postInput = document.getElementById('postInput');
        this.postList = document.getElementById('postList');
        this.noPostsMessage = document.getElementById('noPostsMessage');
        this.noPostDetails = document.getElementById('noPostDetails');
        this.postDetails = document.getElementById('postDetails');
        this.postTitle = document.getElementById('postTitle');
        this.postBody = document.getElementById('postBody');
        this.commentsList = document.getElementById('commentsList');

        // obtener los usuarios
        this.fetchUsers().then(() => {

            // llena el select de usuarios
            this.populateUserSelect();
        });

        // inicializar los event listeners
        this.addEventListeners();
    }


    /**
     * Obtiene los usuarios de la API y los almacena en la propiedad users.
     * @returns {Promise<void>}
     */
    async fetchUsers() {

        // consume el endpoint de usuarios
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // almacena los usuarios en la propiedad users
        this.users = await response.json();


    }

    /**
     * Obtiene los posts de la API y los filtra.
     *
     * Si no se especifica un usuario, devuelve todos los posts.
     * Si se especifica un usuario, devuelve los posts de ese usuario.
     * Si se especifica un texto de búsqueda, devuelve los posts que contengan ese texto.
     * Si se especifica un usuario y un texto de búsqueda, devuelve los posts de ese usuario que contengan ese texto.
     *
     * @param userId
     * @param searchText
     * @returns {Promise<*>}
     */
    async fetchPosts(userId, searchText) {

        // consume el endpoint de posts
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // almacena los posts en la variable posts como un array de objetos
        const posts = await response.json();

        // filtra los posts
        return posts.filter(post => {

            return (!userId || post.userId == userId) &&
                (!searchText || post.title.includes(searchText));
        });
    }

    /**
     * Obtiene los comentarios de un post de la API.
     * @param postId
     * @returns {Promise<any>}
     */
    async fetchComments(postId) {
        // consume el endpoint de comentarios
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

        // retorna los comentarios del post como un objeto
        return await response.json();
    }

    /**
     * Obtiene los detalles de un post de la API.
     * @param postId
     * @returns {Promise<any>}
     */
    async fetchPostDetails(postId) {

        // consume el endpoint de detalles de un post
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

        // retorna los detalles del post como un objeto
        return await response.json();
    }

    /**
     * Obtiene los detalles de un usuario de la API.
     * @param userId
     * @returns {Promise<any>}
     */
    async fetchUserDetails(userId) {
        // consume el endpoint de detalles de un usuario
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        // retorna los detalles del usuario como un objeto
        return await response.json();
    }

    /**
     * Muestra los posts en la lista de posts.
     * @param userId
     * @param searchText
     * @returns {Promise<void>}
     */
    async searchPosts(userId, searchText) {

        // limpiar los detalles del post
        this.clearPostDetails();

        // limpiar la lista de posts
        this.postList.innerHTML = '';

        // obtener los posts
        const posts = await this.fetchPosts(userId, searchText);


        if (posts.length > 0)
        {
            this.displayPosts(posts) // muestra publicaciones
        }
        else
        {
            this.emptyPosts(); // muestra mensaje de no hay publicaciones
        }

    }

    displayPosts(posts)
    {

        // si hay posts, oculta el mensaje
        this.noPostsMessage.classList.add('hidden');

        // muestra los posts en la lista
        for (const post of posts) {

            // crea un elemento li
            const listItem = document.createElement('li');
            listItem.classList.add('py-3', 'flex', 'justify-between', 'items-center');

            // obtiene el nombre del autor del post
            const authorName = this.getUserName(post.userId);

            // agrega el contenido al elemento li
            listItem.innerHTML = `
            <div class="w-full post-item" data-id="${post.id}">
                <a href="#" class="text-gray-700 font-semibold view-button" data-id="${post.id}">${post.title}</a>
                <p class="text-sm text-gray-500">${post.body.slice(0, 50)}...</p>
                <p class="mt-1 text-xs text-gray-400">${authorName}</p>
            </div>
        `;

            // agrega el elemento li a la lista
            this.postList.appendChild(listItem);
        }

    }

    emptyPosts()
    {
        this.noPostsMessage.classList.remove('hidden');
        this.postList.innerHTML = '';
    }

    /**
     * Muestra los detalles de un post.
     * @param postId
     * @returns {Promise<void>}
     */
    async displayPostDetails(postId) {

        // limpiar los detalles del post
        this.clearPostDetails();

        // obtener los detalles del post
        const post = await this.fetchPostDetails(postId);

        // agrega el contenido a los elementos del DOM
        this.postTitle.textContent = post.title;
        this.postBody.textContent = post.body;


        // obtiene los detalles del autor del post
        const user = await this.fetchUserDetails(post.userId);


        // obtiene los detalles del autor del anterior post
        const previousUserDetails = this.postDetails.querySelector('.author-details');

        // si hay detalles del autor del post anteriores, los remueve
        if (previousUserDetails) {

            this.postDetails.removeChild(previousUserDetails);
        }

        // obtiene el elemento que contiene los detalles del autor del post
        const userDetails = document.getElementById('authorInfo');
        // agrega el contenido al elemento
        userDetails.innerHTML = `
        <p class="text-gray-700">${user.name}</p>
        <p class="text-gray-700">${user.email}</p>
    `;

        // muestra los detalles del post
        this.postDetails.classList.remove('hidden');
        this.noPostDetails.classList.add('hidden');

        // muestra los comentarios del post
        this.fetchComments(postId).then(comments =>
        {
            this.displayComments(comments);
        });




        // obtiene el elemento li del post
        const postItem = this.postList.querySelector(`.post-item[data-id="${postId}"]`);

        // agrega la clase de post seleccionado
        postItem.classList.add('bg-gray-200');
    }

    /**
     * Muestra los comentarios de un post.
     * @param comments
     * @returns void
     */
    displayComments(comments) {


        // limpia la lista de comentarios
        this.commentsList.innerHTML = '';

        // muestra los comentarios en la lista
        comments.forEach(comment => {

            // crea un elemento li y agrega clases de tailwind
            const listItem = document.createElement('li');
            listItem.classList.add('py-3', 'border-t');

            // crea un elemento div y agrega clases de tailwind
            const userAndEmail = document.createElement('div');
            userAndEmail.classList.add('flex', 'items-center', 'mb-1', 'text-xs', 'text-gray-400');

            // agrega el contenido al elemento div
            userAndEmail.innerHTML = `
                <i class="far fa-user mr-1"></i>
                <span class="capitalize text-gray-600 font-bold">x${comment.name}</span>
                <span class="ml-2">${comment.email}</span>
            `;

            // agrega el elemento div al elemento li
            listItem.appendChild(userAndEmail);

            // crea un elemento p y agrega clases de tailwind
            const commentContent = document.createElement('p');
            commentContent.classList.add('text-gray-700');

            // agrega el contenido al elemento p
            commentContent.textContent = comment.body;

            // agrega el elemento p al elemento li
            listItem.appendChild(commentContent);

            // agrega el elemento li a la lista
            this.commentsList.appendChild(listItem);
        });
    }

    /**
     * Llena el select de usuarios con los usuarios obtenidos de la API.
     */
    populateUserSelect() {

        // Ordenar la lista de usuarios por nombre alfabéticamente
        const sortedUsers = this.users.sort((a, b) => a.name.localeCompare(b.name));

        // agrega un elemento option por cada usuario
        sortedUsers.forEach(user => {

            // crea un elemento option
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;

            // agrega el elemento option al select
            this.userSelect.appendChild(option);
        });
    }

    /**
     * Obtiene el nombre de un usuario a partir de su id.
     * @param userId
     * @returns {*|string}
     */
    getUserName(userId) {
        // obtiene el usuario con el id especificado
        const user = this.users.find(user => user.id === userId);

        // retorna el nombre del usuario o 'Desconocido' si no se encuentra
        return user ? user.name : 'Desconocido';
    }

    /**
     * Limpia los detalles de un post.
     */
    clearPostDetails() {


        // oculta los detalles del post
        this.postDetails.classList.add('hidden');


        // obtiene el elemento li del post seleccionado
        const selectedPost = this.postList.querySelector('.post-item.bg-gray-200');

        // si hay un post seleccionado, remueve la clase de post seleccionado
        if (selectedPost) {
            selectedPost.classList.remove('bg-gray-200');
        }

        // oculta el mensaje de no hay post seleccionado
        this.noPostDetails.classList.remove('hidden');

    }

    /**
     * Maneja el evento change del select de usuarios.
     */
    handleFormChange() {

        // obtiene el id del usuario seleccionado
        const userId = this.userSelect.value;

        // obtiene el texto de búsqueda
        const searchText = this.postInput.value;

        // muestra los posts del usuario seleccionado
        this.searchPosts(userId, searchText).finally(() => {});

    }

    /**
     * Maneja el evento click de los botones de los posts.
     * @param event
     */
    handlePostButtonClick(event) {

        // si el elemento clickeado tiene la clase view-button
        if (event.target.classList.contains('view-button'))
        {
            // previene el comportamiento por defecto del elemento
            event.preventDefault();

            // obtiene el id del post
            const postId = event.target.getAttribute('data-id');

            // muestra los detalles del post
            this.displayPostDetails(postId).finally(() => {});
        }
    }

    /**
     * Agrega los event listeners a los elementos del DOM.
     */
    addEventListeners() {

        // event listener para el select de usuarios
        this.userSelect.addEventListener('change', this.handleFormChange.bind(this));

        // event listener para el input de búsqueda de posts
        this.postInput.addEventListener('input', this.handleFormChange.bind(this));

        // event listener para la lista de posts
        this.postList.addEventListener('click', this.handlePostButtonClick.bind(this));
    }

}();
