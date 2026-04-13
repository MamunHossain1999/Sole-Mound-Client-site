import CreateNewPassword from "@/authintication/createNewPassword/CreateNewPassword";
import ForgotPassword from "@/authintication/resetPassword/ForgotPassword";
import SellerLoginPage from "@/authintication/sellerLogin/SellerLoginPage";
import SellerSignUp from "@/authintication/sellerLogin/SellerSignUp";
import UserLoginPage from "@/authintication/userloginPage/UserLoginPage";
import UserRegisterPage from "@/authintication/userloginPage/UserRegisterPage";
import VerifyOtp from "@/authintication/VerifyOtp/VerifyOtp";
import CheckoutPage from "@/components/shoppingCart/CheckoutPage";
import ShoppingCart from "@/components/shoppingCart/ShoppingCard";
import YourBrowsingHistory from "@/components/YourBrowsingHistory";
import DashBoard from "@/Layout/DashBoard";
import MainLayOut from "@/Layout/MainLayOut";
import SellerLoginLayOut from "@/Layout/SellerLoginLayOut";
import SellerRegisterLayOut from "@/Layout/SellerRegisterLayOut";
import UserLoginLayOut from "@/Layout/UserLoginLayOut";
import UserSignUpLayOut from "@/Layout/UserSignUpLayOut";
import AboutUsPage from "@/pages/aboutUsPage/AboutUsPage";
import BrowsHistory from "@/pages/browsHistory/BrowsHistory";
import BuyAgainPage from "@/pages/buyAgain/BuyAgainPage";
import ContactUs from "@/pages/contactUsPage/ContactUs";
import FaqPage from "@/pages/faqPage/FaqPage";
import Favorite from "@/pages/fevorite/Favorite";
import Home from "@/pages/homePage/Home";
import ProductDetailsPage from "@/pages/productDetailsPage/ProductDetailsPage";
import TodayDeals from "@/pages/todayDeals/TodayDeels";
import WeeklyDeals from "@/pages/todayDeals/WeeklyDeels";
import AccountPage from "@/UserDashBoard/helloUsers/AccountPage";
import LoginAndSecurity from "@/UserDashBoard/loginAndSerurity/LoginAndSecurity";
import OrderDetailsPage from "@/UserDashBoard/orderDetailsPage/OrderDetailsPage";
import OrderhistoryPage from "@/UserDashBoard/orderHistoryPage/OrderhistoryPage";
import CardAndAddress from "@/UserDashBoard/paymentOption/CardAndAddress";
import ReturnPage from "@/UserDashBoard/returnPage/ReturnPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/brows-history",
        element: <YourBrowsingHistory />,
      },
      {
        path: "/shopping-card",
        element: <ShoppingCart />,
      },
      {
        path: "/check-out-page",
        element: <CheckoutPage />,
      },
      // {
      //   path: '/check-out-order-success', element: <CheckOutOrderSuccessPage/>
      // },
      // {
      //   path: '/category-search-page', element: <CategorySearchPage/>
      // },
      {
        path: "/buy-again",
        element: <BuyAgainPage />,
      },
      {
        path: "/today-deals",
        element: <TodayDeals />,
      },
      {
        path: "/weekly-deals",
        element: <WeeklyDeals />,
      },

      // {
      //   path: 'handle-change-name', element: <ChangeNameModal/>
      // },
      // {
      //   path: 'handle-email-change', element: <HandleEmailChange/>
      // },
      // {
      //   path: 'handle-phone-number', element: <HandlePhoneNumber/>
      // },
      // {
      //   path: 'handle-password-change', element: <HandlePasswordChange/>
      // },
      {
        path: "/wishlist",
        element: <Favorite />,
      },
      {
        path: "/return-page/:id",
        element: <ReturnPage />,
      },
      // {
      //   path: '/retrun-confirm', element: <ReturnRequestConfirm/>
      // },
      // {
      //   path: 'gift-card-balance-page', element: <GiftCardBalancePage/>
      // },
      // {
      //   path: '/email-varify' , element: <EmailVerificationForm/>
      // },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
    ],
  },

  //signin system
  {
    path: "/auth",
    element: <UserLoginLayOut />,
    children: [
      {
        path: "login-page",
        element: <UserLoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <CreateNewPassword />,
      },
    ],
  },

  //signUp system
  {
    path: "/register",
    element: <UserSignUpLayOut />,
    children: [
      {
        path: "sign-up",
        element: <UserRegisterPage />,
      },
    ],
  },

  //seller login dashboard
  {
    path: "/seller",
    element: <SellerLoginLayOut />,
    children: [
      {
        path: "login-page",
        element: <SellerLoginPage />,
      },
    ],
  },

  // seller dashboard
  {
    path: "/seller",
    element: <SellerRegisterLayOut />,
    children: [
      {
        path: "sign-up",
        element: <SellerSignUp />,
      },
    ],
  },

  // dashboard
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "account-page",
        element: <AccountPage />,
      },
      {
        path: "brows-history",
        element: <BrowsHistory />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "order-history",
        element: <OrderhistoryPage />,
      },
      {
        path: "order-details-page/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "login-and-security",
        element: <LoginAndSecurity />,
      },
      {
        path: "card-and-address",
        element: <CardAndAddress />,
      },
      // {
      //   path: 'add-new-card', element: <AddNewCardModal/>
      // }
    ],
  },
]);

export default router;
