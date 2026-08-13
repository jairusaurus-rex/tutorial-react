import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { TodoSelector } from './components/todo-selector/TodoSelector.jsx'
import { PageNotFound } from './components/tools/NotFound.jsx'
import { UserList } from './components/todo-list-context/UserList.jsx'

const router=createBrowserRouter([
  {path:"/", element: <App/>},
  {path:"/todo", element: <TodoSelector/>},
  {path:"/todo/:id", element: <TodoSelector/>},
  {path:"/users", element: <UserList/>},
  {path:"/notfound", element: <PageNotFound/>},
  {path:"*", element: <PageNotFound/>},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
