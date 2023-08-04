import App from "./spa/app"; // TODO change relative paths to absolute with @src
import { IApp } from "./spa/types";

// creating entry point for app launching
const app: IApp = App.getInstance();
app.start();