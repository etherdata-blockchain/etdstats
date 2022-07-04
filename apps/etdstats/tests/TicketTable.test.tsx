import TicketTable from "../lib/components/table/TicketTable";
import { Ticket } from "../lib/hooks/useTicket";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Given a TicketTable component", () => {
  test("Should render without problem", async () => {
    const time = {
      toDate: () => new Date(),
    };

    const tickets: Ticket[] = [
      {
        time: time as any,
        title: "Test",
        description: "Test",
        relatedHashType: "block",
        relatedHash: "0x123",
        status: "open",
        author: "0xabcde",
        checkedCount: 0,
      },
    ];

    const onChange = jest.fn();

    render(
      <TicketTable tickets={tickets} selection={"open"} onChange={onChange} />
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("0x123")).toBeInTheDocument();
    expect(screen.getByText("0xabcde")).toBeInTheDocument();
    expect(screen.getByText("open")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Closed"));
    expect(onChange).toHaveBeenCalledWith("closed");
  });
});
