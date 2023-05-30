const {HttpError} = require("../../helpers");
const {Contact} = require("../../models/contact");

const removeContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, `Not found contacts id: ${contactId}`);
  }

  res.json({status: "success", code: 200, data: {contact: result}});
};

module.exports = removeContact;
