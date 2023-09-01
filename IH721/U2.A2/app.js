const convertForm = {

    /**
     * Inicializa el formulario
     */
    init: function()
    {
        // event listener para el botón de convertir a JSON
        document.getElementById('btnToJson').addEventListener('click', this.convert);

        // event listener para el botón de convertir a tabla
        document.getElementById('btnToTable').addEventListener('click', this.jsonToTable);

    },

    /**
     * Convierte los datos del formulario a JSON
     */
    convert: function()
    {
        // generar objeto con los datos del formulario
        const formData = {
            productName: document.getElementById('productName').value,
            productPrice: document.getElementById('productPrice').value,
            stockAmount: document.getElementById('stockAmount').value,
            productDescription: document.getElementById('productDescription').value,
            productCategory: document.getElementById('productCategory').value,
            features: Array.from(document.querySelectorAll('input[name="features"]:checked')).map(cb => cb.value)
        };

        // mostrar el objeto en el textarea
        convertForm.displayJsonObject(formData);

    },

    /**
     * Muestra el objeto en el textarea
     * @param data
     */
    displayJsonObject: function(data) {
        document.getElementById('jsonOutput').value = JSON.stringify(data, null, 4);
        convertForm.jsonToTable();
    },

    /**
     * Convierte el JSON del textarea a una tabla
     */
    jsonToTable: function() {

        // obtener el textarea
        const textarea = document.getElementById('jsonOutput');

        // convertir el texto del textarea a un objeto
        const jsonObj = (() => {
            try { return JSON.parse(textarea.value); }
            catch (e) { return {}; }
        })();

        // obtener el tbody de la tabla
        const tableBody = document.getElementById('tableOutput');
        tableBody.innerHTML = ''; // limpiar el tbody

        // si el objeto tiene propiedades
        if (Object.keys(jsonObj).length > 0)
        {

            // recorrer las propiedades del objeto
            for (const key in jsonObj)
            {
                // obtener el valor de la propiedad
                let value = jsonObj[key];

                // si el valor es un array, convertirlo a string
                if (Array.isArray(value)) {
                    value = value.join(', ');
                }

                // crea un row con clases tailwind
                const tr = document.createElement('tr');
                tr.classList.add('even:bg-gray-50', 'odd:bg-gray-100');

                // crea la celda de la llave y aplica clases tailwind
                const tdKey = document.createElement('td');
                tdKey.className = 'px-6 py-4 whitespace-nowrap font-bold';
                tdKey.innerText = key;

                // agrega la celda de la llave al row
                tr.appendChild(tdKey);

                // crea la celda del valor y aplica clases tailwind
                const tdValue = document.createElement('td');
                tdValue.className = 'px-6 py-4 whitespace-nowrap';
                tdValue.innerText = value;

                // agrega la celda del valor al row
                tr.appendChild(tdValue);

                // agrega el row al tbody
                tableBody.appendChild(tr);

            }

        }
        // si el objeto no tiene propiedades
        else
        {

            // crea un row con clases tailwind
            const tr = document.createElement('tr');
            tr.className = 'bg-gray-50';

            // crea la celda y aplica clases tailwind
            const td = document.createElement('td');
            td.className = 'px-6 py-4 whitespace-nowrap text-center italic';

            // aplica colspan para que ocupe todas las columnas
            td.setAttribute("colspan", "8");

            // agrega el texto a la celda
            td.innerText = 'No existen datos.';

            // agrega la celda al row
            tr.appendChild(td);

            // agrega el row al tbody
            tableBody.appendChild(tr);
        }


    }
}

// inicializar el formulario
convertForm.init();

// convertir los datos del formulario a JSON
convertForm.convert();
