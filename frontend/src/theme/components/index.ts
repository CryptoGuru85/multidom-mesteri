import { Theme, ThemeOptions } from "@mui/material/styles";
import Button from "./Buttons";
import Card from "./Card";
import Link from "./Link";
import Paper from "./Paper";

const components = (theme: Theme): ThemeOptions["components"] =>
  Object.assign(Button(theme), Paper(theme), Card(theme), Link(theme));

export default components;
