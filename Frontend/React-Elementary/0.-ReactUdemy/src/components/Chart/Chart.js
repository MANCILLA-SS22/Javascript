import React from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";

function Chart(props){

    const dataPointValues = props.dataPoints.map(event => event.value);  //console.log(dataPointValues);
    const totalMaximum = Math.max(...dataPointValues);                   //console.log(totalMaximum);
    const res = props.dataPoints.map(event => <ChartBar key={event.label} value={event.value} label={event.label} maxValue={totalMaximum}/>);

    return(
        <div className="chart">
            {res}
        </div>
    )
}

export default Chart;
