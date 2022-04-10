
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
        <button type="button">Cadastrar Usuário</button>
        </li>
        
        <li class="user-main-menu-item">
        <button type="button">Listar Usuários</button>
        </li>
        
        <li class="user-main-menu-item">
        <button type="button">Cadastrar Evento</button>
        </li>
    `,

    `
    <li class="user-main-menu-item">
    <button type="button">Listar Usuários</button>
    </li>
    
    <li class="user-main-menu-item">
    <button type="button">Listar Eventos</button>
    </li>
    
    <li id="current-enrolled-event" class="user-main-menu-item">

    </li>
    `

]

async function loadUserScreen(userType){

    clearScreen('body');

    const currentScreen = document.querySelector('body');
    currentScreen.insertAdjacentHTML('afterbegin', mainMenuElement);

    const mainMenuBody = document.getElementById('main-menu-body');
    const menuTitle = document.getElementById('main-menu-user-class');

    if(userType === 'adm'){

        menuTitle.innerText = 'Administrator';
        mainMenuBody.insertAdjacentHTML('beforeend', mainMenuComponents[0]);

    }else if(userType === 'user'){

        menuTitle.innerText = 'Usuário';
        mainMenuBody.insertAdjacentHTML('beforeend', mainMenuComponents[1]);

    }


}

async function clearScreen(screenElement){

    const currentScreen = document.querySelector(screenElement);

    while(currentScreen.firstChild){
        currentScreen.removeChild(currentScreen.firstChild);
    }

    return;
}

export {loadUserScreen}