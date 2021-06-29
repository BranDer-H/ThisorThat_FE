import React from 'react';
import { Input } from 'antd';
import { ChatProps } from '../interface/types'
import 'antd/dist/antd.css';

const ChatScreen = ({
  msgHistory,
  message,
  setMessage,
}: ChatProps) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMessage(e.target.value)
  }

  return (
    <>
      <Input.Search
        placeholder="input your messages..."
        value = {message}
        allowClear
        enterButton="Send"
        size="large"
        onChange = {onChange}
        onPressEnter = {e => console.log(message)}
        style = {{ position: "fixed", bottom: "0" }}
      />
    </>
  )
};

export default ChatScreen;
