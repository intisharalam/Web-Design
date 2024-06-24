import styles from '@/styles/linechart.module.scss'
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { year: '2014', price: 4000},
  { year: '2015', price: 3000},
  { year: '2016', price: 2000},
  { year: '2017', price: 2780},
  { year: '2018', price: 1890},
  { year: '2019', price: 2390},
  { year: '2020', price: 4490},
  { year: '2021', price: 3090},
  { year: '2022', price: 2090},
  { year: '2023', price: 4090},
];

class Chart extends PureComponent {
  render() {
    return (
      <div className={styles.chart_container}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year"/>
            <YAxis/>
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#000000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
