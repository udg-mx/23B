<?php

namespace App\Controllers;

use App\Entities\Document;
use App\Entities\DocumentRepository;
use App\Layouts\ControllerWeb;
use JetBrains\PhpStorm\NoReturn;

class DocumentController extends ControllerWeb
{
    private Document $_document;

    protected function documentRepo(): DocumentRepository
    {
        return DocumentRepository::instance();
    }

    protected function currentDocument(): Document
    {
        return $this->_document ??= (function (): Document
        {
            $document = $this->documentRepo()->findOneById((int) $this->input->get('id'));
            if (!$document) $this->error('No se ha encontrado el documento', BASE_URL . '?action=documents');
            return $document;
        })();

    }
    #[NoReturn] protected function document_edit(): void
    {
        $this->renderView('documents/edit.twig', ['document' => $this->currentDocument()->toArray()], 'Editar Documento');
    }

    #[NoReturn] protected function document_save(): void
    {
        $document = $this->currentDocument();
        $document->setName((string) $this->input->get('name'));
        $document->setContent((string) $this->input->get('contentHTML'));
        $this->documentRepo()->save($document);
        $this->redirect(BASE_URL . "?action=documents");
    }

    #[NoReturn] protected function document_remove(): void
    {
        $this->documentRepo()->remove($this->currentDocument());
        $this->redirect(BASE_URL . "?action=documents");
    }

    #[NoReturn] protected function document_download_pdf(): void
    {
        $this->currentDocument()->downloadPDF();
    }

    #[NoReturn] protected function document_download_xls(): void
    {
        $this->currentDocument()->downloadXLS();
    }

    protected function document_download_doc(): void
    {
        $this->currentDocument()->downloadDOC();
    }
}
