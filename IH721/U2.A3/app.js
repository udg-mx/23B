const SpeedTest = new class  {


    constructor() {

        // obtiene el botón de iniciar prueba
        this.startBtn = document.getElementById('startBtn');

        // obtiene el contenedor de las promesas
        this.promisesContainer = document.getElementById('promiseList');

        // agrega el listener al botón de iniciar prueba
        this.startBtn.addEventListener('click', () => SpeedTest.start());

        // inicializa el gráfico
        this.displayChart(0);

    }

    /**
     * Inicia la prueba de velocidad.
     */
    start()
    {

        // limpia el contenedor de promesas
        this.promisesContainer.innerHTML = "";

        // cambia el texto del botón
        this.startBtn.textContent = "Prueba en Proceso";

        // cambia el color del botón
        this.startBtn.classList.remove('bg-blue-500', 'hover:bg-blue-700');
        this.startBtn.classList.add('bg-gray-400');

        // deshabilita el botón
        this.startBtn.disabled = true;

        // genera las promesas
        const promises = this.generatePromises();

        // finaliza la prueba de velocidad
        promises.finally(() => this.endTest());
    }

    /**
     * Genera las promesas.
     */
    async generatePromises() {

        // crea un array para almacenar las promesas
        const promiseList = [];

        // tiempo objetivo
        const targetTime = 10000;

        // variante de velocidad
        const speedVariant = 50;

        // interfaz de entrada
        const speedInterface = {
            id: 0,
            speed: 0,
            time: 0,
        };

        // genera 10 promesas
        [
            {...speedInterface, speed: 50},
            {...speedInterface, speed: 100},
            {...speedInterface, speed: 150},
            {...speedInterface, speed: 200},
            {...speedInterface, speed: 250},
            {...speedInterface, speed: 300},
            {...speedInterface, speed: 350},
            {...speedInterface, speed: 400},
            {...speedInterface, speed: 450},
            {...speedInterface, speed: 500}
        ].map((rawEntry, index) => {

            // crea una copia del objeto de entrada
            const entry = {...rawEntry};


            // asigna un id y un tiempo aleatorio
            entry.id = index + 1;

            // asigna un tiempo aleatorio
            entry.time = (Math.random() * targetTime) + 1;

            // asigna una velocidad aleatoria
            entry.speed = entry.speed + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * speedVariant) + 1);

            // crea una promesa
            const promise = new Promise((resolve) => {

                // agrega la promesa al contenedor de promesas
                this.promiseListStart(entry);

                // genera un timeout para resolver la promesa
                setTimeout(() => {
                    resolve(entry);
                }, entry.time); // el tiempo de resolución

            });


            promise.then((entry) =>
            {
                // finaliza la promesa en el contenedor de promesas
                this.promiseListDone(entry);

                // retorna la velocidad para la siguiente acción
                return entry.speed;

            }).then((speed) =>
            {
                // actualiza el gráfico con la nueva velocidad
                this.displayChart(speed);
            })

            // agrega la promesa al array de promesas
            promiseList.push(promise);

        });

        // ejecuta todas las promesas
        return Promise.all(promiseList)

    }

    /**
     * Agrega una promesa al contenedor de promesas.
     * @param entry
     */
    promiseListStart(entry)
    {
        // agrega la promesa al contenedor de promesas
        this.promisesContainer.innerHTML += `
            <li class="p-2 rounded ${entry.finished ? 'bg-green-200' : 'bg-red-200'}" id="entry-${entry.id}">
                Promise ${entry.id} - ${entry.time.toFixed(2)}ms - ${entry.speed}mbps
            </li>`;
    }

    /**
     * Finaliza una promesa en el contenedor de promesas.
     * @param entry
     */
     promiseListDone(entry)
     {
         // obtiene el elemento de la promesa
        const entryElement = document.getElementById(`entry-${entry.id}`);

        // cambia el color de fondo
        entryElement.classList.remove('bg-red-200');
        entryElement.classList.add('bg-green-200');
     }

    /**
     * Finaliza la prueba de velocidad.
     */
    endTest() {

        // cambia el texto del botón
        this.startBtn.textContent = "Iniciar Prueba";

        // cambia el color del botón
        this.startBtn.classList.remove('bg-gray-400');
        this.startBtn.classList.add('bg-blue-500', 'hover:bg-blue-700');

        // habilita el botón
        this.startBtn.disabled = false;

    }

    /**
     * Muestra el gráfico.
     * @param speed
     */
    displayChart(speed) {

        // crea los datos del gráfico
        const data = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: speed,
                title: { text: "Velocidad", font: { size: 24 } },
                delta: { reference: 500, increasing: { color: "RebeccaPurple" } },
                gauge: {
                    axis: { range: [null, 600], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 1,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 50], color: "red" },
                        { range: [51, 150], color: "orange" },
                        { range: [151, 350], color: "yellow" },
                        { range: [351, 500], color: "green" }
                    ]
                }
            }
        ];

        // crea el layout del gráfico
        const layout = {
            width: 400,
            height: 300,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "white",
            font: { color: "darkblue", family: "Arial" }
        };

        // muestra el gráfico
        Plotly.newPlot('gaugeContainer', data, layout);
    }
}
