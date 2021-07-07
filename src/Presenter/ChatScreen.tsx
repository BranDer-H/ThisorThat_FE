import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import 'moment/locale/ko';
import { Input, Avatar } from 'antd';
import { ChatProps, Message } from '../interface/types';

import 'antd/dist/antd.css';

const ChatContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatBlock = styled.div`
  display: flex;
  //border: 1px solid black;
  font-family: 'cookie';
  font-size: 20px;
  margin-bottom: 0.5rem;
`;

const ChatUserName = styled.div`
  font-size: 14px;
  margin-left: 0.4rem;
`;

const ChatUserContents = styled.div`
  position: relative;
  padding: 0.5rem;
  margin-left: 1.3rem;
  background: yellow;
  border-radius: 10px;
  &:after {
    border-top: 15px solid yellow;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 10px;
    left: -15px;
  }
`;

const ChatTime = styled.time`
  margin: 1.55rem 0 0 0.5rem;
  justify-content: center;
  font-size: 14px;
`;

const ChatScreen = ({
  msgHistory,
  message,
  onRegisterNewMsg,
  setMessage,
  userName,
  userColor,
}: ChatProps) => {
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
        {msgHistory.map((msg: Message) => (
          <ChatBlock key={uuidv4()}>
            <Avatar
              style={{
                backgroundColor: userColor,
                verticalAlign: 'middle',
                marginTop: '0.3rem',
                marginLeft: '0.3rem',
              }}
              size={60}
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
          </ChatBlock>
        ))}
      </ChatContents>
      <Input.Search
        placeholder="Input your messages..."
        value={message}
        allowClear
        enterButton="Send"
        onChange={onChange}
        onPressEnter={() => {
          if (message.length > 0) {
            const nowTime = Date.now();
            const newMsgObj: Message = {} as Message;
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
