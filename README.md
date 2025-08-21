# PMChamCong-BE

Hệ thống quản lý chấm công - backend API

## Mô tả

PMChamCong-BE là phần backend của hệ thống quản lý chấm công, xử lý các tác vụ liên quan đến quét vân tay, quản lý nhân viên, ca làm việc, và tính toán chấm công.

## Yêu cầu hệ thống

- Node.js (phiên bản 16.x hoặc cao hơn)
- SQL Server
- Git

## Cài đặt

### Bước 1: Clone repository

```bash
git clone <đường dẫn repository>
cd PMChamCong-BE
```

### Bước 2: Cài đặt các dependencies

```bash
npm install
```

### Bước 3: Khởi tạo cơ sở dữ liệu

1. Kết nối vào SQL Server của bạn
2. Thực thi các script SQL theo thứ tự sau:
   ```
   sql-scripts/DB_MayChamCong.sql
   sql-scripts/tao_user.sql
   sql-scripts/sp_tr_*.sql (tất cả các stored procedures)
   sql-scripts/test_data.sql (nếu bạn muốn dữ liệu mẫu)
   ```

### Bước 4: Thiết lập tệp .env

Tạo tệp `.env` tại thư mục gốc của dự án với các thông số sau:

```
# Môi trường
NODE_ENV=development

# Thông tin server
PORT=3000
HOST=localhost

# Thông tin kết nối database
DB_SERVER=localhost
DB_NAME=DB_MayChamCong
DB_USER=<tên người dùng>
DB_PASSWORD=<mật khẩu>
```

## Chạy ứng dụng

### Chế độ phát triển

```bash
npm run dev
```

### Chế độ debug

```bash
npm run debug
```

### Build và chạy cho môi trường sản xuất

```bash
npm run prod
```
hoặc
```bash
npm run build
npm start
```

## API Documentation

Sau khi khởi động server, bạn có thể truy cập tài liệu Swagger API tại:

```
http://localhost:3000/api-docs
```

## Cấu trúc dự án

- `src/`: Mã nguồn chính
  - `configs/`: Cấu hình database, dependency injection, swagger...
  - `controllers/`: Xử lý requests, responses
  - `dto/`: Data Transfer Objects
  - `interfaces/`: Định nghĩa interfaces
  - `middlewares/`: Middlewares Express
  - `repositories/`: Xử lý tương tác với CSDL
  - `routes/`: Định nghĩa routes API
  - `services/`: Logic nghiệp vụ
  - `utils/`: Các tiện ích
- `sql-scripts/`: Scripts tạo CSDL và stored procedures
- `logs/`: Log files

## Liên hệ hỗ trợ

Nếu bạn có bất kỳ câu hỏi hoặc gặp vấn đề, vui lòng liên hệ với [thông tin liên hệ của bạn].

