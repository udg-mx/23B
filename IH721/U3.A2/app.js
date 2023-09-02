/**
 * plugin de jquery para alimentar, paginar y ordenar una tabla
 */
(function ($) {


    $.fn.udgTable = function (options) {

        // settings predeterminados
        const settings = {...{
            entriesPerPage: 10,
            searchBox: '#searchBox',
            entriesSelect: '#entriesPerPage',
            prevButton: '#prevPage',
            nextButton: '#nextPage',
            paginator: '#paginator',
            pageIndicator: '#pageIndicator',
            xmlUrl: 'https://721-u3.udgv.dev/U3.A2/db.xml'
        }, ...options};

        // datos del xml
        let jsonData = [];

        // página actual
        let currentPage = 1;

        // campo de ordenamiento
        let sortField = null;

        // orden de ordenamiento
        let sortOrder = 'asc';


        // carga el xml
        function loadXML() {

            // llama al xml usando ajax
            return $.ajax({
                type: "GET",
                url: settings.xmlUrl,
                dataType: "xml"
            })
                // cuando se resuelve la promesa
                .then(function(xml)
                {
                    // recorre los nodos del xml
                    $(xml).find('book').each(function() {

                        // crea un objeto con los datos del libro
                        const book = {
                            "ID": parseInt($(this).attr('ID')),
                            "Title": $(this).attr('Title'),
                            "Author": $(this).attr('Author'),
                            "PublicationDate": $(this).attr('PublicationDate'),
                            "Genre": $(this).attr('Genre'),
                            "Price": $(this).attr('Price')
                        };

                        // agrega el libro al array de datos
                        jsonData.push(book);
                    });
            });
        };


        // renderiza la tabla
        function renderTable() {

            // obtiene el tbody de la tabla
            const tbody = $(this).find('tbody');

            // vacía el tbody
            tbody.empty();

            // obtiene el valor del campo de búsqueda
            let searchTerm = $(settings.searchBox).val().toLowerCase();

            // filtra los datos

            let filteredData = jsonData.filter(row => {

                // retorna true si algún valor de la fila incluye el término de búsqueda
                return Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(searchTerm)
                );
            });

            // ordena los datos
            if (sortField) {
                // llama a la función de ordenamiento
                filteredData = sortData(filteredData, sortField, sortOrder);
            }

            // paginación
            const paginatedData = paginate(filteredData, currentPage, settings.entriesPerPage);

            // recorre los datos paginados
            paginatedData.forEach((row, index) => {

                // crea una fila
                const tr = $('<tr></tr>');

                // agrega la clase si es par o impar
                tr.addClass(index % 2 === 0 ? "ui-widget-content" : "ui-state-default");

                // recorre las columnas
                $(this).find('thead th').each(function() {

                    // obtiene el nombre del campo
                    const field = $(this).data('field');

                    // agrega la celda a la fila
                    tr.append(`<td>${row[field] || ''}</td>`);
                });

                // agrega la fila al tbody
                tbody.append(tr);
            });

            // actualiza el total de items
            $('#total-items').html(filteredData.length);

            // actualiza el total de páginas
            const totalPages = Math.ceil(filteredData.length / settings.entriesPerPage);

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

            // actualiza la cantidad de entradas por página
            settings.entriesPerPage = parseInt($(settings.entriesSelect).val());

            // vuelve a la primera página
            currentPage = 1;

            // renderiza la tabla
            renderTable.call(this);
        });


        /**
         * Evento input del campo de búsqueda.
         */
        $(settings.searchBox).on('input', () =>
        {
            // resetea la tabla
            renderTable.call(this);
        });

        /**
         * Evento click de los encabezados de columna.
         */
        $(this).on('click', '.sortable', function()
        {
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

            // renderiza la tabla
            renderTable.call($(this).closest('table'));
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

                // renderiza la tabla
                renderTable.call(this);
            }
        });

        /**
         * Evento click del botón de página siguiente.
         */
        $(settings.nextButton).click(() =>
        {
            // calcula el total de páginas
            const totalPages = Math.ceil(jsonData.length / settings.entriesPerPage);

            // si la página actual es menor al total de páginas
            if (currentPage < totalPages)
            {
                // suma 1 a la página actual
                currentPage++;

                // renderiza la tabla
                renderTable.call(this);
            }
        });

        /**
         * Carga los datos del xml.
         */
        loadXML().then(() => {
            // renderiza la tabla
            renderTable.call(this);
        });

        return this;
    };
}(jQuery));

$(document).ready(function() {
    $('#jsonTable').udgTable();
});
