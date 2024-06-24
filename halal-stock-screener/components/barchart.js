import styles from '@/styles/barchart.module.scss';
import React, { PureComponent } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

const data = [
  { year: '2021', assets: 5500, liabilities: 1500 },
  { year: '2022', assets: 4800, liabilities: 1300 },
  { year: '2023', assets: 6000, liabilities: 1800 },
];

class Chart extends PureComponent {
  render() {
    return (
      <div className={styles.chart_container}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="assets" fill="#2e2f3e"/>
            <Bar dataKey="liabilities" fill="#a7a9be"/>
            </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
