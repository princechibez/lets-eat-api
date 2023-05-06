const { validationResult } = require("express-validator");
const mail_transporter = require("../utilities/automatedMailConfig");

class SubScription_Handlers {
  // get all saved recipes
  async email_Subscription(req, res, next) {
    try {
      const userEmail = req.params.userEmail;
      const username = userEmail.split("@")[0];

      // check for param errors
      let error = validationResult(req);
      if (!error.isEmpty()) {
        error = new Error(error.array()[0].msg);
        error.statusCode = 400;
        throw error;
      }

      // Send an email to the user
      mail_transporter().sendMail(
        {
          from: "lacocina@app.com",
          to: userEmail,
          subject: "La Cocina subscription successfull",
          text: `Hello ${username.toUpperCase()}, Thank you for subscribing to our newsletter`,
        },
        (err) => {
          if (err) {
            utilityMethods.errorGeneratorMethod(
              "Couldn't send email, try again..."
            );
          }
          console.log("message sent to email address");
        }
      );

      res.status(200).json({
        message: "Subscription successfull",
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SubScription_Handlers();
