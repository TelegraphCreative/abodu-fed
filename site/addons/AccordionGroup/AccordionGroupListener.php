<?php

namespace Statamic\Addons\AccordionGroup;

use Statamic\Extend\Listener;

class AccordionGroupListener extends Listener
{

    public $events = [
        'cp.add_to_head' => 'injectAccordionGroupStyles'
    ];

    /**
     * Return a <link> tag containing the addon stylesheet
     * @return string
     */
    public function injectAccordionGroupStyles()
    {
        $stylesheet = $this->css->url('accordion-group.css');
        $tag = '<link rel="stylesheet" type="text/css" href="' . $stylesheet . '">';
        return $tag;
    }

}