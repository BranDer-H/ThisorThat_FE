export interface Message {
  userName: string;
  content: string;
}

export interface ChatProps {
  msgHistory: Message[];
  onRegisterNewMsg: (msgObj: Message) => void;
  message: string;
  setMessage: Function;
  userName: string;
  setUserName: Function;
  userColor: string;
  // useFinalInputMsg: () => void;
}
