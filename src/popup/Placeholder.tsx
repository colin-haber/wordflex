import React from "react";
class Props {
  children: React.ReactNode;
  rows?: number = 1;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 12;
  test: any;
}
export function Placeholder({ children, rows, cols, test }: Props) {
  return (
    <>{test ? children : new Array(rows).map((_, index) => <div key={index} className={`placeholder col-${cols}`}></div>) }</>
  );
}
