const User = require('./../models/userModel');
//the catchAsync function helps us in a way that we do not always have to do a try catch block
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
        //we only allow a users data to have only the
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.password,
    });

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
})