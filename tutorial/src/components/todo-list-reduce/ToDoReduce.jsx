import { useReducer } from "react";
import styles from "../../styles/ToDo.module.css";

const reducer = (items, action) => {
    switch (action.type) {

        case "CHANGE":
            return items.map(item =>
                item.id === action.id
                    ? { ...item, text: action.text }
                    : item
            );

        case "ADD":
            return [
                ...items.filter(item => item.text.trim().length > 0),
                {
                    id: Date.now(),
                    text: "",
                    done: false,
                }
            ];

        case "TOGGLE_DONE":
            return items.map(item =>
                item.id === action.id
                    ? { ...item, done: !item.done }
                    : item
            );

        case "DELETE":
            return items.filter(item => item.id !== action.id);

        case "MOVE_UP": {
            const index = items.findIndex(item => item.id === action.id);

            if (index <= 0) {
                return items;
            }

            const newItems = [...items];

            [newItems[index], newItems[index - 1]] =
                [newItems[index - 1], newItems[index]];

            return newItems;
        }

        case "MOVE_DOWN": {
            const index = items.findIndex(item => item.id === action.id);

            if (index === -1 || index === items.length - 1) {
                return items;
            }

            const newItems = [...items];

            [newItems[index], newItems[index + 1]] =
                [newItems[index + 1], newItems[index]];

            return newItems;
        }

        case "ADD_BELOW": {
            const index = items.findIndex(item => item.id === action.id);

            if (index === -1) {
                return items;
            }

            const newItem = {
                id: Date.now(),
                text: "",
                done: false,
            };

            const newItems = items.filter(
                item => item.text.trim().length > 0
            );

            newItems.splice(index + 1, 0, newItem);

            return newItems;
        }

        default:
            return items;
    }
};

export const ToDoReduceList = () => {
    const [items, dispatch] = useReducer(reducer, []);

    const handleChange = (event, id) => {
        dispatch({
            type: "CHANGE",
            id: id,
            text: event.target.value
        });
    };

    const addItem = () => {
        dispatch({
            type: "ADD"
        });
    };

    const handDone = (id) => {
        dispatch({
            type: "TOGGLE_DONE",
            id: id
        });
    };

    const handDelete = (id) => {
        dispatch({
            type: "DELETE",
            id: id
        });
    };

    const moveUp = (id) => {
        dispatch({
            type: "MOVE_UP",
            id: id
        });
    };

    const moveDown = (id) => {
        dispatch({
            type: "MOVE_DOWN",
            id: id
        });
    };

    const addItemBelow = (id) => {
        dispatch({
            type: "ADD_BELOW",
            id: id
        });
    };

    return (
        <div className={styles.componentContainor}>
            <h3>TODO with reducer</h3>

            <ul>
                {items.map((item, index) => {
                    return (
                        <li key={item.id}>

                            {item.text.trim().length > 0
                                ?
                                <>
                                    <button
                                        className={styles.rm}
                                        onClick={() => addItemBelow(item.id)}
                                    >
                                        ➕
                                    </button>

                                    {index !== 0 && items.length > 1
                                        ?
                                        <button onClick={() => moveUp(item.id)}>
                                            ⬆️
                                        </button>
                                        :
                                        <button>⏹️</button>
                                    }

                                    {index !== items.length - 1 && items.length > 1
                                        ?
                                        <button onClick={() => moveDown(item.id)}>
                                            ⬇️
                                        </button>
                                        :
                                        <button>⏹️</button>
                                    }
                                </>
                                :
                                <></>
                            }

                            {item.done
                                ?
                                <span
                                    style={{
                                        color: "grey",
                                        textDecoration: "line-through"
                                    }}
                                >
                                    {item.text}
                                </span>
                                :
                                <input
                                    className={
                                        item.text.trim().length === 0
                                            ? styles.borderBlue
                                            : ""
                                    }
                                    type="text"
                                    onChange={(event) =>
                                        handleChange(event, item.id)
                                    }
                                    value={item.text}
                                />
                            }

                            {item.text.trim().length > 0 &&
                                <button
                                    className={item.done ? styles.lm : undefined}
                                    onClick={() => handDone(item.id)}
                                >
                                    {item.done ? "↩️" : "✅"}
                                </button>
                            }

                            <button
                                className={styles.lm}
                                onClick={() => handDelete(item.id)}
                            >
                                ❌
                            </button>

                        </li>
                    );
                })}

                <li>
                    {
                        items.filter(
                            item => item.text.trim().length === 0
                        ).length === 0 &&
                        <button onClick={addItem}>
                            ➕ new list item
                        </button>
                    }
                </li>

            </ul>
        </div>
    );
};