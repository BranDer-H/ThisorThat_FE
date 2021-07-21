import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userNickname, msgHistory } from '../atom/Atoms';
import ChatScreen from '../Presenter/ChatScreen';

import { socket } from './LoginContainer';

import { Message } from '../interface/types';

const ChatScreenContainer = () => {
  const userName = useRecoilValue(userNickname);
  const [msgHistoryArr, setMsgHistory] = useRecoilState(msgHistory);

  const [message, setMessage] = useState<string>('');

  const onRegisterNewMsg = (msgInfo: Message) => {
    const newMessage: Message = msgInfo;

    socket.send(
      JSON.stringify({
        name: newMessage.userName,
        messageType: 'CHAT',
        content: newMessage.content,
        timestamp: newMessage.timeStamp,
      })
    );

    setMessage('');
  };

  useEffect(() => {
    socket.onmessage = (evt: MessageEvent) => {
      const response = JSON.parse(evt.data);
      switch (response.messageType) {
        case 'CHAT':
          setMsgHistory([
            ...msgHistoryArr,
            {
              informMsg: false,
              enterMsg: false,
              userName: response.name,
              content: response.content,
              timeStamp: response.timestamp,
            },
          ]);
          break;
        case 'JOIN':
          setMsgHistory([
            ...msgHistoryArr,
            {
              informMsg: true,
              enterMsg: true,
              userName: response.content,
              content: '',
              timeStamp: 0,
            },
          ]);
          break;
        case 'LEAVE':
          setMsgHistory([
            ...msgHistoryArr,
            {
              informMsg: true,
              enterMsg: false,
              userName: response.content,
              content: '',
              timeStamp: 0,
            },
          ]);
          break;
      }
    };
  });

  return (
    <ChatScreen
      msgHistory={msgHistoryArr}
      onRegisterNewMsg={onRegisterNewMsg}
      message={message}
      setMessage={setMessage}
      userName={userName}
    />
  );
};

export default ChatScreenContainer;
