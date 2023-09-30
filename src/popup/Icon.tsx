import React from "react";
import icons from "bootstrap-icons/bootstrap-icons.svg";
type Props = {
  id: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  style?: React.CSSProperties;
}
export function Icon({ id, className = "bi", width = "1em", height = "1em", fill="currentColor", style={} }: Props) {
  return (
    <svg className={className} width={width} height={height} fill={fill} style={style}>
      <use xlinkHref={`${icons}#${id}`} />
    </svg>
  );
}
