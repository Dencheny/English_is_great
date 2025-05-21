const cookieRouter = require('express').Router();

cookieRouter.get('/', (req, res) => {
  res
    .cookie('test', 'info', {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    })
    .send('done');
});

cookieRouter.delete('/', (req, res) => {
  res.clearCookie('test').send('clean');
});

cookieRouter.get('/my-cookie', (req, res) => {
  console.log('=====', req.cookies);
  res.send(req.cookies.test);
});

module.exports = cookieRouter;
