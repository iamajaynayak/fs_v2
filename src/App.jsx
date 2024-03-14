import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { createUserProfileDocument, onUserStateChanged } from "./firebase/firebase.js";
import { setCurrentUser } from "./redux/user/userAction.js";
import Shop from "./Pages/Shop/Shop.jsx"
import Header from "./Components/Header/Header.jsx"
import SigninAndSignup from "./Pages/SigninAndSignup/SigninAndSignup.jsx"
import HomePage from "./Pages/Homepage/Homepage.jsx"
import CheckOut from "./Pages/CheckOut/CheckOut.jsx"
import ContactPage from "./Pages/Contact/ContactPage.jsx"
import "./Pages/Homepage/homepage.css";
import "./App.css";

import { WithSpinner } from './Components/index.js';

export const App = () => {

  const AuthSpinner = WithSpinner(SigninAndSignup)

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const loading = useSelector(state => state.loading.loading)

  useEffect(() => {
    onUserStateChanged(async (userAuth) => {
      if (userAuth) {
        const user = await createUserProfileDocument(userAuth);
        dispatch(setCurrentUser({
          id: user.id,
          ...user
        }))
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    })
  }, [])

  return <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={Shop} />
      <Route path="/contact" component={ContactPage} />
      <Route exact path="/checkout" component={CheckOut} />
      <Route
        exact
        path="/signin"
        render={() =>
          currentUser ? <Redirect to="/" /> : <AuthSpinner isLoading={loading} />
        }
      />
    </Switch>
  </>
}