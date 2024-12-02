import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedLogin from "./private/ProtectedLogin";
import ProtectedHome from "./private/ProtectedHome";
import Navbar from "./components/ui/Navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load components
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const ShopPage = lazy(() => import("./Pages/ShopPage"));
const UserProfile = lazy(() => import("./components/User/Profile/UserProfile"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const CheckoutPage = lazy(() => import("./Pages/CheckoutPage"));
const ForgotPassword = lazy(() => import("./components/User/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/User/ResetPassword"));
const WishlistPage = lazy(() => import("./Pages/WishlistPage"));
const PageNotFound = lazy(() => import("./components/shared/PageNotFound"));

const SkeletonCard = () => (
  <Card className="w-full">
    <CardHeader className="space-y-2">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-32 w-full" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-28" />
    </CardFooter>
  </Card>
);

// Loading component
const Loading = () => (
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </div>
);

function User() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <LoginPage />
            </ProtectedLogin>
          }
        />

        <Route
          path="/forget-password"
          element={
            <ProtectedLogin>
              <ForgotPassword />
            </ProtectedLogin>
          }
        />
        <Route
          path="/reset-password/:id"
          element={
            <ProtectedLogin>
              <ResetPassword />
            </ProtectedLogin>
          }
        />

        <Route path="/home" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedHome>
              <UserProfile />
            </ProtectedHome>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedHome>
              <CartPage />
            </ProtectedHome>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedHome>
              <WishlistPage />
            </ProtectedHome>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedHome>
              <CheckoutPage />
            </ProtectedHome>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default User;
