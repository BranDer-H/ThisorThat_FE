import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import randomColor from 'randomcolor';
import { userNickname, msgHistory } from '../atom/Atoms';
import ChatScreen from '../Presenter/ChatScreen';

import { socket } from './LoginContainer';

import { Message } from '../interface/types';

const ChatScreenContainer = () => {
  const userName = useRecoilValue(userNickname);
  const [msgHistoryArr, setMsgHistory] = useRecoilState(msgHistory);

  const [message, setMessage] = useState<string>('');
  const [userColor, setUserColor] = useState(() => randomColor());

  const onRegisterNewMsg = (msgInfo: Message) => {
    const newMessage: Message = msgInfo;

    socket.send(
      JSON.stringify({
        name: newMessage.userName,
        messageType: 'CHAT',
        content: newMessage.content,
      })
    );

    setMessage('');
    setMsgHistory([...msgHistoryArr, newMessage]);
  };

  useEffect(() => {
    socket.onmessage = (evt: MessageEvent) => {
      const response = JSON.parse(evt.data);
      switch (response.messageType) {
        case 'CHAT':
          setMsgHistory([
            ...msgHistoryArr,
            {
              enterMsg: false,
              userName: response.name,
              content: response.content,
              timeStamp: 0,
            },
          ]);
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
      userColor={userColor}
    />
  );
};

export default ChatScreenContainer;
