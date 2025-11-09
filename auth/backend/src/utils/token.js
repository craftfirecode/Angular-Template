import jwt from 'jsonwebtoken';

const ACCESS_EXP = process.env.ACCESS_EXP || '15m';
const REFRESH_EXP = process.env.REFRESH_EXP || '30d';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

export function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
