Task
You've learned about React Context and how it allows you to define global state without passing individual props down through each component. 
One of the most common use cases for Context is to define a theme for your application. In this exercise, you'll create a light-dark theme switcher.

The starter code includes all the necessary UI elements, as well as a Switch component to toggle the theme. Your goal is to implement the missing functionality inside ThemeContext.js. 
ThemeContext already exports a ThemeProvider component and a useTheme hook. At the moment, they don't do anything and return dummy values.

You'll need to implement both the ThemeProvider component and the useTheme hook inside the ThemeContext.js file to complete this exercise.

ThemeProvider should render a context provider component and inject as the context value an object with two properties: a theme property that is a string,
that can be either light or dark, and a function named toggleTheme that enables you to toggle the theme. The useTheme hook should return that context object.

Note: Before you begin, make sure you understand how to work with the Coursera Code Lab for the 
Advanced React course

If you run npm start and view the app in the browser, you'll notice that the starting React app works as is. The app outputs a simple view with a header, page and a switch widget in the top right corner to 
change the theme.

Steps
Step 1
Open the ThemeContext.js file.

Create a ThemeContext object using React.createContext().

Implement the ThemeProvider component. It should accept a children prop and return a ThemeContext.Provider component. 
The ThemeContext.Provider receives an object as its value prop, with a theme string and a toggleTheme function.

toggleTheme should toggle the theme between light and dark.

Step 2
Implement the useTheme hook. It should return the theme and toggleTheme values from the ThemeContext.

Step 3
Open the Switch/index.js file. Add an onChange prop to the input element and pass a callback function, as the event handler, to change the theme. You don’t need to use the event argument in this case.

Step 4
Verify that the app works as expected. You should be able to toggle the theme between light and dark. Notice how the background color of the page changes, as well as the color of the text.


Solution-
In ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
in Switch/index.js

import React from 'react';
import './Styles.css';
import { useTheme } from '../ThemeContext';

const Switch = () => {
  const { theme, toggleTheme } = useTheme();

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'light'}
        onChange={handleChange}
      />
      <span className="slider round" />
    </label>
  );
};

export default Switch;
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
in App.js

import "./App.css";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Switch from "./Switch";

const Title = ({ children }) => {
  const { theme } = useTheme();
  return (
    <h2
      style={{
        color: theme === "light" ? "black" : "white",
      }}
    >
      {children}
    </h2>
  );
};

const Paragraph = ({ children }) => {
  const { theme } = useTheme();
  return (
    <p
      style={{
        color: theme === "light" ? "black" : "white",
      }}
    >
      {children}
    </p>
  );
};

const Content = () => {
  return (
    <div>
      <Paragraph>
        We are a pizza loving family. And for years, I searched and searched and
        searched for the perfect pizza dough recipe. I tried dozens, or more.
        And while some were good, none of them were that recipe that would
        make me stop trying all of the others.
      </Paragraph>
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <Title>Little Lemon 🍕</Title>
      <Switch />
    </header>
  );
};

const Page = () => {
  return (
    <div className="Page">
      <Title>When it comes to dough</Title>
      <Content />
    </div>
  );
};

function App() {
  const { theme } = useTheme();
  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === "light" ? "white" : "black",
      }}
    >
      <Header />
      <Page />
    </div>
  );
}

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default Root;

