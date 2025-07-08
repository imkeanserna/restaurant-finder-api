import "dotenv/config";
import app from "./app";
import { validateEnvironment } from "./utils/validateEnvironment";

validateEnvironment();

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Restaurant Finder API is running on port ${PORT}`);
});
