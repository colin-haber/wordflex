import React from "react";
import icons from "bootstrap-icons/bootstrap-icons.svg";
type Props = {
  id: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
}
export function Icon({ id, width = "1em", height = "1em", fill="currentColor" }: Props) {
  return (
    <svg className="bi" width={width} height={height} fill={fill}>
      <use xlinkHref={`${icons}#${id}`} />
    </svg>
  );
}
