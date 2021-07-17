import { atom } from 'recoil';
import { Message } from '../interface/types';

export const userNickname = atom<string>({
  key: 'userNickName',
  default: '',
});

export const msgHistory = atom<Message[]>({
  key: 'msgHistory',
  default: [],
});
