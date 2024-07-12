const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const clientId = 'de0a43352469878e'; // Вставьте ваш Client ID здесь
const clientSecret = 'f91444d579cb25f6c1e6961d9dfaa908d1436221'; // Вставьте ваш Client Secret здесь
const redirectUri = 'https://venzelland.github.io/JobTest/'; // Вставьте ваш Redirect URI здесь

app.get('/oauth/callback', async (req, res) => {
    const authorizationCode = req.query.code;

    const response = await fetch('https://oauth.pipedrive.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri
        })
    });

    const data = await response.json();

    res.send(`Access Token: ${data.access_token}`);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
