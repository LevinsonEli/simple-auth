import config from './config/index.js';
import app from './loaders/express.js';


async function start() {
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
}

start();