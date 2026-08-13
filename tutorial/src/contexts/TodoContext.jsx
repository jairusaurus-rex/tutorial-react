import {
    createContext,
    useContext,
    use,
    useReducer
} from "react";

import todoReducer from "../reducers/todoReducer";

const TodoContext = createContext(null);

const initialItems = [
    {
        id: 1,
        text: "Learn useReducer",
        done: true
    },
    {
        id: 2,
        text: "Learn useContext",
        done: false
    },
    {
        id: 3,
        text: "Build my todo app",
        done: false
    }
];

export const TodoProvider = ({ children }) => {

    const [items, dispatch] = useReducer(
        todoReducer,
        initialItems
    );

    return (
        <TodoContext.Provider
            value={{
                items,
                dispatch
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {

    const context = use(TodoContext); //useContext(TodoContext);

    if (!context) {
        throw new Error(
            "useTodos must be used inside TodoProvider"
        );
    }

    return context;
};