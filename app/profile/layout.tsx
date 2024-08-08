import { ReactNode } from 'react';

type Layout = {
  children: ReactNode;
};
const Layout = ({ children }: Layout) => {
  return <div>{children}</div>;
};

export default Layout;
