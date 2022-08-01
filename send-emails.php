<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// If necessary, modify the path in the require statement below to refer to the
// location of your Composer autoload.php file.
require '/home/ubuntu/vendor/autoload.php';

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.

// Replace recipient@example.com with a "To" address. If your account
// is still in the sandbox, this address must be verified.


// Specify a configuration set. If you do not want to use a configuration
// set, comment or remove the next line.
//$configurationSet = 'ConfigSet';

// If you're using Amazon SES in a region other than US West (Oregon),
// replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP
// endpoint in the appropriate region.

//SANTAS INFO
if (isset($_POST["myData"])) {
//	print_r($_POST["myData"]);
} else {
    echo "Invalid Entry";
    exit();
}

$santas = array();
$myData = $_POST["myData"];
foreach($myData as $val) {
	$santas[] = array($val['key'], $val['value']);
}

function sendEmail($person, $email, $santaName) {
	$sender = 'jackwebsite101@gmail.com';
	$senderName = 'Jack';

	
	$host = 'email-smtp.us-east-1.amazonaws.com';
	$port = 587;
	// The subject line of the email
	$subject = 'Your Secret Santa';

	// The plain-text body of the email
	$bodyText =  'Hello, ' . $person . '. Your santa is ' . $santaName;

	// The HTML-formatted body of the email
	$bodyHtml = '<h1>Hello, ' . $person . '.</h1> <p>Your santa is ' . $santaName . '</p>';

	$mail = new PHPMailer(true);

	try {
   	 // Specify the SMTP settings.
   	 $mail->isSMTP();
   	 $mail->setFrom($sender, $senderName);
   	 $mail->Username   = $usernameSmtp;
   	 $mail->Password   = $passwordSmtp;
    	$mail->Host       = $host;
    	$mail->Port       = $port;
    	$mail->SMTPAuth   = true;
    	$mail->SMTPSecure = 'tls';
//    $mail->addCustomHeader('X-SES-CONFIGURATION-SET', $configurationSet);

    	// Specify the message recipients.
    	$mail->addAddress($email);
    	// You can also add CC, BCC, and additional To recipients here.

    	// Specify the content of the message.
    	$mail->isHTML(true);
    	$mail->Subject    = $subject;
    	$mail->Body       = $bodyHtml;
    	$mail->AltBody    = $bodyText;
    	$mail->Send();
    	echo "Email sent!" , PHP_EOL;
	} catch (phpmailerException $e) {
   	 echo "An error occurred. {$e->errorMessage()}", PHP_EOL; //Catch errors from PHPMailer.
	 echo "-1"; 
	exit();
	} catch (Exception $e) {
    	echo "Email not sent. {$mail->ErrorInfo}", PHP_EOL; //Catch errors from Amazon SES
	echo "-1";
	exit();
	}
}


foreach($santas as $pair) {
	sendEmail($pair[0], $pair[1][1], $pair[1][0]); 
}

echo "Emails successfully sent!"
?>
