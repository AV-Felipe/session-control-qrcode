import {createNewUser, createNewEvent, enrollEvent, getMyNextEvent} from './admin-menu-server-communication.js';

const mainMenuElement = `
    <ul id ="main-menu-body" class="user-main-menu">
    <li>
        <h2>Menu do <span id="main-menu-user-class"></span></h2>
    </li>

    </ul>
`;

const mainMenuComponents = [
    `
        <li class="user-main-menu-item">
        <button id="add-user-menu" type="button">Cadastrar Usuário</button>
        </li>
        
        <li class="user-main-menu-item">
        <button id="list-users-button" type="button">Listar Usuários</button>
        </li>
        
        <li class="user-main-menu-item">
        <button id="add-event-menu" type="button">Cadastrar Evento</button>
        </li>
    `,

    `
    <li class="user-main-menu-item">
    <button id="list-users-button" type="button">Listar Usuários</button>
    </li>
    
    <li class="user-main-menu-item">
    <button id="list-events-button" type="button">Listar Eventos</button>
    </li>
    
    <li id="current-enrolled-event" class="user-main-menu-item-center">

    </li>
    `

];

const subMenuComponents = [
    `
    <form id="create-new-user-menu" class="user-main-menu">
            
        <label for="new-full-name">Nome completo:</label>
        <input type="text" id="new-full-name" />

        <label for="new-user-name">Nome de usuário:</label>
        <input type="text" id="new-user-name" />

        <label for="new-user-password">Senha:</label>
        <input type="password" id="new-user-password" />

        <button type="button" id="create-user-button">Criar</button>

    </form>
    `,

    `
    <table id="user-list-table" class="table-users-list">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nome Completo</th>
                <th>Nome de Usuário</th>
            </tr>
        </thead>

        <tbody id="users-list-rendering-area">

        </tbody>

    </table>
    `,

    `
    <form id="create-new-event-menu" class="user-main-menu">
            
        <label for="new-event-title">Título:</label>
        <input type="text" id="new-event-title" />

        <label for="new-event-description">Descrição:</label>
        <input type="text" id="new-event-description" />

        <label for="new-event-date">Data:</label>
        <input type="text" placeholder="AAAA-MM-DD" id="new-event-date" />

        <label for="new-event-time">Hora:</label>
        <input type="text" placeholder="HH:MM" id="new-event-time" />

        <button type="button" id="create-event-button">Criar</button>

    </form>
    `,

    `
    <table id="event-list-table" class="table-users-list">
        <thead>
            <tr>
                <th>Id</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Horário</th>
            </tr>
        </thead>

        <tbody id="event-list-rendering-area">

        </tbody>

    </table>
    `

];

async function loadUserScreen(userType){

    clearScreen('body');

    const currentScreen = document.querySelector('body');
    currentScreen.insertAdjacentHTML('afterbegin', mainMenuElement);

    const mainMenuBody = document.getElementById('main-menu-body');
    const menuTitle = document.getElementById('main-menu-user-class');

    if(userType === 'adm'){

        menuTitle.innerText = 'Administrator';
        mainMenuBody.insertAdjacentHTML('beforeend', mainMenuComponents[0]);

        currentScreen.addEventListener('click', adminOptions);

    }else if(userType === 'user'){

        menuTitle.innerText = 'Usuário';
        mainMenuBody.insertAdjacentHTML('beforeend', mainMenuComponents[1]);

        currentScreen.addEventListener('click', userOptions);

        getMyNextEvent();

    }


}

async function clearScreen(screenElement){

    const currentScreen = document.querySelector(screenElement);

    while(currentScreen.firstChild){
        currentScreen.removeChild(currentScreen.firstChild);
    }

    return;
}

async function adminOptions(event){
    const pressedButton = event.target.id;

    console.log(pressedButton)

    const addUserMenuButton = document.getElementById('add-user-menu');
    const listUsersMenuButton = document.getElementById('list-users-button');
    const addEventMenuButton = document.getElementById('add-event-menu');

    switch (pressedButton) {
        case 'add-user-menu':
            if(!document.contains(document.getElementById('create-new-user-menu'))){
                addUserMenuButton.insertAdjacentHTML('afterend', subMenuComponents[0]);
                document.getElementById('create-user-button').addEventListener('click', createNewUser);
                document.addEventListener('click', closeMenu)
            }

            break;
        
        case 'list-users-button':
            if(!document.contains(document.getElementById('user-list-table'))){
                
                listUsersMenuButton.insertAdjacentHTML('afterend', subMenuComponents[1]);

                fetch('http://192.168.0.100:3003/user/',{
                    method: 'GET',
                    credentials:'include',//required for same origin credentials (for browser to store server cookie)
                    headers:{
                        'Content-Type': 'application/json',
                    },
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
                    data.forEach((element)=>{
                        const output = document.getElementById('users-list-rendering-area')
    
                        output.insertAdjacentHTML('beforeend', `
                            <tr>
                                <td>${element.id}</td>
                                <td>${element.full_name}</td>
                                <td>${element.user_name}</td>
                            </tr>
                        `)
                    })
                    
                })
                .catch(err => {
                    console.log(err);
                    return;
                })


            }else{
                document.getElementById('user-list-table').remove();
            }

            break;
        
        case 'add-event-menu':
            if(!document.contains(document.getElementById('create-new-event-menu'))){
                addEventMenuButton.insertAdjacentHTML('afterend', subMenuComponents[2]);
                document.getElementById('create-event-button').addEventListener('click', createNewEvent);
                document.addEventListener('click', closeMenuB)
            }

            break;
    }

}

function closeMenu(event){
    console.log(event.path)
    let clickInside = false;
    event.path.forEach(element => {
        if(element.id === 'create-new-user-menu'){
            clickInside = true
        }
    });
    if(clickInside || event.target.id === 'add-user-menu'){
        return;
    }else{
        document.removeEventListener('click', closeMenu);
        document.getElementById('create-user-button').removeEventListener('click', createNewUser);
        document.getElementById('create-new-user-menu').remove();
    }
};

function closeMenuB(event){
    console.log(event.path)
    let clickInside = false;
    event.path.forEach(element => {
        if(element.id === 'create-new-event-menu'){
            clickInside = true
        }
    });
    if(clickInside || event.target.id === 'add-event-menu'){
        return;
    }else{
        document.removeEventListener('click', closeMenuB);
        document.getElementById('create-event-button').removeEventListener('click', createNewEvent);
        document.getElementById('create-new-event-menu').remove();
    }
};


async function userOptions(event){
    const pressedButton = event.target.id;

    console.log(pressedButton)

    const listUsersMenuButton = document.getElementById('list-users-button');
    const listEventMenuButton = document.getElementById('list-events-button');

    switch (pressedButton) {

        case 'list-users-button':
            if(!document.contains(document.getElementById('user-list-table'))){
                
                listUsersMenuButton.insertAdjacentHTML('afterend', subMenuComponents[1]);

                fetch('http://192.168.0.100:3003/user/',{
                    method: 'GET',
                    credentials:'include',//required for same origin credentials (for browser to store server cookie)
                    headers:{
                        'Content-Type': 'application/json',
                    },
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
                    data.forEach((element)=>{
                        const output = document.getElementById('users-list-rendering-area')
    
                        output.insertAdjacentHTML('beforeend', `
                            <tr>
                                <td>${element.id}</td>
                                <td>${element.full_name}</td>
                                <td>${element.user_name}</td>
                            </tr>
                        `)

                    })
                    
                })
                .catch(err => {
                    console.log(err);
                    return;
                })


            }else{
                document.getElementById('user-list-table').remove();
            }

            break;
        
        case 'list-events-button':

            if(!document.contains(document.getElementById('event-list-table'))){
                
                listEventMenuButton.insertAdjacentHTML('afterend', subMenuComponents[3]);

                fetch('http://192.168.0.100:3003/events/',{
                    method: 'GET',
                    credentials:'include',//required for same origin credentials (for browser to store server cookie)
                    headers:{
                        'Content-Type': 'application/json',
                    },
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
                    data.forEach((element)=>{
                        const output = document.getElementById('event-list-rendering-area')
    
                        output.insertAdjacentHTML('beforeend', `
                            <tr id="click-event-${element.id}">
                                <td id="click-event-${element.id}">${element.id}</td>
                                <td id="click-event-${element.id}">${element.title}</td>
                                <td>${element.description}</td>
                                <td>${element.event_date}</td>
                                <td>${element.event_time}</td>
                            </tr>
                        `)

                    })
                    
                    document.getElementById('event-list-rendering-area').addEventListener('click', enrollEvent);
                    
                })
                .catch(err => {
                    console.log(err);
                    return;
                })


            }else{
                document.getElementById('event-list-table').remove();
            }

            break;
    }

}


export {loadUserScreen}