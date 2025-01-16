const bcrypt = require("bcrypt");
const formatResponse = require("../utils/formatResponse");
const UserValidator = require("../utils/userValidator");
const UserService = require("../services/User.service");
const generateTokens = require("../utils/generateTokens");
const cookieConfig = require("../config/cookieConfig");
const axios = require('axios')

class UserController {
  static async refreshToken(req, res) {
    const { user } = res.locals;
    try {
      const { accessToken, refreshToken } = generateTokens({ user });
      res.status(200).cookie("refreshToken", refreshToken, cookieConfig).json(
        formatResponse(200, "Successfully generate new tokens", {
          user,
          accessToken,
        })
      );
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async signUp(req, res) {
    const { email, password, username } = req.body;

    const normalizedEmail = email.toLowerCase();

    const { isValid, error } = UserValidator.validateSignUp({
      email: normalizedEmail,
      password,
      username,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const foundUser = await UserService.getByEmail(normalizedEmail);

      if (foundUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "A user with this email already exists",
              null,
              "A user with this email already exists"
            )
          );
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        email: normalizedEmail,
        password: hashPassword,
        username,
      });

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .status(201)
        .cookie("refreshToken", refreshToken, cookieConfig)
        .json(
          formatResponse(201, "Успешная регистрация", {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.log(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async signIn(req, res) {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase();
    const { isValid, error } = UserValidator.validateSignIn({
      email: normalizedEmail,
      password,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      const user = await UserService.getByEmail(normalizedEmail);
      
      if (!user) {
        return res.status(404).json(formatResponse(404,`User with email ${email} not found`,null,`User with email ${email} not found`));
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res
          .status(401)
          .json(
            formatResponse(401, "Invalid password", null, "Invalid password")
          );
      }
      const plainUser = user.get({ plain: true });
      delete plainUser.password;
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig)
        .json(
          formatResponse(200, "Успешный вход", {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.log(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async update(req, res){
    try {
      const {user:{id}}= res.locals
      const user = await UserService.getById(+id)
      if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      if(req.body.email){
        req.body.email=req.body.email.toLowerCase()
        const isEmpty = await UserService.getByEmail(req.body.email)
        if (isEmpty){
          return res.status(400).json(formatResponse(400,`Email ${req.body.email} занят`, null , `Email ${req.body.email} занят`))
        }
      }
      const update = await UserService.update(user, req.body)
      res.status(200).json(formatResponse(200,'Успешное обновление', update))
    } catch ({message}) {
      console.log(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signOut(req, res) {
    try {
      res
        .clearCookie("refreshToken")
        .status(200)
        .json(formatResponse(200, "logout"));
    } catch ({ message }) {
      console.log(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async checkEmailExistence(req, res) {
    
    const { email } = req.body;
    
    if (!email || !UserValidator.validateEmail(email)) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            'Email обязателен для проверки и должен быть корректным.',
            null,
            'Email обязателен для проверки и должен быть корректным.'
          )
        )
      }
      try {
        const apiKey = process.env.CHECK_EMAIL_API_KEY;
        const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`);
        const { data } = response;
    
        if (data.data && data.data.result === 'undeliverable') {
          return res.status(200).json(
            formatResponse(
              200,
              'Email не существует',
              { exists: false },
              'Email не существует'
            )
          );
        }
    
        return res.status(200).json(
          formatResponse(
            200,
            'Email найден',
            {
              exists:
                data.data.result === 'deliverable' ||
                data.data.result === 'risky',
            },
            'Email найден'
          )
        );
      } catch ({ message }) {
        res
          .status(500)
          .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
      }
    }
}

module.exports = UserController;
