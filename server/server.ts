import express from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();

const app: any = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serve static files
app.use(express.static('build'));

// App PORT Set //
const PORT: number | string = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, (): void => {
  console.log(`Server Running. Much WOW. Listening on port: ${PORT}`);
});

export default app;
