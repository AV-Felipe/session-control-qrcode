const buttonLogin = document.getElementById('login-button');

buttonLogin.addEventListener('click', loginToServer);

async function loginToServer(event){

    const userName = document.getElementById('user-name').value;
    const userPassword = document.getElementById('user-password').value;

    const bodyContent = {
        user: userName,
        password: userPassword
    }

    fetch('http://192.168.0.100:3003/session/login',{
        method: 'POST',
        credentials:'include',//required for same origin credentials (for browser to store server cookie)
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyContent),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}
