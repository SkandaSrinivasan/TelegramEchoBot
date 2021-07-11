const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://skanda:skanda@cluster0.zpqcb.mongodb.net/test?retryWrites=true&w=majority"

async function collection() {
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const notes = await client.db('test').collection('notes')
    return notes
}

module.exports = collection