const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batch: {
        type: String,
        required: true
    }
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
