import { useState } from "react";
import styles from "../../styles/ToDo.module.css"
import { ToDoSubList } from "./ToDoShareStateChild";
export const ToDoListShareState = () => {
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
        <div>
            <h3>TODO  shared state between components</h3>
            <ToDoSubList
                items={items} 
                isActiveList={true}
                onTextChange={handleChange} 
                onAddItem={addItem} 
                onDone={handDone} 
                onDelete={handDelete} 
                onAddItemBelow ={addItemBelow} 
                onMoveUp ={moveUp} 
                onMoveDown={moveDown} ></ToDoSubList>
            <ToDoSubList
                items={items} 
                isActiveList={false}
                onTextChange={handleChange} 
                onAddItem={addItem} 
                onDone={handDone} 
                onDelete={handDelete} 
                onAddItemBelow ={addItemBelow} 
                onMoveUp ={moveUp} 
                onMoveDown={moveDown} ></ToDoSubList>
        </div>
    )

}