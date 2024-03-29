import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Favourite from "./pages/Favourite";
import ChatHome from "./pages/ChatHome";
import Image from "./pages/Image";
import Transaction from "./pages/Transaction";

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes> 
        <Route path="/" element={ <Home /> }/> 
        <Route path="/profile" element={<PrivateRoute/>}>
          <Route path="/profile" element={ <Profile /> }/> 
        </Route>
        <Route path="/sign-in" element={ <SignIn /> }/> 
        <Route path="/transaction" element={ <Transaction /> }/> 
        <Route path="/image" element={ <Image /> }/> 
        <Route path="/sign-up" element={ <SignUp /> }/> 
        <Route path="/chat-home" element={ <ChatHome /> }/> 
        <Route path="/forgot-password" element={ <ForgotPassword /> }/> 
        <Route path="/category/:categoryName/:listingId" element={ <Listing /> }/> 
        <Route path="/offers" element={ <Offers /> }/> 
        <Route path="/search" element={ <Search /> }/> 
        <Route path="/favourite" element={ <Favourite /> }/> 
        <Route path="/category/:categoryName" element={ <Category /> }/> 
        <Route path="/create-listing" element={<PrivateRoute/>}>
          <Route path="/create-listing" element={ <CreateListing /> }/> 
        </Route>
        <Route path="/edit-listing" element={<PrivateRoute/>}>
          <Route path="/edit-listing/:listingId" element={ <EditListing /> }/> 
        </Route>
      </Routes>
    </Router>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />  
        </>
  );
}

export default App;
