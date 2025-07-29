import config from "../../../config/index.js";
import { Router } from 'express';
import verifyToken from "../../../middlewares/verify-token.js";


const router = Router();

export default class ProtectedRouter {
    static routeURL = config.api.prefix + "protected";

    constructor() { }

    addRoutes(app) {
        app.use(ProtectedRouter.routeURL, router);

        router
            .get(
                '/',
                verifyToken,
                (req, res) => {
                    res.status(200).json({
                        message: `Hello, ${req.user.username || 'user'}! This is a protected route.`,
                        user: req.user,
                    });
                }
            );
    }
}