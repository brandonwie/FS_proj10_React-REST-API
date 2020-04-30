const { check } = require("express-validator");

const nameValidation = [
  check("firstName")
    .matches(/^[A-Z][a-zA-Z]+$/)
    .withMessage(
      "First name must contain letters only."
    ),
  check("lastName")
    .matches(/^[A-Z][a-zA-Z]+$/)
    .withMessage(
      "Last name must contain letters only."
    ),
];

const passwordValidation = [
  check("password")
    .matches(/^(?=.*[!@#$%^&*]).+$/)
    .withMessage(
      "A password must contain at least 1 special charecter."
    )
    .matches(/^(?=.*[A-Z]).+$/)
    .withMessage(
      "A password must contain at least 1 uppercase letter."
    )
    .matches(/(?=.*[a-z]).+$/)
    .withMessage(
      "A password must contain at least 1 lowercase letter."
    )
    .matches(/^(?=.*[0-9]).+$/)
    .withMessage(
      "A password must contain at least 1 number."
    )
    .matches(/^(?=.{6,20}).*$/)
    .withMessage(
      "A password must be 6-20 charecters long."
    ),
];
