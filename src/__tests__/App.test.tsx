import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
	it("should render the App without crash", () => {
		render(<App />);
		expect(true).toBeTruthy();
	});
});
