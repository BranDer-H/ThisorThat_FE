import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import randomColor from 'randomcolor';
import userNickName from '../atom/Atoms';
import ChatScreen from '../Presenter/ChatScreen';

import { Message } from '../interface/types';

const ChatScreenContainer = () => {
  const userNickname = useRecoilValue(userNickName);

  const [msgHistory, setMsgHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userColor, setUserColor] = useState(() => randomColor());

  const onRegisterNewMsg = (msgInfo: Message) => {
    const newMessage: Message = msgInfo;
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
      userColor={userColor}
    />
  );
};

export default ChatScreenContainer;
