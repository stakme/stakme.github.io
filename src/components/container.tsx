import { FC, ReactNode } from "react";

export const MainContainer: FC<{ children: ReactNode }> = ({ children }) => {
    const hoge = 1;
    return <main className="  container   mx-auto 2xl:px-80">{children}</main>;
};
