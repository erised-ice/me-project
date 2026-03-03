import {app} from "./app";
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});