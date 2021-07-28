import styled from 'styled-components';
import { Input } from 'antd';

export const LoginForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginTitle = styled.div`
  font-family: 'cookie';
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: white;
`;

export const LoginInput = styled(Input)`
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'cookie';
  text-align: center;
  width: 100%;
  color: black;
  background-color: slategray;
`;

export const LoginSubmit = styled.input`
  font-size: 1.2rem;
  font-family: 'cookie';
  font-weight: 600;
  color: black;
  padding: 0.5rem;
  background-color: silver;
  border: 0px;
  border-radius: 20%;
  cursor: pointer;
  :hover {
    background-color: black;
    color: silver;
    transition: 600ms ease;
  }
`;
