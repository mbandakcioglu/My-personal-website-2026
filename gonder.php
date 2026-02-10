<?php
// Strict error reporting for debugging (in production logged, not displayed)
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

// Load Configuration
if (!file_exists('config.php')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Sunucu yapılandırma hatası: config.php bulunamadı.']);
    exit;
}
require_once 'config.php';

// PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$subjectPrefix = 'bandakcioglu.com İletişim Formu: ';

// Helper function to send JSON response
function sendResponse($success, $message, $errors = []) {
    echo json_encode(['success' => $success, 'message' => $message, 'errors' => $errors]);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    sendResponse(false, 'Method Not Allowed');
}

// Get input data (support both JSON and FormData)
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');
$recaptchaResponse = $input['recaptcha'] ?? '';

// Validation
$errors = [];

if (empty($name)) {
    $errors['name'] = 'Lütfen adınızı giriniz.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Geçerli bir e-posta adresi giriniz.';
}

if (empty($message)) {
    $errors['message'] = 'Lütfen mesajınızı yazınız.';
}

if (empty($recaptchaResponse)) {
    $errors['recaptcha'] = 'Lütfen robot olmadığınızı doğrulayın.';
}

if (!empty($errors)) {
    sendResponse(false, 'Lütfen formu kontrol ediniz.', $errors);
}

// Verify reCAPTCHA
$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret' => RECAPTCHA_SECRET,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    ]
];

$context  = stream_context_create($options);
$response = file_get_contents($verifyUrl, false, $context);
$result = json_decode($response);

// v3 returns a score (0.0 to 1.0)
// Recommended threshold is 0.5
if (!$result || !$result->success || $result->score < 0.5) {
    sendResponse(false, 'Güvenlik doğrulaması başarısız oldu. (Spam şüphesi)', ['recaptcha' => 'Doğrulama başarısız.']);
}

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = SMTP_HOST;                              // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = SMTP_USERNAME;                          // SMTP username
    $mail->Password   = SMTP_PASSWORD;                          // Hosting (cPanel) Password for this email
    
    if (defined('SMTP_SECURE') && SMTP_SECURE === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;        // Enable explicit TLS encryption
    }

    $mail->Port       = SMTP_PORT;                              // TCP port to connect to
    $mail->CharSet    = 'UTF-8';                                // Set character encoding

    // Recipients
    $mail->setFrom(SMTP_USERNAME, 'Bandakcioglu.com Form');
    
    // Add multiple recipients if provided
    $emails = explode(',', RECIPIENT_EMAILS);
    foreach ($emails as $addr) {
        $mail->addAddress(trim($addr));
    }
    
    $mail->addReplyTo($email, $name);                           // Add reply-to from the form submitter

    // Content
    $mail->isHTML(false);                                       // Set email format to HTML or Plain Text
    $mail->Subject = $subjectPrefix . $name;
    
    $emailBody = "Ad Soyad: $name\n";
    $emailBody .= "E-posta: $email\n\n";
    $emailBody .= "Mesaj:\n$message\n";
    
    $mail->Body    = $emailBody;

    $mail->send();
    sendResponse(true, 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.');
} catch (Exception $e) {
    // Log error internally
    error_log("Mail Error: " . $mail->ErrorInfo);
    // Send generic error to user
    sendResponse(false, 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyiniz.');
} catch (\Exception $e) {
    // Log generic error
    error_log("General Error: " . $e->getMessage());
    sendResponse(false, 'Bir sunucu hatası oluştu.');
}
