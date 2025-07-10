import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null as any,
});

export const tokenState = atom({
  key: 'tokenState',
  default: typeof window !== 'undefined' ? localStorage.getItem('allycare_token') : null,
});

export const authLoadingState = atom({
  key: 'authLoadingState',
  default: false,
});

export const reportLoadingState = atom({
  key: 'reportLoadingState',
  default: false,
});

export const sessionIdsState = atom({
  key: 'sessionIdsState',
  default: [] as string[],
});

export const selectedSessionState = atom({
  key: 'selectedSessionState',
  default: '',
});

export const reportResultState = atom({
  key: 'reportResultState',
  default: null as any,
});

export const errorState = atom({
  key: 'errorState',
  default: '',
});
