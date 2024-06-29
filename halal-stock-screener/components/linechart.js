import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from '../styles/linechart.module.scss';

interface ChartProps {
  chartData: { time: string; price: number }[];
}

class Chart extends PureComponent<ChartProps> {
  render() {
    const { chartData } = this.props;

    // Ensure the data is sorted by time in ascending order
    const sortedData = chartData.slice().sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    return (
      <div className={styles.chart_container}>
        <ResponsiveContainer>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#000000" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
