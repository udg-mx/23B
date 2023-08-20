<?php

namespace App\Layouts;

class ViewOptions
{
    protected bool $centerContent = false;

    public function toArray(): array
    {
        $data['centerContent'] = $this->centerContent;
        return $data;
    }

    public function setCenterContent(bool $centerContent = null): ViewOptions
    {
        $this->centerContent = $centerContent === null ? true : $centerContent;
        return $this;
    }
}