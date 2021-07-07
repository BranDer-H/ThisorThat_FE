import React, { useState } from 'react';

import ChatScreenContainer from './Container/ChatScreenContainer';
import LoginContainer from './Container/LoginContainer';

const App = () => {
  const [loginState, setLoginState] = useState<Boolean>(false);

  return (
    <div className="App">
      {loginState === false ? (
        <LoginContainer setLoginState={setLoginState} />
      ) : (
        <ChatScreenContainer />
      )}
    </div>
  );
};
export default App;
