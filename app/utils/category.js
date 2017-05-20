var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Category = mongoose.model('Category');

module.exports = {
  getCategories: (cb, ecb) => {
    Category.find((err, doc) => {
      if (err) { ecb('Error when fetching categories'); }
      cb(doc, 'Category created');
    });
  },
  createCategory: (data, cb, ecb) => {
    Category.create({
      name: data.name,
      primaryUnit: data.primaryUnit,
      secondaryUnit: data.secondaryUnit,
    }, (err, doc) => {
      if (err) { ecb('An error ocurred when creating category'); }
      cb(doc, 'Categories loaded');
    });
  },
  getNumberOfCategories: (cb, ecb) => {
    console.log('err');
    Category.count({}, (err, count) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(count);
    });
  }
};
