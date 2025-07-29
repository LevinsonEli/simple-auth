import AuthController from "../apps/auth/controller/auth-controller.js";
import AuthRepository from "../apps/auth/repository/auth-repository.js";
import AuthRouter from "../apps/auth/router/auth-router.js";
import AuthService from "../apps/auth/service/auth-service.js";
import ProtectedRouter from "../apps/protected/router/protected-router.js";


const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
const authRouter = new AuthRouter(authController);

const protectedRouter = new ProtectedRouter();


const addRouters = (app) => {
    authRouter.addRoutes(app);
    protectedRouter.addRoutes(app);
}

export default addRouters;