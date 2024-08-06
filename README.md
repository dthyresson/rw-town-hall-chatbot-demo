# Redwood Copilot Demo
## with OpenAI and GraphQL Streaming

This project demonstrates how to use RedwoodJS, OpenAI and GraphQL Streaming to build a Chatbot that can answer questions about your code.

### Codebase Generator
First we generate a file with your entire RedwoodJS project.

### AI
We provide that codebase to OpenAI, OpenAI with Unkey Semantic Cache, or Langbase and ask questions about it using our Redwood Copilot chatbot.

### GraphQL Streaming
Redwood Realtime with GraphQL Streaming will stream the response from OpenAI to the client.

# AI Chat

We demo:

* [OpenAI](https://openai.com)
* OpenAI with [Unkey](https://www.unkey.com) [Semantic Cache](https://www.unkey.com/docs/semantic-cache/introduction)
* [Langbase](https://langbase.com/)

Each use the `gpt-4o-mini` model.

## About Langbase

⌘ Langbase helps developers ship composable hyper-personalized AI apps and features.

Start by building AI assistants Pipes
Then create managed semantic memory (RAG) so your AI can talk to your data

⌘ Langbase is the composable infrastructure and developer experience to build, collaborate, and deploy any AI apps/features. Our mission is to make AI accessible to everyone, any developer not just AI/ML experts. We are the only composable AI infrastructure.

### Langbase Demo

The Langbase powered chat uses a [Pipe](https://langbase.com/docs/pipe/overview) with the project codebase attached as memory.

This codebase is uploaded to [memory](https://langbase.com/docs/memory/overview) via script or can be initiated by a GraphQL mutation.

We can also upload all the RedwoodJS documentation to Langbase memory so one can chat with your code as well as docs.

The pipe defines the:

* prompt
* model
* settings
* RAG instructions

By using a [pipe](https://langbase.com/docs/pipe/overview), the model used and prompt can be adjusted without modifying the request.

## About Unkey Sematic Cache

A simple way to improve performance when using LLMs is to cache responses using the user query as the key. This has the disadvantage of only allowing for caching of exact matches.

A more useful form of caching is [semantic caching](https://www.unkey.com/docs/semantic-cache/introduction): caching based on the embedding of the query, and returning a response if the query passes a threshold of semantic similarity. This allows for a higher cache hit rate, meaning faster responses for your users and reduced OpenAI bills.

### Semantic Cache Demo

To enable semantic caching with Unkey we:

* Set up a new gateway in the dashboard
* Created a second OpenAI client and replaced the baseURL with the new gateway URL

Subsequent responses will be cached. You can monitor the cache via our dashboard.

Unkey’s semantic cache supports streaming, making it useful for web-based chat applications where you want to display results in real-time.

# How To

## Config

You will need to following envars:

```
OPENAI_API_KEY=

LANGBASE_PIPE_API_KEY=
LANGBASE_API_KEY=
LANGBASE_MEMORY_NAME_CODEBASE=
LANGBASE_MEMORY_NAME_DOCS=
LANGBASE_OWNER_LOGIN=

UNKEY_SEMANTIC_CACHE_GATEWAY=

REDWOOD_DOCS_PATH="/your/path/to/redwoodjs/redwood/docs/docs"

```

## Scripts

* `yarn rw exec gen-codebase` - generates codebase file `CODEBASE_TOC.md`
* `yarn rw exec gen-codebase --upload=true` uploads to Langbase; needs `LANGBASE_MEMORY_NAME_CODEBASE`
* `yarn rw exec gen-docs` fetches docs from a local RedwoodJS folder uploads docs to Langbase; keeps hash to upload only docs changed since last upload. needs `LANGBASE_MEMORY_NAME_DOCS`



## Future

* Use RAG with RedwoodJS docs + AI assistant prompt to answer more questions.
