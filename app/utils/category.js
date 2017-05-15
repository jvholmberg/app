var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Category = mongoose.model('Category');

module.exports = {
  getCategories: (next, stop) => {
    Category.find((err, categories) => {
      if (err) { stop('Error when fetching categories'); }
      next(categories);
    });
  },

  createCategory: (data, next, stop) => {
    Category.create({
      name: data.name,
      primaryUnit: data.primaryUnit,
      secondaryUnit: data.secondaryUnit,
    }, (err, category) => {
      if (err) { stop('An error ocurred when creating category'); }
      next(category, 'Categories loaded');
    });
  }
};
