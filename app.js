// const express = require('express');

// const app = express();

// const tourRouter = express.Router();
// const userRouter = express.Router();

// const morgan = require('morgan');

// // Midle ware is a step that is in the middle where the request goes through
// // If the middle ware is not there the result will show undefined.
// // use method helps to create our own middle ware funtion
// // creating our own middle ware. It is added to each request. It always has to come before the code that has a response
// // Other wise the code won't work. Hello from the middle ware will be consoled because each request is part of the middle ware stack
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
// app.use((req, res, next) => {
//   // console.log('Hello from the middleware 👋');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// // 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

// tourRouter.route('/:id').get((req, res) => {
//   res.status(200).json({ message: `Get tour with ID ${req.params.id}` });
// }); 
// module.exports = app;

// 9APP.JS
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//for all routes that are not defined in the middle ware
//This is going to catch all the routes that are not defined in the routes of the application
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
