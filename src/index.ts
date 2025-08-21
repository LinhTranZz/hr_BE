import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger";
import favicon from 'serve-favicon';
import path from 'path';
import phongbanRoute from "./routes/phongban.route";
import vaiTroRoute from "./routes/vaitro.route";
import caLamRoute from "./routes/calam.route";
import uuTienRoute from "./routes/uutien.route";
import nhanVienRoute from "./routes/nhanvien.route";
import chamCongRoute from "./routes/chamcong.route";
import luongRoute from "./routes/luong.route";
import taiKhoanRoute from "./routes/taikhoan.route";
import tangCaRoute from "./routes/tangca.route"
import ngayNghiRoute from "./routes/ngaynghi.route";
import loaiTienTruRoute from "./routes/loaitientru.route";
import loaiTienThuongRoute from "./routes/loaitienthuong.route";
import lichSuTruRoute from "./routes/lichsutru.route";
import lichSuThuongRoute from "./routes/lichsuthuong.route";
import lichSuUuTienRoute from "./routes/lichsuuutien.route";
import ngayLeRoute from "./routes/ngayle.route";
import deviceRoute from "./routes/device.route";
import ngayPhepRoute from "./routes/ngayphep.route";
import heThongRoute from "./routes/hethong.route";
import phuCapRoute from "./routes/phucap.route";
import themPhuCapRoute from "./routes/themphucap.route";
import quyenHanRoute from "./routes/quyenhan.route";
import { notFoundHandler, errorHandler } from "./middlewares/error.handler";
import authenticate from './middlewares/auth.middleware';
import { container } from './configs/inversify.config';
import { TYPES } from './configs/types';
import Database from "./configs/database";
import EnvConfig from "./configs/env";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());

dayjs.extend(utc)

const apiRouter = express.Router();

(async () => {
    try {
        const PORT = EnvConfig.get("PORT") || 5176;
        const HOST = '0.0.0.0';
        const database = container.get<Database>(TYPES.Database);
        await database.connect();

        // Apply authentication middleware to all API routes
        apiRouter.use(authenticate);

        apiRouter.use('/phongban', phongbanRoute());
        apiRouter.use('/vaitro', vaiTroRoute());
        apiRouter.use('/calam', caLamRoute());
        apiRouter.use('/uutien', uuTienRoute());
        apiRouter.use('/nhanvien', nhanVienRoute());
        apiRouter.use('/chamcong', chamCongRoute());
        apiRouter.use('/luong', luongRoute());
        apiRouter.use('/taikhoan', taiKhoanRoute());
        apiRouter.use('/tangca', tangCaRoute());
        apiRouter.use('/ngaynghi', ngayNghiRoute());
        apiRouter.use('/loaitientru', loaiTienTruRoute());
        apiRouter.use('/loaitienthuong', loaiTienThuongRoute());
        apiRouter.use('/lichsutru', lichSuTruRoute());
        apiRouter.use('/lichsuthuong', lichSuThuongRoute());
        apiRouter.use('/lichsuuutien', lichSuUuTienRoute());
        apiRouter.use('/ngayle', ngayLeRoute());
        apiRouter.use('/device', deviceRoute());
        apiRouter.use('/ngayphep', ngayPhepRoute());
        apiRouter.use('/hethong', heThongRoute());
        apiRouter.use('/phucap', phuCapRoute());
        apiRouter.use('/themphucap', themPhuCapRoute());
        apiRouter.use('/quyenhan', quyenHanRoute());

        app.use('/api', apiRouter);

        // These routes are public and don't require authentication
        app.use('/health', (_req, res) => {
            res.status(200).json({
                status: 'UP',
                message: 'Server is running',
            });
        });

        app.use('/ping', (_req, res) => {
            res.status(200).json({
                status: 'UP',
                message: 'Pong',
            });
        });

        if (EnvConfig.get("NODE_ENV") === 'development') {
            app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
            console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);

            // Use app.get for an exact match on the root path
            app.get('/', (_req, res) => {
                res.redirect('/api-docs');
            });
        }

        if (EnvConfig.get("NODE_ENV") === 'production') {
            // Use app.get for an exact match on the root path
            app.get('/', (_req, res) => {
                res.redirect('/health');
            });
        }


        app.use(notFoundHandler);
        app.use(errorHandler);

        app.listen(Number(PORT), HOST, () => {
            console.log(`Server is running on  http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the application:", error);
        process.exit(1);
    }
})();
