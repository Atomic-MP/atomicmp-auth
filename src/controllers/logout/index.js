const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('jwt', '')
  req.logout();
  res.redirect('/');
});

module.exports = router;
