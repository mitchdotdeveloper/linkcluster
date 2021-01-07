import { logout } from 'api/auth';
import { useEffect } from 'react';

export type Message = {
  message: string;
};

export const Hi = ({ message }: Message) => {
  useEffect(() => {
    (async () => {
      console.log(await logout());
      const mydate = new Date();
      mydate.setTime(mydate.getTime() - 1);
      document.cookie = 'csrftoken=; expires=' + mydate.toUTCString();
    })();
  }, []);
  return <h1>{`Hi! ${message}`}</h1>;
};
