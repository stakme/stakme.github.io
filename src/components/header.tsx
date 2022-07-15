import { FC } from "react";
import { Headline } from "./headline";
import { TextLink } from "./link";

export const Header: FC = () => (
    <header>
        <div className="mb-8 gap-y-4 md:flex">
            <div>
                <Headline depth={1}>@stakme</Headline>
            </div>
            <div className="flex grow flex-row-reverse items-end gap-x-2">
                <TextLink href="http://github.com/stakme/stakme.github.io">
                    GitHub
                </TextLink>
                <TextLink href="https://twitter.com/stakme">Twitter</TextLink>
                <TextLink href="/">top</TextLink>
            </div>
        </div>
        <div className="mb-4">大丈夫になりたいブログ</div>
    </header>
);
