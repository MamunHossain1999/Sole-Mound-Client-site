import * as React from "react";
import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../pages/homePage/Home";
import BrowsHistory from "../pages/browsHistory/BrowsHistory";
import ShoppingCart from "../components/shoppingCart/ShoppingCard";
import BuyAgain from "../pages/buyAgain/BuyAgainPage";
import WeeklyDeals from "../pages/todayDeals/WeeklyDeels";
import AccountPage from "../UserDashBoard/helloUsers/AccountPage";
import OrderhistoryPage from "../UserDashBoard/orderHistoryPage/OrderhistoryPage";
import OrderDetailsPage from "../UserDashBoard/orderDetailsPage/OrderDetailsPage";
import LoginAndSecurity from "../UserDashBoard/loginAndSerurity/LoginAndSecurity";
import ProductDetailsPage from "../pages/productDetailsPage/ProductDetailsPage";
import CardAndAddress from "../UserDashBoard/paymentOption/CardAndAddress";
import AddNewCardModal from "../UserDashBoard/paymentOption/AddNewCardModal";
import ReturnPage from "../UserDashBoard/returnPage/ReturnPage";
import DashBoard from "../Layout/DashBoard";
import CheckoutPage from "../components/shoppingCart/CheckoutPage";
import CheckOutOrderSuccessPage from "../components/shoppingCart/CheckOutOrderSuccessPage";
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
import CategorySearchPage from "../pages/categorySearchPage/CategorySearchPage";
import SellerLoginPage from "../authintication/sellerLogin/SellerLoginPage";
import SellerSignUp from "../authintication/sellerLogin/SellerSignUp";
import UserLoginLayOut from "../Layout/UserLoginLayOut";
import UserRegisterPage from "../authintication/userloginPage/UserRegisterPage";
import SellerRegisterLayOut from "../Layout/SellerRegisterLayOut";
import SellerLoginLayOut from "../Layout/SellerLoginLayOut";
import UserSignUpLayOut from "../Layout/UserSignUpLayOut";
import PrivateRoute from "../protectedRoute/PrivateRoute";
import HandleEmailChange from "../UserDashBoard/loginAndSerurity/HandleEmailChange";
import HandlePhoneNumber from "../UserDashBoard/loginAndSerurity/HandlePhoneNumber";
import HandlePasswordChange from "../UserDashBoard/loginAndSerurity/HandlePasswordChange";
import ChangeNameModal from "../UserDashBoard/loginAndSerurity/ChangeNameModal";
import Favorite from "../pages/fevorite/Favorite";
import RelatedProductDetailsPage from "../pages/productDetailsPage/RelatedProductDetailsPage";





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
        path: '/product-details/:id', element: <ProductDetailsPage/>
      },
      {
        path: '/related-product-details/:id', element: <RelatedProductDetailsPage/>
      },
      {
        path: 'handle-change-name', element: <ChangeNameModal/>
      },
      {
        path: 'handle-email-change', element: <HandleEmailChange/>
      },
      {
        path: 'handle-phone-number', element: <HandlePhoneNumber/>
      },
      {
        path: 'handle-password-change', element: <HandlePasswordChange/>
      },
      {
        path: '/wishlist', element: <Favorite/>
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
    path:'/auth', 
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
    element:<UserSignUpLayOut/>,
    children:[
      {
        path: 'sign-up' , element:<UserRegisterPage/> 
      }
      
    ]
  },

  //seller login dashboard
  {
    path: '/seller',
    element:<SellerLoginLayOut/>,
    children:[
      {
        path: 'seller-login-page' , element:<SellerLoginPage/>
      },
    ]
  },

  // seller dashboard
   {
    path: '/seller-sign',
    element:<SellerRegisterLayOut/>,
    children:[
      {
        path: 'seller-sign-up' , element:<SellerSignUp/>
      }
    ]
  },


  // dashboard
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoard/></PrivateRoute>,
    children: [
      {
        path: 'account-page', element:<AccountPage/>
      },
      {
        path: 'brows-history', element: <BrowsHistory/>
      },
      {
        path: 'favorite', element: <PrivateRoute><Favorite/></PrivateRoute>
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
        path: 'card-and-address', element: <CardAndAddress/>
      },
      {
        path: 'add-new-card', element: <AddNewCardModal/>
      }

    ]
  }
]);

export default router;