import Link from "next/link";
import Card from "./ui/card";
import { cn } from "@/utils/cn";

export default function PostCard({ post, className }) {
    const { slug, frontmatter } = post

    return (
        <Link href={`/post/${slug}`}>
            <Card id={encodeURIComponent(frontmatter.title)} className={cn(className, "px-6 py-4")}>
                <div className="w-full flex flex-col mb-2">
                    <h3 className="text-xl max-w-full text-wrap break-words font-black">{frontmatter.title}</h3>
                </div>
                <div className="w-full flex items-center flex-wrap gap-2 mb-2">
                    <span className="text-gray-700 leading-none">
                        {frontmatter.date && (
                            <time dateTime={frontmatter.date}>
                                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </time>
                        )}
                    </span>
                    {frontmatter?.tags?.map((tag, i) => <span key={tag + i} className="text-sm uppercase text-primary font-bold">{tag}</span>)}
                </div>
                <p>
                    {frontmatter.description}
                </p>
            </Card>
        </Link>
    )
}
