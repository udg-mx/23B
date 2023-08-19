
<?php
$nombre = $_GET['nombre'] ?? null;
$edad = $_GET['edad'] ?? null;
$saludo = '';

if ($nombre !== null && $edad !== null) {
    if ($edad < 18) {
        $saludo = "¡Hola, $nombre! Eres un joven.";
    } elseif ($edad >= 18 && $edad <= 60) {
        $saludo = "¡Hola, $nombre! Eres un adulto.";
    } else {
        $saludo = "¡Hola, $nombre! Eres una persona mayor.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Saludo según la edad</title>
</head>

<body>

    <?php if ($saludo): ?>
    <p><?= $saludo ?></p<p><hr></p>
    <?php endif; ?>

    <form action="?" method="GET">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>

        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required min="0">

        <input type="submit" value="Enviar">
    </form>

</body>

</html>

