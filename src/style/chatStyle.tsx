import styled from 'styled-components';
import { Input } from 'antd';

export const ChatContents = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2.5rem;
`;

export const MyChatBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: 'cookie';
  font-size: 18px;
  margin-bottom: 0.5rem;
`;

export const OthersChatBlock = styled.div`
  display: flex;
  font-family: 'cookie';
  font-size: 18px;
  margin-bottom: 0.5rem;
`;

export const ChatUserName = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 600;
  margin-left: 0.4rem;
  margin-bottom: 0.2rem;
`;

export const ChatUserContents = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  margin-left: 1.3rem;
  background: slategray;
  border-radius: 10px;
  &:after {
    border-top: 10px solid slategray;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 10px;
    left: -15px;
  }
`;

export const ChatMyContents = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  margin: 0 1.3rem 0 0.8rem;
  background: slategray;
  border-radius: 10px;
  &:after {
    border-top: 10px solid slategray;
    border-left: 0px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 10px;
    right: -15px;
    transition: 800ms ease;
  }
`;

export const ChatTime = styled.time`
  margin: 1.55rem 0 0 0.5rem;
  justify-content: center;
  font-size: 14px;
  color: steelblue;
`;

export const ChatEnterInform = styled.div`
  color: black;
  font-family: 'cookie';
  font-weight: 600;
  background-color: gainsboro;
  margin: 1rem auto;
  padding: 0.8rem;
  border-radius: 30px;
`;

export const Chatinput = styled(Input.Search)`
  font-family: 'cookie';
  & button {
    background-color: yellow;
    border: 1px solid yellow;
    color: black;
    :hover {
      color: yellow;
      background-color: black;
    }
  }
`;
