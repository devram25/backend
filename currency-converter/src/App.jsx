import React from "react";
import { useState } from "react";
import { useCurrencyInfo } from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

const App = () => {
	const [ammount, setAmmount] = useState(0)
	const [from, setFrom] = useState("usd")
	const [to, setTo] = useState("inr")
	const [convertedAmmount, setConvertedAmmount] = useState(0)

	const currencyInfro = useCurrencyInfo(from)
	// const options = Object.keys(currencyInfro)
	// console.log(options)
 console.log(currencyInfro)
    const Swap =()=>{
		setFrom(to)
		setTo(from)
		setConvertedAmmount(ammount)
		setAmmount(convertedAmmount)
	}
	
	const Convert =()=>{
		setConvertedAmmount(ammount * currencyInfro[to])
	}
	return (
		<div className="w-full" >
          <form onSubmit={(e)=>{e.preventDefault()}}>
			<InputBox />
		  </form>
		</div>
	);
};

export default App;
