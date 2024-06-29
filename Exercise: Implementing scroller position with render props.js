Task
- You've learned about render props and how it's a viable alternative to higher-order components (HOCs) to encapsulate cross-cutting concerns. In a previous video, you saw a possible implementation of a mouse
  position tracker using higher-order components. In this exercise, you'll implement the same specifications but using a render prop component instead.

Note: Before you begin, make sure you understand how to work with the Coursera Code Lab for the Advanced React course.

Steps
Step 1
- Open the App.js file.

Complete the implementation of the MousePosition component. Specifically, you'll need to:
- Implement the body ofhandleMousePositionChangeinsideuseEffect    

- Implement the return statement of the component.

Step 2
Tweak the implementation of PanelMouseLogger. The requirements are:

- The component should not receive any props.
- The component should not have any if statements.
- The component should leverage theMousePosition render prop to show the coordinates in a panel fashion. The panel UI is already provided to you, your goal is to connect the UI with the mouse position data.

Step 3
Tweak the implementation of PointMouseLogger. The requirements are:
- The component should not receive any props.
- The component should not have any if statements.
- The component should leverage theMousePosition render prop to show the coordinates in a point representation. The point UI is already provided to you, your goal is to connect the UI with the mouse position data

Save all the changes and run the app. Preview the updates in the browser, and confirm that the page shows two distinct interfaces that display the safe information (mouse position) in different fashion, one as
  a panel and another as a point coordinates.


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
Solution-
in App.js

import "./App.css";
import { useEffect, useState } from "react";

const MousePosition = ({ render }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMousePositionChange = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMousePositionChange);

    return () => {
      window.removeEventListener("mousemove", handleMousePositionChange);
    };
  }, []);

  return render(mousePosition);
};

const PanelMouseLogger = () => {
  return (
    <MousePosition render={({ x, y }) => (
      <div className="BasicTracker">
        <p>Mouse position:</p>
        <div className="Row">
          <span>x: {x}</span>
          <span>y: {y}</span>
        </div>
      </div>
    )} />
  );
};

const PointMouseLogger = () => {
  return (
    <MousePosition render={({ x, y }) => (
      <p>
        ({x}, {y})
      </p>
    )} />
  );
};

function App() {
  return (
    <div className="App">
      <header className="Header">Little Lemon Restaurant 🍕</header>
      <PanelMouseLogger />
      <PointMouseLogger />
    </div>
  );
}

export default App;
