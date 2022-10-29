import React from 'react';
import Dashboard from './dashboard';
import Offer from './offer';
import SignIn from './sign-in';
import SignUp from './sign-up';
import ResetPassword from './forget-password';
import CreateListing from "./create";
import Rent from './rent';
import Sale from './sale';
import Profile from './profile';
import NotFound from './not-found';
import Article from './article';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useContextHook } from '../hook/useContext';
import * as Routes from "../routes";


export default function WebApp() {

  const {user, isAuthReady} = useContextHook();
  return (
    <>
      {isAuthReady && (
        <BrowserRouter>
        <Switch>
          <Route exact path={Routes.HOME}>
            <Dashboard />
          </Route>
          <Route path={Routes.OFFER}>
            <Offer />
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!user && <SignIn />}
            {user && <Redirect to={Routes.PROFILE} />}
          </Route>
          <Route path={Routes.SIGN_UP}>
            {!user && <SignUp />}
            {user && <Redirect to={Routes.PROFILE} />}
          </Route>
          <Route path={Routes.FORGET_PASSWORD}>
            {!user && <ResetPassword />}
            {user && <Redirect to={Routes.PROFILE} />}
          </Route>
          <Route path={Routes.CREATE}>
            <CreateListing />
          </Route>
          <Route path={Routes.PROFILE}>
            {user && <Profile />}
            {!user && <Redirect to={Routes.SIGN_IN} />}
          </Route>
          <Route path={`/category/rent`}>
            <Rent />
          </Route>
          <Route path={`/article/rent/:id`}> 
            <Article />
          </Route>
          <Route path={`/category/sale`}>
            <Sale />
          </Route>
          <Route path={`/article/sale/:id`}> 
            <Article />
          </Route>
          <Route path={`/article/offers/:id`}> 
            <Article />
          </Route>
          
          <Route path={Routes.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      )}
    </>
  );
}
