import React, { useState } from 'react';
import ChatScreenContainer from './Container/ChatScreenContainer';
import Login from './Presenter/Login';

const App = () => {
  const [loginState, setLoginState] = useState<boolean>(false);

  return (
    <div className="App">
      {/* {loginState ? <ChatScreenContainer /> : <Login />} */}
      <ChatScreenContainer />
    </div>
  );
};
export default App;
