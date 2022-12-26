import nodemailer from "nodemailer";

export const MailVerificationCode = async (
  userEmail: string | undefined,
  userVerificationCode: string | undefined
) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    var mailOptions = {
      from: '"Prueba" <prueba@ethereal.com>',
      to: userEmail,
      subject: "LoginApp - Verification Code",
      text: "This is your verification code: " + userVerificationCode,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.messageId) {
      return nodemailer.getTestMessageUrl(info);
    }
    /*, (error, info) => {
      if (error) {
        console.log(error);
        throw "There is a problem to send the verification code. Please try again in a few minutes.";
      } else {
        console.log("Email sent: " + info.response);
      }
    });*/
  } catch (error) {
    throw error;
  }
};
