<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Bật hiển thị lỗi PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'vendor/autoload.php'; // Đường dẫn đến PHPMailer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);
    try {
        // Bật debug
        $mail->SMTPDebug = 2;

        // Cấu hình SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Server SMTP của Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'qtussnguyen0220@gmail.com'; // Email của bạn
        $mail->Password = '20022007@Tu.'; // Thay bằng mật khẩu ứng dụng 16 ký tự
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Người gửi và người nhận
        $mail->setFrom($email, $name);
        $mail->addAddress('qtussnguyen0220@gmail.com'); // Email đích

        // Nội dung email
        $mail->isHTML(false);
        $mail->Subject = 'Tin nhắn mới từ website Love Match';
        $mail->Body    = "Họ và tên: $name\nEmail: $email\nLời nhắn: $message\n";

        $mail->send();
        echo 'Cảm ơn bạn! Tin nhắn đã được gửi.';
    } catch (Exception $e) {
        echo "Có lỗi xảy ra: {$mail->ErrorInfo}";
    }
} else {
    echo "Phương thức không hợp lệ.";
}
?>