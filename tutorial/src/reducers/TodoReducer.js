const todoReducer = (items, action) => {

    switch (action.type) {
        case "ADD": {
            const newItem = {
                id: Date.now(),
                text: "",
                done: false
            };

            return [
                ...items.filter(item => item.text.trim().length > 0)
                
            ];
        }

        case "CHANGE":
            return items.map(item =>
                item.id === action.id
                    ? {
                        ...item,
                        text: action.text
                    }
                    : item
            );

        case "TOGGLE_DONE":
            return items.map(item =>
                item.id === action.id
                    ? {
                        ...item,
                        done: !item.done
                    }
                    : item
            );

        case "DELETE":
            return items.filter(
                item => item.id !== action.id
            );

        case "MOVE_UP": {
            const index = items.findIndex(
                item => item.id === action.id
            );

            // Already at the top
            if (index <= 0) {
                return items;
            }

            const newItems = [...items];

            [
                newItems[index],
                newItems[index - 1]
            ] = [
                newItems[index - 1],
                newItems[index]
            ];

            return newItems;
        }

        case "MOVE_DOWN": {
            const index = items.findIndex(
                item => item.id === action.id
            );

            // ID not found or already at bottom
            if (
                index === -1 ||
                index === items.length - 1
            ) {
                return items;
            }

            const newItems = [...items];

            [
                newItems[index],
                newItems[index + 1]
            ] = [
                newItems[index + 1],
                newItems[index]
            ];

            return newItems;
        }

        case "ADD_BELOW": {
            const index = items.findIndex(
                item => item.id === action.id
            );

            // ID wasn't found
            if (index === -1) {
                return items;
            }

            const newItem = {
                id: Date.now(),
                text: "",
                done: false
            };

            const newItems = items.filter(
                item => item.text.trim().length > 0
            );

            newItems.splice(index + 1, 0, newItem);

            return newItems;
        }

        case "REPLACE": {
            return action.items;
        }

        default:
            return items;
    }
};

export default todoReducer;