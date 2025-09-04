# 🐻 Gấu Bricks — Child Theme for Bricks Builder  

<img width="1200" height="900" alt="screenshot" src="https://github.com/user-attachments/assets/764bcd6b-d807-43c5-8c7c-490ef4687821" />  

:vietnam:  
Gấu Bricks là child theme được phát triển để tối ưu trải nghiệm khi sử dụng [Bricks Builder](https://bricksbuilder.io/).  
Mục tiêu chính là tinh chỉnh các tính năng trong trình dựng trang, bổ sung các tiện ích nhỏ gọn, giúp quá trình thiết kế và phát triển website thuận tiện và chính xác hơn.  

:uk:  
Gấu Bricks is a child theme designed to optimize the experience with [Bricks Builder](https://bricksbuilder.io/).  
Its main goal is to refine the page builder features and add small, useful enhancements to make the process of designing and developing websites more convenient and accurate.

---  

## 📋 Bảng hỗ trợ / Compatibility Table

🇻🇳  
| Thành phần      | Phiên bản yêu cầu | Đã kiểm tra với       |
|-----------------|------------------|------------------------|
| PHP             | ≥ 8.2            | 8.2.x                  |
| WordPress       | ≥ 6.8.2          | 6.8.2                  |
| Bricks Builder  | 2.0.2            | Gấu Bricks v1.0.1      |

🇬🇧  
| Component       | Minimum Required | Tested With             |
|-----------------|------------------|-------------------------|
| PHP             | ≥ 8.2            | 8.2.x                   |
| WordPress       | ≥ 6.8.2          | 6.8.2                   |
| Bricks Builder  | 2.0.2            | Gấu Bricks v1.0.1       |

---  

## ⚙️ Các tính năng / Features

:vietnam:  
- Cửa sổ bật lên (Popup) cho bảng chọn màu (Color Palette)
- Tối ưu đổi tên phần tử (Element) trong bảng điều khiển Cấu trúc (Structure Panel)
- Tùy chọn chỉnh thêm thanh trượt (Scrollbar) cho bảng điều khiển (Panel) trong Builder
- Cửa sổ bật lên (Popup) cho Element Rich Text (Text Edit – TinyMCE)
- Tùy chọn chỉnh giao diện Việt Nam (Vietnam Theme cho Builder)

:uk:  
- Popup for the Color Palette selector
- Optimized element renaming in the Structure Panel
- Optional scrollbar customization for Builder panels
- Popup for the Element Rich Text (Text Edit – TinyMCE)
- Optional Vietnamese UI theme for the Builder  

---

## 🛠️ Hướng dẫn sử dụng Filter / How to use Filters

:vietnam:    
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

---

:uk:   
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
