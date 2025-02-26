'use client';
import { createDonation } from "@/actions/donationActions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function DonationForm(){

    const [numberInValue, setNumberInValue] = useState('');
    const [amount, setAmount] = useState(1);
    const [crypto, setCrypto] = useState('eth')

    useEffect(() => {
        if(numberInValue){
            const intValue = parseInt(numberInValue);
            if(intValue > 5 && intValue <= 1000){
                setAmount(intValue);
            }else if(intValue == 1 || intValue == 3 || intValue == 5){
                setAmount(intValue)
            }
            else{
                setAmount(1)
            }
        }
    }, [numberInValue]);

    const handleFormSubmit = async (formData:FormData) => {
        formData.set('amount', amount.toString());
        formData.set('crypto', crypto);
        const url = await createDonation(formData);
        if(window && window.location){
            window.location.href = url;
        }
    }

    return(
        <div>
            <form action={handleFormSubmit}>
                <div className="border border-yellow-300 rounded-xl p-4 flex items-center gap-2 bg-yellow-300/10">
                    <FontAwesomeIcon icon={faCoffee}/>
                    <span>x</span>
                    <button type="button" className={"amount " + (amount === 1 ? 'active' : "")} onClick={() => {setAmount(1); setNumberInValue('1')}}>1</button>
                    <button type="button" className={"amount " + (amount === 3 ? 'active' : "")} onClick={() => {setAmount(3); setNumberInValue('3')}}>3</button>
                    <button type="button" className={"amount " + (amount === 5 ? 'active' : "")} onClick={() => {setAmount(5); setNumberInValue('5')}}>5</button>
                    <input type="number" placeholder="10" value={numberInValue} className="pl-3 w-12 h-12 border border-black rounded-full text-center" onChange={(e) => setNumberInValue(e.target.value)}/>
                </div>
                <div className="mt-2">
                    <input type="text" placeholder="Your name" name="name"/>
                    <textarea placeholder="Say something nice" className="mt-2" name="message"></textarea>
                </div>
                <div className="mt-2">
                    <h3 className="text-xs uppercase mb-1 text-gray-500">Pay with select crypto or credit card</h3>
                    <div className="flex gap-1">
                        <button type="button" onClick={() => setCrypto('btc')} className={"crypto " + (crypto == 'btc' ? 'active' : '')}>
                            <span>BTC</span>
                            <p>Bitcoin</p>
                        </button>
                        <button type="button" onClick={() => setCrypto('eth')} className={"crypto " + (crypto == 'eth' ? 'active' : '')}>
                            <span>ETH</span>
                            <p>Ethereum</p>
                        </button>
                        <button type="button" onClick={() => setCrypto('ltc')} className={"crypto " + (crypto == 'ltc' ? 'active' : '')}>
                            <span>LTC</span>
                            <p>Litecoin</p>
                        </button>
                    </div>

                </div>
                <div className="mt-2">
                    <button className="bg-yellow-300 w-full rounded-xl py-2 font-semibold">Support ${amount * 5}</button>
                </div>
            </form>
        </div>
    )
}