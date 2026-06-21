export const emailVerificationTemplate = ({
  code,
  expiry,
}: {
  code: string;
  expiry: number;
}) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>Email Verification</title>

<style>

body {
  margin:0;
  padding:0;
  background:#f3f4f6;
  font-family: Arial, Helvetica, sans-serif;
}


.wrapper {
  width:100%;
  padding:40px 15px;
  background:#f3f4f6;
}


.card {

  max-width:480px;
  margin:auto;
  background:#ffffff;
  border-radius:20px;
  padding:40px 35px;
  text-align:center;
  box-shadow:0 15px 40px rgba(0,0,0,0.12);

}



.logo {

  width:70px;
  height:70px;
  margin:auto;
  border-radius:50%;
  background:#111827;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:30px;
  font-weight:bold;

}



h1 {

 color:#111827;
 font-size:26px;
 margin-top:25px;

}



p {

 color:#6b7280;
 line-height:1.6;
 font-size:15px;

}



.otp-box {

 margin:35px 0;
 padding:25px;
 background:#f9fafb;
 border-radius:16px;
 border:1px solid #e5e7eb;

}



.otp {

 font-size:38px;
 font-weight:800;
 letter-spacing:12px;
 color:#111827;

}



.expiry {

 margin-top:15px;
 font-size:14px;
 color:#4b5563;

}



.warning {

 margin-top:25px;
 background:#f3f4f6;
 padding:15px;
 border-radius:12px;
 color:#374151;
 font-size:13px;

}



.footer {

 margin-top:30px;
 color:#9ca3af;
 font-size:12px;

}



.divider {

 height:1px;
 background:#e5e7eb;
 margin:25px 0;

}


</style>

</head>



<body>


<div class="wrapper">


<div class="card">


<div class="logo">
🚆
</div>


<h1>
Verify Your Account
</h1>


<p>
Hello,<br/>
Use the verification code below to complete your Bangladesh Railway account registration.
</p>




<div class="otp-box">


<div class="otp">
${code}
</div>


<div class="expiry">
This code will expire in ${expiry} minutes
</div>


</div>



<div class="warning">

For your security, do not share this verification code with anyone.

</div>



<div class="divider"></div>


<p>
If you did not request this verification, you can safely ignore this message.
</p>



<div class="footer">

© 2026 Bangladesh Railway<br/>
Secure Online Service

</div>



</div>


</div>


</body>

</html>
`;
};
