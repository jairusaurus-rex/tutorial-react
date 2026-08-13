import { TodoList } from "./TodoList";
import TodoFooter from "./TodoFooter";
import { TodoProvider } from '../../contexts/TodoContext.jsx'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTodos } from "../../contexts/TodoContext.jsx";

export const TodoWrapper = () => {
    const { dispatch } = useTodos();
    const { id } = useParams();
    if(id){

        useEffect(() => {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('data>', data)
                    if (data) {
                        const newItems = data.map(d => {
                            return {
                                id: d.id,
                                text: d.title,
                                done: d.completed
                            }
                        });
                        dispatch({
                            type: "REPLACE",
                            items: newItems
                        });
                        dispatch({
                            type: "ADD"
                        });
                    }
    
                })
                .catch((error) => console.error("Error fetching todos:", error))
        }, [id]);
    }
    return (
        <>
            <TodoList isActiveList={true} />
            <TodoFooter />
            <TodoList isActiveList={false} />
        </>
    )
}