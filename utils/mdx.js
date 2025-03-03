import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function getAllPosts() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts')
    const files = fs.readdirSync(postsDirectory)
    
    const posts = files.map((fileName) => {
      const filePath = path.join(postsDirectory, fileName)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      
      const { data: frontmatter, content } = matter(fileContent)
      const slug = fileName.replace(/\.mdx$/, '')

      const sectionTitles = content.split('---').map(section => section.trim().split('\n')[0])

      return {
        slug,
        frontmatter,
        content,
        sections: content.split('---'),
        sectionTitles
      }
    })
    
    return posts
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}