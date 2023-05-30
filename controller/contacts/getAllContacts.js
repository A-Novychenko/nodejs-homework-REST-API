// const {controllerWrapper} = require("../../helpers");
// const {HttpError} = require("../../helpers");
const {Contact} = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20, favorite} = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite === undefined ? null : {favorite};

  const result = await Contact.find(
    {owner, ...filter},
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: result,
    },
  });
};

module.exports = getAllContacts;
