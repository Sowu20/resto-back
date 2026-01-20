const { ReaderView } = require('@numerum-tech/cmsdk');

const repasReader = new ReaderView(
  'repas-restaurent-1',
  'Repas - Chez Nana'
)
  .setIntro('Plats disponibles')
  .addListField([
    'Riz sauce arachide',
    'Fufu sauce graine',
    'Pâte + sauce tomate',
    'Poulet braisé'
  ])
  .setPrev('https://resto-back-xazy.onrender.com/mobile/restaurents/1');

module.exports = { repasReader };