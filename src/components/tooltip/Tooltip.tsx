import { FC, ReactNode, useState } from 'react';

import styles from './tooltip.module.scss'

type TooltipProps = {
  children: ReactNode;
  text: string; 
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const handleTooltipVisibility = () => {
    setIsTooltipVisible(!isTooltipVisible)
  }
  return <div className={styles.tooltip} onMouseEnter={handleTooltipVisibility} onMouseLeave={handleTooltipVisibility}>
    {children}
    <p data-field="tooltip" style={{
      opacity: isTooltipVisible ? '1': '0',
      visibility: isTooltipVisible ? 'visible' : 'hidden',
    }}>{text}</p>
  </div>;
};

export default Tooltip;
