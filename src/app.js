import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

// imoort routes

// user routes import
import userRoutes from "./routes/user/user.routes.js";
import formRoutes from "./routes/user/userForms.routes.js";

// department routes import
import departmentManagerRoutes from "./routes/departmentManager/departmentManager.routes.js";
import departmentManagerFormRoutes from "./routes/departmentManager/accountDep/departmentFormManager.routes.js";
import remarkRoutes from "./routes/departmentManager/accountDep/remark.routes.js";

// admin routes import
import adminRoutes from "./routes/admin/admin.routes.js";
import adminFormRoutes from "./routes/admin/formRoutes/adminNocCertifiedCopy.routes.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routers declaration
//user routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", formRoutes);

// department manager routes

app.use("/api/v1/department-managers", departmentManagerRoutes);
app.use("/api/v1/department-managers", departmentManagerFormRoutes);
app.use("/api/v1/department-managers", remarkRoutes);

//user routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin", adminFormRoutes);
app.use(globalErrorHandler);
export { app };
