const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

// @route   GET /api/test
// @desc    Create a test entry and retrieve all test entries
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Create a new test entry
    const newTest = new Test({
      message: `Database test entry created at ${new Date().toLocaleTimeString()}`,
    });
    await newTest.save();

    // Retrieve all test entries
    const tests = await Test.find().sort({ createdAt: -1 });

    res.json({
      message: 'Successfully created a new test entry and retrieved all entries.',
      newEntry: newTest,
      allEntries: tests,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error while testing database.');
  }
});

module.exports = router;
