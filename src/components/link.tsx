import { FC, ReactNode } from "react";
import Link from "next/link";

export const TextLink: FC<{ href: string; children: ReactNode }> = ({
    href,
    children,
}) => {
    return (
        <Link href={href}>
            <a className="text-sky-600 underline underline-offset-2 visited:text-sky-900 hover:text-sky-700 focus:text-sky-800">
                {children}
            </a>
        </Link>
    );
};
