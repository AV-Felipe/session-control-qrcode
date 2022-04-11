import {qrcode} from './third-party/qrcode.js';

async function generateQrCode(event_id){
    const qrCodePlaceHolder = document.getElementById('current-enrolled-event');

    const typeNumber = 4;
    const errorCorrectionLevel = 'L';
    const qr = qrcode(typeNumber, errorCorrectionLevel);

    qr.addData(`http://192.168.0.100:3003/events/confirm/?id=${event_id}`);
    qr.make();
    qrCodePlaceHolder.innerHTML = qr.createImgTag();
}


// const qrCodePlaceHolder = document.getElementById('qr-code-place-holder');

// const typeNumber = 4;
// const errorCorrectionLevel = 'L';
// const qr = qrcode(typeNumber, errorCorrectionLevel);

// qr.addData('http://192.168.0.100:3000/pages/ticket-validation.html');
// qr.make();
// qrCodePlaceHolder.innerHTML = qr.createImgTag();

export {generateQrCode}