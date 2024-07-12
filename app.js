const clientId = 'de0a43352469878e'; // Вставьте ваш Client ID здесь
const clientSecret = 'f91444d579cb25f6c1e6961d9dfaa908d1436221'; // Вставьте ваш Client Secret здесь
const redirectUri = 'https://venzelland.github.io/JobTest/'; // Вставьте ваш Redirect URI здесь

document.getElementById('authorize').href = `https://oauth.pipedrive.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

// Получаем код авторизации из URL
const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get('code');

if (authorizationCode) {
    fetch('https://oauth.pipedrive.com/oauth/token', {
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
    })
        .then(response => response.json())
        .then(data => {
            console.log('Access Token:', data.access_token);
            const accessToken = data.access_token;

            // Пример создания сделки
            const deal = {
                title: 'Test Deal',
                value: 1000
            };

            fetch('https://api.pipedrive.com/v1/deals', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deal)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('content').innerText = 'Сделка успешно создана!';
                    } else {
                        document.getElementById('content').innerText = 'Ошибка при создании сделки: ' + data.error;
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    document.getElementById('content').innerText = 'Ошибка при создании сделки: ' + error.message;
                });
        })
        .catch(error => console.error('Error:', error));
}
