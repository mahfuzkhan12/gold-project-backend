<?php

use App\Http\Controllers\Customer\CustomerAuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/register', [CustomerAuthController::class, 'register']);
Route::post('/login', [CustomerAuthController::class, 'login']);

Route::post('/email/verify/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Verification link sent!']);
})->middleware('auth:sanctum');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return response()->json(['message' => 'Email verified successfully!']);
})->middleware(['auth:sanctum', 'signed']);

Route::post('/phone/send-otp', [CustomerAuthController::class, 'sendOtp']);
Route::post('/phone/verify-otp', [CustomerAuthController::class, 'verifyOtp']);


// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/customer', [CustomerAuthController::class, 'profile']);
    Route::post('/logout', [CustomerAuthController::class, 'logout']);
});
