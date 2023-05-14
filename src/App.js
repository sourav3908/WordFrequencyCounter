import React, { useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {
  const [histogramData, setHistogramData] = useState([]);

  const handleFetchData = async () => {
    const response = await axios.get('https://www.terriblytinytales.com/test.txt');
    const content = response.data;
    const words = content.split(/\s+/);
    const wordFrequencies = {};
    words.forEach((word) => {
      if (word in wordFrequencies) {
        wordFrequencies[word] += 1;
      } else {
        wordFrequencies[word] = 1;
      }
    });
    const sortedWordFrequencies = Object.entries(wordFrequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    setHistogramData(sortedWordFrequencies);
  };

  const handleExportData = () => {
    const csvData = histogramData.map((d) => `${d[0]},${d[1]}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'histogram_data.csv');
  };

  const svgRef = React.useRef(null);

  React.useEffect(() => {
    if (histogramData.length > 0) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(histogramData.map((d) => d[0]));

      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(histogramData, (d) => d[1])]);

      const svg = d3.select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

      svg.selectAll('.bar')
        .data(histogramData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d[1]));
    }
  }, [histogramData]);

  // Function to render table rows
  const renderTableRows = () => {
    return histogramData.map((data, index) => (
      <tr key={index}>
        <td>{data[0]}</td>
        <td>{data[1]}</td>
      </tr>
    ));
  };

  return (
    <div className="app-container">
      <h1>Word Frequency Counter</h1>
      <button className="fetch-button" onClick={handleFetchData}>Fetch Data</button>
      {histogramData.length > 0 && (
        <div>
          <svg ref={svgRef} className="chart-svg" />
          <br></br>
          <button className="export-button" onClick={handleExportData}>Export Data</button>
          {/* Add table */}
          <table className="data-table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;