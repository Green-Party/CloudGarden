/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A template component that displays passed in time series data as a line graph
 * Adapted from https://observablehq.com/@d3/line-chart by Mike Bostock
 */

import { select } from "d3-selection";
import { scaleLinear, scaleTime } from "d3-scale";
import { line } from "d3-shape";
import { min, max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import "../Dashboard.css";
import React from "react";

interface DataPoint {
  date: Date;
  value: number;
}

interface Props {
  data: DataPoint[];
  width: number;
  height: number;
}

export default class HistoryChart extends React.Component<Props> {
  private svgRef?: SVGSVGElement | null;

  public componentDidMount() {
    this.drawChart(this.props.data);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.data !== this.props.data) {
      this.drawChart(nextProps.data);
    }
  }

  private drawChart(data: DataPoint[]) {
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    // set the ranges for both axises
    const x = scaleTime().range([0, width]);
    const y = scaleLinear().range([height, 0]);

    // define how to connect data points together with lines
    const valueline = line<DataPoint>()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.value);
      });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = select(this.svgRef!)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //get dates and values from data
    const dates = data.map(d => d.date);
    const values = data.map(d => d.value);
    // Scale the range of the graph to fit the data
    x.domain([min(dates) as Date, max(dates) as Date]);
    y.domain([0, max(values) as number]);

    // Add the valueline path between data points
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the X Axis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    // add a label to the X axis
    svg
      .append("text")
      .attr("transform", "translate(" + width / 2 + " ," + (height + 40) + ")")
      .attr("class", "label")
      .style("text-anchor", "middle")
      .text("Date");

    // Add the Y Axis
    svg
      .append("g")
      .attr("class", "axis")
      .call(axisLeft(y));

    // Add a label for the Y Axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("class", "label")
      .style("text-anchor", "middle")
      .text("Value");
  }

  public render() {
    const { width, height } = this.props;

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        ref={ref => (this.svgRef = ref)}
      />
    );
  }
}
