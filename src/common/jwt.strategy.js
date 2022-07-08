import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import jwt from 'jsonwebtoken'
import "dotenv/config";

const opt = {
  secretOrKey: process.env.AUTH_HS256_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: `${process.env.AUTH_ISSUER_URL}`,
  algorithms: ["HS256"],
  audience: `${process.env.AUTH_AUDIENCE_URL}`,
  playload:`${process.env.AUTH_PLAYLOAD_URL}`,
};

export const jwtStrategy = new Strategy(opt, (jwt_payload, done) => {
  if (!jwt_payload) {
    done(true);
  } else {
    done(null, jwt_payload);
  }
});

export const Authenticate = (req, res, next) => {
  let token = req.headers['authorization']
  token = token.replace("Bearer ", "")
  // console.log(token);
  const isValid = jwt.verify(token, process.env.AUTH_HS256_KEY)
  if(isValid){
    return next()
  }

  return res.status(401)
  // passport.authenticate(jwtStrategy, (err, user) => {
  //   console.log(user);
  //   if (err) res.status(401).send({ message: 'Unauthorized' });
  //   if (!user) res.status(401).send({ message: 'Unauthorized' });
  //   else {
  //     next();
  //   }
  // })(req, res, next);
};