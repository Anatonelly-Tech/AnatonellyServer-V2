const mongoose = require('mongoose');
require('dotenv').config();

async function Main() {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@anatonellyfretesdb.o5nr4yo.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log('Connection established');
  } catch (err) {
    console.log(err);
  }
}

module.exports = Main;
