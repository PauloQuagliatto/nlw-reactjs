import { useState } from "react"

export const Button = () => {
  const [number, setNumber] = useState(0)

  const increment = () => {
    const newNumber = number + 1
    setNumber(newNumber)
  }

 return(
   <button onClick={increment}>{number}</button>
 ) 
}