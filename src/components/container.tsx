import { FC, ReactNode } from "react";

export const MainContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className="container mx-auto max-w-2xl p-2 md:p-0 md:pt-4">
            {children}
        </main>
    );
};
