var postmark = require("postmark");

/**
 *
 * @param { obj } data
 * @param { number } templateId
 * @param { string } email
 * @return { void }
 */
exports.sendWithTemplate = (data, templateId, email) => {
  var client = new postmark.ServerClient(
    "a52948a0-9233-4a17-8620-08432d3607e4"
  );
  client
    .sendEmailWithTemplate(
      {
        TemplateModel: data,
        TemplateId: templateId,
        From: "hello@trygobeyond.com",
        To: email,
      },
      (error, success) => {
        if (error) {
          console.log("Postmark error: ", error);
        }
      }
    )
    .catch((error) => {
      logger.error("Error: ", error);
    });
};
