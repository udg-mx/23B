/**
 * plugin de jquery para alimentar, paginar y ordenar una tabla
 */
(function ($) {


    $.fn.udgTable = function (options) {

        // settings predeterminados
        const settings = {...{
                tableId: '#jsonTable',
                entriesPerPage: 10,
                searchBox: '#searchBox',
                searchButton: '#searchButton',
                entriesSelect: '#entriesPerPage',
                prevButton: '#prevPage',
                firstButton: '#firstPage',
                lastButton: '#lastPage',
                nextButton: '#nextPage',
                paginator: '#paginator',
                pageIndicator: '#pageIndicator',
                apiUrl: 'https://721-u3.udgv.dev/api/books/'
            }, ...options};

        // datos del xml
        let jsonData = [];

        // total de páginas
        let totalPages = 0;

        // total de entradas
        let totalEntries = 0;

        // página actual
        let currentPage = 1;

        // campo de ordenamiento
        let sortField = null;

        // orden de ordenamiento
        let sortOrder = 'asc';


        // carga el xml
        function loadApiData() {

            // obtiene el término de búsqueda
            const searchTerm = $(settings.searchBox).val();

            // obtiene el número de entradas por página
            const limit = $(settings.entriesSelect).val();

            // obtiene la página actual
            const page = currentPage;

            // muestra el loader
            $("#loader-overlay").removeClass("hidden");

            return $.ajax({
                type: "GET",
                url: settings.apiUrl,
                data: {
                    query: searchTerm,
                    limit: limit,
                    page: page,
                    sort: sortField,
                    order: sortOrder
                },
                dataType: "json"
            }).then(function (response) {

                // asigna los datos
                jsonData = response.data ?? [];

                // asigna el total de páginas
                totalPages = response.pages ?? 0;
                totalPages = typeof totalPages === 'string' ? parseInt(totalPages) : totalPages;

                // asigna el total de entradas
                totalEntries = response.total ?? 0;
                totalEntries = typeof totalEntries === 'string' ? parseInt(totalEntries) : totalEntries;

            }).done(function () {

                // oculta el loader
                $("#loader-overlay").addClass("hidden");
            });
        }



        // renderiza la tabla
        function renderTable() {

            // obtiene el tbody de la tabla
            const tbody = $(this).find('tbody');

            // vacía el tbody
            tbody.empty();

            // recorre los datos paginados
            jsonData.forEach((row, index) => {

                // crea una fila
                const tr = $('<tr></tr>');

                // agrega la clase si es par o impar
                tr.addClass("odd:bg-gray-100 even:bg-gray-200");

                // recorre las columnas
                $(this).find('thead th').each(function() {

                    // obtiene el nombre del campo
                    const field = $(this).data('field');


                    // si el campo es el url
                    if (field === 'url')
                    {
                        // agrega la celda a la fila
                        tr.append(`<td class="text-center"><a href="${row[field] || ''}" class="text-blue-500 hover:text-blue-700 underline" target="_blank">Ver</a></td>`);
                    }
                    else
                    {
                        // agrega la celda a la fila
                        tr.append(`<td>${row[field] || ''}</td>`);
                    }

                });

                // agrega la fila al tbody
                tbody.append(tr);
            });

            // actualiza el total de items
            $('#total-items').html(totalEntries);

            // obtiene el paginador
            const paginator = $(settings.paginator);

            // vacía el paginador
            paginator.empty();

            // recorre las páginas
            for (let i = 1; i <= totalPages; i++)
            {
                // crea un botón
                const btn = $(`<button class="ui-button">${i}</button>`);

                // establece el evento click del botón para cambiar de página
                btn.click(() => {
                    currentPage = i;
                    renderTable.call(this);
                });

                // agrega el botón al paginador
                paginator.append(btn);
            }

            // actualiza el indicador de página
            $(settings.pageIndicator).text(`${currentPage} de ${totalPages}`);
        }

        /**
         * Ordena los datos.
         * @param data
         * @param field
         * @param order
         * @returns {*}
         */
        function sortData(data, field, order) {

            return data.sort((a, b) => {

                // convierte los valores a minúsculas
                const valueA = a[field].toString().toLowerCase();
                const valueB = b[field].toString().toLowerCase();

                // compara los valores. Si el orden es descendente, invierte el resultado
                if (valueA < valueB) return order === 'asc' ? -1 : 1;

                // compara los valores. Si el orden es descendente, invierte el resultado
                if (valueA > valueB) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        /**
         *
         * @param data
         * @param page
         * @param entries
         * @returns {*}
         */
        function paginate(data, page, entries) {

            // calcula el índice de inicio
            const start = (page - 1) * entries;

            // calcula el índice de fin
            const end = start + entries;

            // retorna los datos paginados
            return data.slice(start, end);
        }

        /**
         * Evento change del select de entradas por página.
         */
        $(settings.entriesSelect).change(() =>
        {
            // vuelve a la primera página
            currentPage = 1;

            // convierte el valor a entero
            settings.entriesPerPage = parseInt($(settings.entriesSelect).val());

            // carga los datos del api
            loadApiData().then(() => {
                renderTable.call(this);
            });
        });


        /**
         * Evento keypress del campo de búsqueda.
         */
        $(settings.searchBox).keypress(function (e) {
            if (e.which == 13) {

                // vuelve a la primera página
                currentPage = 1;

                // carga los datos del api
                loadApiData().then(() => {
                    renderTable.call($(settings.tableId)); // renderiza la tabla
                });

            }
        });



        /**
         * Evento input del campo de búsqueda.
         */
        $(settings.searchButton).on('click', () =>
        {
            // vuelve a la primera página
            currentPage = 1;

            // carga los datos del api
            loadApiData().then(() => {
                renderTable.call($(settings.tableId)); // renderiza la tabla
            });
        });

        /**
         * Evento click de los encabezados de columna.
         */
        $(this).on('click', '.sortable', function()
        {

            console.log('click sortable');
            // si el campo de ordenamiento es el mismo, invierte el orden
            if (sortField === $(this).data('field'))
            {
                // invierte el orden
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            } else
            {
                // establece el orden ascendente
                sortOrder = 'asc';
            }

            // obtiene el campo de ordenamiento
            sortField = $(this).data('field');


            // carga los datos del api
            loadApiData().then(() => {
                // renderiza la tabla
                renderTable.call($(this).closest('table'));
            });

        });


        /**
         * Evento click del botón de página anterior.
         */
        $(settings.prevButton).click(() => {

            // si la página actual es mayor a 1
            if (currentPage > 1)
            {
                // resta 1 a la página actual
                currentPage--;

                // carga los datos del api
                loadApiData().then(() => {
                    renderTable.call(this);
                });
            }
        });

        /**
         * Evento click del botón de página siguiente.
         */
        $(settings.nextButton).click(() =>
        {

            // si la página actual es menor al total de páginas
            if (currentPage < totalPages)
            {
                // suma 1 a la página actual
                currentPage++;

                // carga los datos del api
                loadApiData().then(() => {
                    renderTable.call(this); // renderiza la tabla
                });
            }
        });

        /**
         * Evento click del botón de primera página.
         */
        $(settings.firstButton).click(() =>
        {

            // establece la página actual en 1
            currentPage = 1;

            // carga los datos del api
            loadApiData().then(() => {
                renderTable.call(this); // renderiza la tabla
            });

        });

        /**
         * Evento click del botón de última página.
         */
        $(settings.lastButton).click(() =>
        {

            // establece la página actual en la última página
            currentPage = totalPages;

            // carga los datos del api
            loadApiData().then(() => {
                renderTable.call(this); // renderiza la tabla
            });

        });

        /**
         * Carga los datos del api.
         */
        loadApiData().then(() => {
            renderTable.call(this); // renderiza la tabla
        });

        return this;
    };
}(jQuery));

$(document).ready(function() {
    $('#jsonTable').udgTable();
});
