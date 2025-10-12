# 🐻 Gấu Bricks — Child Theme for Bricks Builder  

<img width="1200" height="900" alt="screenshot" src="https://github.com/user-attachments/assets/764bcd6b-d807-43c5-8c7c-490ef4687821" />  

🇻🇳  
Gấu Bricks là child theme được phát triển để tối ưu trải nghiệm khi sử dụng [Bricks Builder](https://bricksbuilder.io/).  
Mục tiêu chính là tinh chỉnh các tính năng trong trình dựng trang, bổ sung các tiện ích nhỏ gọn, giúp quá trình thiết kế và phát triển website thuận tiện và chính xác hơn.  

🇬🇧  
Gấu Bricks is a child theme designed to optimize the experience with [Bricks Builder](https://bricksbuilder.io/).  
Its main goal is to refine the page builder features and add small, useful enhancements to make the process of designing and developing websites more convenient and accurate.

---  

## 📋 Bảng hỗ trợ & tương thích / Compatibility Table

🇻🇳  
| Thành phần      | Yêu cầu tối thiểu | Đã kiểm tra với           |
|-----------------|-------------------|---------------------------|
| PHP             | ≥ 8.2             | 8.2.x                     |
| WordPress       | ≥ 6.8.3           | 6.8.3                     |
| Bricks Builder  | 2.1.2             | Gấu Bricks v1.0.3         |
| Trình duyệt     | Chrome, Firfox    | Không tương thích Safari  |

🇬🇧  
| Component       | Minimum Required | Tested With                |
|-----------------|------------------|----------------------------|
| PHP             | ≥ 8.2            | 8.2.x                      |
| WordPress       | ≥ 6.8.2          | 6.8.2                      |
| Bricks Builder  | 2.1.2            | Gấu Bricks v1.0.3          |
| Browser         | Chrome, Firfox   | Not compatible with Safari |

---  
  
## 🛢️ Cơ sở dữ liệu & Tính toàn vẹn dữ liệu / Database & Data Integrity  

🇻🇳  
| Thành phần | Trạng thái |
|------------|------------|
| Bảng dữ liệu | ❌ Không thay đổi |
| Bản ghi | ❌ Không thay đổi |
| Tùy chọn (`wp_options`) | ❌ Không thêm/sửa/xóa |
| Metadata (`wp_postmeta`, `wp_usermeta`, ...) | ❌ Không ảnh hưởng |

> 🔐  
> Phiên bản hiện tại của **Gấu Bricks** chỉ bổ sung/tùy chỉnh ở cấp độ giao diện trình dựng trang (Page Builder UI).  
> Không thực hiện bất kỳ thay đổi nào tới cấu trúc bảng hoặc dữ liệu trong cở sở dữ liệu của WordPress.  

🇬🇧  
| Component | Status |
|-----------|--------|
| Database Tables | ❌ No modifications |
| Database Records | ❌ No modifications |
| Options (`wp_options`) | ❌ No add/edit/delete |
| Metadata (`wp_postmeta`, `wp_usermeta`, ...) | ❌ No impact |

> 🔐  
> The current version of **Gấu Bricks** only adds/customizes at the Page Builder UI level.  
> It does not make any changes to the structure of the tables or the data in the WordPress database.  

---  

## ⚙️ Các tính năng / Features  
🇻🇳 
- Cửa sổ bật lên (Popup) cho bảng chọn màu (Color Palette).
- Tối ưu đổi tên phần tử (Element) trong bảng điều khiển Cấu trúc (Structure Panel):
  - **Định dạng trực quan** khi đang sửa tên: làm nổi bật phần tử đang sửa tên để dễ nhận biết.
  - **Khóa kéo/thả (drag/drop)** phần tử trong khi sửa tên.
  - Cho phép **quét khối** (bôi đen toàn bộ hoặc một phần văn bản khi sửa tên).
  - Cho phép **dán nội dung** bằng Ctrl/Cmd+V và mở Trình đơn ngữ cảnh (Context Menu) chuột phải trong lúc sửa tên.
  - Tự động **gỡ các class kéo/thả** khi đang rename để tránh xung đột.
  - **Khôi phục class kéo/thả** sau khi kết thúc rename để drag/drop hoạt động bình thường.
- Tùy chọn chỉnh thêm thanh trượt (Scrollbar) cho bảng điều khiển (Panel) trong Builder.
- Cửa sổ bật lên (Popup) cho Element Rich Text (Text Edit – TinyMCE).
- Tùy chọn chỉnh giao diện Việt Nam (Vietnam Theme cho Builder).  

🇬🇧  
- Popup for the Color Palette selector
- Optimized element renaming in the Structure Panel:  
  - **Visual styling** while renaming: highlight the element being renamed for better visibility.
  - **Lock drag/drop** of elements while renaming.
  - Allow **text selection** (highlight part or full text when renaming).
  - Allow **paste text** via Ctrl/Cmd+V and Context Menu during renaming.
  - Automatically **remove drag-related classes** while renaming to prevent conflicts.
  - **Restore drag-related classes** after renaming so drag/drop works normally.
- Optional scrollbar customization for Builder panels.
- Popup for the Element Rich Text (Text Edit – TinyMCE).
- Optional Vietnamese UI theme for the Builder.  
---

## 🛠️ Hướng dẫn sử dụng Filter / How to use Filters

🇻🇳  
Child theme cung cấp các filter để bật/tắt tính năng.  
Thêm các filter này trong plugin riêng hoặc trong file `functions.php` của child theme khác.

```php
// Bật giao diện Việt Nam cho Builder
add_filter( 'gau/bricks/enable_builder_vietnam_theme', '__return_true' );

// Bật scrollbar tùy chỉnh cho panel
add_filter( 'gau/bricks/enable_builder_panel_scrollbar', '__return_true' );

// Bật tối ưu Element Text
add_filter( 'gau/bricks/enable_custom_element_text', '__return_true' );
```

Mặc định các filter trả về `false` (tắt). Dùng `__return_true` để bật.

🇬🇧  
The child theme provides filters to enable/disable features.  
Add these filters in your own plugin or in another child theme’s `functions.php`.

```php
// Enable Vietnamese theme for Builder
add_filter( 'gau/bricks/enable_builder_vietnam_theme', '__return_true' );

// Enable custom scrollbar for Builder panels
add_filter( 'gau/bricks/enable_builder_panel_scrollbar', '__return_true' );

// Enable Element Text optimization
add_filter( 'gau/bricks/enable_custom_element_text', '__return_true' );
```

By default, these filters return `false` (disabled). Use `__return_true` to activate.

---
Chúc mọi điều tốt đẹp.  
Thanks.  
🐻
