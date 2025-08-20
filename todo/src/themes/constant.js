// theme/themes.js
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const CustomLightTheme = {
 ...DefaultTheme,
  colors: {
   // ...DefaultTheme.colors,
    background: "#FFFFFF",
    text: "#000000",
    grayText: "#ccc",
    jokeText: "#415E72",
    jokeHead: "#17313E",
  },
  gradient: {
    background: ["rgba(238,174,202,1)", "rgba(148,187,233,1)"],
  },
};

export const CustomDarkTheme = {
 ...DarkTheme,
  colors: {
    //...DarkTheme.colors,
    background: "#000000",
    text: "#FFFFFF",
    grayText: "#FFFFFF",
    jokeText: "#FFFFFF",
    jokeHead: "#FFFFFF",
  },
  gradient: {
    background: ["#0f0c29", "#302b63", "#24243e"],
  },
};
