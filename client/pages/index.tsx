type Type = {
  url: {
    asPath: string;
  };
};

const Index = (hi: Type) => <div>{hi.url.asPath}</div>;

export default Index;
