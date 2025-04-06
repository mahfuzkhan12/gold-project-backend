<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductsResource;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function view()
    {
        //
        return Inertia::render('products/index');
    }

    public function index(Request $request)
    {
        $request->validate([
            'limit' => 'integer|min:1|max:100',  
            'search' => 'nullable|string|max:255', 
        ]);
    
        // Get input with defaults
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);
        $type = $request->input('type', "");
        $search = $request->input('search', '');
    
        $customizers = Products::where('title', 'LIKE', "%{$search}%")
            ->when($type, function ($query, $type) {
                return $query->where("type", $type);
            })
            ->paginate($limit, ['*'], 'page', $page);
        
        $from = ($customizers->currentPage() - 1) * $customizers->perPage() + 1;
        $to = min($from + $customizers->count() - 1, $customizers->total());
    
        return response()->json([
            'data' => ProductsResource::collection($customizers),
            'meta' => [
                'total' => $customizers->total(),
                'current_page' => $customizers->currentPage(),
                'page' => $customizers->currentPage(), 
                'last_page' => $customizers->lastPage(),
                'per_page' => $customizers->perPage(),
                'has_more_pages' => $customizers->hasMorePages(),
                'has_previous_page' => $customizers->onFirstPage() ? false : true,
                'from' => $from,
                'to' => $to,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
