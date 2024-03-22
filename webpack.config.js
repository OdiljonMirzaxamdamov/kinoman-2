const path = require('path');

module.exports = {
  mode: `development`, // режим сборки
  entry: `./src/main.js`, // задали точку входа
  output: {
    filename: `bundle.js`, // файл сборки бандл
    path: path.join(__dirname, `public`) // директория(путь) для сборки
  },
  devtool: `source-map`, // подключаем и активируем генерацию source-maps
  devServer: {
    static: {
      directory: path.join(__dirname, `public`) // где искать сборку
    }
    // Автоматическая перезагрузка страницы
    // По умолчанию приложение будет доступно по адресу http://localhost:8080
    // Лучше открывать в режиме инкогнито, чтобы браузер не кэшировал файлы сборки
    // watchContentBase: true
  }
};
