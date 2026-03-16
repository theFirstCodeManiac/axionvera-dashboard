import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DepositForm from "@/components/DepositForm";

describe("DepositForm", () => {
  test("submits amount", async () => {
    const user = userEvent.setup();
    const onDeposit = jest.fn(async () => undefined);

    render(<DepositForm isConnected={true} isSubmitting={false} onDeposit={onDeposit} />);

    await user.type(screen.getByLabelText(/amount/i), "12.5");
    await user.click(screen.getByRole("button", { name: /deposit/i }));

    expect(onDeposit).toHaveBeenCalledWith("12.5");
  });
});
