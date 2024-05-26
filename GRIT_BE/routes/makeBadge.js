const express = require('express');
const { format } = require('date-fns/format');
const { User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const pythonShell = require('python-shell');
const router = express.Router();
const path = require('path');

let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: '/Users/sayhi/Desktop/workspace/Projects/GET-IT/GRIT_Web/BE/python',
    args: []
};

router.post('/makeBadge', async (req, res) => {
    try {
        // const targetName  = req.user.id;
        const targetName  = 8;
        console.log('User ID:', targetName); // User ID 확인
        console.log('Script Path:', options.scriptPath); // Script Path 확인

        options.args = [targetName];
        pythonShell.PythonShell.run('Mosaic.py', options, function (err, result) {
            if (err) {
                console.error('Python Script Error:', err);
                return res.status(500).json({ message: 'Python script execution error' });
            }
            console.log('Python script finished');
            console.log(result);
            res.status(200).json({ message: 'Python script executed successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    

});

module.exports = router;