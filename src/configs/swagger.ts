import swaggerJsdoc from "swagger-jsdoc";
import EnvConfig from "../configs/env";

const PORT = EnvConfig.get("PORT") || 5176;
const swaggerOptions = {

    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API documentation for PM_ChamCong",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
            },
        ],
        components: {
            schemas: {
                VaiTro: {
                    type: "object",
                    properties: {
                        maVaiTro: {
                            type: "integer",
                            example: 1,
                        },
                        tenVaiTro: {
                            type: "string",
                            example: "Quản lý",
                        },
                        maPhongBan: {
                            type: "integer",
                            example: 2,
                        },
                    },
                },
                ChamCongResponse: {
                    type: "object",
                    properties: {
                        ngayChamCong: {
                            type: "string",
                            format: "time",
                            example: "2024-07-20"
                        },
                        thoiGianVao: {
                            type: "string",
                            format: "time",
                            example: "08:00:00"
                        },
                        thoiGianRa: {
                            type: "string",
                            format: "time",
                            example: "17:00:00"
                        },
                        soGioThucTe: {
                            type: "number",
                            example: 8
                        },
                        trangThai: {
                            type: "string",
                            example: "Đã duyệt"
                        },
                        cong: {
                            type: "number",
                            example: 1
                        },
                        maNhanVien: {
                            type: "number",
                            example: 1
                        }
                    }
                },
                // NgayNghi schemas
                NgayNghiModel: {
                    type: "object",
                    properties: {
                        maNghiPhep: {
                            type: "integer",
                            example: 1,
                            description: "ID of the NgayNghi record"
                        },
                        ngayBatDau: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-01",
                            description: "Start date of leave"
                        },
                        ngayKetThuc: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-05",
                            description: "End date of leave"
                        },
                        liDo: {
                            type: "string",
                            example: "Family vacation",
                            description: "Reason for leave"
                        },
                        trangThaiPheDuyet: {
                            type: "string",
                            example: "Đã duyệt",
                            description: "Approval status"
                        },
                        tinhLuong: {
                            type: "boolean",
                            example: true,
                            description: "Whether the leave affects salary calculation"
                        },
                        tinhPhep: {
                            type: "boolean",
                            example: true,
                            description: "Whether the leave counts against leave balance"
                        },
                        maNhanVien: {
                            type: "integer",
                            example: 1,
                            description: "Employee ID"
                        }
                    },
                    required: ["ngayBatDau", "ngayKetThuc", "liDo", "trangThaiPheDuyet", "tinhLuong", "tinhPhep", "maNhanVien"]
                },
                CreateNgayNghiDto: {
                    type: "object",
                    properties: {
                        ngayBatDau: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-01",
                            description: "Start date of leave"
                        },
                        ngayKetThuc: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-05",
                            description: "End date of leave"
                        },
                        liDo: {
                            type: "string",
                            example: "Family vacation",
                            description: "Reason for leave"
                        },
                        trangThaiPheDuyet: {
                            type: "string",
                            example: "Chờ duyệt",
                            description: "Approval status"
                        },
                        tinhLuong: {
                            type: "boolean",
                            example: true,
                            description: "Whether the leave affects salary calculation"
                        },
                        tinhPhep: {
                            type: "boolean",
                            example: true,
                            description: "Whether the leave counts against leave balance"
                        },
                        maNhanVien: {
                            type: "integer",
                            example: 1,
                            description: "Employee ID"
                        }
                    },
                    required: ["ngayBatDau", "ngayKetThuc", "liDo", "trangThaiPheDuyet", "tinhLuong", "tinhPhep", "maNhanVien"]
                },
                UpdateNgayNghiDto: {
                    type: "object",
                    properties: {
                        maNghiPhep: {
                            type: "integer",
                            example: 1,
                            description: "ID of the NgayNghi record"
                        },
                        ngayBatDau: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-01",
                            description: "Start date of leave"
                        },
                        ngayKetThuc: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-05",
                            description: "End date of leave"
                        },
                        liDo: {
                            type: "string",
                            example: "Family vacation",
                            description: "Reason for leave"
                        },
                        trangThaiPheDuyet: {
                            type: "string",
                            example: "Đã duyệt",
                            description: "Approval status"
                        },
                        tinhLuong: {
                            type: "boolean",
                            example: true,
                            description: "Whether the leave affects salary calculation"
                        },
                        tinhPhep: {
                            type: "boolean",
                            example: true,
                            description: "Whether the leave counts against leave balance"
                        },
                        maNhanVien: {
                            type: "integer",
                            example: 1,
                            description: "Employee ID"
                        }
                    },
                    required: ["maNghiPhep", "ngayBatDau", "ngayKetThuc", "liDo", "trangThaiPheDuyet", "tinhLuong", "tinhPhep", "maNhanVien"]
                },
                NgayNghiResponseDto: {
                    type: "object",
                    properties: {
                        maNghiPhep: {
                            type: "integer",
                            example: 1
                        },
                        ngayBatDau: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-01"
                        },
                        ngayKetThuc: {
                            type: "string",
                            format: "date-time",
                            example: "2025-06-05"
                        },
                        liDo: {
                            type: "string",
                            example: "Family vacation"
                        },
                        trangThaiPheDuyet: {
                            type: "string",
                            example: "Đã duyệt"
                        },
                        tinhLuong: {
                            type: "boolean",
                            example: true
                        },
                        tinhPhep: {
                            type: "boolean",
                            example: true
                        },
                        maNhanVien: {
                            type: "integer",
                            example: 1
                        }
                    }
                },
                CaLamTrongTuan: {
                    type: "object",
                    properties: {
                        maCa: {
                            type: "integer",
                            example: 1
                        },
                        ngayTrongTuan: {
                            type: "integer",
                            example: 2,
                            description: "Day of the week (1-7, where 1 = Monday)"
                        },
                        coLamViec: {
                            type: "boolean",
                            example: true,
                            description: "Whether work is scheduled on this day"
                        },
                        gioBatDau: {
                            type: "string",
                            format: "time",
                            example: "08:00:00",
                            description: "Start time of the work day"
                        },
                        gioKetThuc: {
                            type: "string",
                            format: "time",
                            example: "17:00:00",
                            description: "End time of the work day"
                        },
                        gioNghiTruaBatDau: {
                            type: "string",
                            format: "time",
                            example: "12:00:00",
                            description: "Start time of lunch break"
                        },
                        gioNghiTruaKetThuc: {
                            type: "string",
                            format: "time",
                            example: "13:00:00",
                            description: "End time of lunch break"
                        },
                        soGioLamViec: {
                            type: "number",
                            example: 8,
                            description: "Total working hours for the day"
                        }
                    }
                },

                CaLamTrongTuanInput: {
                    type: "object",
                    required: ["ngayTrongTuan", "coLamViec", "gioBatDau", "gioKetThuc", "gioNghiTruaBatDau", "gioNghiTruaKetThuc", "soGioLamViec"],
                    properties: {
                        maCa: {
                            type: "integer",
                            example: 1
                        },
                        ngayTrongTuan: {
                            type: "integer",
                            example: 2,
                            description: "Day of the week (1-7, where 1 = Monday)"
                        },
                        coLamViec: {
                            type: "boolean",
                            example: true,
                            description: "Whether work is scheduled on this day"
                        },
                        gioBatDau: {
                            type: "string",
                            format: "time",
                            example: "08:00:00",
                            description: "Start time of the work day"
                        },
                        gioKetThuc: {
                            type: "string",
                            format: "time",
                            example: "17:00:00",
                            description: "End time of the work day"
                        },
                        gioNghiTruaBatDau: {
                            type: "string",
                            format: "time",
                            example: "12:00:00",
                            description: "Start time of lunch break"
                        },
                        gioNghiTruaKetThuc: {
                            type: "string",
                            format: "time",
                            example: "13:00:00",
                            description: "End time of lunch break"
                        },
                    }
                },

                CaLamTrongTuanUpdate: {
                    type: "object",
                    properties: {
                        ngayTrongTuan: {
                            type: "integer",
                            example: 2,
                            description: "Day of the week (1-7, where 1 = Monday)"
                        },
                        coLamViec: {
                            type: "boolean",
                            example: true,
                            description: "Whether work is scheduled on this day"
                        },
                        gioBatDau: {
                            type: "string",
                            format: "time",
                            example: "08:00:00",
                            description: "Start time of the work day"
                        },
                        gioKetThuc: {
                            type: "string",
                            format: "time",
                            example: "17:00:00",
                            description: "End time of the work day"
                        },
                        gioNghiTruaBatDau: {
                            type: "string",
                            format: "time",
                            example: "12:00:00",
                            description: "Start time of lunch break"
                        },
                        gioNghiTruaKetThuc: {
                            type: "string",
                            format: "time",
                            example: "13:00:00",
                            description: "End time of lunch break"
                        }
                    }
                },
                PhuCap: {
                    type: "object",
                    properties: {
                        maPhuCap: {
                            type: "integer",
                            example: 1,
                            description: "ID of the allowance"
                        },
                        maVaiTro: {
                            type: "integer",
                            example: 2,
                            description: "Role ID associated with this allowance"
                        },
                        tenPhuCap: {
                            type: "string",
                            example: "Phụ cấp xăng xe",
                            description: "Name of the allowance"
                        },
                        soTienPhuCap: {
                            type: "number",
                            example: 500000,
                            description: "Amount of allowance"
                        }
                    }
                },
                CreatePhuCapRequest: {
                    type: "object",
                    required: ["maVaiTro", "tenPhuCap", "soTienPhuCap"],
                    properties: {
                        maVaiTro: {
                            type: "integer",
                            example: 2
                        },
                        tenPhuCap: {
                            type: "string",
                            example: "Phụ cấp xăng xe"
                        },
                        soTienPhuCap: {
                            type: "number",
                            example: 500000
                        }
                    }
                },
                UpdatePhuCapRequest: {
                    type: "object",
                    properties: {
                        maVaiTro: {
                            type: "integer",
                            example: 2
                        },
                        tenPhuCap: {
                            type: "string",
                            example: "Phụ cấp xăng xe"
                        },
                        soTienPhuCap: {
                            type: "number",
                            example: 500000
                        }
                    }
                },
                // Adding QuyenHanModel schema
                QuyenHanModel: {
                    type: "object",
                    properties: {
                        maQuyenHan: {
                            type: "integer",
                            example: 1,
                            description: "ID of the permission"
                        },
                        tenQuyenHan: {
                            type: "string",
                            example: "Create User",
                            description: "Name of the permission"
                        },
                        moTa: {
                            type: "string",
                            example: "Permission to create new users in the system",
                            description: "Description of the permission"
                        }
                    }
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: 'Enter JWT token with Bearer prefix (e.g., "Bearer your-token-here")'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
