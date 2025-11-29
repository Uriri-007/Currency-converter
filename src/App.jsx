import { useState, useMemo } from "react";
import "./App.css";

function AmountInput(props) {
    return (
        <section className="intro">
            <h1>Currency Converter</h1>
            <p>
                Input an amount and select the <strong>from</strong> currency
                and the <strong>to</strong> currency.
            </p>
            <input
                type="tel"
                value={props.amount}
                onChange={e => props.handleEvent(e.target.value)}
            />
        </section>
    );
}

function FromCurrency(props) {
    return (
        <label>
            <select onChange={e => props.handleEvent(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="jpy">JPY</option>
            </select>
        </label>
    );
}

function ToCurrency(props) {
    return (
        <label>
            <select onChange={e => props.handleEvent(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="jpy">JPY</option>
            </select>
        </label>
    );
}

function App() {
    const [amount, setAmount] = useState(0);
    // Setting a Base Currency (USD) is essential for a scalable conversion model.
    const BASE_CURRENCY = "USD";

    const [from, setFrom] = useState(BASE_CURRENCY);
    const [to, setTo] = useState(BASE_CURRENCY);

    const handleInputAmount = amt => setAmount(Number(amt));
    const handleFromCurrency = curr => setFrom(curr);
    const handleToCurrency = curr => setTo(curr);


    // EXCHANGE_RATES_TO_BASE: Defines how many units of a local currency equal 1 unit of the BASE_CURRENCY (USD).
    const EXCHANGE_RATES_TO_BASE = {
        USD: 1.0,
        EUR: 0.883,
        GBP: 0.757,
        JPY: 156.3
    };
    
    const handleConvert = useMemo(() => {
        const amt = amount
        const fromCur = from
        const toCur = to

            // 1. Check for immediate conversion
            if (fromCur === toCur) {
                return amt.toFixed(2);
            }
            const fromRate = EXCHANGE_RATES_TO_BASE[fromCur.toUpperCase()];
            const toRate = EXCHANGE_RATES_TO_BASE[toCur.toUpperCase()];
            // 2. Validate currency codes
            if (!fromRate || !toRate) {
                return "Invalid currency";
            }
            // 3. Conversion Logic (From -> Base -> To)
            const amountInBase = amt / fromRate;
            const convertedAmount = amountInBase * toRate;
            return convertedAmount.toFixed(2);
        }, [amount, from, to]);

    return (
        <>
            <AmountInput amount={amount} handleEvent={handleInputAmount} />
            <section className="convert">
                <FromCurrency
                    fromCurr={from}
                    handleEvent={handleFromCurrency}
                />
                <ToCurrency toCurr={to} handleEvent={handleToCurrency} />
                <p>{`${amount}${from.toUpperCase()} = ${handleConvert}${to.toUpperCase()}`}</p>
            </section>
        </>
    );
}

export default App;
