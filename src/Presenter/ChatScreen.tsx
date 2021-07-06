import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
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

const ChatScreen = ({
  msgHistory,
  message,
  onRegisterNewMsg,
  setMessage,
  userName,
  setUserName,
  userColor,
}: ChatProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMessage(e.target.value);
  };

  return (
    <>
      <Input.Search onChange={(e) => setUserName(e.target.value)} />
      <hr />
      <ChatContents>
        {msgHistory.map((msg: Message) => (
          <ChatBlock key={uuidv4()}>
            <Avatar
              style={{
                backgroundColor: userColor,
                verticalAlign: 'middle',
                marginLeft: '0.3rem',
              }}
              size={60}
              gap={4}
            >
              {msg.userName.substr(0, 1)}
            </Avatar>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ChatUserName>{msg.userName}</ChatUserName>
              <ChatUserContents>{msg.content}</ChatUserContents>
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
          const tmp: Message = {} as Message;
          tmp.userName = userName;
          tmp.content = message;
          onRegisterNewMsg(tmp);
        }}
        style={{ position: 'fixed', bottom: '0' }}
      />
    </>
  );
};

export default ChatScreen;
