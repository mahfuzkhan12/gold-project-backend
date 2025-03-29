<?php

use App\Http\Controllers\Admin\CustomersController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TransactionsController;
use Illuminate\Support\Facades\Route;

Route::prefix("/products")->group(function() {
    
    Route::get('/', [ProductController::class, 'index'])->name('products.index');

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