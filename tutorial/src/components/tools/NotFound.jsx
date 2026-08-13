import { Link } from "react-router-dom"

export const PageNotFound = () => {
    return(
        <div>
            <h1>❌ PAGE NOT FOUND ❌</h1>
            <Link to={"/"}>GO HOME!</Link>
        </div>
    )
}