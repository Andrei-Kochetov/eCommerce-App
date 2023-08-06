import App from '@src/spa/app';
import { IApp } from '@src/spa/types';

// creating entry point for app launching
const app: IApp = App.getInstance();
app.start();
