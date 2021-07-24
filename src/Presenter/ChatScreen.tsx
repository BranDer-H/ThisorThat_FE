import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import 'moment/locale/ko';
import { Input, Avatar } from 'antd';
import { ChatProps, Message } from '../interface/types';

import { userNickname } from '../atom/Atoms';

import 'antd/dist/antd.css';

const slideIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ChatContents = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2.5rem;
`;

const MyChatBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: 'cookie';
  font-size: 18px;
  margin-bottom: 0.5rem;
`;

const OthersChatBlock = styled.div`
  display: flex;
  font-family: 'cookie';
  font-size: 18px;
  margin-bottom: 0.5rem;
`;

const ChatUserName = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 600;
  margin-left: 0.4rem;
  margin-bottom: 0.2rem;
`;

const ChatUserContents = styled.div`
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

const ChatMyContents = styled.div`
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

const ChatTime = styled.time`
  margin: 1.55rem 0 0 0.5rem;
  justify-content: center;
  font-size: 14px;
  color: steelblue;
`;

const ChatEnterInform = styled.div`
  color: black;
  font-family: 'cookie';
  font-weight: 600;
  background-color: gainsboro;
  margin: 1rem auto;
  padding: 0.8rem;
  border-radius: 30px;
`;

const Chatinput = styled(Input.Search)`
  font-family: 'cookie';
  & button {
    background-color: yellow;
    border: 1px solid yellow;
    color: black;
    :hover  {
      color: yellow;
      background-color: black;
    }
  }
`;

const ChatScreen = ({
  msgHistory,
  message,
  onRegisterNewMsg,
  setMessage,
  userName,
}: ChatProps) => {
  const curUserName = useRecoilValue(userNickname);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const convertTime = (time: number) => {
    const date = new Date(time);
    const hour = Number(`0${String(date.getHours())}`.slice(-2));
    const minute = `0${String(date.getMinutes())}`.slice(-2);
    return hour > 12 ? `${hour - 12} : ${minute} pm` : `${hour} : ${minute} am`;
  };

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  });

  return (
    <>
      <ChatContents>
        {msgHistory.map((msg: Message) =>
          msg.informMsg === true
            ? (msg.enterMsg && (
                <ChatEnterInform key={uuidv4()}>
                  👋 {msg.userName} 마시멜로우가 꼬챙이에 끼워졌습니다.
                </ChatEnterInform>
              )) || (
                <ChatEnterInform key={uuidv4()}>
                  👐 {msg.userName} 마시멜로우가 녹아 없어졌습니다.
                </ChatEnterInform>
              )
            : (curUserName !== msg.userName && (
                <OthersChatBlock key={uuidv4()}>
                  <Avatar
                    src={`./${msg.userName.charCodeAt(0) % 7}.jpg`}
                    shape="square"
                    style={{
                      backgroundColor: 'slategray',
                      verticalAlign: 'middle',
                      marginTop: '0.3rem',
                      marginLeft: '0.3rem',
                    }}
                    size={40}
                    gap={4}
                  >
                    {msg.userName.substr(0, 1)}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ChatUserName>{msg.userName}</ChatUserName>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <ChatUserContents>{msg.content}</ChatUserContents>
                      <ChatTime>{convertTime(msg.timeStamp)}</ChatTime>
                    </div>
                  </div>
                </OthersChatBlock>
              )) || (
                <MyChatBlock key={uuidv4()}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                    }}
                  >
                    <ChatTime>{convertTime(msg.timeStamp)}</ChatTime>
                    <ChatMyContents>{msg.content}</ChatMyContents>
                  </div>
                </MyChatBlock>
              )
        )}
      </ChatContents>
      <Chatinput
        placeholder="Input your messages..."
        value={message}
        allowClear
        autoFocus
        size="large"
        enterButton="Send"
        onChange={onChange}
        onPressEnter={() => {
          if (message.length > 0) {
            const nowTime = Date.now();
            const newMsgObj: Message = {} as Message;
            newMsgObj.enterMsg = false;
            newMsgObj.userName = userName;
            newMsgObj.content = message;
            newMsgObj.timeStamp = nowTime;
            onRegisterNewMsg(newMsgObj);
          }
        }}
        onSearch={() => {
          if (message.length > 0) {
            const nowTime = Date.now();
            const newMsgObj: Message = {} as Message;
            newMsgObj.enterMsg = false;
            newMsgObj.userName = userName;
            newMsgObj.content = message;
            newMsgObj.timeStamp = nowTime;
            onRegisterNewMsg(newMsgObj);
          }
        }}
        style={{ position: 'fixed', bottom: '0' }}
      />
    </>
  );
};

export default ChatScreen;
