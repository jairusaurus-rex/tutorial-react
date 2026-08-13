import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => response.json())
            .then((data) => {
                console.log('data>', data)
                if (data) {
                    setUsers(data)
                }

            })
            .catch((error) => console.error("Error fetching todos:", error))
    }, []);
    return (<>
        {users.length == 0 ?
            <div>
                <p>loading....</p>
                <Link to="/">return home</Link>
            </div>
            :
            <div>
                <h3>Users:</h3>
                {
                    users.map((user) => (
                        <div key={user.id}>
                            <Link to={`/todo/${user.id}`}>
                                {user.name}
                            </Link>

                        </div>
                    )
                    )}
            </div>


        }
    </>)
}