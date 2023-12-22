import cors from 'cors';

const allowedOrigins = ['http://localhost:3000'];

export const corsOption: cors.CorsOptions = {
  origin: (origin, callback) => {
     !origin || allowedOrigins.includes(origin)
       ? callback(null, true)
       : callback(new Error(`origin ${origin} not allowed by CORS`));
  }
};