"use client"

import MDX from '@/components/mdx'
import { useState } from 'react'
import Button from './ui/button'
import Input from './ui/input'

export default function Post({ post }) {
    const [searchTerm, setSearchTerm] = useState("")
    const { frontmatter } = post

    return (
        <article className="w-full grid grid-cols-12 gap-4 lg:gap-8">
            <div className="w-full col-span-12 lg:col-span-4 xl:col-span-4">
                <div className="w-full lg:sticky top-8">
                    <div className="w-full flex flex-col gap-4 lg:gap-8">
                        <div className="w-full lg:flex flex-col gap-4 bg-card-background-secondary backdrop-blur-sm rounded-lg p-4">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search page... (Ctrl + K)"
                            />
                        </div>
                        <div className="hidden rounded-lg lg:flex w-full flex-col gap-1 max-h-[calc(100vh-20rem)] overflow-y-auto no-scrollbar bg-card-background-secondary backdrop-blur-sm p-4">
                            {post.sectionTitles.map((title, i) => (
                                <a key={i} href={`#${encodeURIComponent(title.replace(/#/g, ""))}`} className="truncate block hover:bg-black/5 transition-colors duration-200 py-1 px-2 rounded-md text-sm">
                                    {title.replace(/#/g, "")}
                                </a>
                            ))}
                        </div>
                        <div className="w-full hidden lg:flex flex-col gap-4 bg-card-background-secondary backdrop-blur-sm rounded-lg p-4">
                            <Button onClick={() => {
                                navigator.share({
                                    title: post.frontmatter.title,
                                    text: post.frontmatter.description,
                                    url: window.location.href
                                })
                            }}>
                                Share
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full col-span-12 lg:col-span-8 xl:col-span-8 flex flex-col gap-6">
                <div className="w-full p-4 flex flex-col gap-4 rounded-lg bg-card-background-secondary">
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
                    <div key={i} id={encodeURIComponent(post.sectionTitles[i].replace(/#/g, ""))} className="w-full flex flex-col gap-2 bg-card-background-secondary backdrop-blur-sm rounded-lg px-6 pb-4 border-t-0 border-primary">

                        <MDX
                            source={section}
                        />
                    </div>
                ))}
            </div>
        </article >
    )
}