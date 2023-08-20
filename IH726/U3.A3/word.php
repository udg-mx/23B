<?php

require_once 'vendor/autoload.php';

use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;


$phpWord = new PhpWord();
$section = $phpWord->addSection();
$fileName = "IH726_U3A3_" . substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 6) . ".docx";

\PhpOffice\PhpWord\Shared\Html::addHtml($section, $_POST['contentHTML'] ?? "<p>Test</p>", false, false);

header('Content-Description: File Transfer');
header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
header('Content-Disposition: attachment; filename=' . basename($fileName));
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Pragma: public');
$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord);
$objWriter->save('php://output');
