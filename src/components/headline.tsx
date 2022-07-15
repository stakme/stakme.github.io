import { FC, ReactNode } from "react";

export const Headline: FC<{ depth: number; children: ReactNode }> = ({
    depth,
    children,
}) => {
    switch (depth) {
        case 1:
            return <h1 className="text-7xl font-bold">{children}</h1>;
        case 2:
            return <h2 className="text-3xl font-bold">{children}</h2>;
        case 3:
            return <h3 className="text-2xl font-bold">{children}</h3>;
        case 4:
            return <h4 className="text-xl font-bold">{children}</h4>;
        case 5:
            return <h5 className="text-lg font-bold">{children}</h5>;
        default:
            return <h6 className="font-bold">{children}</h6>;
    }
};
