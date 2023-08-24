<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

Route::middleware([
    'auth:api',
    'access:create-employees,view-employees,update-employees,delete-employees'
    ])
    ->group(function() {
        Route::apiResource('/users', EmployeeController::class);
    }
);

Route::middleware(['auth:api', 'access:view-employees'])->group(function() {
    Route::get('/users', [EmployeeController::class, 'index']);
    Route::get('/users/{user}', [EmployeeController::class, 'show']);
});