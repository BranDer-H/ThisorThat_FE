import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import 'moment/locale/ko';
import { Input, Avatar } from 'antd';
import { ChatProps, Message } from '../interface/types';

import { userNickname } from '../atom/Atoms';

import 'antd/dist/antd.css';

const ChatContents = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 13px;
  font-weight: 600;
  margin-left: 0.4rem;
  margin-bottom: 0.2rem;
`;

const ChatUserContents = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  margin-left: 1.3rem;
  background: yellow;
  border-radius: 10px;
  &:after {
    border-top: 10px solid yellow;
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
  background: yellow;
  border-radius: 10px;
  &:after {
    border-top: 10px solid yellow;
    border-left: 0px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 10px;
    right: -15px;
  }
`;

const ChatTime = styled.time`
  margin: 1.55rem 0 0 0.5rem;
  justify-content: center;
  font-size: 14px;
`;

const ChatEnterInform = styled.div`
  color: white;
  font-family: 'cookie';
  font-weight: 500;
  background-color: slategray;
  margin: 1rem auto;
  padding: 0.8rem;
  border-radius: 30px;
`;

const Chatinput = styled(Input.Search)`
  & button {
    background-color: yellow;
    border: 1px solid yellow;
    color: black;
  }
`;

const ChatScreen = ({
  msgHistory,
  message,
  onRegisterNewMsg,
  setMessage,
  userName,
  userColor,
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

  return (
    <>
      <ChatContents>
        {msgHistory.map((msg: Message) =>
          msg.enterMsg === true ? (
            <ChatEnterInform key={uuidv4()}>
              👋 {msg.userName} 님께서 입장하셨습니다.
            </ChatEnterInform>
          ) : (
            (curUserName !== msg.userName && (
              <OthersChatBlock key={uuidv4()}>
                <Avatar
                  style={{
                    backgroundColor: userColor,
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
          )
        )}
      </ChatContents>
      <Chatinput
        placeholder="Input your messages..."
        value={message}
        allowClear
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
        style={{ position: 'fixed', bottom: '0' }}
      />
    </>
  );
};

export default ChatScreen;
