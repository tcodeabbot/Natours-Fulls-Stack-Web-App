const fs = require('fs');
const express = require('express');
const app = express();

const morgan = require('morgan');

// Midle ware is a step that is in the middle where the request goes through
// If the middle ware is not there the result will show undefined.
// use method helps to create our own middle ware funtion
// creating our own middle ware. It is added to each request. It always has to come before the code that has a response
// Other wise the code won't work. Hello from the middle ware will be consoled because each request is part of the middle ware stack

// Middle ware

app.use(morgan('dev')); // The morgan function
app.use((req, res, next) => {

  console.log('Hello form the middle ware 😁');
  next();
});
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// routes
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requesTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  //Multiplying by 1 makes the string a number
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    tour,
  });
};
const createTour = (req, res) => {
  // console.log(req.body)
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  // push the new tour into the tours array
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // status code 201 means that the file is created
      res.status(201).json({
        status: 'success',
        requestedAt: req.requesTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
  //   res.send('Done');
};

const updateTour = (req, res) => {
  if (req.params * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here.....',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  //204 is no response
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// User routes

const getAllUsers = (req, res) => {
  // 500 is internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const getUser = (req, res) => {
  // 500 is internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  // 500 is internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const deleteUser = (req, res) => {
  // 500 is internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

const tourRouter = express.Router();
const userRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// Users routes
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// Request data using a particular URL parametre
//the question mark makes the parameter an optional parameter /api/v1/tours/:id/:x/:y?'
// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
// is what holds the data that is being added to the API
