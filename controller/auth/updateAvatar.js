const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const {User} = require("../../models/user");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const {_id} = req.user;
  const {path: tmpUpload, originalname} = req.file;

  const image = await Jimp.read(tmpUpload);
  image.resize(250, 250);
  await image.writeAsync(`tmp/${originalname}`);

  const filename = `${_id}_s250_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tmpUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, {avatarURL});

  res.json({
    status: "OK",
    code: 200,
    data: {avatarURL},
  });
};

module.exports = updateAvatar;
