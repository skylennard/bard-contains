<?php

namespace SkyLennard\BardContains;

use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        __DIR__ . '/../resources/dist/js/bard-contains.js'
    ];
}
