const authController = require('./authController');
const adminController = require('./adminController');
const observerController = require('./observerController');
const dashboardController = require('./dashboardController');
const electionController = require('./electionController');
const blockchainController = require('./blockchainController');
const voterTrackingController = require('./voterTrackingController');

module.exports = {
  authController,
  adminController,
  observerController,
  dashboardController,
  electionController,
  blockchainController,
  voterTrackingController
};
