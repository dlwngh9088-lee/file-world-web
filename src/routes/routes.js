const cors = require('cors');

const checkAuth = require('../middleware/checkAuth');
const adminMainAPI = require('./admin/main/api');
const adminMainRender = require('./admin/main/render');

const mainAPI = require('./main/api');
const mainRender = require('./main/render');

const userAPI = require('./user/api');
const userRender = require('./user/render');

const forumAPI = require('./forum/api');
const forumRender = require('./forum/render');

module.exports = app => {
  // Access-Control-Allow-Origin
  // res.header("Access-Control-Allow-Origin", "http://localhost:8081");

  const whiteOriginList = [
    'http://localhost:8081',
    // 'https://www.zerocho.com',
  ];

  const corsOption = {
    origin: (origin, callback) => {
      // 자기 자신 localhost는 origin 감지가 안됨
      if (whiteOriginList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS Blocked origin ${origin}`));
      }
    },
  };

  const authURI = ['/test'];

  app.use(cors(corsOption));
  app.use(authURI, checkAuth);

  app.post('/test', (req, res) => {
    res.send('success');
  });

  // admin
  app.use('/api/admin', adminMainAPI);
  app.use('/admin', adminMainRender);

  // user service
  app.use('/api', mainAPI);
  app.use('/', mainRender);

  // user
  app.use('/api/user', userAPI);
  app.use('/user', userRender);

  // forum
  app.use('/api/forum', forumAPI);
  app.use('/forum', forumRender);
};
