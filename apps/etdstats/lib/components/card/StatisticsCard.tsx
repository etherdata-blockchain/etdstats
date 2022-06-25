import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, Tooltip, Bar } from "recharts";

interface Props {
  statisticsData: any[];
}

export default function StatisticsCard(props: Props) {
  return (
    <Card>
      <CardContent>
        <Stack>
          <Typography fontWeight={800}>Statistics</Typography>
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={200}
            minHeight={300}
          >
            <BarChart
              height={300}
              data={props.statisticsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Stack>
      </CardContent>
    </Card>
  );
}
