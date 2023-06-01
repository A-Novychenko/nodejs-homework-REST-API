const {HttpError} = require("../../helpers");
const {Contact} = require("../../models/contact");

const getContactById = async (req, res) => {
  const {contactId} = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `Not found contacts id: ${contactId}`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {contact: result},
  });
};

module.exports = getContactById;
