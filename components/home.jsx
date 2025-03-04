import Header from "./header";
import PostList from "./postlist";

export default function Home({
    posts
}) {
    return (
        <div className="w-full grid grid-cols-12 gap-4 lg:gap-8">
            <div className="w-full col-span-12 flex flex-col pl-0">
                <Header />
                <div className="h-8" />
                <div className="w-full px-6">
                    <PostList posts={posts} />
                </div>
            </div>
        </div>
    );
}
