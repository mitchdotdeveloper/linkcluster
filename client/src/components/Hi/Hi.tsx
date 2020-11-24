export type Message = {
  message: string;
};

export const Hi = ({ message }: Message) => <h1>{`Hi! ${message}`}</h1>;
