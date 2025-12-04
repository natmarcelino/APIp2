const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: "API ONLINE E FUNCIONANDO!" });
});

// Auth
router.use('/auth', require('./auth.routes'));

// Users
router.use('/users', require('./users.routes'));

// Categories
router.use('/categories', require('./categories.routes'));

// Situation
router.use('/situations', require('./situations.routes'));

// Product Categories
router.use('/product-categories', require('./productCategories.routes'));

// Product Situations
router.use('/product-situations', require('./productSituations.routes'));

// Products
router.use('/products', require('./products.routes'));

// Occurrences
router.use('/occurrences', require('./occurrences.routes'));

module.exports = router;
