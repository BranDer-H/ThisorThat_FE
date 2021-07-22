import React, { useState } from 'react';

import ReactPlayer from 'react-player';
import ChatScreenContainer from './Container/ChatScreenContainer';
import LoginContainer from './Container/LoginContainer';

const App = () => {
  const [loginState, setLoginState] = useState<Boolean>(false);
  const [videoStart, setVideoStart] = useState(false);

  return (
    <div
      className="App"
      style={{ width: '100%',  overflow: 'hidden' }}
    >
      <ReactPlayer
        url="http://www.youtube.com/watch?v=NUKKzdVy0EI"
        playing
        loop
        controls={false}
        muted={!videoStart}
        width="100%"
        height="100%"
        onReady={() => console.log('video ready')}
        onStart={() => {
          console.log('video start');
          setTimeout(() => {
            setVideoStart(true);
          }, 2000);
        }}
        onPlay={() => {
          console.log('video play');
          setTimeout(() => {
            setVideoStart(true);
          }, 2000);
        }}
        onError={() => console.log('video error')}
        style={{
          transition: '3s ease-in-out',
          overflow: 'hidden',
          position: 'fixed',
          zIndex: -1,
          filter: `blur(2px) brightness(${videoStart ? 0.8 : 0})`,
        }}
      />
      {loginState === false ? (
        <LoginContainer setLoginState={setLoginState} />
      ) : (
        <ChatScreenContainer />
      )}
    </div>
  );
};
export default App;
