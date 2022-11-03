import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMetaMask } from "metamask-react";
import React, { useState } from "react";
import UserInfoDisplay from "../../lib/components/display/UserInfoDisplay";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Index() {
  const { status } = useMetaMask();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack mt={10}>
      <Typography variant="h6" sx={{ mb: 5 }} fontWeight="bold">
        Edit User
      </Typography>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="General" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserInfoDisplay />
      </TabPanel>
    </Stack>
  );
}
