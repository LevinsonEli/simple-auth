
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT || !parseInt(process.env.PORT)) {
    console.log('Port number was not provided. Exiting.');
    process.exit(1);
}

export default {
    port: parseInt(process.env.PORT),
    api: {
        prefix: '/api/v1/',
    },
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        post: process.env.DB_PORT || 3306,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
}