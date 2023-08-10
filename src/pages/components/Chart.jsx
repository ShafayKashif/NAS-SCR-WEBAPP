import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import GreenBorderCase from './GreenBorderCase';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
    const data = props.data;

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "Number of Swaps Chart"
        },
        axisX: {
            title: "Months",
            titleFontSize: 14
        },
        axisY: {
            title: "Number of Swaps",
            titleFontSize: 14,
            includeZero: true
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { label: "Jan", y: data[0] },
                { label: "Feb", y: data[1] },
                { label: "Mar", y: data[2] },
                { label: "Apr", y: data[3] },
                { label: "May", y: data[4] },
                { label: "Jun", y: data[5] },
                { label: "Jul", y: data[6] },
                { label: "Aug", y: data[7] },
                { label: "Sep", y: data[8] },
                { label: "Oct", y: data[9] },
                { label: "Nov", y: data[10] },
                { label: "Dec", y: data[11] }
            ]
        }]
    };

    return (
        <div
        style={{
            width: 400,
            border: '7px solid #58AA42', // Colored outline
            borderRadius: '10px', // Border radius
            padding: '10px', // Add padding for spacing
        }}
    >
        <CanvasJSChart options={options} />
    </div>
    );
};

export default Chart;
