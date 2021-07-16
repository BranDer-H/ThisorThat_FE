import { atom } from 'recoil';

export const userNickname = atom<string>({
  key: 'userNickName',
  default: '',
});

export default userNickname;
