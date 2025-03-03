"use client"

import PostCard from "./postcard";

export default function PostList({
    posts
}) {
    return (
        <>
            {posts?.map((post, i) => (
                <PostCard key={i} post={post} />
            ))}
        </>
    );
}
