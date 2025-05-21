const express = require('express');
const authRouter = require('./routes/Auth.routes');
const cookieRouter = require('./routes/cookie.route');
const serverConfig = require('./configs/serverConfig');

const app = express();

serverConfig(app);

app.use('/api/word', wordRouter);
app.use('/api/word', progressRouter);
app.use('/api/cookie', cookieRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
