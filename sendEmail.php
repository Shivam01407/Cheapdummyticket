<?php

require("./PHPMailer/src/PHPMailer.php");
require("./PHPMailer/src/SMTP.php");
require("./PHPMailer/src/Exception.php");

if (isset($_POST["firstname"])) {
  $message = '<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
<h4>Hello there! <br><br>
 We received your booking request from ' . $_POST['origin'] . ' to ' . $_POST['destination'] . ' on ' . $_POST['departure'] . ' for the following persons.</h4>
 <table>   
      <tr>
      <th>Title</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>DOB</th>
    </tr> ';


  foreach ($_POST["firstname"] as $key => $value) {

    $message .= '<tr>
      <td>' . $_POST["title"][$key] . '</td>
      <td>' . $_POST["firstname"][$key] . '</td>
      <td>' . $_POST["lastname"][$key] . '</td>
      <td>' . $_POST["dob"][$key] . '</td>
    </tr>';
  }

  $message .= '</table> <br> <h2> We will get back to you on your contact number ' . $_POST['contact'] . ' or email ' . $_POST['email'] . '</h2><h5>Regards, <br>  Original Dummy ticket.com</h5>';
  $mail = new PHPMailer\PHPMailer\PHPMailer();
  $mail->IsSMTP(); // enable SMTP

  $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
  $mail->SMTPAuth = true; // authentication enabled
  // $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
  $mail->SMTPSecure = 'tsl'; // secure transfer enabled REQUIRED for Gmail
  $mail->Host = "smtp.mailtrap.io";
  $mail->Port = 587;
  $mail->IsHTML(true);

  $mail->Username = '3e9c28ee21e0ee';
  $mail->Password = '2832ea66d85dc7';

  $mail->IsHTML(true);
  $mail->SetFrom("xxxxxx@xxxxx.com");
  $mail->Subject = "Test";
  $mail->Body = $message;
  $mail->AddAddress("xxxxxx@xxxxx.com");

  if (!$mail->Send()) {
    // echo "Mailer Error: " . $mail->ErrorInfo;
    echo "<script>
   alert('Error occurrred while sending mail, please check your mail and try again.');
   window.location.href='index.php';
   </script>";
  } else {
    echo "<script>
   alert('Form submitted succesfully, we will get back to you shortly.');
   window.location.href='index.php';
   </script>";
  }
  
}else{
header("location:javascript://history.go(-1)");
}
