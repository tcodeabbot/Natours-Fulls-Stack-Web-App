const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

//Creating a Mongoose Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour should have a name.'], // This is a called a validator
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
}).catch((err) => {
  console.log(`App running on port ${port}...`);
});

const testTour = new Tour({
    name: 'The Forest Hiker',
    rating: 4.7,
    price: 497
})
testTour.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log('ERROR🔥:', err)
})
//creating a mogoose model
// Name of the model should be a capital case as a convention in naming of models
const Tour = mongoose.model('Tour', tourSchema);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
