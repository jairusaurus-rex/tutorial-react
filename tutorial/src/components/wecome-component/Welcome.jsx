import styles from "../../styles/Welcome.module.css"
import { useState } from "react"

export const Welcome = (child) => {
  return (
    <h1> {child.children} </h1>
  )
}



export const UserProfileButton = ({name, isAdmin = false, onClick}) => {
  return (
    <button title={`see ${name}'s profile page`} onClick={onClick}>{isAdmin ? "delete admin rights" : "make an Admin" }</button>
  )
}

export const DisplayUserName = ({name, isAdmin = false}) => {
  const [isAdminState, setIsAdmin] = useState( isAdmin);

  let adminClass =  isAdminState ? "isAdmin" : "notAdmin";
  
  const testfun = () => {
    setIsAdmin( !isAdminState);
  }
  return (
    <div>
      <h2 className={`${styles.myHeader} ${styles[adminClass]}`}>{name} {isAdminState && "👑"}</h2>
      <UserProfileButton name={name} onClick={testfun} isAdmin={isAdminState} />
    </div>
  )
}

export const MyButton = () => {
  return (
    <button>Click me</button>
  )
}