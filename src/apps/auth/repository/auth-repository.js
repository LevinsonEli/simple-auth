import db from "../../../db/index.js";

export default class AuthRepository {
    constructor() { }

    // userData = { username?, email, password_hash }
    async createUser(userData) {
        const { username, email, password_hash } = userData;

        const [result] = await db.query(
            `INSERT INTO users (username, email, password_hash)
       VALUES (?, ?, ?)`,
            [username, email, password_hash]
        );

        return result.insertId;
    }

    // Find a user by username (for uniqueness check)
    async findUserByUsername(username) {
        const [rows] = await db.query(
            `SELECT id, username, email, password_hash
            FROM users
            WHERE username = ?
            LIMIT 1`,
            [username]
        );
        return rows[0] || null;
    }

    // Find a user by email (for uniqueness check)
    async findUserByEmail(email) {
        const [rows] = await db.query(
            `SELECT id, username, email, password_hash
       FROM users
       WHERE email = ?
       LIMIT 1`,
            [email]
        );
        return rows[0] || null;
    }

    // { username? or email }
    async findUserByUsernameOrEmail({ username, email }) {
        const [rows] = await db.query(
            `SELECT id, username, email, password_hash
        FROM users
        WHERE username = ? OR email = ?
        LIMIT 1`,
            [username || "", email || ""]
        );

        return rows[0] || null;
    }

    async findUserById(id) {
        const [rows] = await db.query(
            `SELECT id, username, email FROM users WHERE id = ?`,
            [id]
        );
        return rows[0] || null;
    }

    async storeToken(userId, token, expiresAt = null) {
        const [result] = await db.query(
            `INSERT INTO tokens (user_id, token, expires_at)
       VALUES (?, ?, ?)`,
            [userId, token, expiresAt]
        );
        return result.insertId;
    }

    async findToken(token) {
        const [rows] = await db.query(
            `SELECT id, user_id, token, created_at, expires_at
       FROM tokens WHERE token = ?`,
            [token]
        );
        return rows[0] || null;
    }

    async deleteToken(token) {
        const [result] = await db.query(
            `DELETE FROM tokens WHERE token = ?`,
            [token]
        );
        return result.affectedRows > 0;
    }
}
