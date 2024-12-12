exports.getVerifyRegisterEmailTemplate = (url) => {
  return `<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Verify Email</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />

       
      </head>
      <body>
        <div id="email" style="background: #e7e7e7; padding: 40px 0px">
          <div id="email" style="width: 600px; margin: auto; background: white">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" style="font-size: 0px; padding: 20px">
                  <a href="#" rel="noopener" target="_blank">
                    AnnexCRM Logo
                  </a>
                </td>
              </tr>
            </table>
            <table role="presentation" border="0" width="100%" cellspacing="0">
              <tr>
                <td style="padding: 30px 30px 0px 60px" align="center">
                  <h2 style="font-size: 28px; margin: 0 0 20px 0">
                    Please confirm your email address
                  </h2>
                  <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 24px">
                    You recently added a new email address to your AnnexCRM
                    profile.
                    <br />
                    Please confirm this email address by clicking the link
                    below.
                  </p>
                </td>
              </tr>
            </table>
            <table role="presentation" border="0" width="100%" cellspacing="0">
              <tr>
                <td style="padding: 30px 30px 30px 60px" align="center">
                  <a
                    style="
                   background: #1389fd;
                   border-radius: 10px;
                   padding: 15px 20px;
                   color: #fff;
                   text-decoration: none;
                 "
                    href=${url}
                    target="_blank"
                  >
                    Confirm your email
                  </a>
                </td>
              </tr>
            </table>

            <table role="presentation" border="0" width="100%">
              <tr>
                <td bgcolor="#EAF0F6" align="center" style="padding: 30px 30px">
                  <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px">
                    If you have questions or concerns, don't hesitate to contact
                    <a
                      href="mailto:support@annexcrm.com"
                      target="_blank"
                      style="color: #1389fd; text-decoration: none; font-size: 14px"
                    >
                      support@annexcrm.com
                    </a>
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>`;
};
