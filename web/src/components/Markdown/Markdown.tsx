import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const CodeBlock = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div">
      {String(children)}
    </SyntaxHighlighter>
  ) : (
    <code className={`${className} whitespace-pre-wrap`}>{children}</code>
  )
}

const Markdown = ({ children }) => {
  return (
    <ReactMarkdown components={{ code: CodeBlock }}>{children}</ReactMarkdown>
  )
}

export default Markdown
