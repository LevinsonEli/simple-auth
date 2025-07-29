import config from "../../../config/index.js";
import { Router } from 'express';


const router = Router();

export default class AuthRouter {
  static routeURL = config.api.prefix + "auth";
  authController;

  constructor(authController) {
    this.authController = authController;
  }

  addRoutes(app) {
    app.use(AuthRouter.routeURL, router);

    router
      .post("/register", this.authController.register)
      .post("/login", this.authController.login);
  }
}