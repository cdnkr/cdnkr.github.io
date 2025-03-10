import MDX from "@/components/mdx";
import Link from "next/link";
import PostSectionNav from "./postsectionnav";
import Button from "./ui/button";
import { ArrowLeft, ArrowRight } from "./ui/icons";
import Tag from "./ui/tag";

export default function Post({ post }) {
  const { frontmatter } = post;

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full flex flex-col gap-8">
        <div className="relative w-full flex flex-col gap-4 border-b-2 border-dark bg-dotted py-8">
          <div className="w-full flex justify-between">
            <h3 className="text-2xl lg:text-4xl max-w-xl text-wrap break-words leading-snug font-libre-franklin">
              <span className="text-white bg-dark px-2 font-bold">
                {frontmatter.title}
              </span>
            </h3>
          </div>
          <div className="w-full flex items-center flex-wrap gap-2">
            {frontmatter?.tags?.map((tag, i) => (
              <Tag key={tag + i}>{tag}</Tag>
            ))}
          </div>
          <p>{frontmatter.description}</p>
          <span className="text-dark leading-none absolute -bottom-3 inline-block bg-background px-3">
            {frontmatter.date && (
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
            )}
          </span>
        </div>
        <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 relative">
          <article className="w-full flex flex-col gap-8 lg:col-span-8">
            {post.sections.map((section, i) => (
              <div
                key={i}
                id={encodeURIComponent(post.sectionTitles[i].replace(/#/g, ""))}
                className="w-full"
              >
                <MDX source={section} />
              </div>
            ))}
          </article>
          <PostSectionNav
            sectionTitles={post.sectionTitles}
            className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pt-7"
          />
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-4 lg:gap-8 mt-8">
          {post?.previous ? (
            <Link href={post.previous?.slug}>
              <Button className="gap-3 w-full lg:w-auto">
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
              <Button className="gap-3 w-full lg:w-auto">
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
