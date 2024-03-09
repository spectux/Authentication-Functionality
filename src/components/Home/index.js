import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
  const jwtToken = Cookies.get('jwt_token');

  if (!jwtToken) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
};

export default Home;

