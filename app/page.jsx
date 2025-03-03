import Home from "@/components/home";
import { getAllPosts } from "@/utils/mdx";

export default async function HomePage() {
  const posts = await getAllPosts()
  
  // sort posts by date
  const sortedPosts = posts.sort((a, b) => {
    if (!a.frontmatter?.date || !b.frontmatter?.date) return 0
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })

  const allTags = posts.map((post) => post.frontmatter?.tags).flat()
  const tags = [...new Set(allTags)]

  return <Home posts={sortedPosts} tags={tags} />;
}
