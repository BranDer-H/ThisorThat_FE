import React from 'react';

import {
  LoginForm,
  LoginTitle,
  LoginInput,
  LoginSubmit,
} from '../style/loginStyle';

const Login = ({ userNickname, setUserNickname, onRegisterNickName }: any) => (
  <LoginForm onSubmit={onRegisterNickName}>
    <LoginTitle>내 이름은</LoginTitle>
    <LoginInput
      value={userNickname}
      autoFocus
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setUserNickname(e.target.value)
      }
      required
    />
    <LoginTitle>마시멜로우로 할래요!</LoginTitle>
    <LoginSubmit type="submit" value="결정" />
  </LoginForm>
);

export default Login;
