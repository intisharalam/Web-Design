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
import styles from '@/styles/linechart.module.scss';

class Chart extends PureComponent {
  render() {
    const { chartData } = this.props;

    return (
      <div className={styles.chart_container}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#000000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
