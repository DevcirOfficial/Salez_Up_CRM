<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Otp;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class OtpController extends Controller
{
    // public function sendOtp(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|email',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['message' => 'Invalid email address'], 400);
    //     }

    //     $otp = rand(100000, 999999);

    //     Otp::create([
    //         'email' => $request->email,
    //         'otp' => $otp,
    //     ]);

    //     Mail::raw("Verification OTP : $otp", function ($message) use ($request) {
    //         $message->to($request->email)
    //             ->subject('SALEZUP VERIFICATION OTP');
    //     });

    //     return response()->json(['message' => 'OTP sent to your email']);
    // }




    public function sendOtp(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => 'Invalid email address'], 400);
    }

    // Generate a random OTP
    $otp = rand(100000, 999999);

    // Save OTP in the database
    Otp::create([
        'email' => $request->email,
        'otp' => $otp,
    ]);

 
    $htmlContent = "
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .content { max-width: 600px; margin: auto; padding: 20px; }
                .header { font-size: 18px; font-weight: bold; color: #333; }
                .otp { font-size: 20px; font-weight: bold; color: black; }
                .footer { font-size: 12px; color: #777; margin-top: 20px; }
                .warn{
                  color:  #ab2222;
                }
            </style>
        </head>
        <body>
            <div class='content'>
             
                <p>Dear Manager,</p>
                <p>To protect your account, we have issued a one-time code before you log in. You only need to enter this code when logging in from a new device. The code expires one hour after it is issued.</p>
                <p class='otp'><b>OTP:</b> $otp</p>
                <p class='warn'>If you do not recognize this email, please ignore it. We recommend changing your password as your account may have been compromised.</p>
                <p class='footer'>
                    Need help?<br>
                    If you have any questions, please contact us directly from the main page of our website. We will not be able to assist you by replying to this email.<br><br>
                    © 2025 Salez Up. All rights reserved.
                </p>
            </div>
        </body>
    </html>";

   
    Mail::send([], [], function ($message) use ($request, $htmlContent) {
        $message->to($request->email)
            ->subject('SALEZUP VERIFICATION OTP')
            ->setBody($htmlContent, 'text/html'); 
    });

    return response()->json(['message' => 'OTP sent to your email']);
}










    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }

        // Check if OTP exists and matches
        $otpRecord = Otp::where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if ($otpRecord) {
            // OTP is valid
            return response()->json(['message' => 'OTP verified successfully']);
        } else {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }
    }

    // public function sendLink(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'role' => 'required|string',
    //         'email' => 'required|email',
    //         'link' => 'required|url',
    //         'password' => 'required|string',
    //         'managerId' => 'sometimes|integer'
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['message' => 'Invalid input data'], 400);
    //     }

    //     $emailContent = "<p>You have been successfully registered as a <strong>" . $request->role . "</strong> in SalezUp.</p>";
    //     $emailContent .= "<p>Email:<strong> <i>" . $request->email . "</i></strong></p>";
    //     $emailContent .= "<p>Password:<strong> <i>" . $request->password . "</i></strong></p>";

    //     if ($request->has('managerId')) {
    //         $emailContent .= "<p>Manager Id:<strong><i>" . $request->managerId . "</i></strong></p>";
    //     }

    //     $emailContent .= "<hr>";
    //     $emailContent .= "<p>Use the given link and credentials to log in:</p>";
    //     $emailContent .= "<p>Link: <strong> <i>" . $request->link . "</i> </strong></p>";

    //     Mail::html($emailContent, function ($message) use ($request) {
    //         $message->to($request->email)
    //             ->subject('SalezUp Login Credentials');
    //     });
    //     return response()->json(['message' => 'Link sent to your email']);
    // }





    public function sendLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
            'email' => 'required|email',
            'link' => 'required|url',
            'password' => 'required|string',
            'managerId' => 'sometimes|integer'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input data'], 400);
        }

        $emailContent = "
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .content { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; }
                    .header { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 20px; }
                    .details { font-size: 14px; color: #333; line-height: 1.6; }
                    .highlight { font-weight: bold; color: #000; }
                    .link-section { margin-top: 20px; font-size: 14px; }
                    .warning { color: #e53935; font-weight: bold; }
                    .footer { font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 10px; }
                </style>
            </head>
            <body>
                <div class='content'>
                    <p class='header'>Welcome to SalezUp!</p>
                    <p class='details'>
                        You have been successfully registered as a <span class='highlight'>{$request->role}</span> in SalezUp.
                    </p>
                    <p class='details'>
                        <strong>Email:</strong> <span class='highlight'>{$request->email}</span><br>
                        <strong>Password:</strong> <span class='highlight'>{$request->password}</span>
                    </p>";
    
        if ($request->has('managerId')) {
            $emailContent .= "
                    <p class='details'>
                        <strong>Manager ID:</strong> <span class='highlight'>{$request->managerId}</span>
                    </p>";
        }
    
        $emailContent .= "
                    <hr>
                    <p class='link-section'>
                        Please use the following link and credentials to log in:
                    </p>
                    <p class='link-section'>
                        <strong>Link:</strong> <a href='{$request->link}' style='color: #1a73e8; text-decoration: none;'>{$request->link}</a>
                    </p>
                    <p class='warning'>
                        Note: Keep this information secure. Do not share your login details with anyone.
                    </p>
                    <div class='footer'>
                        Need help?<br>
                        If you have any questions, please contact us directly from the main page of our website.<br><br>
                        © 2025 SalezUp. All rights reserved.
                    </div>
                </div>
            </body>
        </html>";
    
        // Send the email with HTML content
        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                ->subject('SalezUp Login Credentials');
        });
    
        return response()->json(['message' => 'Link sent to your email']);
    }
    


    

    public function sendManagerLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
            'email' => 'required|email',
            'link' => 'required|url',
            'password' => 'required|string',
            'managerId' => 'sometimes|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input data'], 400);
        }

        $emailContent = "<p>You have been successfully registered as a <strong>" . $request->role . "</strong> in SalezUp.</p>";
        $emailContent .= "<p>Email:<strong> <i>" . $request->email . "</i></strong></p>";
        $emailContent .= "<p>Password:<strong> <i>" . $request->password . "</i></strong></p>";

        if ($request->has('managerId')) {
            $emailContent .= "<p>Ops Manager Id:<strong><i>" . $request->managerId . "</i></strong></p>";
        }

        $emailContent .= "<hr>";
        $emailContent .= "<p>Use the given link and credentials to log in:</p>";
        $emailContent .= "<p>Link: <strong> <i>" . $request->link . "</i> </strong></p>";

        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                ->subject('SalezUp Login Credentials');
        });
        return response()->json(['message' => 'Link sent to your email']);
    }

    public function sendLink2(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
            'email' => 'required|email',
            'link' => 'required|url',
            'password' => 'required|string',
            'managerId' => 'sometimes|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input data'], 400);
        }

        $emailContent = "<p>You have been successfully registered as a <strong>" . $request->role . "</strong> in SalezUp.</p>";
        $emailContent .= "<p>Email:<strong> <i>" . $request->email . "</i></strong></p>";
        $emailContent .= "<p>Password:<strong> <i>" . $request->password . "</i></strong></p>";

        if ($request->has('managerId')) {
            $emailContent .= "<p>Senior Ops Manager Id:<strong><i>" . $request->managerId . "</i></strong></p>";
        }

        $emailContent .= "<hr>";
        $emailContent .= "<p>Use the given link and credentials to log in:</p>";
        $emailContent .= "<p>Link: <strong> <i>" . $request->link . "</i> </strong></p>";

        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                ->subject('SalezUp Login Credentials');
        });
        return response()->json(['message' => 'Link sent to your email']);
    }


    public function sendLink3(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
            'email' => 'required|email',
            'link' => 'required|url',
            'password' => 'required|string',
            'managerId' => 'sometimes|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input data'], 400);
        }

        $emailContent = "<p>You have been successfully registered as a <strong>" . $request->role . "</strong> in SalezUp.</p>";
        $emailContent .= "<p>Email:<strong> <i>" . $request->email . "</i></strong></p>";
        $emailContent .= "<p>Password:<strong> <i>" . $request->password . "</i></strong></p>";

        if ($request->has('managerId')) {
            $emailContent .= "<p>Head of Sales Id:<strong><i>" . $request->managerId . "</i></strong></p>";
        }

        $emailContent .= "<hr>";
        $emailContent .= "<p>Use the given link and credentials to log in:</p>";
        $emailContent .= "<p>Link: <strong> <i>" . $request->link . "</i> </strong></p>";

        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                ->subject('SalezUp Login Credentials');
        });
        return response()->json(['message' => 'Link sent to your email']);
    }

    public function sendResetLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
            'email' => 'required|email',
            'link' => 'required|url',
            'password' => 'required|string',
            'managerId' => 'sometimes|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input data'], 400);
        }

        $emailContent = "<p>Your Password has been successfully changed <strong>";
        $emailContent .= "<p>Email:<strong> <i>" . $request->email . "</i></strong></p>";
        $emailContent .= "<p>Password:<strong> <i>" . $request->password . "</i></strong></p>";

        if ($request->has('managerId')) {
            $emailContent .= "<p>Manager Id:<strong><i>" . $request->managerId . "</i></strong></p>";
        }

        $emailContent .= "<hr>";
        $emailContent .= "<p>Use the given link and credentials to log in:</p>";
        $emailContent .= "<p>Link: <strong> <i>" . $request->link . "</i> </strong></p>";

        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                ->subject('SalezUp Login Credentials');
        });
        return response()->json(['message' => 'Link sent to your email']);
    }

    public function sendLoginMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input data'], 400);
        }

        $emailContent =  "<p>You have been successfully Logged as a <strong><i>" . $request->role . "</i></strong> in SalezUp.</p>";
        $emailContent .= "<p>Email:<strong> <i>" . $request->email . "</i></strong></p>";
        $emailContent .= "<hr>";
        $emailContent .= "<p>If you found this login Suspicious. Contact your Admin <strong><i>Mathews@gmail.com</i></strong></p>";


        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                ->subject('SalezUp Login Information.');
        });
        return response()->json(['message' => 'Link sent to your email']);
    }
}