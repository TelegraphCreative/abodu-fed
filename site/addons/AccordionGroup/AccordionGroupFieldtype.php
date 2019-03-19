<?php

namespace Statamic\Addons\AccordionGroup;

use Statamic\Extend\Fieldtype;

class AccordionGroupFieldtype extends Fieldtype
{

    public $category = ['structured', 'special'];

    public function preProcess($data)
    {
      return $data;
    }

    public function process($data)
    {
      return $data;
    }

}
