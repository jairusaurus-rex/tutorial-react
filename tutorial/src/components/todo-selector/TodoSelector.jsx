import { useState } from "react";
import * as MyTodoList from "../todo-list/ToDo.jsx";
import { ToDoReduceList } from "../todo-list-reduce/ToDoReduce.jsx";
import { ToDoListShareState } from "../todo-list-share-state/ToDoShareState.jsx";
import { TodoProvider } from '../../contexts/TodoContext.jsx'
import { TodoWrapper } from "../todo-list-context/TodoWrapper.jsx";
export const TodoSelector  = () =>  {

    
    const [selectedComponent, setSelectedComponent] = useState("context_reducer");

    return (
        <div>
            <select
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value)}
            >
                <option value="state">with state</option>
                <option value="between_components">with state between components</option>
                <option value="reducer">with reducer</option>
                <option value="context_reducer">with context that uses a reducer</option>
            </select>

        <TodoProvider>
            {selectedComponent === "state" && <MyTodoList.ToDoList />}
            {selectedComponent === "between_components" && <ToDoListShareState></ToDoListShareState>}
            {selectedComponent === "reducer" && <ToDoReduceList />}
            {selectedComponent === "context_reducer" && <TodoWrapper />}
        </TodoProvider>
        </div>
    );
}