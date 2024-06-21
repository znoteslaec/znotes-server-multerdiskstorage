const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    scheme: {
        type: String,
        required: true
    }
});

const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;



