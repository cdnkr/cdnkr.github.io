import Post from '@/components/post'
import { getAllPosts } from '@/utils/mdx'

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPost({ params }) {
    try {
        params = await params
        const posts = await getAllPosts()
        const similar = posts.filter(post => post.slug !== params.slug)
        const post = posts.find(post => post.slug === params.slug)

        return (
            <Post post={{ ...post, similar }} />
        )
    } catch (error) {
        console.error('Error loading post:', error)
        return <div>Error loading post: {error.message}</div>
    }
}