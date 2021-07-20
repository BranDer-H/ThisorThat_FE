import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userNickname, msgHistory } from '../atom/Atoms';

import Login from '../Presenter/Login';

export const socket = new WebSocket(`ws://3.37.234.201:8080/chat`);

const LoginContainer = ({ setLoginState }: any) => {
  const [userLoginName, setUserNickname] = useRecoilState(userNickname);
  const [msgHistoryArr, setMsgHistory] = useRecoilState(msgHistory);

  const onRegisterNickName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.send(
      JSON.stringify({
        name: userLoginName,
        messageType: 'JOIN',
        content: '새로운 유저가 닉네임 설정을 시도중입니다.',
      })
    );
  };

  socket.onmessage = (evt: MessageEvent) => {
    const response = JSON.parse(evt.data);
    switch (response.messageType) {
      case 'ERROR':
        setLoginState(false);
        /* eslint-disable */
        alert('중복된 닉네임입니다! 다시 입력해주세요.');
        break;
      case 'JOIN':
        setLoginState(true);
        setMsgHistory([
          ...msgHistoryArr,
          {
            informMsg: true,
            enterMsg: true,
            userName: userLoginName,
            content: '',
            timeStamp: 0,
          },
        ]);
        break;
    }
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log('Connected!');
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
