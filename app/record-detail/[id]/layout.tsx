import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

type DetailLayout = {
  children: ReactNode;
};
const DetailLayout = ({ children }: DetailLayout) => {
  return <div className={childrenWrapperStyle}>{children}</div>;
};

export default DetailLayout;

const childrenWrapperStyle = css({
  backgroundColor: 'background.gray',
});
