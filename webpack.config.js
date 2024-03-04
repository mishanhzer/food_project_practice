'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js', // ./ - значит что в текущей директории (в этой же папке),  Первая точка означает текущий каталог, вторая — на уровень выше, а косая черта — что нам нужно зайти в тот каталог
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};


