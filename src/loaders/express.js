import express from 'express';
const app = express();

import cors from 'cors';

import addRouters from './routers.js';
import notFound from '../middlewares/not-found.js';
import errorHandler from '../middlewares/error-handler.js';

// Parses incoming requests with JSON
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

addRouters(app);

app.get("/healthcheck", (req, res) => {
    return res.send("The app is healthy");
});

app.use(notFound);
app.use(errorHandler);

export default app;