const express = require('express');


const DB_Populator = require("../utilities/dbPopulator");

const dbPopulatorRouter = express.Router()


dbPopulatorRouter.get('/populate-db-recipes', DB_Populator.Transport_to_DB)

module.exports = dbPopulatorRouter