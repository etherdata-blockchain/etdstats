import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import Image from "next/image";
import { UserInfo } from "openapi_client";
import { useCallback, useState } from "react";
import { Chip } from "ui";
import { useUser } from "../../hooks/useUser";
import { LoadingButton } from "@mui/lab";

export default function UserInfoDisplay() {
  const { userInfo, updateUser } = useUser();
  const [error, setError] = useState<string | undefined>();

  const onSubmit = useCallback(
    async (data: UserInfo) => {
      try {
        await updateUser(data);
        setError(undefined);
      } catch (e: any) {
        setError(e.message);
      }
    },
    [userInfo]
  );
  return (
    <Box>
      <Fade
        in={userInfo.data === undefined && userInfo.isLoading}
        mountOnEnter
        unmountOnExit
      >
        <Box alignItems={"center"} justifyContent="center" display={"flex"}>
          <Image src={"/Progressbar.webp"} height={40} width={40} />
        </Box>
      </Fade>
      <Fade in={userInfo.status === "error"}>
        <Alert severity="error">{JSON.stringify(userInfo.error)}</Alert>
      </Fade>

      <Fade in={userInfo.data !== undefined} mountOnEnter unmountOnExit>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5} lg={4}>
            <Card>
              <CardContent>
                <Stack
                  justifyContent={"center"}
                  alignItems="center"
                  spacing={3}
                >
                  <Stack
                    justifyContent={"flex-end"}
                    direction="row"
                    alignItems={"flex-end"}
                    justifyItems="flex-end"
                    width={"100%"}
                  >
                    <Chip label="Info" />
                  </Stack>
                  <Box
                    style={{
                      border: "1px dashed rgba(145, 158, 171, 0.32)",
                      padding: 10,
                      borderRadius: "50%",
                    }}
                  >
                    <Avatar sx={{ width: 144, height: 144 }} />
                  </Box>
                  <Typography variant="caption">
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                  <ListItem>
                    <ListItemText secondary="This is a decentralized user system. All your data is stored on the blockchain and will be publicly accessible. However, only you can edit your data." />
                  </ListItem>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={7} lg={8} xs={12}>
            <Card>
              <Fade in={error !== undefined} mountOnEnter unmountOnExit>
                <Alert severity="error" sx={{ marginBottom: 3 }}>
                  Submission error: {JSON.stringify(error)}
                </Alert>
              </Fade>
              <CardContent>
                <Formik
                  initialValues={userInfo.data!}
                  onSubmit={async (data) => await onSubmit(data)}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    isSubmitting,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={4} alignItems="flex-end">
                        <TextField
                          name="username"
                          label="User Name"
                          fullWidth
                          value={values.username}
                          onChange={handleChange}
                        />
                        <TextField
                          name="description"
                          label="Description"
                          fullWidth
                          minRows={10}
                          maxRows={10}
                          multiline
                          value={values.description}
                          onChange={handleChange}
                        />
                        <Box
                          display={"flex"}
                          alignItems="flex-start"
                          width={"100%"}
                        >
                          <Typography
                            variant="body2"
                            color={"gray"}
                            maxWidth={"70%"}
                          >
                            Changes may take up to 10 minutes to take effect.
                            This functionality is currently in beta and data
                            stored on the blockchain may be lost.
                          </Typography>
                        </Box>
                        <Box>
                          <LoadingButton
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                          >
                            Save Change
                          </LoadingButton>
                        </Box>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
}
