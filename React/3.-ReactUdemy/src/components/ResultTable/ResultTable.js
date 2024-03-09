import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

function ResultTable(props){

    return(
        <table className="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(function(event){
                        return(
                            <tr key={event.year}>
                                <td>{event.year}</td>
                                <td>{formatter.format(event.savingsEndOfYear)}</td>
                                <td>{formatter.format(event.yearlyInterest)}</td>
                                <td>{formatter.format(event.savingsEndOfYear - props.initialInvestment - event.yearlyContribution * event.year)}</td>
                                <td>{formatter.format(props.initialInvestment + event.yearlyContribution * event.year)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
};

export default ResultTable;