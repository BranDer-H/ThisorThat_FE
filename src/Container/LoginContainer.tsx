import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import userNickName from '../atom/Atoms';

import Login from '../Presenter/Login';

export const socket = new WebSocket(`ws://localhost:8080/chat`);

const LoginContainer = ({ setLoginState }: any) => {
  const [userLoginName, setUserNickname] = useRecoilState(userNickName);

  const onRegisterNickName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.send(
      JSON.stringify({
        name: userLoginName,
        messageType: 'JOIN',
        content: '새로운 유저가 닉네임 설정을 시도중입니다.',
      })
    );

    socket.onmessage = (evt: MessageEvent) => {
      console.log(evt);
      const response = JSON.parse(evt.data);
      switch (response.messageType) {
        case 'ERROR':
          setLoginState(false);
          break;
        case 'JOIN':
          setLoginState(true);
          break;
      }
    };
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log('Connected!');
      // socket.send('Hello Brandon! This is Derek, sending message from Client.')
    };
  }, []);

  return (
    <Login
      userNickname={userLoginName}
      setUserNickname={setUserNickname}
      onRegisterNickName={onRegisterNickName}
    />
  );
};

export default LoginContainer;
