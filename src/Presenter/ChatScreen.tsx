import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Avatar } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import {
  ChatContents,
  ChatEnterInform,
  ChatMyContents,
  ChatTime,
  ChatUserContents,
  ChatUserName,
  Chatinput,
  MyChatBlock,
  OthersChatBlock,
} from '../style/chatStyle';
import { ChatProps, Message } from '../interface/types';

import { userNickname } from '../atom/Atoms';

import 'antd/dist/antd.css';

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
                  <span role="img" aria-label="clap">
                    👋
                  </span>{' '}
                  {msg.userName} 마시멜로우가 꼬챙이에 끼워졌습니다.
                </ChatEnterInform>
              )) || (
                <ChatEnterInform key={uuidv4()}>
                  <span role="img" aria-label="wave">
                    👐
                  </span>{' '}
                  {msg.userName} 마시멜로우가 녹아 없어졌습니다.
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
