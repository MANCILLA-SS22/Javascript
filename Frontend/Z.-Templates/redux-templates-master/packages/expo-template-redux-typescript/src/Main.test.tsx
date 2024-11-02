import { screen, waitFor } from "@testing-library/react-native"
import { Main } from "./Main"
import { renderWithProviders } from "./utils/test-utils"

test("Main should have correct initial render", () => {
  renderWithProviders(<Main />)

  // The app should be rendered correctly
  expect(screen.getByText(/learn more redux/i)).toBeOnTheScreen()

  // Initial state: count should be 0, incrementValue should be 2
  expect(screen.getByLabelText("Count")).toHaveTextContent("0")
  expect(screen.getByLabelText("Set increment amount")).toHaveDisplayValue("2")
})

test("Increment value and Decrement value should work as expected", async () => {
  const { user } = renderWithProviders(<Main />)

  // Click on "+" => Count should be 1
  await user.press(screen.getByLabelText("Increment value"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("1")

  // Click on "-" => Count should be 0
  await user.press(screen.getByLabelText("Decrement value"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("0")
})

test("Add Amount should work as expected", async () => {
  const { user } = renderWithProviders(<Main />)

  // "Add Amount" button is clicked => Count should be 2
  await user.press(screen.getByText("Add Amount"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("2")

  const incrementValueInput = screen.getByLabelText("Set increment amount")
  // incrementValue is 2, click on "Add Amount" => Count should be 4
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "2")
  await user.press(screen.getByText("Add Amount"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("4")

  // [Negative number] incrementValue is -1, click on "Add Amount" => Count should be 3
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.press(screen.getByText("Add Amount"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("3")
})

it("Add Async should work as expected", async () => {
  const { user } = renderWithProviders(<Main />)

  // "Add Async" button is clicked => Count should be 2
  await user.press(screen.getByText("Add Async"))

  await waitFor(() => {
    expect(screen.getByLabelText("Count")).toHaveTextContent("2")
  })

  const incrementValueInput = screen.getByLabelText("Set increment amount")
  // incrementValue is 2, click on "Add Async" => Count should be 4
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "2")

  await user.press(screen.getByText("Add Async"))
  await waitFor(() => {
    expect(screen.getByLabelText("Count")).toHaveTextContent("4")
  })

  // [Negative number] incrementValue is -1, click on "Add Async" => Count should be 3
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.press(screen.getByText("Add Async"))
  await waitFor(() => {
    expect(screen.getByLabelText("Count")).toHaveTextContent("3")
  })
})

test("Add If Odd should work as expected", async () => {
  const { user } = renderWithProviders(<Main />)

  // "Add If Odd" button is clicked => Count should stay 0
  await user.press(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("0")

  // Click on "+" => Count should be updated to 1
  await user.press(screen.getByLabelText("Increment value"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("1")

  // "Add If Odd" button is clicked => Count should be updated to 3
  await user.press(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("3")

  const incrementValueInput = screen.getByLabelText("Set increment amount")
  // incrementValue is 1, click on "Add If Odd" => Count should be updated to 4
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "1")
  await user.press(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("4")

  // click on "Add If Odd" => Count should stay 4
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.press(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("4")
})
