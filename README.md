# Thiệp mời cưới Vercel + Supabase

Dự án hiện có hai phần chính:
- Trang thiệp cưới đơn giản và hiện đại trong `index.html`.
- Một kho mẫu thiệp cưới có công cụ chỉnh sửa trực tiếp, cho phép lưu bản nháp trong trình duyệt và (nếu có Supabase) đồng bộ lên database.

## Nội dung đã thêm
- `index.html`: Trang kho mẫu thiệp với bộ lọc mẫu, live preview, tải ảnh, lưu bản nháp và áp dụng mẫu.
- `api/submit.js`: API đăng ký lời chúc và RSVP.
- `api/entries.js`: API lấy 50 dòng dữ liệu gần nhất từ bảng `wishes`.
- `api/templates.js`: API lưu và đọc bản thiết kế từ bảng `template_projects` trên Supabase.
- `schema.sql`: Câu lệnh tạo bảng Supabase cho `wishes` và `template_projects`.
- `vercel.json`: cấu hình Vercel cho API.

## Tính năng mới
- Chọn mẫu thiệp theo từng phong cách: Luxury, Romantic, Minimal, Modern.
- Chỉnh sửa trực tiếp tên cô dâu/chú rể, tiêu đề sự kiện, ngày, địa điểm, lời chúc và màu sắc.
- Tải ảnh nền / ảnh đôi uyên ương để xem trước trực tiếp.
- Lưu bản nháp vào localStorage để tiếp tục chỉnh sửa sau.
- Nếu cấu hình Supabase đúng, dữ liệu bản nháp sẽ được đồng bộ lên bảng `template_projects`.

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

## Cách hoạt động
- Người dùng chọn mẫu và chỉnh sửa trên `index.html`.
- Frontend lưu bản nháp vào `localStorage` và gọi `/api/templates` để đồng bộ lên Supabase khi có biến môi trường.
- Form RSVP cũ vẫn gọi `/api/submit` để ghi lời chúc vào bảng `wishes`.

## Kiểm tra
- Đảm bảo `SUPABASE_URL` và `SUPABASE_SERVICE_ROLE_KEY` được thiết lập nếu muốn đồng bộ bản nháp.
- Triển khai xong, mở trang và thử lưu 1 bản thiết kế.

## Lưu ý
- Vercel có hỗ trợ serverless functions cho `api/*.js`.
- Supabase service role key nên giữ bí mật, chỉ cấu hình trong Vercel environment variables.
