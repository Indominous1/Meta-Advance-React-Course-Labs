Task
- You've learned about Jest and react-testing-library to create automated tests for your components. Now it's time to write some of your own tests! Remember the Feedback form Little Lemon put together to gather 
  feedback about their recipes? In a previous lesson, you were introduced to a test scenario where the app verified that users who provided less than a score of 5 could only submit their form if feedback was 
  also provided. 

In this exercise, you'll create two more test scenarios to verify the form submission works as expected:
- User is able to submit the form if the score is lower than 5 and additional feedback is provided.
- User is able to submit the form if the score is higher than 5, without additional feedback.
  
Note: Before you begin, make sure you understand how to work with the Coursera Code Lab for the Advanced React course.

Steps
Step 1
- Open the App.test.js file. There you'll encounter two new test scenarios that should be completed.

Step 2
- After writing the test scenarios, run the tests to verify they pass. For that, execute npm test in the terminal.

Tip
- Explore the FeedbackForm component to understand the JSX it returns and how you can access the elements in the tests. For more information about react-testing-library queries, check out the documentation.

Conclusion
- In this exercise, you gained more experience when writing tests for your React Components. You were introduced to different screen query methods to locate DOM elements and learned about new Jest matchers to 
  perform valuable assertions.


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Solution-
in App.test.js

import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";

describe("Feedback Form", () => {
  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // Find and fill out the score input
    const scoreInput = screen.getByLabelText(/score/i);
    fireEvent.change(scoreInput, { target: { value: score } });

    // Find and fill out the comment input
    const commentInput = screen.getByLabelText(/additional feedback/i);
    fireEvent.change(commentInput, { target: { value: comment } });

    // Find and click the submit button
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Check that handleSubmit was called with the expected values
    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // Find and fill out the score input
    const scoreInput = screen.getByLabelText(/score/i);
    fireEvent.change(scoreInput, { target: { value: score } });

    // Find and click the submit button without filling out the comment
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Check that handleSubmit was called with the expected values
    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});
