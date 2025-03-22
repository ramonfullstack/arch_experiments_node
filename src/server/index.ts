/* eslint-disable no-console */
import { applyRoutes } from './builder.js';

const portConfig = () => (process.env.PORT ? parseInt(process.env.PORT, 10) : 8080);
const PORT: number = portConfig();

applyRoutes()
  .listen(PORT, 'localhost', function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on('error', (err) => {
    console.log(err);
  });
