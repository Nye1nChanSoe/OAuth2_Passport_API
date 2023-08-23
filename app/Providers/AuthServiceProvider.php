<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // defines scopes (permissions) API clients can access via passport tokens
        Passport::tokensCan([
            'create-employees' => 'Create new employees',
            'view-employees' => 'View employees',
            'update-employees' => 'Update employees',
            'delete-employees' => 'Delete employees',
        ]);
    }
}
