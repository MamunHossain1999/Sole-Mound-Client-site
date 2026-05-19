import CreateNewPassword from "@/authintication/createNewPassword/CreateNewPassword";
import ForgotPassword from "@/authintication/resetPassword/ForgotPassword";
import SellerLoginPage from "@/authintication/sellerLogin/SellerLoginPage";
import SellerSignUp from "@/authintication/sellerLogin/SellerSignUp";
import UserLoginPage from "@/authintication/userloginPage/UserLoginPage";
import UserRegisterPage from "@/authintication/userloginPage/UserRegisterPage";
import VerifyOtp from "@/authintication/VerifyOtp/VerifyOtp";
import BestSellerPage from "@/components/bestSellers/BestSellerPage";
import CheckOutOrderSuccessPage from "@/components/shoppingCart/CheckOutOrderSuccessPage";
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
import CategorySearchPage from "@/pages/categorySearchPage/CategorySearchPage";
import ContactUs from "@/pages/contactUsPage/ContactUs";
import FaqPage from "@/pages/faqPage/FaqPage";
import Favorite from "@/pages/fevorite/Favorite";
import Home from "@/pages/homePage/Home";
import ProductDetailsPage from "@/pages/productDetailsPage/ProductDetailsPage";
import TrendingPage from "@/pages/tendingPage/TrendingPage";
import TodayDeals from "@/pages/todayDeals/TodayDeels";
import WeeklyDeals from "@/pages/todayDeals/WeeklyDeels";
import PrivateRoute from "@/protectedRoute/PrivateRoute";
import AccountPage from "@/UserDashBoard/helloUsers/AccountPage";
import ChangeNameModal from "@/UserDashBoard/loginAndSerurity/ChangeNameModal";
import EmailVerificationForm from "@/UserDashBoard/loginAndSerurity/EmailVerificationForm";
import HandleEmailChange from "@/UserDashBoard/loginAndSerurity/HandleEmailChange";
import HandlePhoneNumber from "@/UserDashBoard/loginAndSerurity/HandlePhoneNumber";
import LoginAndSecurity from "@/UserDashBoard/loginAndSerurity/LoginAndSecurity";
import OrderDetailsPage from "@/UserDashBoard/orderDetailsPage/OrderDetailsPage";
import OrderhistoryPage from "@/UserDashBoard/orderHistoryPage/OrderhistoryPage";
import ReturnPage from "@/UserDashBoard/returnPage/ReturnPage";
import ReturnRequestConfirm from "@/UserDashBoard/returnPage/ReturnRequestConfirm";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,

    children: [
      {
        path: "/brows-history",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <YourBrowsingHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "/shopping-card",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <ShoppingCart />
          </PrivateRoute>
        ),
      },
      {
        path: "/check-out-page",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-order-success",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <CheckOutOrderSuccessPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/buy-again",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <BuyAgainPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <Favorite />
          </PrivateRoute>
        ),
      },
      {
        path: "/handle-change-name",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <ChangeNameModal />
          </PrivateRoute>
        ),
      },
      {
        path: "/handle-email-change",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <HandleEmailChange />
          </PrivateRoute>
        ),
      },
      {
        path: "/handle-phone-number",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <HandlePhoneNumber />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout-success",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <CheckOutOrderSuccessPage />
          </PrivateRoute>
        ),
      },
      { path: "/", element: <Home /> },
      { path: "/product-details/:id", element: <ProductDetailsPage /> },
      { path: "/today-deals", element: <TodayDeals /> },
      { path: "/weekly-deals", element: <WeeklyDeals /> },
      { path: "/trending", element: <TrendingPage /> },
      { path: "/best-seller", element: <BestSellerPage /> },
      { path: "/category-search-page", element: <CategorySearchPage /> },
      { path: "/email-varify", element: <EmailVerificationForm /> },
      { path: "/faq-page", element: <FaqPage /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/about", element: <AboutUsPage /> },
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
      {
        path: "login-page",
        element: <UserLoginPage />,
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
    element: (
      <PrivateRoute allowedRoles={["customer", "seller", "admin"]}>
        <DashBoard />
      </PrivateRoute>
    ),

    children: [
      {
        path: "account-page",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <AccountPage />
          </PrivateRoute>
        ),
      },
      {
        path: "brows-history",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <BrowsHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "favorite",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <Favorite />
          </PrivateRoute>
        ),
      },
      {
        path: "order-history",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <OrderhistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "order-details-page/:id",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <OrderDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "order-return-page/:id",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <ReturnPage />
          </PrivateRoute>
        ),
      },
      {
        path: "returns/confirmation",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <ReturnRequestConfirm />
          </PrivateRoute>
        ),
      },
      {
        path: "login-and-security",
        element: (
          <PrivateRoute allowedRoles={["customer", "admin", "seller"]}>
            <LoginAndSecurity />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
