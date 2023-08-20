<?php

require_once 'vendor/autoload.php';

// Carga la biblioteca
use Dompdf\Dompdf;
use Dompdf\Options;

$options = new Options();
$options->set('isHtml5ParserEnabled', true);
$options->set("isPhpEnabled", false);
$options->set("defaultFont", "Arial");
$fileName = "IH726_U3A3_" . substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 6) . ".pdf";



$dompdf = new Dompdf($options);
$dompdf->loadHtml($_POST['contentHTML'] ?? "<p>Test</p>");
$dompdf->setPaper('letter');
$dompdf->render();
$dompdf->stream($fileName, array("Attachment" => 1));
