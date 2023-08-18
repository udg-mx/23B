<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-200 min-h-screen">

<header class="bg-blue-600 text-white p-4">
    <h1 class="text-center text-2xl">Inicio de Sesión</h1>
</header>

<div class="container mx-auto mt-10 max-w-md">

    <?php

    $users = [
        [
            'username' => 'admin',
            'nombre' => 'Alejandro',
            'apellido' => 'Garcia',
            'password' => 'admin123'
        ],
        [
            'username' => 'user1',
            'nombre' => 'Luisa',
            'apellido' => 'Martinez',
            'password' => 'luisa456'
        ],
        [
            'username' => 'user2',
            'nombre' => 'Carlos',
            'apellido' => 'Vega',
            'password' => 'carlos78'
        ]
    ];

    $isLoggedIn = false;
    $message = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];

        foreach ($users as $user) {
            if ($username == $user['username'] && $password == $user['password']) {
                $isLoggedIn = true;
                $message = "¡Hola, " . $user['nombre'] . "!";
                break;
            }
        }

        if (!$isLoggedIn) {
            $message = "Credenciales incorrectas.";
        }
    }

    ?>

    <?php if (!$isLoggedIn): ?>

        <form action="" method="post" class="bg-white p-6 rounded shadow">
            <div class="mb-4">
                <label for="username" class="block text-sm font-bold mb-2">Usuario:</label>
                <input type="text" name="username" id="username" class="w-full px-3 py-2 border rounded-md">
            </div>

            <div class="mb-4">
                <label for="password" class="block text-sm font-bold mb-2">Contraseña:</label>
                <input type="password" name="password" id="password" class="w-full px-3 py-2 border rounded-md">
            </div>

            <div class="mb-4">
                <input type="submit" value="Iniciar Sesión" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            </div>

            <?php if ($message): ?>
                <div class="bg-red-300 p-3 rounded text-red-800">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>
        </form>

    <?php else: ?>

        <div class="bg-green-300 p-6 rounded text-green-800 text-center">
            <?php echo $message; ?>
        </div>

    <?php endif; ?>

</div>

<footer class="fixed bottom-0 left-0 w-full bg-blue-600 text-white p-4">
    <p class="text-center">Todos los derechos reservados. 2023.</p>
</footer>

</body>

</html>