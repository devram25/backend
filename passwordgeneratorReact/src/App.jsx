import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const copyRef = useRef(null)

  const GeneratePassword = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "0123456789"
    let char = "!@#$%^&*(_)+"
    if(numberAllowed) str += num
    if(character) str += char

    for(let i=0;i<length;i++){
      const char =  Math.floor( Math.random() * str.length +1 )
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,character])

  useEffect(()=>{
       GeneratePassword()
  },[length, numberAllowed, character,  ])

  const CopyPassword =()=>{
    window.navigator.clipboard.writeText(password)
    copyRef.current.select()
  }

  return (
    <div className="flex flex-col justify-center items-center" >
      <h1>Password Generator</h1>
      <div className="flex gap-2 items-center" >
      <input className="border rounded-full py-1 px-4 " value={password} readOnly type="text" />
      <button className="bg-violet-500 text-white py-1 px-4 rounded-full cursor-pointer" onClick={CopyPassword} >Copy</button>
      </div>
      <div className="flex text-sm items-center gap-x-1 " >
         <div>
           <input
           type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e)=>setLength(e.target.value)}
            className="cursor-pointer"
            ref={copyRef}
           />
           <label htmlFor="">Length: {length}</label>
         </div>
         <div>
           <input type="checkbox"
           defaultChecked={numberAllowed}
           onChange={()=> setNumberAllowed((prev)=>!prev)}
           />
            <label htmlFor="">Numbers</label>
         </div>
         <div>
           <input type="checkbox"
           defaultChecked={character}
           onChange={()=> setCharacter((prev)=>!prev)}
           />
            <label htmlFor="">Character</label>
         </div>
      </div>
    </div>
  )
}

export default App
