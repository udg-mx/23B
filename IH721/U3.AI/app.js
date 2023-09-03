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
                searchReset: '#reset-search',
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

        let rotation = 0;
        let rotationInterval;


        // obtiene la lista de libros via ajax
        function fetchData() {

            // obtiene el término de búsqueda
            const searchTerm = $(settings.searchBox).val();

            // obtiene el número de entradas por página
            const limit = $(settings.entriesSelect).val();

            // obtiene la página actual
            const page = currentPage;

            // muestra el loader
            animationLoader(false); //$("#loader-overlay").removeClass("hidden");

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
                animationLoader(true); //$("#loader-overlay").addClass("hidden");
            });
        }



        // renderiza la tabla
        function renderTable() {

            // obtiene el tbody de la tabla
            const tbody = $(this).find('tbody');

            animationTable(true)


            // vacía el tbody
            tbody.empty();

            if (jsonData.length > 0)
            {
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
                            tr.append(`<td class="text-center"><a href="${row[field] || ''}" class="book-link text-blue-500 hover:text-blue-700 underline" target="_blank">Ver</a></td>`);
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


                $(".book-link").click(function(e) {

                    // Detener la acción predeterminada del enlace
                    e.preventDefault();

                    // asigna el link y abre el diálogo
                    $("#link-confirm").data('link', $(this).attr("href")).dialog("open");

                });

            }
            else
            {
                // muestra mensaje de no hay datos en la tabla
                const tr = $('<tr></tr>');
                tr.append(`<td colspan="5" class="text-center">No hay datos en la tabla</td>`);
                tbody.append(tr);

                $("#no-results-dialog").dialog("open");
            }

            if ($(settings.searchBox).val())
            {
                $('#footer').fadeIn();
            }
            else
            {
                $('#footer').fadeOut();
            }

            animationTable();
            animateRows();

            // actualiza el total de items
            $('#total-items').html(totalEntries);

            // obtiene el paginador
            const paginator = $(settings.paginator);

            // vacía el paginador
            paginator.empty();


            // actualiza el indicador de página
            $(settings.pageIndicator).text(`${currentPage} de ${totalPages}`);
        }

        function animationLoader(inOut)
        {
            clearInterval(rotationInterval);


            if (!inOut)
            {
                $("#loader-overlay").removeClass("hidden");
                rotationInterval = setInterval(rotateSpinner, 50);
            }
            else
            {
                $("#loader-overlay").addClass("hidden");
            }

        }

        function rotateSpinner()
        {
            rotation += 10;
            $('#loader-overlay .fa-spinner').css('transform', 'rotate(' + rotation + 'deg)');

        }

        function animationTable(start)
        {
            if (start)
            {
                $("#jsonTable tbody").fadeOut('fast');
            }
            else
            {
                $("#jsonTable tbody").fadeIn('slow')
            }

        }


        /**
         * Animación de las filas de la tabla.
         */
        function animateRows()
        {
            $("#jsonTable tr").hover(
                function() { // Al pasar el mouse
                    $(this).stop().animate({
                        "fontSize": "1.05em", // aumenta el tamaño de la fuente un 5%
                    }, 200) // 200 es la velocidad de la animación
                        .addClass("font-bold"); // agrega la clase font-bold
                },
                function() { // Al quitar el mouse
                    $(this).stop().animate({
                        "fontSize": "1em", // devuelve el tamaño de la fuente a su tamaño original
                    }, 200)
                        .removeClass("font-bold"); 88// elimina la clase font-bold
                }
            );
        }

        function animateButtons()
        {
            $("button")
                .on('mouseover', function() {
                    console.log('mouseover');


                    $(this).animate({
                        opacity: 0.99   // apenas notarás este cambio
                    }, {
                        duration: 100,
                        complete: function() {
                            $(this).css('boxShadow', '5px 5px 15px rgba(0, 0, 0, 0.3)');
                            $(this).css('opacity', 1);
                        }
                    });

                })
                .on('mouseout', function() {

                    $(this).animate({
                        opacity: 0.99  // apenas notarás este cambio
                    }, {
                        duration: 100,
                        complete: function() {
                            $(this).css('boxShadow', 'none'); // Elimina el boxShadow
                            $(this).css('opacity', 1);
                        }
                    });

                })
            ;

        }

        /**
         * Inicializa los diálogos modales.
         */
        function modalResultsInit()
        {
            // diálogo de jquery ui
            $(".ui-dialog").dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                    "Aceptar": function() {
                        $(this).dialog("close");
                    }
                },
                show: 'fade',
                hide: 'fade'

            });

            // diálogo de jquery ui
            $("#reset-confirm").dialog({
                autoOpen: false,
                modal: true,
                buttons: {
                    "Aceptar": function() {

                        $(settings.searchBox).val('');
                        $(settings.searchButton).trigger('click');

                        $(this).dialog("close");

                    },
                    "Cancelar": function ()
                    {
                        $(this).dialog("close");
                    }
                },
                show: 'fade',
                hide: 'fade'
            });

            $("#link-confirm").dialog({
                autoOpen: false,
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Abrir": function() {
                        window.open($(this).data('link'), '_blank');
                        $(this).dialog("close");
                    },
                    Cancelar: function() {
                        $(this).dialog("close");
                    }
                }
            });
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
            fetchData().then(() => {
                renderTable.call(this);
            });
        });


        /**
         * Evento keypress del campo de búsqueda.
         */
        $(settings.searchBox).keypress(function (e) {
            if (e.which == 13) {



                if ($(this).val().length > 0 && $(this).val().length < 3)
                {
                    $('#search-validation-dialog').dialog('open')
                    return;
                }

                // vuelve a la primera página
                currentPage = 1;

                // carga los datos del api
                fetchData().then(() => {
                    renderTable.call($(settings.tableId));
                });

            }
        });



        /**
         * Evento input del campo de búsqueda.
         */
        $(settings.searchButton).on('click', () =>
        {

            if ($(settings.searchBox).val().length > 0 && $(settings.searchBox).val().length < 3)
            {
                $('#search-validation-dialog').dialog('open')
                return;
            }

            // vuelve a la primera página
            currentPage = 1;

            // carga los datos del api
            fetchData().then(() => {
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
            fetchData().then(() => {
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
                fetchData().then(() => {
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
                fetchData().then(() => {
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
            fetchData().then(() => {
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
            fetchData().then(() => {
                renderTable.call(this); // renderiza la tabla
            });

        });

        $(settings.searchReset).click(() =>
        {

            $("#reset-confirm").dialog('open');

        });

        /**
         * Carga los datos del api.
         */
        fetchData().then(() => {
            renderTable.call(this); // renderiza la tabla
        });

        /**
         * inicializa la animación de los botones
         */
        animateButtons();

        /**
         * inicializa los diálogos modales
         */
        modalResultsInit();

        return this;
    };
}(jQuery));

$(document).ready(function() {
    $('#jsonTable').udgTable();
});
