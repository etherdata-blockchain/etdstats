import { render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import { Transaction } from "openapi_client";
import UserTransactionTable from "../lib/components/table/UserTransactionTable";

describe("Given a general transaction table component", () => {
  const account1 = "0x12345abcde";
  const account2 = "0x23456fghijk";
  const account3 = "0x12345ABCDE";
  const account4 = "0x23456FGHIJK";

  const block: any = {};

  beforeAll(() => {
    // set screen size to large
    Object.defineProperty(window, "innerWidth", {
      value: 1920,
      writable: true,
      configurable: true,
    });
  });

  test("Should render properly", () => {
    const transaction: Transaction = {
      hash: "0x1",
      nonce: 0,
      blockHash: "0x1",
      blockNumber: 0,
      transactionIndex: 0,
      from: account1,
      to: account2,
      value: "0x1",
      gasPrice: "0x1",
      gas: 0,
      input: "",
      block: block,
      timestamp: dayjs().toISOString(),
    };

    const transaction2: Transaction = {
      ...transaction,
      from: account3,
      to: account2,
    };

    const transaction3: Transaction = {
      ...transaction,
      from: account2,
      to: account1,
    };

    const transaction4: Transaction = {
      ...transaction,
      from: account4,
      to: account1,
    };

    render(
      <UserTransactionTable
        address={account1}
        isLoading={false}
        transactions={[transaction, transaction2, transaction3, transaction4]}
      />
    );

    expect(screen.getAllByTestId("Sent")).toHaveLength(2);
    expect(screen.getAllByTestId("Received")).toHaveLength(2);
  });

  test("Should render properly", () => {
    const transaction: Transaction = {
      hash: "0x1",
      nonce: 0,
      blockHash: "0x1",
      blockNumber: 0,
      transactionIndex: 0,
      from: account1,
      to: account2,
      value: "0x1",
      gasPrice: "0x1",
      gas: 0,
      input: "",
      block: block,
      timestamp: dayjs().toISOString(),
    };

    const transaction2: Transaction = {
      ...transaction,
      from: account3,
      to: account2,
    };

    const transaction3: Transaction = {
      ...transaction,
      from: account2,
      to: account1,
    };

    const transaction4: Transaction = {
      ...transaction,
      from: account4,
      to: account1,
    };

    render(
      <UserTransactionTable
        address={account2}
        isLoading={false}
        transactions={[transaction, transaction2, transaction3, transaction4]}
      />
    );

    expect(screen.getAllByTestId("Sent")).toHaveLength(2);
    expect(screen.getAllByTestId("Received")).toHaveLength(2);
  });

  test("Should render properly", () => {
    const transaction: Transaction = {
      hash: "0x1",
      nonce: 0,
      blockHash: "0x1",
      blockNumber: 0,
      transactionIndex: 0,
      from: account1,
      to: account2,
      value: "0x1",
      gasPrice: "0x1",
      gas: 0,
      input: "",
      block: block,
      timestamp: dayjs().toISOString(),
    };

    const transaction2: Transaction = {
      ...transaction,
      from: account3,
      to: account2,
    };

    const transaction3: Transaction = {
      ...transaction,
      from: account2,
      to: account1,
    };

    const transaction4: Transaction = {
      ...transaction,
      from: account4,
      to: account1,
    };

    render(
      <UserTransactionTable
        address={account3}
        isLoading={false}
        transactions={[transaction, transaction2, transaction3, transaction4]}
      />
    );

    expect(screen.getAllByTestId("Sent")).toHaveLength(2);
    expect(screen.getAllByTestId("Received")).toHaveLength(2);
  });

  test("Should render properly", () => {
    const transaction: Transaction = {
      hash: "0x1",
      nonce: 0,
      blockHash: "0x1",
      blockNumber: 0,
      transactionIndex: 0,
      from: account1,
      to: account2,
      value: "0x1",
      gasPrice: "0x1",
      gas: 0,
      input: "",
      block: block,
      timestamp: dayjs().toISOString(),
    };

    const transaction2: Transaction = {
      ...transaction,
      from: account3,
      to: account2,
    };

    const transaction3: Transaction = {
      ...transaction,
      from: account2,
      to: account1,
    };

    const transaction4: Transaction = {
      ...transaction,
      from: account4,
      to: account1,
    };

    render(
      <UserTransactionTable
        address={account4}
        isLoading={false}
        transactions={[transaction, transaction2, transaction3, transaction4]}
      />
    );

    expect(screen.getAllByTestId("Sent")).toHaveLength(2);
    expect(screen.getAllByTestId("Received")).toHaveLength(2);
  });
});
