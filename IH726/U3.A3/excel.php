<?php

require_once 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$fileName = "IH726_U3A3_" . substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 6) . ".xlsx";


foreach (explode("\n", trim(strip_tags(str_replace(['<p>', '</p>'], ["", "\n"], str_replace("\n", "", $_POST['contentHTML'] ?? ""))))) as $ii => $line)
{
    $sheet->setCellValue('A' . ($ii + 1), html_entity_decode($line, ENT_QUOTES, 'UTF-8'));
}


header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="' . $fileName . '"');
header('Cache-Control: max-age=0');

$escritor = new Xlsx($spreadsheet);
$escritor->save('php://output');
exit;
