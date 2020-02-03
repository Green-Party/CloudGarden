/**
 * Creation Date: January 30, 2020
 * Author: Gillian Pierce
 * A placeholder SVG graph icon for the history graph button
 */
import React from "react";
interface ChartProps {
  width: number | string;
  height: number | string;
  color: string;
}
export default ({ width, height, color }: ChartProps) => (
  <svg width={width} height={height} viewBox="0 0 351 328" version="1.1">
    <g id="Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Artboard" transform="translate(-28.000000, -24.000000)">
        <g id="Group" transform="translate(34.000000, 30.000000)">
          <path
            d="M38.5,227.5 L105.5,143.5 M159.5,185.5 L105.5,143.5 M159.5,185.5 L194.5,107.5 M227.5,218.5 L194.5,107.5 M227.5,218.5 L293.5,64.5"
            id="Combined-Shape"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M38.5,214 C46.5081289,214 53,220.491871 53,228.5 C53,236.508129 46.5081289,243 38.5,243 C30.4918711,243 24,236.508129 24,228.5 C24,220.491871 30.4918711,214 38.5,214 Z M228.5,198 C236.508129,198 243,204.491871 243,212.5 C243,220.508129 236.508129,227 228.5,227 C220.491871,227 214,220.508129 214,212.5 C214,204.491871 220.491871,198 228.5,198 Z M158.5,169 C166.508129,169 173,175.491871 173,183.5 C173,191.508129 166.508129,198 158.5,198 C150.491871,198 144,191.508129 144,183.5 C144,175.491871 150.491871,169 158.5,169 Z M106.5,136 C114.508129,136 121,142.491871 121,150.5 C121,158.508129 114.508129,165 106.5,165 C98.4918711,165 92,158.508129 92,150.5 C92,142.491871 98.4918711,136 106.5,136 Z M193.5,97 C201.508129,97 208,103.491871 208,111.5 C208,119.508129 201.508129,126 193.5,126 C185.491871,126 179,119.508129 179,111.5 C179,103.491871 185.491871,97 193.5,97 Z M294.5,49 C302.508129,49 309,55.4918711 309,63.5 C309,71.5081289 302.508129,78 294.5,78 C286.491871,78 280,71.5081289 280,63.5 C280,55.4918711 286.491871,49 294.5,49 Z"
            id="Shape"
            fill={color}
          ></path>
          <path
            d="M0.5,0.5 L0.5,315.5 M338.5,315.5 L0.5,315.5"
            id="Combined-Shape"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);
