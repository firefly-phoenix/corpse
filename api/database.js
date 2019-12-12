let mongoose = require('mongoose');
let storyModel = require('./schema/story')

const server = '127.0.0.1:27017';
const database = 'story';

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}
module.exports = new Database()
