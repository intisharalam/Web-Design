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
import styles from '../styles/barchart.module.scss';

interface ChartProps {
  chartData: { year: string; assets: number; liabilities: number; }[];
}

class Chart extends PureComponent<ChartProps> {
  // Function to format the Y-axis ticks
  formatYAxis = (value: any, index: number) => {
    const tickItem = Number(value); // Convert value to number if needed
    if (tickItem >= 1000000000) {
      return (tickItem / 1000000000).toFixed(1) + 'B';
    } else if (tickItem >= 1000000) {
      return (tickItem / 1000000).toFixed(1) + 'M';
    } else if (tickItem >= 1000) {
      return (tickItem / 1000).toFixed(1) + 'k';
    } else {
      return String(tickItem); // Ensure to return a string
    }
  };
  

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
            <YAxis tickFormatter={this.formatYAxis} />
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
