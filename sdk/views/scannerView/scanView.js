const { QRScanView } = require('@numerum-tech/cmsdk');

// Vue pour scanner un code QR
const scanView = new QRScanView('scan-qr', 'Scanner un Code')
    .setIntro('Pointez votre caméra vers un code QR')
    // Pour l'instant, validation générique, mais on pourrait restreindre si besoin
    .submitButton('Vérifier', 'Confirmer la vérification ?');

module.exports = { scanView };
