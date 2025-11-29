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
                <option value="ngn">NGN</option>
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
                <option value="ngn">NGN</option>
                <option value="jpy">JPY</option>
            </select>
        </label>
    );
}

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const handleInputAmount = amt => setAmount(Number(amt));
    const handleFromCurrency = curr => setFrom(curr);
    const handleToCurrency = curr => setTo(curr);

    // Setting a Base Currency (USD) is essential for a scalable conversion model.
    const BASE_CURRENCY = "USD";

    // EXCHANGE_RATES_TO_BASE: Defines how many units of a local currency equal 1 unit of the BASE_CURRENCY (USD).
    const EXCHANGE_RATES_TO_BASE = {
        USD: 1.0,
        EUR: 0.883,
        NGN: 1443.6,
        JPY: 156.3
    };
    
    const handleConvert = (amt, fromCur, toCur) => {
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
        };

    return (
        <>
            <AmountInput amount={amount} handleEvent={handleInputAmount} />
            <section className="convert">
                <FromCurrency
                    fromCurr={from}
                    handleEvent={handleFromCurrency}
                />
                <ToCurrency toCurr={to} handleEvent={handleToCurrency} />
                <p>{handleConvert(amount, from, to)}</p>
            </section>
        </>
    );
}

export default App;
