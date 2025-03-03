'use client'

import Button from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import rehypePrettyCode from 'rehype-pretty-code';

const components = {
    Button: (props) => (
        <Button {...props} />
    ),
    h1: (props) => (
        <h1 className="text-2xl lg:text-4xl font-bold mt-8 mb-4" {...props} />
    ),
    h2: (props) => (
        <h2 className="text-xl lg:text-3xl font-bold mt-6 mb-3" {...props} />
    ),
    h3: (props) => (
        <h3 className="text-xl lg:text-2xl font-semibold mt-5 mb-2" {...props} />
    ),
    p: (props) => (
        <p className="my-4 leading-relaxed" {...props} />
    ),
    ul: (props) => (
        <ul className="list-disc list-inside my-4 ml-4" {...props} />
    ),
    ol: (props) => (
        <ol className="list-decimal list-inside my-4 ml-4" {...props} />
    ),
    li: (props) => (
        <li className="my-2" {...props} />
    ),
    a: (props) => (
        <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
    ),
    blockquote: (props) => (
        <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic" {...props} />
    ),
    pre: ({ children }) => {
        return (
            <pre className="group bg-[var(--card-background)] p-4 rounded-lg overflow-x-auto my-4">
                {children}
            </pre>
        )
    },
    code: ({ children, className }) => {
        const handleClick = () => {
            // Convert React elements to text content
            const getTextContent = (children) => {
                if (typeof children === 'string') return children;
                if (Array.isArray(children)) {
                    return children.map(child => getTextContent(child)).join('');
                }
                if (children?.props?.children) {
                    return getTextContent(children.props.children);
                }
                return '';
            };

            const textContent = getTextContent(children);
            navigator.clipboard.writeText(textContent)
                .catch(err => console.error('Failed to copy text:', err));
        };

        if (!className) {
            return (
                <code
                    onClick={handleClick}
                    className="bg-[var(--card-background)] rounded px-1 py-0.5 cursor-pointer relative"
                >
                    {children}
                </code>
            );
        }
        return (
            <code
                onClick={handleClick}
                className={cn("cursor-pointer hover:opacity-80", className)}
            >
                {children}
            </code>
        );
    },
}

const prettyCodeOptions = {
    theme: 'one-dark-pro',
    onVisitLine(node) {
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }]
        }
    },
    onVisitHighlightedLine(node) {
        node.properties.className.push('highlighted')
    },
}

export default function MDX({ source }) {
    const [mdxSource, setMdxSource] = useState();

    useEffect(() => {
        const prepareMDX = async () => {
            const serialized = await serialize(source, {
                mdxOptions: {
                    rehypePlugins: [
                        [rehypePrettyCode, prettyCodeOptions],
                    ],
                },
            });
            setMdxSource(serialized);
        };

        prepareMDX();
    }, [source]);

    if (!mdxSource) return null;

    return (
        <MDXRemote
            {...mdxSource}
            components={components}
        />
    );
}
