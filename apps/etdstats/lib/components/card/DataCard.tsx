import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { deepGreen, green } from "../../utils/colors";
import { numberWithCommas } from "../../utils/format";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box } from "@mui/system";

interface Props {
  title: string;
  number?: number;
  icon: React.ReactElement;
}

export default function DataCard(props: Props) {
  return (
    <Card style={{ height: "100%" }}>
      <CardContent>
        <Stack direction={"row"} justifyContent="space-between" p={1}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">{props.title}</Typography>
            <Stack direction={"row"} alignItems="center" spacing={1}>
              <TrendingUpIcon
                style={{
                  color: deepGreen,
                  backgroundColor: green,
                  borderRadius: "50%",
                  padding: "5px",
                  width: "20px",
                  height: "20px",
                }}
              />
              <Typography variant="subtitle2">+2.6%</Typography>
            </Stack>
            <Typography variant="h4" fontWeight={600}>
              {props.number ? (
                numberWithCommas(props.number)
              ) : (
                <CircularProgress />
              )}
            </Typography>
          </Stack>
          <Box>{props.icon}</Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
