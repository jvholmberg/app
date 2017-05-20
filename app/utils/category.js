var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Category = mongoose.model('Category');

module.exports = {
  getCategories: (cb, ecb) => {
    Category.find((err, doc) => {
      if (err) {
        LogUtil.writeToLog('@fn: getCategories', err);
        return ecb('Error when fetching categories');
      }
      return cb(doc, 'Category created');
    });
  },
  createCategory: (data, cb, ecb) => {
    Category.create({
      name: data.name,
      primaryUnit: data.primaryUnit,
      secondaryUnit: data.secondaryUnit,
    }, (err, doc) => {
      if (err) {
        LogUtil.writeToLog('@fn: createCategory', err);
        return ecb('An error ocurred when creating category');
      }
      return cb(doc, 'Categories loaded');
    });
  },
  getNumberOfCategories: (cb, ecb) => {
    Category.count({}, (err, count) => {
      if (err) {
        LogUtil.writeToLog('@fn: getNumberOfCategories', err);
        return ecb('An internal error occurred');
      }
      return cb(count);
    });
  }
};
