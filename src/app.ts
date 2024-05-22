import app from "./server";
import 'dotenv/config'

export const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
