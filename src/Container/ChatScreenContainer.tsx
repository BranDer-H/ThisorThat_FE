import React, { useState } from 'react';
import randomColor from 'randomcolor';
import ChatScreen from '../Presenter/ChatScreen';

import { Message } from '../interface/types';

const ChatScreenContainer = () => {
  const [msgHistory, setMsgHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
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
      userName={userName}
      setUserName={setUserName}
      userColor={userColor}
    />
  );
};

export default ChatScreenContainer;
