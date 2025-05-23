import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

// imoort routes

// user routes import
import userRoutes from "./routes/user/user.routes.js";
import formRoutes from "./routes/user/userForms.routes.js";
import commonFormRoutes from "./routes/user/commonForm.routes.js";

// department routes import
import departmentManagerRoutes from "./routes/departmentManager/departmentManager.routes.js";
import department1ManagerFormRoutes from "./routes/departmentManager/accountDep/departmentFormManager.routes.js";
import department2ManagerFormRoutes from "./routes/departmentManager/townPlanningRoutes/department2FormManager.routes.js";
import commonFormDep from "./routes/departmentManager/commonDepartmentFormRoutes/commonDepForm.routes.js";
import remarkRoutes from "./routes/departmentManager/accountDep/remark.routes.js";
import commonRemarkRoute from "./routes/departmentManager/commonDepartmentFormRoutes/commonRemark.routes.js";

import remark2Routes from "./routes/departmentManager/townPlanningRoutes/remarkDep2.routes.js";

// admin routes import
import adminRoutes from "./routes/admin/admin.routes.js";
import adminFormRoutes from "./routes/admin/formRoutes/adminNocCertifiedCopy.routes.js";

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  process.env.CORS_ORIGIN, // For local
  "http://13.201.123.101:3000",
  "http://13.201.123.101",
  "http://ec2-65-0-93-255.ap-south-1.compute.amazonaws.com", // For production development
  "http://localhost:3000",
  "http://localhost:3001",
  "http://192.168.1.155:8080",
  "http://192.168.1.155:3000",
  "https://sra-government-project-thane-1.onrender.com",
  "https://srammrrts.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(cors());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routers declaration
//user routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", formRoutes);
app.use("/api/v1/users", commonFormRoutes);

// department manager routes

app.use("/api/v1/department-managers", departmentManagerRoutes);
app.use("/api/v1/department-managers", department1ManagerFormRoutes);
app.use("/api/v1/department-managers", department2ManagerFormRoutes);
app.use("/api/v1/department-managers", commonFormDep);
app.use("/api/v1/department-managers", commonRemarkRoute);

app.use("/api/v1/department-managers", remarkRoutes);
app.use("/api/v1/department-managers", remark2Routes);

//user routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin", adminFormRoutes);
app.use(globalErrorHandler);
export { app };
