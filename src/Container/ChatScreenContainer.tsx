import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import randomColor from 'randomcolor';
import userNickName from '../atom/Atoms';
import ChatScreen from '../Presenter/ChatScreen';

import { Message } from '../interface/types';

const ChatScreenContainer = () => {
  const [userNickname, setUserNickname] = useRecoilState(userNickName);

  const [msgHistory, setMsgHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userColor, setUserColor] = useState(() => randomColor());

  const onRegisterNewMsg = (msgInfo: Message) => {
    const newMessage: Message = msgInfo;
    console.log(newMessage);
    // api call
    setMessage('');
    setMsgHistory([...msgHistory, newMessage]);
    console.log(msgHistory);
  };

  return (
    <ChatScreen
      msgHistory={msgHistory}
      onRegisterNewMsg={onRegisterNewMsg}
      message={message}
      setMessage={setMessage}
      userName={userNickname}
      setUserName={setUserNickname}
      userColor={userColor}
    />
  );
};

export default ChatScreenContainer;
