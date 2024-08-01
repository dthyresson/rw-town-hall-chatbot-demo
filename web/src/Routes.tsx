// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import RedwoodCopilotLayout from 'src/layouts/RedwoodCopilotLayout/RedwoodCopilotLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
        <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
        <Route path="/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
        <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
        <Route path="/posts" page={PostPostsPage} name="posts" />
      </Set>
      <Set wrap={RedwoodCopilotLayout}>
        <Route path="/redwood-copilot" page={RedwoodCopilotPage} name="redwoodCopilot" />
        <Route path="/alphabet" page={AlphabetPage} name="alphabet" />
        <Route path="/chat-rooms" page={ChatRoomsPage} name="chatRooms" />
        <Route path="/chat/{id:ID}" page={ChatPage} name="chat" />
        <Route path="/auctions" page={AuctionsPage} name="auctions" />
        <Route path="/auction/{id:ID}" page={AuctionPage} name="auction" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
