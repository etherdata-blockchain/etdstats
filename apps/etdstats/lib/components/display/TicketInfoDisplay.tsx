import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { useMetaMask } from "metamask-react";
import { useCallback } from "react";
import useTicket, { Ticket } from "../../hooks/useTicket";

interface Props {
  relatedHashId?: string;
}

export default function TicketDisplay({ relatedHashId }: Props) {
  const { account } = useMetaMask();
  const { createTicket } = useTicket({});

  const onSubmit = useCallback(async (data: Ticket) => {
    await createTicket(data);
  }, []);

  if (!account) {
    return <div>Please connect to MetaMask</div>;
  }

  const initialValue: Ticket = {
    title: "",
    description: "",
    relatedHash: relatedHashId ?? "",
    relatedHashType: "block",
    time: new Date(),
    author: account,
    status: "open",
    checkedCount: 1,
  };

  return (
    <Box>
      <Formik initialValues={initialValue} onSubmit={onSubmit}>
        {({ handleSubmit, values, isSubmitting, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={12} sm={12} lg={7}>
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <TextField
                        data-testid="title"
                        name="title"
                        label="Title"
                        fullWidth
                        value={values.title}
                        onChange={handleChange}
                      />
                      <TextField
                        name="description"
                        label="Description"
                        rows={10}
                        fullWidth
                        multiline
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12} sm={12} lg={5}>
                <Stack spacing={5}>
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <FormControl>
                          <InputLabel>Type</InputLabel>
                          <Select
                            name="relatedHashType"
                            data-testid="relatedHashType"
                            autoCorrect="off"
                            value={values.relatedHashType}
                            onChange={handleChange}
                          >
                            <MenuItem
                              value="block"
                              data-testid="relatedHashType-block"
                            >
                              Block
                            </MenuItem>
                            <MenuItem
                              value="transaction"
                              data-testid="relatedHashType-transaction"
                            >
                              Transaction
                            </MenuItem>
                            <MenuItem
                              value="user"
                              data-testid="relatedHashType-user"
                            >
                              User
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          data-testid="relatedHash"
                          label="Related Hash Id"
                          name="relatedHash"
                          multiline
                          rows={2}
                          value={values.relatedHash}
                          onChange={handleChange}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Stack spacing={3}>
                        <TextField
                          data-testid="author"
                          label="Author"
                          name="author"
                          disabled
                          fullWidth
                          value={values.author}
                          onChange={handleChange}
                        />
                        <TextField
                          data-testid="time"
                          label="Creation time"
                          name="time"
                          disabled
                          fullWidth
                          value={values.time}
                          onChange={handleChange}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                  <LoadingButton
                    data-testid="submit"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    Create a ticket
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}
