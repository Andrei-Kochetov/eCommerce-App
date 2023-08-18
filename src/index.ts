import App from '@src/spa/app';
import { IApp } from '@src/spa/types';
import { getProject } from '@src/spa/model/clientApi/CreateClient';

// creating entry point for app launching
const app: IApp = App.getInstance();
app.start();
getProject().then(console.log).catch(console.error);
