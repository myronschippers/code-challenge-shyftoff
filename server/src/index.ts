import {config} from 'dotenv';
import app from './server';

config();

const PORT: number | string = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
