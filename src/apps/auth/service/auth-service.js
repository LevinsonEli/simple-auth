import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/index.js";

export default class AuthService {
  authRepository;

  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  register = async ({ username, email, password }) => {
    // Check if user with same username or email already exists
    const existingByUsername = await this.authRepository.findUserByUsername(username);
    const existingByEmail = await this.authRepository.findUserByEmail(email);

    if (existingByUsername || existingByEmail) {
      throw new Error("USER_EXISTS");
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Store user in DB
    const userId = await this.authRepository.createUser({
      username,
      email,
      password_hash,
    });

    const user = await this.authRepository.findUserById(userId);
    return user;
  };

  login = async ({ username, email, password }) => {
    // Find user by username or email
    const user = await this.authRepository.findUserByUsernameOrEmail({ username, email });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) return null;

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Optionally store the token in DB
    await this.authRepository.storeToken(user.id, token);

    return token;
  };
}
