import React from 'react'

const InputBox = ({
    label,
    amount,
    onAmountChnage,
    onCurrencyChnage,
    currencyOptions = [],
    selectedCurrency = "usd",
    amoutDisabled = false,
    currencyDisabled=false,
    className = ""
}) => {
  return (
    <div className={`${className} bg-white p-3 rounded-lg text-sm flex `} >
        <div className='w-1-2' >
            <label htmlFor="" className='text-black/40 mb-2 inline-block'>{label}</label>
            <input type="number" className='outline-none w-full bg-transparent p-1.5' 
             placeholder='Amount'
             value={amount}
             disabled={amoutDisabled}
             onChange={(e)=>onAmountChnage && onAmountChnage(Number(e.target.value))}
            />
        </div>
        <div className='w-1/2 flex flex-wrap justify-end text-right' >
           <p className='text-black/40 mb-2 w-full' >
             Currency Type
           </p>
           <select  className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none' 
           value={selectedCurrency}
           onChange={(e)=> onCurrencyChnage && onCurrencyChnage(e.target.value)}
           disabled={currencyDisabled}
           >
            {
                currencyOptions.map((currency)=>(
                    <option key={currency} value={currency} >
                         {currency}
                    </option>
                ))
            }
           </select>
        </div>

    </div>
  )
}

export default InputBox