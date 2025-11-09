import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token.js';
import { getUserByUsernameAndPassword } from '../services/user.service.js';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const COOKIE_NAME = 'refreshToken';

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUserByUsernameAndPassword(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const payload = { sub: user.id, username: user.username };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.cookie(COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ONE_YEAR_MS,
    path: '/',
  });

  return res.json({ accessToken, user: { id: user.id, username: user.username } });
}

export async function refresh(req, res) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'No refresh token' });
  try {
    const payload = verifyRefreshToken(token);
    const newAccess = signAccessToken({ sub: payload.sub, username: payload.username });
    return res.json({ accessToken: newAccess });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export function logout(req, res) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  return res.json({ ok: true });
}

