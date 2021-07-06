import React, { useState } from 'react';

import ChatScreenContainer from './Container/ChatScreenContainer';
import Login from './Presenter/Login';

const App = () => {
  const [loginState, setLoginState] = useState<Boolean>(false);

  return (
    <div className="App">
      {loginState === false ? (
        <Login setLoginState={setLoginState} />
      ) : (
        <ChatScreenContainer />
      )}
    </div>
  );
};
export default App;
