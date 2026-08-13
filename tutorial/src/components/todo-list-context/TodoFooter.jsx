import { useTodos } from "../../contexts/TodoContext.jsx";
import styles from "../../styles/ToDo.module.css";

const TodoFooter = () => {

    const { items, dispatch } = useTodos();

    const hasEmptyItem = items.some(
        item => item.text.trim().length === 0
    );

    const handleAdd = () => {
        dispatch({
            type: "ADD"
        });
    };

    return (
        <div className={`${styles.componentContainor} ${styles}`}>

            {!hasEmptyItem && (
                <button onClick={handleAdd}>
                    ➕ new list item
                </button>
            )}
            <div>

            </div>
            <span>    Active: {items.filter(item => {return item.text.trim().length > 0 && !item.done}).length}     </span>
            <span className={styles.lm}>    Completed: {items.filter(item => {return item.text.trim().length > 0 && item.done}).length}   </span>
            <span className={styles.lm}>    Total: {items.filter(item => {return item.text.trim().length > 0}).length}                     </span>

        </div>
    );
};

export default TodoFooter;