import React from 'react';
import styled from 'styled-components';

import { Input } from 'antd';

const LoginForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem;
  margin-bottom: 2.5rem;
  color: silver;
`;

const LoginInput = styled(Input)`
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  width: 100%;
  color: black;
  background-color: slategray;
`;

const LoginSubmit = styled.input`
  display: none;
`;

const Login = ({ userNickname, setUserNickname, onRegisterNickName }: any) => (
  <LoginForm onSubmit={onRegisterNickName}>
    <LoginTitle>닉네임을 입력하세요.</LoginTitle>
    <LoginInput
      value={userNickname}
      autoFocus
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setUserNickname(e.target.value)
      }
    />
    <LoginSubmit type="submit" value="" />
  </LoginForm>
);

export default Login;
