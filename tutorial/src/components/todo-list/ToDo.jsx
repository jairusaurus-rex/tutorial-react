import { useState } from "react";
import styles from "../../styles/ToDo.module.css"
export const ToDoList = () => {
    const [items, setItems] = useState([]);

    const handleChange = (event, id) => {
        setItems((currentItems) => {
            const index = currentItems.findIndex(item => item.id === id);

            if (index < 0) {
                return currentItems;
            }
            const newItems = [...currentItems];

            newItems[index].text = event.target.value;
            return newItems;
        });
    };

    const addItem = () => {
        const newItem = {
            id: Date.now(),
            text: "",
            done: false,
        }
        setItems((currentItems) => {
            const filterItems = currentItems.filter((item) => { return item.text.trim().length > 0 });
            const newItems = [...filterItems, newItem];
            return newItems;
        })
    }

    const handDone = (id) => { setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item)); };
    const handDelete = (id) => { setItems(items.filter(item => item.id !== id)); };


    const moveUp = (id) => {
        setItems((currentItems) => {
            const index = currentItems.findIndex(item => item.id === id);

            // Already at the top
            if (index <= 0) {
                return currentItems;
            }

            const newItems = [...currentItems];

            // Swap with the item above it
            [newItems[index], newItems[index - 1]] =
                [newItems[index - 1], newItems[index]];

            return newItems;
        });
    };

    const moveDown = (id) => {
        setItems((currentItems) => {
            const index = currentItems.findIndex(item => item.id === id);

            // Already at the bottom
            if (index === currentItems.length - 1) {
                return currentItems;
            }

            const newItems = [...currentItems];

            // Swap with the item below it
            [newItems[index], newItems[index + 1]] =
                [newItems[index + 1], newItems[index]];

            return newItems;
        });
    };
    const addItemBelow = (id) => {
        setItems((currentItems) => {
            const index = currentItems.findIndex(item => item.id === id);

            // ID wasn't found
            if (index === -1) {
                return currentItems;
            }

            const newItem = {
                id: Date.now(),
                text: "",
                done: false,
            };

            const newItems = currentItems.filter((item) => { return item.text.trim().length > 0 });


            // Insert after the item we found
            newItems.splice(index + 1, 0, newItem);

            return newItems;
        });
    };

    return (
        <div className={styles.componentContainor}>
            <h3>TODO with state</h3>
            <ul>
                {items.map((item, index) => {
                    return (
                        <li key={item.id}>
                            {item.text.trim().length > 0
                                ?
                                <>
                                    <button className={styles.rm} onClick={() => addItemBelow(item.id)}>➕</button>
                                    {index != 0 && items.length > 1
                                        ? <button onClick={() => moveUp(item.id)}> ⬆️ </button>
                                        : <button > ⏹️ </button>
                                    }
                                    {index != items.length - 1 && items.length > 1
                                        ? <button onClick={() => moveDown(item.id)}> ⬇️ </button>
                                        : <button> ⏹️ </button>
                                    }
                                </>
                                :<></>}

                            {
                                item.done
                                    ? <span style={{
                                        color: item.done ? "grey" : "white",
                                        textDecoration: item.done ? "line-through" : "none"
                                    }}>
                                        {item.text}
                                    </span>

                                    : <input className={item.text.trim().length == 0 ?  styles.borderBlue: ""} type="text" onChange={(event) => handleChange(event, item.id)} value={item.text} />

                            }

                            {item.text.trim().length > 0 &&
                                <button className={item.done && styles.lm} onClick={() => handDone(item.id)}> {item.done ? "↩️" : "✅"} </button>}

                            <button className={styles.lm} onClick={() => handDelete(item.id)}> ❌ </button>
                        </li>);
                })
                }
                <li>
                    {
                        items.filter((item) => {return item.text.trim().length == 0}).length == 0 &&
                        <button onClick={addItem}>➕ new list item </button>
                    }
                </li>

            </ul>
        </div>
    )

}