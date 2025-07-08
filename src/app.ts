import express, { urlencoded, Request, Response } from "express";
import cors from "cors";
import restaurantRoutes from "./routes/restaurantRoutes";
import healthRoutes from "./routes/healthRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  }),
);

// Routes
app.use("/api", restaurantRoutes);
app.use("/health", healthRoutes);

app.use("/", (req: Request, res: Response) => {
  res.json({
    message: "Restaurant Finder Api",
    version: "1.0.0",
    endpoint: {
      search: "/api/execute?message=<your_message>&code=<access_code>",
      health: "/health",
    },
    example:
      "/api/execute?message=Find%20me%20a%20cheap%20sushi%20restaurant%20in%20downtown%20Los%20Angeles%20that's%20open%20now%20and%20has%20at%20least%20a%204-star%20rating&code=<access_code>",
  });
});

app.use(errorHandler);

export default app;
