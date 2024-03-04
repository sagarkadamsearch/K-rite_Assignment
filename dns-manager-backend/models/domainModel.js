const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    domain: String,
    type: String,
    value: String,
  },
  {
    versionKey:false
  });


const DomainModel = mongoose.model('Domain', domainSchema);  

module.exports = {DomainModel};
