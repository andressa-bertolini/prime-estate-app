import { useState } from "react";
import { ChangeEvent } from "react";
import { TextField } from '@mui/material';
import styles from './calculator.module.css';

const Calculator = () => {
    const [income, setIncome] = useState("");
    const [entry, setEntry] = useState("");
    const [property, setProperty] = useState("");
    const [requiredIncome, setRequiredIncome] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [purchasingPower, setPurchasingPower] = useState("");

    const calculatePurchasingPower = () => {
        const incomeValue = Number(income.replace(/,/g, "")) || 0;
        const entryValue = Number(entry.replace(/,/g, "")) || 0;

        if (income === "" || entry === "" || incomeValue === 0) {
            setPurchasingPower("");
            return;
        }

        const maximumInstallment = incomeValue * 0.30; // 30% da renda
        const interestRate = 12; // 12% ao ano
        const months = 360; // 30 anos

        const monthlyRate = interestRate / 100 / 12;
        const denominator = 1 - Math.pow(1 + monthlyRate, -months);

        if (denominator === 0) {
            setPurchasingPower("Error in calculation");
            return;
        }

        const loanAmount = (maximumInstallment / monthlyRate) * denominator;
        const result = loanAmount + entryValue;

        setPurchasingPower(formatCurrency(result));
    };

    const calculatePropertyConditions = () => {
        const propertyValue = Number(property.replace(/,/g, "")) || 0;

        if (propertyValue === 0) {
            setDownPayment("");
            setRequiredIncome("");
            return;
        }
    
        // 20% de entrada
        const downPayment = propertyValue * 0.20;
        
        const loanAmount = propertyValue - downPayment;
    
        const interestRate = 12; // 12% ao ano
        const months = 360; // 30 anos
        const monthlyRate = interestRate / 100 / 12;
    
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                               (Math.pow(1 + monthlyRate, months) - 1);
    
        const requiredIncome = monthlyPayment / 0.30;
    
        setDownPayment(formatCurrency(downPayment));
        setRequiredIncome(formatCurrency(requiredIncome));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value);
    };

    const handleIncome = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        setIncome(numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    const handleEntry = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        setEntry(numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    const handleProperty = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        setProperty(numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    return (
        <>
            <div className="container">
                <h1>Calculator</h1>
            </div>
            <div className={styles.calculatorGrid}>
                <div className={styles.calculatorContainer}>
                    <div className={styles.calculator}>
                        <h1>Purchasing Power</h1>
                        <p>Use our calculator to estimate your budget and start your search for the perfect home</p>
                        <TextField
                            className="customInput"
                            label="Income ($)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            onChange={handleIncome}
                            value={income}
                        />

                        <TextField
                            className="customInput"
                            label="Entry ($)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            onChange={handleEntry}
                            value={entry}
                        />
                        <button onClick={calculatePurchasingPower} className="button">
                            Calculate
                        </button>
                        <div className={styles.calculatorResult}>
                            {purchasingPower && (
                            <>
                                <p className="calculator-result__title">Your purchasing power is</p>
                                <p className="calculator-result__value">{purchasingPower}</p>
                            </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.calculatorContainer}>
                    <div className={styles.calculator}>
                        <h1>Property Value</h1>
                        <p>Found a home you love? Enter the property's price to calculate your estimated down payment</p>
                        <label>
                            <TextField
                                className="customInput"
                                label="Property's Price ($)"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text"
                                onChange={handleProperty}
                                value={property}
                            />
                            <button className="button" onClick={calculatePropertyConditions}>Calculate</button>
                            <div className="calculator-result-value">
                                {downPayment && requiredIncome && (
                                <>
                                    <p className="calculator-result__title">Your income needs to be</p>
                                    <p className="calculator-result__value">{requiredIncome}</p>
                                    <p className="calculator-result__title">Your down payment needs to be</p>
                                    <p className="calculator-result__value">{downPayment}</p>
                                </>
                                )}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calculator;