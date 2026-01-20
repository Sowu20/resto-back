const { ReaderView } = require('@numerum-tech/cmsdk');

const menusReader = new ReaderView(
  'menus-restaurent-1',
  'Menus - Chez Nana'
)
  .setIntro('Liste des menus disponibles')
  .addListField([
    'Menu Petit-déjeuner - 2000 FCFA',
    'Menu Déjeuner - 3500 FCFA',
    'Menu Dîner - 5000 FCFA'
  ])
  .setPrev('https://resto-back-xazy.onrender.com/mobile/restaurents/1');

module.exports = { menusReader };