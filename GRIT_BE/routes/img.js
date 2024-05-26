const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { format } = require('date-fns');
const { Post, User } = require('../models');
const router = express.Router();

// 이미지 업로드
try{
    fs.readdirSync('image_pool');
} catch(error){
    console.error('image_pool 폴더가 없어 image_pool 폴더를 생성합니다.');
    fs.mkdirSync('image_pool');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'image_pool/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const userId = req.user.id;
            const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
            cb(null, `${userId}_${timestamp}${ext}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// todo: 이미지 업로드 라우터
router.post('/upload', upload.single('certImg'), async(req, res) => {
    try {
        if (req.file) {
            res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
        } else {
            res.status(400).json({ message: 'File upload failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 배지 목록 불러오기 라우터
// router.get('/badges', async (req, res) => {
//     try {
//         const badgesDir = path.join(__dirname, '../image_pool/badges'); // badges 디렉토리 경로 설정
//         const files = await fs.readdir(badgesDir); // 디렉토리 내의 파일 목록 읽기
//         const badgeFiles = files.map(file => path.join('image_pool/badges', file)); // 파일 경로 설정

//         res.status(200).json({ badges: badgeFiles });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to load badges' });
//     }
// });
// router.get('/badges', (req, res, next) => {
//     const dirPath = 'image_pool/badges'; // 상대 경로 설정

//     fs.readdir(dirPath, (err, files) => {
//         if (err) {
//             console.error('Error reading directory:', err);
//             return res.status(500).json({ message: 'Internal server error' });
//         }

//         console.log('Directory Path:', dirPath);
//         console.log('Files:', files);

//         const fileName = files[0];
//         const combinedPath = `${dirPath}/${fileName}`;


//         res.status(200).json({ combinedPath });
//         console.log("전송되는 이미지 주소: ",combinedPath);
//     });
// });

//GPT 코드
router.get('/badges', (req, res, next) => {
    const dirPath = path.join(__dirname, '../image_pool/badges');

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const filePaths = files.map(file => `/public/${file}`);
        res.status(200).json({ filePaths });
    });
});

module.exports = router;   