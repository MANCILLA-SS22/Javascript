import { TourModel } from '../models/tours.model.js';
import { UserModel } from '../models/userModel.js';
import { catchFunc } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { BookingModel } from '../models/bookingModel.js';

const getOverview = catchFunc(async function(req, res, next){
  const tours = await TourModel.find();
  res.status(200).render('overview', { title: 'All Tours', tours });
});

const getTour = catchFunc(async function(req, res, next){
  const {slug} = req.params
  const tour = await TourModel.findOne({ slug: slug }).populate({ path: 'reviews', fields: 'review rating user' }); //path: 'reviews' comes from the virtual middleware in tours.model.js. We can't see the "reviews" field in mongodb but in postman because that's just a VIRTUAL middleware.
  if (!tour) return next(new AppError('There is no tour with that name.', 404));
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});

const getLoginForm = function(req, res){
  res.status(200).render('login', {title: 'Log into your account'});
};

const getAccount = function(req, res){
  res.status(200).render('account', {title: 'Your account'});
};

const getMyTours = catchFunc(async function(req, res, next){
  // 1) Find all bookings
  const bookings = await BookingModel.find({ user: req.user.id });
  console.log(bookings)

  // 2) Find tours with the returned IDs
  const toursIDs = bookings.map(event => event.tour);
  const tours = await TourModel.find({ _id: {$in: toursIDs} }); //The $in operator selects the documents where the value of a field equals any value in the specified array. 
  res.status(200).render("overview", {title: "My tours", tours: tours})
});

const updateUserData = catchFunc(async function(req, res, next){
  //Passwords are once more handled separately because we can never update passwords using findByIdAndUpdate because that's not going to run the safe middleware which will take care of encrypting our passwords
  const updatedUser = await UserModel.findByIdAndUpdate( req.user.id, {name: req.body.name, email: req.body.email }, {new: true, runValidators: true} ); // --> findByIdAndUpdate(id, update, options)
  res.status(200).render('account', { title: 'Your account', user: updatedUser });
});

export {getOverview, getTour, getLoginForm, getAccount, getMyTours, updateUserData};