import express from "express";
import cors from "cors";
// import rateLimit from "express-rate-limit";
import userRoutes from "./routes/users";
import propertyRoutes from "./routes/properties";
import bookingRoutes from "./routes/bookings";
import mediaRoutes from "./routes/media";
import wlRoutes from "./routes/waitlist";
import demoBookingCtrl from "./routes/demobookings";

const app = express();
app.disable("x-powered-by");

// Security middleware
app.use(
  cors({
    credentials: true,
    origin: true,
    // origin: ["http://localhost:5173"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

// Rate limiting
/* const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter); */

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/booking-demo", demoBookingCtrl);
app.use("/api/waitinglist", wlRoutes);

app.use("/api/media", mediaRoutes);

app.get("/", (_, res) => {
  res.status(200).json("You reached the Enkaj server");
});

app.use("*", (_, res) => {
  res.status(404).json({
    error: "You reached a route that is not defined on this server",
  });
});

export default app;
