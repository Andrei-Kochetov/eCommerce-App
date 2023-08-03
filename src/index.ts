import App from "./spa/app"; // TODO change relative paths to absolute with @src
import { IApp } from "./spa/types";

const app: IApp = App.getInstance();
app.start();