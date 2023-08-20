<?php

namespace App\Download;

use App\Entities\Document;
use Dompdf\Dompdf;
use Dompdf\Options;
use JetBrains\PhpStorm\NoReturn;

class DownloadPDF
{
    private Document $document;

    public function __construct(Document $document)
    {
        $this->document = $document;
    }

    #[NoReturn] public function download(): void
    {
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set("isPhpEnabled", false);
        $options->set("defaultFont", "Arial");
        $fileName = "IH726_U3AI_" . substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 6) . ".pdf";


        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($this->document->getContent());
        $dompdf->setPaper('letter');
        $dompdf->render();
        $dompdf->stream($fileName, array("Attachment" => 1));
        exit;

    }

}