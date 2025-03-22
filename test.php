<?php
$to = "mahfuzdu02@gmail.com";
$subject = "PHP Mail Test";
$message = "This is a test email using PHP mail()";
$headers = "From: your-email@example.com\r\nReply-To: your-email@example.com";

if(mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully";
} else {
    echo "Failed to send email";
}
?>
