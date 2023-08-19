
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Contacto</title>
    
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-200 py-10">

    <header class="text-center mb-10">
        <h1 class="text-4xl font-bold">Formulario de Contacto</h1>
    </header>

    <section class="flex justify-center">
        <div class="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <?php 
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $nombre = $_POST["nombre"] ?? "";
                $email = $_POST["email"] ?? "";
                $mensaje = $_POST["mensaje"] ?? "";
                $seleccion_unica = $_POST["seleccion_unica"] ?? "";
                $seleccion_multiple = $_POST["seleccion_multiple"] ?? [];

                echo "<div class='mb-6 text-green-600'>Datos enviados con éxito:</div>";
                echo "<p>Nombre: $nombre</p>";
                echo "<p>Email: $email</p>";
                echo "<p>Mensaje: $mensaje</p>";
                echo "<p>Selección única: $seleccion_unica</p>";
                echo "<p>Selecciones múltiples:</p>";
                echo "<ul>";
                foreach ($seleccion_multiple as $value) {
                    echo "<li>$value</li>";
                }
                echo "</ul>";
            }
            ?>

            <form action="" method="post" class="mt-4">
                <div class="mb-4">
                    <label for="nombre" class="block text-sm mb-2">Nombre:</label>
                    <input type="text" name="nombre" id="nombre" class="w-full p-2 border rounded-lg">
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-sm mb-2">Email:</label>
                    <input type="email" name="email" id="email" class="w-full p-2 border rounded-lg">
                </div>

                <div class="mb-4">
                    <label for="mensaje" class="block text-sm mb-2">Mensaje:</label>
                    <textarea name="mensaje" id="mensaje" rows="4" class="w-full p-2 border rounded-lg"></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-sm mb-2">Selección única:</label>
                    <select name="seleccion_unica" class="w-full p-2 border rounded-lg">
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                        <option value="opcion3">Opción 3</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block text-sm mb-2">Selección múltiple:</label>
                    <select name="seleccion_multiple[]" multiple class="w-full p-2 border rounded-lg">
                        <option value="multi1">Multi 1</option>
                        <option value="multi2">Multi 2</option>
                        <option value="multi3">Multi 3</option>
                        <option value="multi4">Multi 4</option>
                    </select>
                </div>

                <div class="mb-4">
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Enviar</button>
                </div>
            </form>
        </div>
    </section>

    <footer class="text-center mt-10">
        <p class="text-gray-600">Todos los derechos reservados - 2023</p>
    </footer>
</body>

</html>

