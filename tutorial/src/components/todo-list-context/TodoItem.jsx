import styles from "../../styles/ToDo.module.css";
import { useTodos } from "../../contexts/TodoContext.jsx";

const TodoItem = ({ item, index, totalItems }) => {

    const { dispatch } = useTodos();

    const handleChange = (event) => {
        dispatch({
            type: "CHANGE",
            id: item.id,
            text: event.target.value
        });
    };

    const handleDone = () => {
        dispatch({
            type: "TOGGLE_DONE",
            id: item.id
        });
    };

    const handleDelete = () => {
        dispatch({
            type: "DELETE",
            id: item.id
        });
    };

    const handleMoveUp = () => {
        dispatch({
            type: "MOVE_UP",
            id: item.id
        });
    };

    const handleMoveDown = () => {
        dispatch({
            type: "MOVE_DOWN",
            id: item.id
        });
    };

    const handleAddBelow = () => {
        dispatch({
            type: "ADD_BELOW",
            id: item.id
        });
    };

    return (
        <li>

            {item.text.trim().length > 0 && (
                <>
                    <button
                        className={styles.rm}
                        onClick={handleAddBelow}
                    >
                        ➕
                    </button>

                    {index !== 0 && totalItems > 1 ? (
                        <button onClick={handleMoveUp}>
                            ⬆️
                        </button>
                    ) : (
                        <button>
                            ⏹️
                        </button>
                    )}

                    {index !== totalItems - 1 && totalItems > 1 ? (
                        <button onClick={handleMoveDown}>
                            ⬇️
                        </button>
                    ) : (
                        <button>
                            ⏹️
                        </button>
                    )}
                </>
            )}

            {item.done ? (

                <span className={`${styles.itemWidth} ${styles.itemCompete}`} >
                    {item.text}
                </span>

            ) : (

                <input
                    className={`${styles.itemWidth} ${styles.textInput}`}
                    type="text"
                    value={item.text}
                    onChange={handleChange}
                    placeholder="Enter new item..."
                />

            )}

            {item.text.trim().length > 0 && (
                <button onClick={handleDone}>
                    {item.done ? "↩️" : "✅"}
                </button>
            )}

            <button
                className={styles.lm}
                onClick={handleDelete}
            >
                ❌
            </button>

        </li>
    );
};

export default TodoItem;