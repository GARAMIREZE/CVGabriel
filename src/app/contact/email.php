<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function sanitizeInput($data)
{
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function validateEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Sanitizar y validar entrada
$name        = sanitizeInput($_POST['name'] ?? '');
$email       = sanitizeInput($_POST['email'] ?? '');
$company     = sanitizeInput($_POST['company'] ?? '');
$message     = sanitizeInput($_POST['message'] ?? '');
$countryCode = sanitizeInput($_POST['countryCode'] ?? '');
$customCode  = sanitizeInput($_POST['customCode'] ?? '');
$phone       = preg_replace('/\D+/', '', $_POST['phone'] ?? '');

$errors = [];

if (!$name || strlen($name) < 3) {
    $errors['name'] = 'Name must be at least 3 characters';
}

if (!$email || !validateEmail($email)) {
    $errors['email'] = 'Valid email required';
}

if (!$company) {
    $errors['company'] = 'Company is required';
}

if (!$message || strlen($message) < 10) {
    $errors['message'] = 'Message must be at least 10 characters';
}

$fullCode = '';
if (!empty($phone)) {
    if ($countryCode === 'other') {
        if (!preg_match('/^\+\d{1,4}$/', $customCode)) {
            $errors['phone'] = 'Custom code must be in format +XXX';
        } else {
            $fullCode = $customCode;
        }
    } else {
        if (!preg_match('/^\+\d{1,4}$/', $countryCode)) {
            $errors['phone'] = 'Invalid country code';
        } else {
            $fullCode = $countryCode;
        }
    }

    if (!preg_match('/^\d{6,15}$/', $phone)) {
        $errors['phone'] = 'Phone number must be 6–15 digits';
    }
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

$fullPhone = $fullCode ? "$fullCode $phone" : '';

$to = 'gabriel.ramirezsegovia@outlook.es';
$subject = "New Contact Message from $name";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/html; charset=UTF-8\r\n";

$body = "
<html><body>
  <h2>New Contact Submission</h2>
  <p><strong>Name:</strong> $name</p>
  <p><strong>Email:</strong> $email</p>
  <p><strong>Company:</strong> $company</p>" .
    ($fullPhone ? "<p><strong>Phone:</strong> $fullPhone</p>" : "") .
    "<p><strong>Message:</strong></p><p>" . nl2br($message) . "</p>
</body></html>";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Thanks for contacting me!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email.']);
}
