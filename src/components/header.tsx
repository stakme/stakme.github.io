import { FC } from "react";
import { Headline } from "./headline";
import { TextLink } from "./link";

export const Header: FC = () => (
    <header className="mb-6 border-b-2 pb-3">
        <div className="mb-4">
            <Headline depth={1}>@stakme</Headline>
        </div>
        <div className="items-end md:flex">
            <div className="grow">大丈夫になりたいブログ</div>
            <div className="flex justify-end gap-2">
                <TextLink href="/">top</TextLink>
                <TextLink href="https://twitter.com/stakme">Twitter</TextLink>
                <TextLink href="http://github.com/stakme/stakme.github.io">
                    GitHub
                </TextLink>
            </div>
        </div>
    </header>
);
