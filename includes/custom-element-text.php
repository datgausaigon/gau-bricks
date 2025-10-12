<?php
/**
 * Custom Element Text.
 */

namespace Gau\BricksTheme\Includes;

defined( 'ABSPATH' ) || exit;

use Gau\BricksTheme\Theme;

final class Custom_Element_Text {

	private static ?self $instance = null;

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_filter( 'tiny_mce_before_init', [ $this, 'restore_fullscreen' ], 10000, 1 );
		add_filter( 'tiny_mce_before_init', [ $this, 'apply_editor_styles' ], 10000, 1 );
		add_filter( 'mce_buttons', [ $this, 'customize_mce_buttons' ], 100 );
	}

	public function restore_fullscreen( array $mce_init ): array {
		if ( ! Theme::is_bricks_builder() ) {
			return $mce_init;
		}

		if ( empty( $mce_init['plugins'] ) ) {
			$mce_init['plugins'] = 'fullscreen';
		} elseif ( is_string( $mce_init['plugins'] ) && strpos( $mce_init['plugins'], 'fullscreen' ) === false ) {
			$mce_init['plugins'] .= ',fullscreen';
		}

		$toolbar1 = (string) ( $mce_init['toolbar1'] ?? '' );
		if ( $toolbar1 === '' ) {
			$mce_init['toolbar1'] = 'fullscreen';
		} elseif ( strpos( $toolbar1, 'fullscreen' ) === false ) {
			$mce_init['toolbar1'] = $toolbar1 . ',fullscreen';
		}

		return $mce_init;
	}

	public function apply_editor_styles( array $mce_init ): array {
		if ( function_exists( 'bricks_is_builder' ) && ! bricks_is_builder() ) {
			return $mce_init;
		}

		$rel  = '/assets/tinymce.css';
		$path = get_stylesheet_directory() . $rel;
		$url  = get_stylesheet_directory_uri() . $rel;

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$ver = (string) time();
		} else {
			$ver = file_exists( $path ) ? (string) filemtime( $path ) : ( defined( 'Gau\BricksTheme\Theme::VERSION' ) ? \Gau\BricksTheme\Theme::VERSION : '1.0.0' );
		}

		$url = add_query_arg( 'ver', $ver, $url );

		if ( ! empty( $mce_init['content_css'] ) && is_string( $mce_init['content_css'] ) ) {
			$mce_init['content_css'] .= ',' . $url;
		} else {
			$mce_init['content_css'] = $url;
		}

		return $mce_init;
	}

	public function customize_mce_buttons( array $buttons ): array {
		$buttons = array_values( array_diff( $buttons, [ 'blockquote', 'wp_more' ] ) );

		$pos_b = array_search( 'bold', $buttons, true );
		if ( $pos_b !== false && ! in_array( 'underline', $buttons, true ) ) {
			array_splice( $buttons, $pos_b + 1, 0, [ 'underline' ] );
		}

		$pos_r = array_search( 'alignright', $buttons, true );
		if ( $pos_r !== false && ! in_array( 'alignjustify', $buttons, true ) ) {
			array_splice( $buttons, $pos_r + 1, 0, [ 'alignjustify' ] );
		}

		return $buttons;
	}
}
