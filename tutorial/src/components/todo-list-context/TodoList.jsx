import styles from "../../styles/ToDo.module.css";
import { useTodos } from "../../contexts/TodoContext.jsx";
import TodoItem from "./TodoItem";

export const TodoList = ({isActiveList = true}) => {

    const { items } = useTodos();
    const subList = items.filter(item => {return item.done != isActiveList})
    return (
        <div className={styles.componentContainor}>
            {isActiveList && <h3>TODO with a context reducer</h3>}
            <ul>

                {subList.map((item, index) => (
                    <TodoItem
                        key={item.id}
                        item={item}
                        index={index}
                        totalItems={items.length}
                    />
                ))}

            </ul>

        </div>
    );
};