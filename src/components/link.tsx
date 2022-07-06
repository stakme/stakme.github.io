import { FC, ReactNode } from "react";
import Link from "next/link";

export const TextLink: FC<{ href: string; children: ReactNode }> = ({
    href,
    children,
}) => {
    return (
        <Link href={href}>
            <a className="text-sky-400 hover:text-sky-500 focus:text-sky-700 visited:text-sky-900">
                {children}
            </a>
        </Link>
    );
};
