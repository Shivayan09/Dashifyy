export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css" />
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #f2f4f8;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      padding: 30px;
      text-align: center;
      background-color: #00426b;
      color: #ffffff;
    }

    .logo {
      width: 100px;
      margin-bottom: 15px;
    }

    .main-content {
      padding: 30px;
      color: #000000;
    }

    .main-content h2 {
      font-size: 22px;
      margin-bottom: 16px;
    }

    .main-content p {
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 12px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
      margin: 20px 0;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      padding: 20px 10px;
      color: #777;
    }

    .social-icons a {
      margin: 0 6px;
      text-decoration: none;
    }

    .social-icons img {
      width: 24px;
      height: 24px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
      }

      .button {
        width: 80% !important;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
    

      <h2>Dashify</h2>
    </div>

    <div class="main-content">
      <h2>Verify Your Email</h2>
      <p>
        You are just one step away from verifying your account for this email:
        <span style="color: #4C83EE;">{{email}}</span>.
      </p>
      <p><strong>Use the OTP below to verify your account:</strong></p>

      <div class="button">{{otp}}</div>

      <p>This OTP is valid for 24 hours. Please do not share it with anyone.</p>
    </div>

    <div class="footer">
      <div class="social-icons">
        <a href="">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" />
        </a>
        <a href="">
          <img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="Facebook" />
        </a>
      </div>
      <p>&copy; 2025 Dashify</p>
    </div>
  </div>
</body>

</html>


`

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 15 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`