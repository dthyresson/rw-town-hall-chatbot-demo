// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/redwood-copilot" page={RedwoodCopilotPage} name="redwoodCopilot" />
      <Route path="/alphabet" page={AlphabetPage} name="alphabet" />
      <Route path="/chat-rooms" page={ChatRoomsPage} name="chatRooms" />
      <Route path="/chat/{id:ID}" page={ChatPage} name="chat" />
      <Route path="/auctions" page={AuctionsPage} name="auctions" />
      <Route path="/auction/{id:ID}" page={AuctionPage} name="auction" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
