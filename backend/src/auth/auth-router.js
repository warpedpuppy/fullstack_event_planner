const express = require('express');
const AuthService = require('./auth-service');
const authRouter = express.Router();
const jsonBodyParser = express.json();
const Config = require('../config');

authRouter
    .post('/login', jsonBodyParser, (req, res) => {
        const { password } = req.body;
        if (password !== '' && password === Config.ADMIN_PASSWORD) {
            const sub = "admin";
            const payload = { user_id: sub }
            res.json({
                success: true,
                authToken: AuthService.createJwt(sub, payload)
            })
        } else {
            res.json({success: false})
        }

    })

module.exports = authRouter