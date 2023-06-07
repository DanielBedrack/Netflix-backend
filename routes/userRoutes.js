import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import User from '../models/userSchema.js';
import contentRouter from './contentRoutes.js';
import Content from '../models/contentSchema.js';

const userRouter = express.Router()

userRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log(req.body)
      console.log(req.body._id)
      const user = await User.findOne({ _id: req.user._id })
      console.log(user)
      if (user) {
        // Update the user object with the new data
        user.myList = req.body.myList // Assuming 'name' is the field you want to update
        console.log(req.body.myList);
        // Save the updated user
        const updatedUser = await user.save()

        res.status(200).send(updatedUser) // Return the updated user object
      } else {
        res.status(404).send({ message: 'User not found' })
      }
    } catch {
      res.status(406).send({ message: 'Invalid user' })
    }
  })
)

// userRouter.get(
//   '/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     try {
//       let itemList = []
//       for(var item in req.body.myList){
//         const itemObj = Content.findById(item._id)
//         itemList.push(itemObj)
//       }
//       console.log(itemList+ "Hey");
//       res.status(200).json(itemList);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   })
// );


// if (user) {
//   const list = user.myList;
//   console.log(list);
//   res.status(200).send(list);
// } else {
//   res.status(404).send({ message: 'User not found' });
// }

userRouter.get(
  '/get-items',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {    

      const user = await User.findOne({ _id: req.user._id }).populate('myList');
      console.log(user.myList)
      res.status(200).send(user.myList);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving items', error });
    }
  })
);



//userRouter.GET all listObjects

// userRouter.post('/new-item', isAuth,
// expressAsyncHandler(async (req, res) => {

// }));

export default userRouter