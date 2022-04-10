

async function createNewUser(event){

    const userFullName = document.getElementById('new-full-name').value;
    const userName = document.getElementById('new-user-name').value;
    const userPassword = document.getElementById('new-user-password').value;

    const bodyContent = {
        full_name: userFullName,
        user_name: userName,
        password: userPassword
    }

    fetch('http://192.168.0.100:3003/user/create',{
        method: 'POST',
        credentials:'include',//required for same origin credentials (for browser to store server cookie)
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyContent),
    })
    .then(response => {
        if(!response.ok){
            throw Error(response.status);
        }else{
            return response.json();
        }
        
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
        return;
    })
    
}

export {createNewUser}