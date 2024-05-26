const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

dotenv.config();
const HTTP_PORT = process.env.HTTP_PORT;
const HOST = process.env.HOST;

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const { isLoggedIn, isNotLoggedIn } = require('./routes/middlewares');
const { Post, User } = require('./models');

const app = express();

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

passportConfig();
app.set('port', HTTP_PORT || 8001);

// 템플릿 엔진 관련 설정 제거
// app.set('view engine', 'html');
// nunjucks.configure('tests', { 
//     express: app,   
//     watch: true,    
// });

// force: true로 설정하면 서버 실행 시마다 테이블 재생성
sequelize.sync();

app.use(morgan('dev'));

// 정적 파일 제공
// app.use(express.static(path.join(__dirname, 'tests')));
app.use('/public', express.static(path.join(__dirname, 'image_pool/badges')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

// 라우터 연결
app.use('/', require('./routes/page'));
app.use('/auth', require('./routes/auth'));
app.use('/post', require('./routes/post'));
app.use('/todo', require('./routes/img'));
app.use('/badge', require('./routes/img'));
app.use('/makeBadge', require('./routes/makeBadge'));
app.use('/meal', require('./routes/apiService'));
app.use('/timetable', require('./routes/apiService'));

// 라우터가 없을 때 에러 처리 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.json({ error: err.message }); // 템플릿 렌더링 대신 JSON 응답으로 변경
});

module.exports = { app };

// 서버 연결
app.listen(HTTP_PORT, HOST, () => {
    console.log(`server is on http://${HOST}:${HTTP_PORT}`);
    console.log(app.get('port'), '번 포트에서 대기 중');
});
