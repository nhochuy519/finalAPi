const express=require('express');

const {signup,login,protect,restrictTo, deleteUser,editUser}= require('../controller/userController')

const signupAdmin = require('../controller/adminController');
const { submitOrder,viewInvoice,deleteOrder } = require('../controller/PurchaseController');
const router = express.Router();



       /*
                UpdateUser
                DeleteUser 
                new table danh sách người đặt hàng
        
        */

// user admin
router.post('/signup',signup)
router.post('/login',login)

router.route('/privacy')
      .patch(protect,editUser)// chinh sua mat khau
      .delete(protect,deleteUser) // xoa tai khoan


router.route('/purchase')
      .get(protect,viewInvoice)// xem thong tin don hang
      .post(protect,submitOrder) // mua hang
      .delete(protect,deleteOrder) // mua hang

//admin
router.post('/signUpAdmin',protect,restrictTo('admin'),signupAdmin)





module.exports = router;
