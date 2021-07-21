export interface Message {
  informMsg: boolean;
  enterMsg: boolean;
  userName: string;
  content: string;
  timeStamp: number;
}

export interface ChatProps {
  msgHistory: Message[];
  onRegisterNewMsg: (msgObj: Message) => void;
  message: string;
  setMessage: Function;
  userName: string;
  userColor: string;
  // useFinalInputMsg: () => void;
}
