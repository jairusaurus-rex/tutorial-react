import styles from "../../styles/ToDo.module.css"

export const ToDoSubList = ({items = [], isActiveList = true, onTextChange, onAddItem, onDone, onDelete, onAddItemBelow, onMoveUp, onMoveDown}) => {
    const subList = items.filter(item => {return item.done != isActiveList})
    return (
        <div className={styles.componentContainor}>
            
            <ul>
                {subList.map((item, index) => {
                    return (
                        <li key={item.id}>
                            {item.text.trim().length > 0
                                ?
                                <>
                                    <button className={styles.rm} onClick={() => onAddItemBelow(item.id)}>➕</button>
                                    {index != 0 && subList.length > 1
                                        ? <button onClick={() => onMoveUp(item.id)}> ⬆️ </button>
                                        : <button > ⏹️ </button>
                                    }
                                    {index != subList.length - 1 && subList.length > 1
                                        ? <button onClick={() => onMoveDown(item.id)}> ⬇️ </button>
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

                                    : <input className={item.text.trim().length == 0 ?  styles.borderBlue: ""} type="text" onChange={(event) => onTextChange(event, item.id)} value={item.text} />

                            }

                            {item.text.trim().length > 0 &&
                                <button className={item.done ? styles.lm : ""} onClick={() => onDone(item.id)}> {item.done ? "↩️" : "✅"} </button>}

                            <button className={styles.lm} onClick={() => onDelete(item.id)}> ❌ </button>
                        </li>);
                })
                }
                <li>
                    {
                        isActiveList && subList.filter((item) => {return item.text.trim().length == 0}).length == 0 &&
                        <button onClick={onAddItem}>➕ new list item </button>
                    }
                </li>

            </ul>
        </div>
    )

}