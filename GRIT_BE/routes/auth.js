const express = require('express'); 
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

// img upload
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// 회원가입 학생증 확인 : 이미지 업로드
// 업로드 폴더 확인 및 생성 : student_id 이미지 저장
try {
    fs.readdirSync('idcards');
} catch (error) {
    console.error('idcards 폴더가 없어 idcards 폴더를 생성합니다.');
    fs.mkdirSync('idcards');
}

// multer 설정
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'idcards/');
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 회원가입 라우터
router.post('/join', isNotLoggedIn, upload.single('student_id'), async (req, res, next) => {
    const { username, name, password, school, grade, gender } = req.body;
    const student_id = req.file ? req.file.filename : null;
    try {
        const exUser = await User.findOne({ where: { username } });
        if (exUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            username,
            name,
            password: hash,
            school,
            grade,
            gender,
            student_id,
        });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}); 

// 로그인 라우터
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
});

// 로그아웃 라우터
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    });
});

module.exports = router;
