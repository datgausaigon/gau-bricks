# 📑 Changelog — Gấu Bricks

Tất cả thay đổi quan trọng của dự án này sẽ được ghi lại trong tệp này.  
All notable changes to this project will be documented in this file.

---

## [1.0.1] - 2025-09-03

### 🇻🇳 Sửa lỗi
- **Structure Panel – đổi tên phần tử**: Một số website vẫn kéo/thả được khi đang đổi tên do selector quá hẹp (`.label`).  
  → Đã thay bằng selector tổng quát hơn: `#bricks-structure .structure-item .title input:not(.readonly)` để bao phủ cả `.label`, `.name`, v.v.

### 🇬🇧 Fixes
- **Structure Panel – element renaming**: On some sites drag/drop was still possible while renaming because the selector was too narrow (`.label`).  
  → Replaced with a broader selector: `#bricks-structure .structure-item .title input:not(.readonly)` to cover `.label`, `.name`, etc.

---

## [1.0.0] - 2025-09-02

### 🇻🇳 Khởi tạo
- Phát hành phiên bản đầu tiên của child theme **Gấu Bricks** nhân dịp **80 năm Quốc Khánh Việt Nam (2/9/1945 – 2/9/2025)**.  
- Bao gồm các tính năng:
  - Cửa sổ bật lên (Popup) cho bảng chọn màu (Color Palette)  
  - Tối ưu đổi tên phần tử (Element) trong bảng điều khiển Cấu trúc (Structure Panel)  
  - Tùy chọn chỉnh thêm thanh trượt (Scrollbar) cho bảng điều khiển (Panel) trong Builder  
  - Cửa sổ bật lên (Popup) cho Element Text (Text Edit – TinyMCE)  
  - Tùy chọn chỉnh giao diện Việt Nam (Vietnam Theme cho Builder)  

### 🇬🇧 Initial Release
- First release of the **Gấu Bricks** child theme to celebrate the **80th Anniversary of Vietnam National Day (Sep 2, 1945 – Sep 2, 2025)**.  
- Includes features:
  - Popup for the Color Palette selector  
  - Optimized element renaming in the Structure Panel  
  - Optional scrollbar customization for Builder panels  
  - Popup for the Text Element (Text Edit – TinyMCE)  
  - Optional Vietnamese UI theme for the Builder
