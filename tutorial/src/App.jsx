import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import * as MyWelcome from "./components/wecome-component/Welcome.jsx";
import * as MyTodoList from "./components/todo-list/ToDo.jsx";
import * as MyTodoReduceList from './components/todo-list-reduce/ToDoReduce.jsx'
import * as MyShoppingChart from './components/shopping-cart/ShoppingCart.jsx'
import { ToDoListShareState } from './components/todo-list-share-state/ToDoShareState.jsx'
import { TodoProvider } from './contexts/TodoContext.jsx'
import { TodoList } from './components/todo-list-context/TodoList.jsx'
import TodoFooter from "./components/todo-list-context/TodoFooter";
import { TodoSelector } from './components/todo-selector/TodoSelector.jsx'

function App() {


  return (
    <>
      <div>
        <h2 className='myHeader'>Start</h2>
        <MyWelcome.Welcome> Welcome </MyWelcome.Welcome>
        <MyWelcome.DisplayUserName name="Jairus" isAdmin={false} />

        <TodoSelector></TodoSelector>

        {/*
        <MyTodoList.ToDoList />
        <MyTodoReduceList.ToDoReduceList />
        <ToDoListShareState></ToDoListShareState>
        <TodoProvider>

          <TodoList isActiveList={true} />

          <TodoFooter />
          <TodoList isActiveList={false} />

        </TodoProvider>
          <MyShoppingChart.ShoppingCartWithReduce></MyShoppingChart.ShoppingCartWithReduce>
        */}
      </div>
    </>
  )
}

export default App
