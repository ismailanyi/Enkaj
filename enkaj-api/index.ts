import { config } from "dotenv";
import app from "./app";
import { PORT } from "./constants";

config();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT || 6000}`);
});
