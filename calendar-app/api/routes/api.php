<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;


// Public Routes
Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::get('/verify/{token}/{email}', [UserController::class, 'accountVerify']);
Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
Route::post('/update-password', [UserController::class, 'updatePassword']);
Route::get("/user-events/{id}", [EventController::class, "showByUser"]);


// Protected Routes
Route::group(["middleware" => "auth:sanctum"], function () {

    Route::get("/events/{id}", [EventController::class, "show"]);
    Route::post("/add-event", [EventController::class, "store"]);
    Route::get("/events", [EventController::class, "index"]);
    Route::put("/update-event/{id}", [EventController::class, "update"]);
    Route::delete("/delete-event/{id}", [EventController::class, "destroy"]);
    Route::post("/logout", [AuthController::class, "logout"]);
});
