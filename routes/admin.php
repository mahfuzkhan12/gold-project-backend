<?php

use App\Http\Controllers\Admin\CustomersController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\TransactionsController;
use Illuminate\Support\Facades\Route;


Route::prefix('/api')->group(function () {
    Route::prefix('/products')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
    });
});

Route::prefix("/products")->group(function() {
    Route::get('/', [ProductController::class, 'view'])->name('products.index');
});

Route::prefix("/orders")->group(function() {
    Route::get('/', [OrderController::class, 'index'])->name('orders.index');
});

Route::prefix("/customers")->group(function() {
    Route::get('/', [CustomersController::class, 'index'])->name('customers.index');
});

Route::prefix("/transactions")->group(function() {
    Route::get('/', [TransactionsController::class, 'index'])->name('transactions.index');
});

Route::prefix("/settings")->group(function() {
    Route::get('/', [SettingsController::class, 'index'])->name('settings.index');
});