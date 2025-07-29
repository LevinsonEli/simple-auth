import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {

  console.log(err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong try again later.' })
}

export default errorHandlerMiddleware
