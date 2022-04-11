import { generateQrCode } from "./qr-code.js";


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
    
};

async function createNewEvent(event){

    const eventTitle = document.getElementById('new-event-title').value;
    const eventDescription = document.getElementById('new-event-description').value;
    const eventDate = document.getElementById('new-event-date').value;
    const eventTime = document.getElementById('new-event-time').value;

    const bodyContent = {
        "title": eventTitle,
        "description": eventDescription,
        "event_date": eventDate,
        "event_time": eventTime
    }

    fetch('http://192.168.0.100:3003/events/create',{
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

async function enrollEvent(event){

    let desiredEvent = event.target.id;
    desiredEvent = desiredEvent.split('-')[2];

    const bodyContent = {
        "event_id": desiredEvent,
    }

    fetch('http://192.168.0.100:3003/events/enroll',{
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
    
};

async function getMyNextEvent(event){
    fetch('http://192.168.0.100:3003/events/mynextevent',{
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
        if(data){
            generateQrCode(data.event_id)
        }
        
    })
    .catch(err => {
        console.log(err);
        return;
    })
}

export {createNewUser, createNewEvent, enrollEvent, getMyNextEvent}