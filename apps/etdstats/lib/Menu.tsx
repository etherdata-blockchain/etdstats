import { HelpCenter } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useMetaMask } from "metamask-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MenuSubHeader } from "ui";
import useAuthentication from "./hooks/useAuthentication";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

const selectedColor = "rgb(0, 171, 85)";

interface Menu {
  name: string;
  icon: React.ReactElement;
  href: string;
  loginRequired?: boolean;
}

const menus: Menu[] = [
  {
    name: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    name: "Info",
    icon: <InfoIcon />,
    href: "/tx",
  },
  {
    name: "Contract",
    icon: <StickyNote2Icon />,
    href: "/contract",
  },
  {
    name: "Issues",
    icon: <HelpCenter />,
    href: "/issues",
    loginRequired: true,
  },
];

export default function Menu() {
  const router = useRouter();
  const { isSignedIn } = useAuthentication();
  const { account } = useMetaMask();
  const [currentPath, setCurrentPath] = useState(
    `/${router.pathname.split("/")[1]}`
  );

  useEffect(() => {
    setCurrentPath(`/${router.pathname.split("/")[1]}`);
  }, [router]);

  return (
    <List>
      <Box mb={2} p={2}>
        <Card
          sx={{
            boxShadow: "none",
            backgroundColor: "rgba(191, 191, 191, 0.1)",
          }}
        >
          <CardContent>
            <Stack direction={"row"}>
              <Typography noWrap>
                {account ?? "No Account Connected"}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <MenuSubHeader title="General" />
      {menus
        .filter((menu) => (menu.loginRequired ? isSignedIn : true))
        .map((menu) => {
          const isSelected = currentPath === menu.href;
          const icon = React.cloneElement(menu.icon, {
            style: {
              color: isSelected ? selectedColor : "inherit",
            },
          });

          return (
            <Link
              href={menu.href}
              key={menu.href}
              style={{ textDecoration: "none", color: "gray" }}
            >
              <ListItemButton
                selected={isSelected}
                sx={{
                  color: isSelected ? selectedColor : "inherit",
                  borderRadius: "10px",
                  padding: "12px",
                  margin: "12px",
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            </Link>
          );
        })}
    </List>
  );
}
