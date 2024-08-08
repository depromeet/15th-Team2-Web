import { ReactNode } from 'react';

import { HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

type Layout = {
  children: ReactNode;
};
const Layout = ({ children }: Layout) => {
  return (
    <div>
      <HeaderBar />
      <div className={childrenWrapperStyle}>{children}</div>
    </div>
  );
};

export default Layout;

const childrenWrapperStyle = css({
  p: '16px 20px 24px 20px',
});
