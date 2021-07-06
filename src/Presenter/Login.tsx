import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Input } from 'antd';
import userNickName from '../atom/Atoms';

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
  color: white;
`;

const LoginInput = styled(Input)`
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  width: 100%;
`;

const LoginSubmit = styled.input`
  display: none;
`;

const Login = ({ setLoginState }: any) => {
  const [userNickname, setUserNickname] = useRecoilState(userNickName);
  const onSubmitNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginState(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  return (
    <LoginForm onSubmit={onSubmitNickname}>
      <LoginTitle>닉네임을 입력하세요.</LoginTitle>
      <LoginInput value={userNickname} autoFocus onChange={onChange} />
      <LoginSubmit type="submit" value="" />
    </LoginForm>
  );
};

export default Login;
