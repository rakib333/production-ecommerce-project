import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import router from "./routes/authRoute.js";
import path from 'path';
import {fileUrlToPath} from 'url';
//configure env
dotenv.config();

//databse config
connectDB();

const __filename = fileUrlToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use('/api/v1/auth', router);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


//PORT
const PORT = process.env.PORT || 5000;

// Front end tagging
app.use(express.static('client/build'))
app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
