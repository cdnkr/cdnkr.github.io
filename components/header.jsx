import Link from "next/link";

import config from "../config";
import Button, { ButtonLight } from "./ui/button";
import { GitHub, LinkedIn, XDotCom } from "./ui/icons";

export default function Header() {
    const [titlePart, titleSecondaryPart] = config.title.split(/\.|\s|-/g);

    return (
        <div className="w-full overflow-hidden flex flex-col gap-4 lg:bg-card-background-secondary lg:backdrop-blur-sm rounded-lg">
            <div className="w-full flex gap-8 lg:gap-0 justify-between items-center mb-0 p-4 bg-dark">
                <Link href="/">
                    <h1 className="text-3xl lg:text-4xl font-mono uppercase font-black">
                        <span className="text-white mr-3">
                            {titlePart}
                        </span>
                        <span className="text-white underline decoration-wavy decoration-primary underline-offset-[8px]">
                            {titleSecondaryPart}
                        </span>
                    </h1>
                </Link>

                <div className="flex gap-2">
                    <Link href="https://github.com/cdnkr" target="_blank" rel="noopener noreferrer">
                        <ButtonLight className="px-2 py-2 lg:px-4 lg:py-4">
                            <GitHub className="size-6 lg:size-6 stroke-black fill-black" />
                        </ButtonLight>
                    </Link>

                    <Link href="https://www.linkedin.com/in/cdnkr" target="_blank" rel="noopener noreferrer">
                        <ButtonLight className="px-2 py-2 lg:px-4 lg:py-4">
                            <LinkedIn className="size-6 lg:size-6 fill-black" />
                        </ButtonLight>
                    </Link>

                    <Link href="https://x.com/chaddanker" target="_blank" rel="noopener noreferrer">
                        <Button className="px-2 py-2 lg:px-4 lg:py-4">
                            <XDotCom className="size-6 lg:size-6 fill-white" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
