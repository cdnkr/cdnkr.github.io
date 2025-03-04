"use client"

import Link from "next/link";
import { useState } from "react";
import PostList from "./postlist";
import Button from "./ui/button";
import { GitHub, LinkedIn, XDotCom } from "./ui/icons";
import Input from "./ui/input";

export default function Home({
    posts,
    tags
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);

    const filteredPosts = posts?.filter(post => {
        if (selectedTag) {
            return post.frontmatter.tags.includes(selectedTag);
        }

        if (searchTerm) {
            return post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase());
        }

        return true;
    });

    return (
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="w-full flex flex-col pl-0">
                <PostList posts={filteredPosts} />
            </div>
            <div className="w-full lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] xl:max-w-[500px] xl:w-[500px] xl:min-w-[500px]">
                <div className="w-full sticky top-8">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full hidden lg:flex flex-col gap-4 mb-4 bg-card-background-secondary backdrop-blur-sm rounded-lg p-4">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search page... (Ctrl + K)"
                            />
                        </div>
                        <div className="w-full hidden lg:flex flex-wrap gap-4 mb-4 rounded-lg bg-card-background-secondary backdrop-blur-sm p-4 border-l-0 border-primary">
                            {tags.map((tag, i) => (
                                <span
                                    key={tag + i}
                                    className={`cursor-pointer text-sm uppercase transition-all duration-300 font-bold decoration-primary underline-offset-[3px] hover:underline hover:decoration-wavy ${selectedTag === tag ? "underline decoration-wavy" : ""}`}
                                    onClick={() => setSelectedTag(tag)}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="w-full flex flex-col gap-6 mb-4 bg-card-background-secondary backdrop-blur-sm rounded-lg p-4">
                            <Link href="https://github.com/cdnkr" target="_blank" rel="noopener noreferrer">
                                <Button className="px-4">
                                    <GitHub className="size-6" />
                                    /cdnkr
                                </Button>
                            </Link>

                            <Link href="https://www.linkedin.com/in/cdnkr" target="_blank" rel="noopener noreferrer">
                                <Button className="px-4">
                                    <LinkedIn className="size-6" />
                                    /cdnkr
                                </Button>
                            </Link>

                            <Link href="https://x.com/chaddanker" target="_blank" rel="noopener noreferrer">
                                <Button className="px-4">
                                    <XDotCom className="size-6" />
                                    /chaddanker
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
