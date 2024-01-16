// const dotenv = require('dotenv');
// const mongoose = require('mongoose'); // Import the mongoose package
// // const express = require('express');
// dotenv.config({ path: './config.env' });
// const app = require('./app');
// // accessing the co
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   encodeURIComponent(process.env.DATABASE_PASSWORD)
// );

// /* eslint-disable no-console */ // Disable eslint rule for console statements

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     // DB connection successful!
//     console.log('DB connection successful!');
//   })
//   .catch(err => console.log('DB connection error:', err));
// /* eslint-enable no-console */ // Enable eslint rule for console statements

// const port = process.env.PORT || 3000;
// // const app = express();

// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

// //to be included in the package.json
// // ,
// //   "devDependencies": {
// //     "eslint": "^5.16.0",
// //     "eslint-config-airbnb": "^17.1.0",
// //     "eslint-config-prettier": "^4.1.0",
// //     "eslint-plugin-import": "^2.17.2",
// //     "eslint-plugin-jsx-a11y": "^6.2.1",
// //     "eslint-plugin-node": "^8.0.1",
// //     "eslint-plugin-prettier": "^3.0.1",
// //     "eslint-plugin-react": "^7.12.4",
// //     "nodemon": "^3.0.2",
// //     "prettier": "^1.17.0"
// //   }

//SERVER 9 SERVER.JS
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');


const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
