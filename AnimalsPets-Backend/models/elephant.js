const { Schema, model } = require('mongoose');

const elephantSchema = Schema({
name: {
    type: String,
    required: true,
  },
image:{
    type: String,
  },
sex: {
    type: String,
    required: true,
    default: 'Unavailable'
},
species: {
      type: String,
      required: true,
      default: 'Unavailable'
  },
affiliation: {
    type: String,
    required: true,
    default: 'Unavailable',
  },
fictional: {
          type: String,
          default: 'Unavailable'
},
dob: { 
    type: String,
    default: 'Unavailable'
},
dod: {
  type: String,
  default: 'Unavailable'
},
index: { 
  type: String
},
wikilink: {
  type: String,
  default: 'Unavailable'
},
note: {
  type: String,
  default: 'Unavailable'
}
});

elephantSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Elephants', elephantSchema);
