import { Router } from 'express';
import config from 'config';

import { SESSION_COOKIE_NAME } from '../../constants/session';

const router = new Router();

const users = config.get('users');

router.get('/', async (req, res) => {
  return res.json({
    data: users,
  });
});

router.post('/login', async (req, res) => {
  const { name } = req.body;
  console.log('Login', name);

  try {
    const cookieValue = JSON.stringify({ name });
    res.cookie(SESSION_COOKIE_NAME, cookieValue, {
      httpOnly: true,
      secure: req.secure,
      maxAge: 24 * 3600 * 1000,
    });
    res.json({
      data: {
        name,
      },
    });
  } catch(err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post('/logout', async (req, res) => {
  console.log('Logout');

  try {
    res.cookie(SESSION_COOKIE_NAME, null, {
      maxAge: -1,
    });
    res.json({
      data: {
      },
    });
  } catch(err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
