import { FC } from "react";
import { TextLink } from "./link";

export const Header: FC = () => (
    <header>
        <div className="mb-8 gap-y-4 md:flex">
            <div>
                <h1 className="mr-2 text-7xl font-bold">@stakme</h1>
            </div>
            <div className="flex grow flex-row-reverse items-end gap-x-2 ">
                <TextLink href="http://github.com/stakme/stakme.github.io">
                    GitHub
                </TextLink>
                <TextLink href="https://twitter.com/stakme">Twitter</TextLink>
            </div>
        </div>
        <div className="mb-4">大丈夫になりたいブログ</div>
    </header>
);
