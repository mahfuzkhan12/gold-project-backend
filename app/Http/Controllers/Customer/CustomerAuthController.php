<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cache;

class CustomerAuthController extends Controller
{
    // Register New Customer
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:customers',
            'phone' => 'nullable|string|unique:customers',
            'password' => 'required|string|min:6',
        ]);
    
        $customer = Customer::create([
            'name' => $request->name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);
    
        event(new Registered($customer)); // Send email verification
    
        return response()->json(['message' => 'Registered successfully. Please verify your email.']);
    }


    public function sendOtp(Request $request)
    {
        $request->validate(['phone' => 'required|string|exists:customers,phone']);

        $otp = rand(100000, 999999);
        Cache::put('otp_' . $request->phone, $otp, now()->addMinutes(10));

        // Send SMS using Twilio or any SMS provider
        Http::post('https://your-sms-api.com/send', [
            'to' => $request->phone,
            'message' => "Your OTP is: $otp",
        ]);

        return response()->json(['message' => 'OTP sent successfully.']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|exists:customers,phone',
            'otp' => 'required|string',
        ]);

        $cachedOtp = Cache::get('otp_' . $request->phone);

        if (!$cachedOtp || $cachedOtp !== $request->otp) {
            return response()->json(['message' => 'Invalid OTP'], 422);
        }

        Customer::where('phone', $request->phone)->update(['phone_verified_at' => now()]);
        Cache::forget('otp_' . $request->phone);

        return response()->json(['message' => 'Phone number verified successfully.']);
    }

    // Login Customer
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials'],
            ]);
        }

        $token = $customer->createToken('CustomerToken')->plainTextToken;

        return response()->json(['customer' => $customer, 'token' => $token]);
    }

    // Get Customer Profile
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    // Logout Customer
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
