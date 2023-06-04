const {User} = require("../..//models/user");

const {HttpError} = require("../..//helpers");

const {transport: metaSendMailer} = require("../../helpers");
const {BASE_URL} = process.env;

const resendVerifyEmail = async (req, res) => {
  const {email} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: "novychenkoae@gmail.com",
    from: "goit-hw6-mailer@meta.ua",
    subject: "Verify  email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click verify email</a>`,
  };

  await metaSendMailer.sendMail(verifyEmail);

  res.json({
    status: "OK",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
