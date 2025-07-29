import { StatusCodes } from "http-status-codes";
import logger from "../../../logger";

export default class AuthController {

    authService;

    static ERRORS = {
        missingFields: { error: "Missing required fields: username, email and password." },
        invalidCredentials: { error: "Invalid credentials." },
        userExists: { error: "User already exists." },
        internalError: { error: "Internal server error." },
    };

    constructor(authService) {
        this.authService = authService;
    }

    register = async (req, res) => {
        const { username, email, password } = req.body || {};

        if (!username || !email || !password)
            return res.status(StatusCodes.BAD_REQUEST).json(AuthController.ERRORS.missingFields);

        try {
            const user = await this.authService.register({ username, email, password });
            return res.status(StatusCodes.CREATED).json(user);
        } catch (err) {
            if (err.message === "USER_EXISTS")
                return res.status(StatusCodes.CONFLICT).json(AuthController.ERRORS.userExists);

            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AuthController.ERRORS.internalError);
        }
    };

    login = async (req, res) => {
        const { username, email, password } = req.body || {};

        if (!username || !email || !password)
            return res.status(StatusCodes.BAD_REQUEST).json(AuthController.ERRORS.missingFields);

        logger.info(JSON.stringify({
            timestamp: new Date().toISOString(),
            userId: user.id,
            action: 'login',
            ip: req.ip || req.connection.remoteAddress
        }));

        try {
            const token = await this.authService.login({ username, email, password });

            if (!token)
                return res.status(StatusCodes.UNAUTHORIZED).json(AuthController.ERRORS.invalidCredentials);

            return res.status(StatusCodes.OK).json({ token });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AuthController.ERRORS.internalError);
        }
    };
}
