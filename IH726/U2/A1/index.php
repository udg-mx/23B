<?php

session_start();

// Cerrar sesión si se solicita
if (isset($_GET['logout'])) {
    session_destroy();
    setcookie("lastLogin", "", time() - 3600);
    header("Location: index.php");
    exit;
}

// Establece datos de sesión y cookie si el formulario ha sido enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['name'], $_POST['email'], $_POST['password'], $_POST['dob']))
{
     $_SESSION['userdata'] = array(
            'name' => $_POST['name'],
            'email' => $_POST['email'],
            'dob' => $_POST['dob']
    );
    setcookie("lastLogin", date("Y-m-d H:i:s"), time() + (86400 * 30));
    header("Location: index.php");
    exit;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>IH726 - Lenguajes de programación Back End</title>
</head>

<body>

<header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" class="flex items-center">
                <span class="px-5 py-2 bg-white rounded-full"><svg width="200" height="27" viewBox="0 0 2134 284" version="1.1" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><g transform="matrix(4.16667,0,0,4.16667,0,0)"><path d="M417.86,7.289L417.86,39.339C417.86,42.597 417.659,45.456 417.193,47.784C416.726,50.177 415.795,52.372 414.266,54.433C406.354,65.472 388.267,65.007 380.953,53.503C379.757,51.506 378.89,49.446 378.493,47.185C378.091,44.925 377.894,42.264 377.894,39.207L377.894,7.289L383.278,7.289L383.278,39.471C383.278,48.847 386.67,57.093 398.175,57.159C409.68,57.227 412.472,48.516 412.472,39.339L412.472,7.289L417.86,7.289ZM375.566,7.289L336.135,7.289L336.135,11.743L352.958,11.743L352.958,60.952L358.343,60.952L358.343,11.743L375.566,11.743L375.566,7.289ZM293.642,7.289L293.642,60.952L288.39,60.952L288.39,7.289L293.642,7.289ZM268.64,57.294C268.109,59.819 265.914,61.681 263.252,61.681C260.528,61.681 258.265,59.686 257.801,57.159L240.578,7.289L246.628,7.289L261.924,54.035C262.122,54.632 262.656,55.032 263.252,55.032C263.784,55.032 264.185,54.765 264.452,54.368L280.078,7.289L285.928,7.289L268.64,57.294ZM319.71,7.487C324.628,7.487 328.553,8.285 331.346,9.881C333.406,11.079 335.069,12.742 336.268,14.803C337.396,16.864 337.995,19.059 337.995,21.519C337.995,25.043 336.999,28.035 335.136,30.43C333.275,32.824 330.479,34.419 326.891,35.217C330.479,35.749 333.741,37.011 335.136,42.731L339.592,61.149L334.272,61.149L330.68,44.526C329.685,40.07 326.824,38.608 324.895,38.009C322.9,37.411 320.175,37.144 316.65,37.144L304.147,37.144L304.147,61.149L298.761,61.149L298.761,16.065C298.761,11.345 302.685,7.487 307.407,7.487L319.71,7.487ZM304.147,33.089L315.986,33.089C321.172,33.089 325.229,32.29 328.22,30.829C331.147,29.299 332.609,26.373 332.609,21.851C332.609,20.055 332.144,18.46 331.147,16.931C330.214,15.401 328.884,14.271 327.156,13.406C325.094,12.408 321.969,11.877 317.913,11.877L308.937,11.877C306.277,11.877 304.147,14.072 304.147,16.731L304.147,33.089ZM494.13,56.56L494.13,60.952L470.922,60.952C466.202,60.952 462.279,57.093 462.279,52.372L462.279,7.289L467.667,7.289L467.667,51.707C467.667,54.368 469.858,56.496 472.519,56.496L494.13,56.56Z" style="fill:#959da2"/><path d="M428.698,43.064C428.698,43.064 437.872,14.943 438.006,14.536C438.116,14.234 438.478,13.529 439.397,13.533C440.309,13.568 440.629,14.262 440.712,14.538C440.76,14.689 450.176,43.064 450.176,43.064L428.698,43.064ZM444.791,11.278C443.925,8.662 442.064,6.955 439.404,6.955C436.941,6.955 434.863,8.455 434.016,11.27L416.728,61.348L422.78,61.348L427.636,46.454L451.307,46.454L456.229,61.348L462.011,61.348L444.791,11.278Z" style="fill:#959da2"/><path d="M67.667,7.101L67.667,54.468L60.901,54.468L60.901,8.792C60.901,7.858 60.143,7.101 59.209,7.101L13.533,7.101L13.533,0.334L60.424,0.334L60.424,0.353C60.581,0.342 60.739,0.334 60.9,0.334C64.637,0.334 67.667,3.364 67.667,7.101Z" style="fill:#00447c;fill-rule:nonzero"/><path d="M25.374,34.167C25.374,29.497 29.162,25.709 33.834,25.709C38.504,25.709 42.292,29.497 42.292,34.167C42.292,38.839 38.504,42.626 33.834,42.626C29.162,42.626 25.374,38.839 25.374,34.167Z" style="fill:#e41837;fill-rule:nonzero"/><path d="M8.458,61.235L54.133,61.235L54.133,68L6.766,68C3.029,68 0,64.972 0,61.235L0,13.868L6.766,13.868L6.766,59.542C6.766,60.477 7.524,61.235 8.458,61.235Z" style="fill:#00447c;fill-rule:nonzero"/><path d="M231.957,11.263C232.15,11.408 232.525,11.629 233.014,11.618C233.812,11.644 234.705,11.029 234.791,9.97C234.792,9.74 234.792,9.615 234.792,9.615L234.792,7.687L237.918,7.687L237.918,25.508L234.792,25.508C234.792,14.736 226.413,10.147 219.764,10.147C213.448,10.147 203.34,16.598 203.34,34.417C203.34,52.172 214.512,58.558 221.227,58.558C222.292,58.558 227.478,57.892 228.476,57.425L228.476,40.27C228.476,38.675 227.079,37.343 225.35,37.343L222.225,37.343L222.225,34.417L244.169,34.417L244.169,37.343L241.042,37.343C239.315,37.343 237.918,38.675 237.918,40.27L237.918,57.425L236.854,58.089C233.796,60.021 225.15,61.548 220.496,61.548C204.803,61.548 193.898,52.172 193.898,34.417C193.898,16.598 207.197,7.222 219.764,7.222C223.222,7.222 229.515,9.237 231.957,11.263ZM124.142,7.687L163.376,7.687L163.439,7.681C183.189,8.479 191.636,17.461 191.636,34.417C191.636,51.308 183.125,60.219 163.376,61.017L163.376,61.084L141.431,61.084L141.431,58.089L144.557,58.089C146.286,58.089 147.683,56.761 147.683,55.166L147.683,13.604C147.683,12.01 146.286,10.679 144.557,10.679L138.24,10.679C136.511,10.679 135.114,12.01 135.114,13.604L135.114,43.264C135.114,55.166 125.14,61.749 113.902,61.749C105.324,61.749 94.352,55.166 94.285,43.264L94.285,13.604C94.285,12.01 92.889,10.679 91.159,10.679L87.967,10.679L87.967,7.687L109.979,7.687L109.979,10.679L106.854,10.679C105.125,10.679 103.728,12.01 103.728,13.604L103.728,43.264C103.728,52.172 111.84,55.764 117.027,55.764C122.214,55.764 130.459,55.166 130.459,40.27L130.459,13.604C130.459,12.01 129.063,10.679 127.333,10.679L124.142,10.679L124.142,7.687ZM157.125,13.604L157.125,31.426L163.376,31.426C166.501,31.426 169.693,28.5 169.693,25.508L169.693,22.516L172.818,22.516L172.818,43.264L169.693,43.264L169.693,40.27C169.693,37.343 166.501,34.417 163.376,34.417L157.125,34.417L157.125,55.166C157.125,56.761 158.521,58.089 160.25,58.089C172.818,58.089 182.195,52.172 182.195,34.417C182.195,16.598 172.818,10.679 160.25,10.679C158.521,10.679 157.125,12.01 157.125,13.604Z" style="fill:#00447c"/><path d="M502.472,11.623L500.99,11.623L500.99,14.8L502.518,14.8C503.386,14.8 504.005,14.68 504.382,14.439C504.756,14.198 504.947,13.81 504.947,13.274C504.947,12.694 504.75,12.273 504.36,12.013C503.967,11.752 503.341,11.623 502.472,11.623ZM502.794,10.453C504.128,10.453 505.128,10.673 505.799,11.113C506.47,11.552 506.805,12.208 506.805,13.08C506.805,13.76 506.613,14.326 506.23,14.777C505.846,15.228 505.307,15.523 504.612,15.66L506.758,20.041L504.727,20.041L502.77,15.947L500.99,15.947L500.99,20.041L499.176,20.041L499.176,10.453L502.794,10.453ZM509.947,15.494C509.947,14.471 509.77,13.512 509.414,12.617C509.055,11.723 508.539,10.937 507.854,10.256C507.15,9.547 506.351,9.005 505.456,8.635C504.567,8.264 503.612,8.079 502.601,8.079C501.605,8.079 500.665,8.259 499.785,8.619C498.903,8.978 498.134,9.493 497.472,10.165C496.754,10.891 496.198,11.707 495.812,12.617C495.424,13.527 495.232,14.463 495.232,15.425C495.232,16.379 495.417,17.3 495.79,18.181C496.162,19.062 496.697,19.858 497.392,20.559C498.083,21.261 498.875,21.804 499.766,22.183C500.662,22.56 501.583,22.748 502.532,22.748C503.528,22.748 504.471,22.565 505.365,22.198C506.26,21.831 507.073,21.296 507.808,20.594C508.498,19.921 509.028,19.146 509.395,18.273C509.762,17.398 509.947,16.471 509.947,15.494ZM502.568,6.955C503.724,6.955 504.814,7.17 505.848,7.598C506.882,8.025 507.8,8.649 508.602,9.469C509.391,10.264 509.996,11.175 510.415,12.2C510.838,13.225 511.047,14.295 511.047,15.414C511.047,16.57 510.838,17.654 510.415,18.667C509.996,19.682 509.384,20.579 508.58,21.358C507.747,22.17 506.81,22.79 505.773,23.224C504.739,23.656 503.669,23.872 502.568,23.872C501.441,23.872 500.37,23.656 499.348,23.224C498.325,22.79 497.409,22.163 496.599,21.336C495.793,20.525 495.182,19.614 494.762,18.598C494.34,17.585 494.13,16.524 494.13,15.414C494.13,14.295 494.35,13.218 494.791,12.171C495.232,11.126 495.863,10.188 496.691,9.355C497.463,8.565 498.346,7.969 499.348,7.563C500.346,7.158 501.418,6.955 502.568,6.955Z" style="fill:#959da2;fill-rule:nonzero"/></g></svg></span>
            </a>
            <div class="flex items-center lg:order-2">

                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">IH726 - Lenguajes de programación Back End</span>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">U2.A1</span>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">222959611 - &#70;&#101;&#114;&#110;&#97;&#110;&#100;&#111; &#79;&#106;&#101;&#100;&#97;</span>

            </div>
        </div>
    </nav>
</header>

<section id="wrapper" class="w-full h-full flex items-center justify-center mx-auto">

    <div class="content-frame relative w-full h-0 self-center justify-center">
        <div class="content absolute inset-0">

            <div class="h-full">
                <div class="flex flex-wrap p-12 h-full">
                    <div class="w-1/2 mx-auto">



                        <?php if (isset($_SESSION['userdata'])): ?>
                            <?php require_once 'user.php'; ?>
                        <?php else: ?>
                            <div class="max-w-md mx-auto mt-6 bg-white p-5 rounded-lg shadow-md">
                                <form action="index.php" method="post">
                                    <div class="mb-4">
                                        <label for="name" class="block text-sm font-medium text-gray-600">Nombre:</label>
                                        <input type="text" id="name" name="name" required class="mt-1 p-2 w-full border rounded-md">
                                    </div>

                                    <div class="mb-4">
                                        <label for="email" class="block text-sm font-medium text-gray-600">Correo electrónico:</label>
                                        <input type="email" id="email" name="email" required class="mt-1 p-2 w-full border rounded-md">
                                    </div>

                                    <div class="mb-4">
                                        <label for="password" class="block text-sm font-medium text-gray-600">Contraseña:</label>
                                        <input type="password" id="password" name="password" required class="mt-1 p-2 w-full border rounded-md">
                                    </div>

                                    <div class="mb-4">
                                        <label for="dob" class="block text-sm font-medium text-gray-600">Fecha de nacimiento:</label>
                                        <input type="date" id="dob" name="dob" required class="mt-1 p-2 w-full border rounded-md">
                                    </div>

                                    <div>
                                        <input type="submit" value="Iniciar sesión" class="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                    </div>
                                </form>
                            </div>

                        <?php endif; ?>


                    </div>
                </div>
            </div>

        </div>
    </div>

</section>
</body>
</html>