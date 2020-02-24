/**
 * Creation Date: February 8, 2020
 * Author: Gillian Pierce
 * A template component that displays passed in time series data as a line graph
 * Adapted from https://observablehq.com/@d3/line-chart by Mike Bostock
 */

import { select } from "d3-selection";
import { scaleLinear, scaleTime, scaleBand } from "d3-scale";
import { min, max, range } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import "../Dashboard.css";
import React from "react";

interface DataPoint {
  letter: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  width: number;
  height: number;
}

export default class BarChart extends React.Component<Props> {
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
    let x = scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map(d => d.letter));

    let y = scaleLinear()
      .rangeRound([height, 0])
      .domain([0, max(data, (d: any) => d.value)]);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = select(this.svgRef!)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //get dates and values from data
    svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    svg
      .append("g")
      .attr("class", "axis axis--y")
      .call(axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => height - y(d.value));

    return svg.node();
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
