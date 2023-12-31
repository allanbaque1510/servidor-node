import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import imageRoutes from "./routes/image.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const allowedOrigins = [
  "http://192.168.100.87",
  "http://192.168.100.88",
  "http://192.168.100.86",
  "http://192.168.100.5:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Verifica si el origen está en la lista de permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", imageRoutes);
export default app;
