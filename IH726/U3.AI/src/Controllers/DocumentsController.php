<?php

namespace App\Controllers;

use App\Entities\Document;
use App\Entities\DocumentRepository;
use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class DocumentsController extends ControllerWeb
{

    protected function documentRepo(): DocumentRepository
    {
        return DocumentRepository::instance();
    }
    #[NoReturn] protected function index(): void
    {
        $documents = [];
        foreach ($this->documentRepo()->findAllDocuments() as $document)
        {
            $documents[] = $document->toArray();
        }

        $this->renderView('documents/index.twig', ['documents' => $documents], 'Documentos');
    }

    protected function documents_new(): void
    {

        $this->renderView('documents/new.twig', [], 'Nuevo Documento');
    }

    protected function documents_new_add(): void
    {

        $name = $this->input->get('name');
        $html = $this->input->get('contentHTML');

        if (!$name || !$html) {
            $this->error('Falta el nombre o el contenido del documento');
        }

        $document = new Document();
        $document->setName($name);
        $document->setContent($html);
        $this->documentRepo()->add($document);

        $this->redirect(BASE_URL."?action=documents");

    }
}