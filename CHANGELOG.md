# 📑 Changelog — Gấu Bricks

Tất cả thay đổi quan trọng của dự án này sẽ được ghi lại trong tệp này.  
All notable changes to this project will be documented in this file.

---

## [1.0.9] - 2026-02-18

### 🇻🇳 Cải tiến

- **Tính năng mới – Chế độ thu gọn bảng phần tử (Compact Elements Panel):**
  
  - Giúp tối ưu diện tích hiển thị bằng cách thu hẹp khoảng cách giữa các icon/phần tử trong bảng Elements, cho phép xem được nhiều phần tử hơn mà không cần cuộn trang nhiều.
    
  - Có thể bật/tắt linh hoạt thông qua hook/filter:  
    ```php
    add_filter( 'gau/bricks/builder/enable_compact_elements_panel', '__return_true' );
    ```
    
- **Tương thích Bricks 2.2:**
  
  - Cập nhật toàn diện để tương thích với phiên bản Bricks 2.2.
  
  - Cửa sổ bật lên (**Popup**) cho bảng chọn màu (**Color Palette**) đã hoạt động ổn định trên Bricks 2.2.
  
  - Tính năng **Tối ưu đổi tên phần tử** (Element) trong bảng điều khiển Cấu trúc (**Structure Panel**) hoạt động chính xác với Bricks 2.2.

- **Text Editor:**
  
  - Cải tiến trải nghiệm Cửa sổ bật lên (**Popup**) cho Element Text (Text Edit – TinyMCE).

### 🇬🇧 Improvements

- **New Feature – Compact Elements Panel:**

  - Optimizes screen real estate by reducing spacing between element icons/items in the Elements panel, allowing more items to be visible without excessive scrolling.

  - Can be toggled on/off via hook/filter: 
    ```php
    add_filter( 'gau/bricks/builder/enable_compact_elements_panel', '__return_true' );
    ```
    
- **Bricks 2.2 Compatibility:**
  
  - Fully updated for Bricks 2.2 compatibility.
  
  - **Color Palette popup** is now working correctly with Bricks 2.2.
  
  - **Element renaming optimization** in the **Structure Panel** is now fully functional with Bricks 2.2.

- **Text Editor:**
  
  - Improved **Popup** experience for Element Text (Text Edit – TinyMCE).

## [1.0.2] - 2025-09-16

### 🇻🇳 Cải tiến

- **Structure Panel – Đổi tên phần tử**:
  - Gỡ/khôi phục chính xác các class kéo/thả (`draggable`, `element`, …) khi vào và thoát trạng thái sửa tên.
  - Cho phép **quét khối** (bôi đen toàn bộ hoặc một phần văn bản khi sửa tên).
  - Cho phép dán nội dung bằng Ctrl/Cmd+V và mở Trình đơn ngữ cảnh (Context Menu) chuột phải trong lúc sửa tên.

### 🇬🇧 Improvements

- **Structure Panel – Element renaming**:
  - Properly remove/restore drag-related classes (`draggable`, `element`, …) when entering or exiting rename mode.
  - Allow **text selection** (highlight part or full text when renaming).
  - Allow paste via Ctrl/Cmd+V and Context Menu during renaming.

---

## [1.0.1] - 2025-09-03

### 🇻🇳 Sửa lỗi

- **Structure Panel – Đổi tên phần tử**: Một số website vẫn kéo/thả được khi đang đổi tên do selector quá hẹp (`.label`).  
  → Đã thay bằng selector tổng quát hơn: `#bricks-structure .structure-item .title input:not(.readonly)` để bao phủ cả `.label`, `.name`, v.v.

### 🇬🇧 Fixes

- **Structure Panel – Element renaming**: On some sites drag/drop was still possible while renaming because the selector was too narrow (`.label`).  
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
