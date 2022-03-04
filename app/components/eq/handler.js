const validator = require("./validator");
const responses = require("../../utils/responses/responses");
const eqRepo = require("./repository");
const pmark = require("../../utils/postmark");

exports.create = async (req, res) => {
  try {
    const doc = await validator.create().validateAsync(req.body);
    eqRepo
      .create({
        ...doc,
      })
      .then(() => {
        pmark.sendWithTemplate(
          {
            scoreColor:
              result <= 2.5
                ? "#D34837"
                : result < 4
                ? "#E3AD42"
                : result < 5
                ? "#2C8CE6"
                : "#4E9F68",
            eqScore: result.toFixed(1),
            scoreText:
              result <= 2.5
                ? "You've got some work to do. A score below 2.5 places you below average. But don't worry: Research suggests that people can improve their Emotional Intelligence Score."
                : result < 4
                ? "You've got some work to do. A score between 2.6 and 3.9 places you below average. But don't worry: Research suggests that people can improve their Emotional Intelligence Score."
                : result < 5
                ? "You scored between 4.0 and 4.9 which is above average but you still have room for growth; research suggests that people can improve their Emotional Intelligence Score."
                : "You scored above 5.0 which suggest you have a high Emotional Intelligence, a vital skill. You scored well above average, congratulations!",
          },
          26577949,
          req.body.email
        );
        res.json(responses.successful({ score: result }));
      })
      .catch((e) => res.json(responses.error(e.message)));
  } catch (e) {
    res.json(responses.error(e.message));
  }
};
