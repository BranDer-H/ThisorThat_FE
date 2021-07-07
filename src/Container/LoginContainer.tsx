import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import userNickName from '../atom/Atoms';

import Login from '../Presenter/Login';

const LoginContainer = ({ setLoginState }: any) => {
  const [userNickname, setUserNickname] = useRecoilState(userNickName);

  const onRegisterNickName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성 검사.
    // if 유효성 === true,
    setLoginState(true);
  };

  return (
    <Login
      userNickname={userNickname}
      setUserNickname={setUserNickname}
      onRegisterNickName={onRegisterNickName}
    />
  );
};

export default LoginContainer;
