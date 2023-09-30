import React from "react";
type Props = {
  children: React.ReactNode;
  rows?: number;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  test?: any;
}
export function Placeholder({ children, rows = 1, cols = 12, test = false }: Props) {
  return (
    <>{test ? children : new Array(rows).map((_, index) => <div key={index} className={`placeholder col-${cols}`}></div>) }</>
  );
}
