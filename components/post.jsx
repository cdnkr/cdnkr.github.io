import MDX from "@/components/mdx";
import Link from "next/link";
import PostSectionNav from "./postsectionnav";
import Button from "./ui/button";
import { ArrowLeft, ArrowRight } from "./ui/icons";
import Tag from "./ui/tag";
import { cn } from "@/utils/cn";

export default function Post({ post, layout = "default" }) {
  const { frontmatter } = post;

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full flex flex-col gap-8">
        <div className={cn(
          "relative w-full flex flex-col gap-4 py-8 text-secondary bg-background",
          post.pattern,
          layout === "full" ? "" : ""
        )}>
          <div className={cn(
            "w-full flex",
            layout === "full" ? "justify-center" : "justify-center"
          )}>
            <h3 className={cn(
              "text-3xl lg:text-5xl max-w-xl text-wrap break-words leading-snug font-libre-franklin font-bold",
              layout === "full" ? "text-center text-3xl lg:text-5xl" : "text-center"
            )}>
              <span className={cn("text-white px-2 font-black bg-dark")}>
                {frontmatter.title}
              </span>
            </h3>
          </div>
          {frontmatter?.tags && (
            <div className="w-full flex max-w-md mx-auto items-center justify-center flex-wrap gap-2">
              {frontmatter?.tags?.map((tag, i) => (
                <Tag key={tag + i}>{tag}</Tag>
              ))}
            </div>
          )}
          {frontmatter?.date && (
            <span className={
              cn(
                "text-dark leading-none inline-block px-3",
                layout === "full" ? "text-center bg-transparent" : "absolute -top-3 -right-2 bg-dark text-white transform rotate-2 z-1"
              )
            }>
              <time
                dateTime={frontmatter.date}
                className="font-gochi-hand text-xl"
              >
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </span>
          )}
        </div>
        <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 relative">
          <article className={
            cn(
              "w-full flex flex-col gap-8",
              layout === "full" ? "lg:col-span-12" : "lg:col-span-8"
            )}>
            <h3 className={cn(
              "text-2xl lg:text-4xl max-w-5xl mx-auto text-wrap break-words leading-snug font-libre-franklin font-bold",
              layout === "full" ? "text-center text-3xl lg:text-5xl" : "text-left"
            )}>
              <span className="text-gray-800">
                {" "}{frontmatter.description}
              </span>
            </h3>
            {post.sections.map((section, i) => (
              <div
                key={i}
                id={encodeURIComponent(post.sectionTitles[i].replace(/#/g, ""))}
                className={
                  cn(
                    "w-full",
                    layout === "full" ? "flex justify-center" : ""
                  )}
              >
                <MDX source={section} layout={layout} />
              </div>
            ))}
          </article>
          <PostSectionNav
            sectionTitles={post.sectionTitles}
            className={cn(
              "hidden lg:block lg:col-span-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pt-7",
              layout === "full" ? "lg:hidden" : "lg:col-span-4"
            )}
          />
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-4 lg:gap-8 mt-8">
          {post?.previous ? (
            <Link href={post.previous?.slug}>
              <Button className="gap-3 w-full lg:w-auto lg:max-w-60">
                <ArrowLeft className="shrink-0" />
                <span className="truncate">
                  {post.previous?.frontmatter?.title}
                </span>
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {post?.next && (
            <Link href={post.next?.slug}>
              <Button className="gap-3 w-full lg:w-auto lg:max-w-60">
                <span className="truncate">
                  {post.next?.frontmatter?.title}
                </span>
                <ArrowRight className="shrink-0" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
