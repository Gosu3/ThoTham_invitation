# Thiệp mời cưới Vercel + Supabase

Đã chuẩn bị phiên bản trang mời cưới trong `index.html` và API serverless để lưu lời chúc, thông tin xác nhận tham dự vào Supabase.

## Nội dung đã thêm
- `index.html`: Trang mời cưới gốc với `form` đã được kết nối đến API.
- `api/submit.js`: API đăng ký lời chúc và RSVP.
- `api/entries.js`: API lấy 50 dòng dữ liệu gần nhất từ bảng `wishes`.
- `schema.sql`: Câu lệnh tạo bảng Supabase.
- `vercel.json`: cấu hình Vercel cho API.

## Hướng dẫn triển khai lên Vercel (Free)

1. Tạo tài khoản Vercel miễn phí tại https://vercel.com
2. Tạo repository GitHub hoặc sử dụng upload trực tiếp từ thư mục này lên Vercel.
3. Trong Vercel, triển khai dự án từ repository hoặc upload folder.
4. Thiết lập biến môi trường trong Vercel project settings:
   - `SUPABASE_URL`: URL Supabase của bạn, ví dụ `https://abc123.supabase.co`
   - `SUPABASE_ANON_KEY` (tùy chọn, khuyến nghị cho endpoint đọc dữ liệu): Anon/Public Key lấy từ Supabase > Settings > API.
   - `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key lấy từ Supabase > Settings > API.

## Hướng dẫn tạo database Supabase

1. Tạo tài khoản miễn phí tại https://supabase.com
2. Tạo project mới và nhớ URL + Service Role Key.
3. Vào phần `SQL Editor` của Supabase và chạy nội dung trong `schema.sql`.

### Nội dung `schema.sql`
```sql
create extension if not exists "pgcrypto";

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  message text not null,
  guest_of text not null,
  attendance text not null,
  created_at timestamp with time zone not null default now()
);
```

## Cách hoạt động
- Người dùng gửi form tại trang chính.
- Frontend gọi `/api/submit`.
- API ghi dữ liệu vào Supabase bảng `wishes`.

## Kiểm tra
- Đảm bảo `SUPABASE_URL` và `SUPABASE_SERVICE_ROLE_KEY` được thiết lập.
- Triển khai xong, thử gửi mẫu và kiểm tra dữ liệu trong Supabase.

## Lưu ý
- Vercel có hỗ trợ serverless functions cho `api/*.js`.
- Supabase service role key nên giữ bí mật, chỉ cấu hình trong Vercel environment variables.
