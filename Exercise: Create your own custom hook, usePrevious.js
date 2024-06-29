Task
You've learned how to code a custom hook in React. In this code lab, you'll practice writing a brand new custom hook.

The starter code for this app contains code that will display the day of the week within an h1 heading, for example: "Today is: Monday". 
There is also a button under this heading, that reads "Get next day".

When a user clicks on this button, the h1 heading updates so that the message shows the next day in the sequence.
Your task is to complete the custom hook named usePrevious so that the h1 heading shows both the current day and the previous current day before the update.

Note: Before you begin, make sure you understand how to work with the Coursera Code Lab for the Advanced React course.

Note: Use npm start to get the starting version of the app running in the browser.

Steps
Step 1
-> Open the App.js file and locate the usePrevious() function as in the below code snippet. 

    function usePrevious(val) {
    }

-> Inside the usePrevious() function's code block, invoke the useRef hook without any arguments, and assign this invocation to a variable named ref, declared using the const keyword.

Step 2
-> Next, inside the usePrevious() function declaration, add a call to the useEffect() hook.

Step 3
-> Now, pass two parameters, as an argument to the useEffect() call.

  The first parameter should be an arrow function that doesn't accept and arguments. Inside the arrow function's body, assign the val value to the current property on the ref object.
  The second parameter is the dependencies array. The dependencies array should list a single variable to be tracked - namely, the val variable.

Step 4
-> Add one more line to the body of the usePrevious() function declaration, specifying the return value of this function.

The usePrevious() function should return the ref.current value.

Conclusion
Save the changes and run the app.

Use the checklist below to verify that the completed app is behaving as required:
- It shows a heading that reads: "Today is: Monday"
- When the user clicks the "Get next day" button, this updates the heading, which now spans two lines.
- The first line of the updated heading now reads "Today is: Tuesday", and the second line reads "Previous work day was: Monday".

  
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Solution-
in App.js

import { useState, useEffect, useRef } from "react";
export default function App() {
  const [day, setDay] = useState("Monday");
  const prevDay = usePrevious(day);
  const getNextDay = () => {
    if (day === "Monday") {
      setDay("Tuesday")
    } else if (day === "Tuesday") {
      setDay("Wednesday")
    } else if (day === "Wednesday") {
      setDay("Thursday")
    } else if (day === "Thursday") {
      setDay("Friday")
    } else if (day === "Friday") {
      setDay("Monday")
    }
  }
  return (
    <div style={{padding: "40px"}}>
      <h1>
        Today is: {day}<br />
        {
          prevDay && (
            <span>Previous work day was: {prevDay}</span>
          )
        }
      </h1>
      <button onClick={getNextDay}>
        Get next day
      </button>
    </div>
  );
}
function usePrevious(val) {
  const ref = useRef();

  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
}
