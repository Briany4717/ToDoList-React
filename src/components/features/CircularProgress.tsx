import React from "react";

type CircularProgressProps = {
  progress?: number;
  strokeWidth?: number;
  bgColor?: string;
  progressColor?: string;
  width?: string;
  height?: string;
};

export const CircularProgress = ({ progress = 0, strokeWidth = 10, bgColor = '#DFDFDFFF', progressColor = '#0099FFFF', width = '100%', height = '100%'}: CircularProgressProps) => {
  
  const viewBoxSize = 100;
  const center = viewBoxSize / 2;
  const radius = center - strokeWidth / 2;

  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
    return (
    <div style={{ width, height, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        className="progress-ring"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <g transform={`rotate(-90 ${center} ${center})`}>
          <circle
            style={{ fill: 'transparent', stroke: bgColor }}
            strokeWidth={strokeWidth}
            r={radius}
            cx={center}
            cy={center}
          />
          <circle
            style={{ fill: 'transparent', stroke: progressColor, transition: 'stroke-dashoffset 0.35s' }}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={radius}
            cx={center}
            cy={center}
          />
                </g>
                <text
                    x="50%"
                    y="48%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontSize: '30', fill: progressColor, fontWeight: 'lighter' }}
                >
                    {`${Math.round(progress)}%`}
                </text>
      </svg>
    </div>
  );
}