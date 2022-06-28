import React from "react";
import {
  Pie,
  PieChart as Chart,
  ResponsiveContainer,
  Sector,
  Legend,
  Cell,
  Tooltip,
} from "recharts";
import { green } from "@mui/material/colors";

interface Props {
  data: any[];
  colors: string[];
  selectedFillColor: string;
}

const renderActiveShape = (props: any, selectedFillColor: string) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={"gray"}>
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={30}
        textAnchor="middle"
        fill={"black"}
        fontWeight={600}
        fontSize={30}
      >
        {payload.value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function PieChart({ colors, selectedFillColor, data }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <ResponsiveContainer width={"100%"} minHeight={500}>
      <Chart>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props) => renderActiveShape(props, selectedFillColor)}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={110}
          outerRadius={120}
          dataKey="value"
          onMouseEnter={(data, index) => setActiveIndex(index)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" />
      </Chart>
    </ResponsiveContainer>
  );
}
