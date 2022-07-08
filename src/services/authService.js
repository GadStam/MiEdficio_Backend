import jwt from "jsonwebtoken";
import 'dotenv/config'

export class AuthService {
    getToken = (id) => {
      return jwt.sign({id}, process.env.AUTH_HS256_KEY, { expiresIn: '1h' })
    }
}
