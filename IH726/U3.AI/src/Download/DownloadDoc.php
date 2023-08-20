<?php

namespace App\Download;

use App\Entities\Document;
use JetBrains\PhpStorm\NoReturn;
use PhpOffice\PhpWord\PhpWord;

class DownloadDoc
{
    private Document $document;

    public function __construct(Document $document)
    {
        $this->document = $document;
    }

    #[NoReturn] public function download(): void
    {

        $phpWord = new PhpWord();
        $section = $phpWord->addSection();
        $fileName = "IH726_U3AI_" . substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 6) . ".docx";

        \PhpOffice\PhpWord\Shared\Html::addHtml($section, $this->document->getContent(), false, false);

        header('Content-Description: File Transfer');
        header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        header('Content-Disposition: attachment; filename=' . basename($fileName));
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord);
        $objWriter->save('php://output');
        exit;

    }

}