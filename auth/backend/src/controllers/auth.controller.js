import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token.js';
import { getUserByUsernameAndPassword, getUserById } from '../services/user.service.js';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const ACCESS_MS = 15 * 60 * 1000; // 15 minutes
const COOKIE_ACCESS = 'accessToken';
const COOKIE_REFRESH = 'refreshToken';

function cookieOptions({ httpOnly = true, maxAge = ONE_YEAR_MS } = {}) {
  return {
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  };
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUserByUsernameAndPassword(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const payload = { sub: user.id, username: user.username };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Set cookies: short-lived access and long-lived refresh
  res.cookie(COOKIE_ACCESS, accessToken, cookieOptions({ maxAge: ACCESS_MS }));
  res.cookie(COOKIE_REFRESH, refreshToken, cookieOptions({ maxAge: ONE_YEAR_MS }));

  // Return minimal user info (no tokens in body)
  return res.json({ user: { id: user.id, username: user.username } });
}

export async function refresh(req, res) {
  const token = req.cookies?.[COOKIE_REFRESH];
  if (!token) return res.status(401).json({ error: 'No refresh token' });
  try {
    const payload = verifyRefreshToken(token);
    const newAccess = signAccessToken({ sub: payload.sub, username: payload.username });
    // optionally rotate refresh token - not implemented here
    res.cookie(COOKIE_ACCESS, newAccess, cookieOptions({ maxAge: ACCESS_MS }));
    return res.json({ ok: true });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export async function me(req, res) {
  // verifyAccess middleware should have set req.user from access cookie
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = await getUserById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user: { id: user.id, username: user.username } });
}

export function logout(req, res) {
  res.clearCookie(COOKIE_ACCESS, { path: '/' });
  res.clearCookie(COOKIE_REFRESH, { path: '/' });
  return res.json({ ok: true });
}
