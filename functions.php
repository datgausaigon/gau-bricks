<?php
/**
 * Theme Name:  Gấu Bricks
 * Version:     1.0.1 (20250903)
 * Author:      🐻
 * Author URI:  https://github.com/datgausaigon/
 * Text Domain: gau-bricks
 * License:     Copyright © datgau.com - All Rights Reserved.
 */

namespace Gau\BricksTheme;

defined( 'ABSPATH' ) || exit;

final class Theme {

	public const VERSION = '1.0.1';

	public const ENABLE_VN_THEME_FILTER = 'gau/bricks/enable_builder_vietnam_theme';
	public const ENABLE_BUILDER_PANEL_SCROLLBAR_FILTER = 'gau/bricks/enable_builder_panel_scrollbar';
	public const ENABLE_CUSTOM_ELEMENT_TEXT_FILTER = 'gau/bricks/enable_custom_element_text';

	private static ?self $instance = null;

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'public_enqueue_assets' ], 1000 );
		add_action( 'wp_enqueue_scripts', [ $this, 'builder_enqueue_assets' ], 1000 );

		add_action( 'init', [ $this, 'maybe_boot_modules' ] );
	}

	public function maybe_boot_modules(): void {
		if ( $this->is_custom_element_text_enabled() ) {
			$path = self::includes_path() . 'custom-element-text.php';
			if ( file_exists( $path ) ) {
				require_once $path;
				Includes\Custom_Element_Text::instance();
			}
		}
	}

	public function public_enqueue_assets(): void {
		if ( self::is_bricks_builder_main() ) {
			return;
		}

		wp_register_style(
			'gau-bricks__theme-style',
			get_stylesheet_uri(),
			[ 'theme-style' ],
			self::VERSION,
			'all'
		);
		wp_enqueue_style( 'gau-bricks__theme-style' );
	}

	public function builder_enqueue_assets(): void {
		if ( ! self::is_bricks_builder() ) {
			return;
		}

		wp_register_script(
			'gau-bricks__builder-script',
			self::assets_uri() . 'builder.js',
			[],
			self::VERSION,
			true
		);
		wp_enqueue_script( 'gau-bricks__builder-script' );

		wp_register_style(
			'gau-bricks__builder-style',
			self::assets_uri() . 'builder.css',
			[],
			self::VERSION,
			'all'
		);
		wp_enqueue_style( 'gau-bricks__builder-style' );

		if ( $this->is_vietnam_theme_enabled() ) {
			wp_register_style(
				'gau-bricks__builder-vietnam-theme-style',
				self::assets_uri() . 'builder-vietnam-theme.css',
				[],
				self::VERSION,
				'all'
			);
			wp_enqueue_style( 'gau-bricks__builder-vietnam-theme-style' );
		}

		if ( $this->is_builder_panel_scrollbar_enabled() ) {
			wp_register_style(
				'gau-bricks__builder-panel-scrollbar-style',
				self::assets_uri() . 'builder-panel-scrollbar.css',
				[],
				self::VERSION,
				'all'
			);
			wp_enqueue_style( 'gau-bricks__builder-panel-scrollbar-style' );
		}

		if ( $this->is_custom_element_text_enabled() ) {
			wp_register_style(
				'gau-bricks__builder-element-text-style',
				self::assets_uri() . 'builder-element-text.css',
				[],
				self::VERSION,
				'all'
			);
			wp_enqueue_style( 'gau-bricks__builder-element-text-style' );
		}
	}

	/* ================= Paths & URIs ================= */

	public static function theme_dir(): string {
		return trailingslashit( get_stylesheet_directory() );
	}

	public static function theme_uri(): string {
		return trailingslashit( get_stylesheet_directory_uri() );
	}

	public static function includes_path(): string {
		return self::theme_dir() . 'includes/';
	}

	public static function assets_path(): string {
		return self::theme_dir() . 'assets/';
	}

	public static function assets_uri(): string {
		return self::theme_uri() . 'assets/';
	}

	/* ================= Bricks checks ================= */

	public static function is_bricks_builder(): bool {
		return function_exists( 'bricks_is_builder' ) ? (bool) bricks_is_builder() : false;
	}

	public static function is_bricks_builder_main(): bool {
		return function_exists( 'bricks_is_builder_main' ) ? (bool) bricks_is_builder_main() : false;
	}

	/* ================= Flags ================= */

	private function is_vietnam_theme_enabled(): bool {
		return (bool) apply_filters( self::ENABLE_VN_THEME_FILTER, false );
	}

	private function is_builder_panel_scrollbar_enabled(): bool {
		return (bool) apply_filters( self::ENABLE_BUILDER_PANEL_SCROLLBAR_FILTER, false );
	}

	private function is_custom_element_text_enabled(): bool {
		return (bool) apply_filters( self::ENABLE_CUSTOM_ELEMENT_TEXT_FILTER, true );
	}
}

Theme::instance();
