import MDX from '@/components/mdx'
import Header from './header'
import { ChevronLeft } from './ui/icons'
import { Suspense } from 'react'

export default function Post({ post }) {
    const { frontmatter } = post

    return (
        <article className="w-full grid grid-cols-12 gap-4 lg:gap-8">
            <div className="w-full col-span-12 flex flex-col gap-6">
                <Header />
                <div className="pl-4 lg:px-6 w-full">
                    <div
                        className="w-full group relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 bg-dark block mb-6"
                    >
                        <ChevronLeft className="size-[35px] absolute top-0 -left-[21px] stroke-dark fill-[#fff] z-[1] group-active:translate-y-[2px]" />
                        <div className="w-full px-4 bg-[#fff] rounded-lg border-2 border-dark translate-y-[-6px] transform active:translate-y-[-2px]">
                            <div className="w-full lg:px-6">
                                <div className="w-full py-6 flex flex-col gap-4">
                                    <div className="w-full flex flex-col">
                                        <h3 className="text-2xl lg:text-4xl max-w-full text-wrap break-words font-bold">{frontmatter.title}</h3>
                                    </div>
                                    <div className="w-full flex items-center flex-wrap gap-2">
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
                                </div>
                                {post.sections.map((section, i) => (
                                    <div key={i} id={encodeURIComponent(post.sectionTitles[i].replace(/#/g, ""))} className="w-full border-t-2 border-dark">
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <MDX
                                                source={section}
                                            />
                                        </Suspense>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}