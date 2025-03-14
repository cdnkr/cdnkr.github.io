import { cn } from "@/utils/cn";
import Link from "next/link";
import Card from "./ui/card";
import { forwardRef } from "react";

const PostCard = forwardRef(({ post, className, isActive, ...rest }, ref) => {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/post/${slug}`}>
      <Card
        ref={ref}
        id={encodeURIComponent(frontmatter.title)}
        className={cn(className, "group flex flex-col items-center gap-2 group relative text-dark/70 hover:text-primary active:text-primary transition-all duration-300 px-4 lg:px-0 py-24 lg:py-12", isActive && "text-primary lg:text-dark/70", post.pattern)}
        {...rest}
      >
        <h3 className="text-center font-bold uppercase text-gray-800 transition-all duration-300 hover:text-dark leading-snug text-3xl lg:text-5xl max-w-xl text-wrap break-words font-libre-franklin">
          <span className="bg-dark text-white">{frontmatter.title}</span>
        </h3>
      </Card>
    </Link>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
