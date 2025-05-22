import * as React from "react";
import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../pages/homePage/Home";
import BrowsHistory from "../pages/browsHistory/BrowsHistory";
import ShoppingCart from "../components/ShoppingCard";
import BuyAgain from "../pages/buyAgain/BuyAgainPage";
import WeeklyDeals from "../pages/todayDeals/WeeklyDeels";
import AccountPage from "../UserDashBoard/helloUsers/AccountPage";
import WishList from "../UserDashBoard/wishlist/WishList";
import OrderhistoryPage from "../UserDashBoard/orderHistoryPage/OrderhistoryPage";
import OrderDetailsPage from "../UserDashBoard/orderDetailsPage/OrderDetailsPage";
import LoginAndSecurity from "../UserDashBoard/loginAndSerurity/LoginAndSecurity";
import ChangeNameModal from "../UserDashBoard/loginAndSerurity/ChangeNameModal";
import HandleEmailChange from "../UserDashBoard/loginAndSerurity/HandleEmailChange";
import HandlePhoneNumber from "../UserDashBoard/loginAndSerurity/HandlePhoneNumber";
import HandlePasswordChange from "../UserDashBoard/loginAndSerurity/HandlePasswordChange";
import ProductDetailsPage from "../pages/productDetailsPage/ProductDetailsPage";
import CardAndAddress from "../UserDashBoard/paymentOption/CardAndAddress";
import AddNewCardModal from "../UserDashBoard/paymentOption/AddNewCardModal";
import ReturnPage from "../UserDashBoard/returnPage/ReturnPage";
import DashBoard from "../Layout/DashBoard";
import CheckoutPage from "../components/CheckoutPage";
import CheckOutOrderSuccessPage from "../components/CheckOutOrderSuccessPage";
import GiftCardBalancePage from "../components/GiftCardBalancePage";
import ReturnRequestConfirm from "../UserDashBoard/returnPage/ReturnRequestConfirm";
import EmailVerificationForm from "../UserDashBoard/loginAndSerurity/EmailVerificationForm";
import FaqPage from "../pages/faqPage/FaqPage";
import AboutUsPage from "../pages/aboutUsPage/AboutUsPage";
import ContactUs from "../pages/contactUsPage/ContactUs";
import LoginPage from "../authintication/userloginPage/UserLoginPage";
import ResetPassword from "../authintication/resetPassword/ResetPassword";
import ResetPasswordSuccess from "../authintication/enterVarificationCode/VarificationCode";
import CreaateNewPassword from "../authintication/createNewPassword/CreaateNewPassword";
import RegisterPage from "../authintication/registerPage/RegisterPage";
import CategorySearchPage from "../pages/categorySearchPage/CategorySearchPage";
import SellerLoginPage from "../authintication/sellerLogin/SellerLoginPage";
import Seller from "../Layout/Seller";
import SellerSignUp from "../authintication/sellerLogin/SellerSignUp";
import SellerRegister from "../Layout/SellerRegister";
import UserLoginLayOut from "../Layout/UserLoginLayOut";
import UserSignUp from "../Layout/UserSignUp";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut/>,
    children:[
      {
        path: '/', element: <Home/>
      },
      {
        path: '/brows-history', element: <BrowsHistory/>
      },
      {
        path: '/shopping-card', element: <ShoppingCart/>
      },
      {
        path: '/check-out-page', element: <CheckoutPage/>
      },
      {
        path: '/check-out-order-success', element: <CheckOutOrderSuccessPage/>
      },
      {
        path: '/category-search-page', element: <CategorySearchPage/>
      },
      {
        path: '/buy-again', element: <BuyAgain/>
      },
      {
        path: '/weekly-deals', element:<WeeklyDeals/>
      },
      {
        path: '/category-search-page/:id', element: <ProductDetailsPage/>
      },
      {
        path: '/wishlist', element: <WishList/>
      },
      {
        path: '/return-page/:id', element: <ReturnPage/>
      },
      {
        path: '/retrun-confirm', element: <ReturnRequestConfirm/>
      },
      {
        path: 'gift-card-balance-page', element: <GiftCardBalancePage/>
      },
      {
        path: '/change-name', element: <ChangeNameModal/>
      },
      {
        path: '/change-email', element: <HandleEmailChange/>
      },
      {
        path: '/phone-number', element: <HandlePhoneNumber/>
      },
      {
        path: '/password', element: <HandlePasswordChange/>
      },
      {
        path: '/email-varify' , element: <EmailVerificationForm/>
      },
      {
        path: '/faq', element:<FaqPage/>
      },
      {
        path: '/contact', element:<ContactUs/>
      },
      {
        path: '/aboutUs', element: <AboutUsPage/>
      },
    

    ]
  },


  //signin system
  {
    path:'/authintication', 
    element: <UserLoginLayOut/>,
    children: [
      {
        path: 'login-page', element: <LoginPage/>
      },
      {
        path: 'forgot-password', element: <ResetPassword/>
      },
      {
        path:'reset-password-success' , element:<ResetPasswordSuccess/>
      },
      {
        path:'reset-password' , element:<CreaateNewPassword/>
      }
    ]
  },

  //signUp system
  {
    path: '/register',
    element:<UserSignUp/>,
    children:[
      {
        path: 'sign-up' , element:<RegisterPage/> 
      }
      
    ]
  },


  //seller login dashboard
  {
    path: '/seller',
    element:<Seller/>,
    children:[
      {
        path: 'seller-login-page' , element:<SellerLoginPage/>
      },
    ]
  },

  // seller dashboard
   {
    path: '/seller-sign-up',
    element:<SellerRegister/>,
    children:[
      {
        path: 'seller-sign-up' , element:<SellerSignUp/>
      }
    ]
  },


  // dashboard
  {
    path: '/dashboard',
    element: <DashBoard/>,
    children: [
      {
        path: 'account-page', element:<AccountPage/>
      },
      {
        path: 'brows-history', element: <BrowsHistory/>
      },
      {
        path: 'wishlist', element: <WishList/>
      },
      {
        path: 'order-history', element: <OrderhistoryPage/>
      },
      {
        path:'order-details-page/:id', element: <OrderDetailsPage/>
      }, 
      {
        path:'login-and-security', element: <LoginAndSecurity/>
      },
      {
        path: 'login-security' , element:<LoginAndSecurity/>
      },
   
      {
        path: 'card-and-address', element: <CardAndAddress/>
      },
      {
        path: 'add-new-card', element: <AddNewCardModal/>
      }

    ]
  }
]);

export default router;