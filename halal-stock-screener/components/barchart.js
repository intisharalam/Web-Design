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
import styles from '@/styles/barchart.module.scss';

class Chart extends PureComponent {
  render() {
    const { chartData } = this.props;

    return (
      <div className={styles.chart_container}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
              <Bar dataKey="assets" fill="#2e2f3e" />
              <Bar dataKey="liabilities" fill="#a7a9be" />
            </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
