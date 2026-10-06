<?php
/**
 * Mises à jour depuis les releases GitHub.
 *
 * L'en-tête « Update URI: https://github.com/Vince-ALIEN/ufo-blocks »
 * empêche wordpress.org de proposer une mise à jour pour le slug
 * « ufo-blocks » (un plugin homonyme publié là-bas écraserait celui-ci)
 * et fait appeler par le cœur le filtre update_plugins_github.com. On y
 * répond avec la dernière release publiée du dépôt (public) et son asset
 * ufo-blocks.zip, construit par le workflow de release. L'archive source
 * générée par GitHub ne convient pas : build/ n'est pas versionné.
 *
 * @package UfoBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

final class Ufo_Blocks_Updater {

	const REPO      = 'Vince-ALIEN/ufo-blocks';
	const SLUG      = 'ufo-blocks';
	const ASSET     = 'ufo-blocks.zip';
	const CACHE_KEY = 'ufo_blocks_github_release';

	/** @var string Chemin relatif au dossier des plugins (ufo-blocks/ufo-blocks.php). */
	private $plugin_file;

	/** @var string Dossier du plugin, avec slash final. */
	private $plugin_dir;

	public function __construct( $plugin_file, $plugin_dir ) {
		$this->plugin_file = $plugin_file;
		$this->plugin_dir  = $plugin_dir;
	}

	public function register_hooks() {
		add_filter( 'update_plugins_github.com', array( $this, 'check_update' ), 10, 3 );
		add_filter( 'plugins_api', array( $this, 'plugin_info' ), 20, 3 );
	}

	/**
	 * Filtre update_plugins_github.com : partagé par tous les plugins dont
	 * l'Update URI pointe vers github.com, d'où le contrôle de $plugin_file.
	 *
	 * @param array|false $update
	 * @param array       $plugin_data
	 * @param string      $plugin_file
	 * @return array|false
	 */
	public function check_update( $update, $plugin_data, $plugin_file ) {
		if ( $plugin_file !== $this->plugin_file || ! $this->is_enabled() ) {
			return $update;
		}

		$release = $this->get_release();
		if ( null === $release ) {
			return $update;
		}

		return array(
			'slug'    => self::SLUG,
			'version' => $release['version'],
			'url'     => $release['url'],
			'package' => $release['package'],
		);
	}

	/**
	 * Fiche « Voir les détails » : sans elle, le lien de la ligne de mise à
	 * jour interroge wordpress.org, qui ne connaît pas le plugin.
	 *
	 * @param false|object|array $result
	 * @param string             $action
	 * @param object             $args
	 * @return false|object|array
	 */
	public function plugin_info( $result, $action, $args ) {
		if ( 'plugin_information' !== $action || ! is_object( $args ) || ! isset( $args->slug ) || self::SLUG !== $args->slug ) {
			return $result;
		}

		$release = $this->get_release();
		if ( null === $release ) {
			return $result;
		}

		$notes = '' !== $release['body'] ? nl2br( esc_html( $release['body'] ) ) : '';

		return (object) array(
			'name'          => 'Ufo Blocks',
			'slug'          => self::SLUG,
			'version'       => $release['version'],
			'author'        => '<a href="https://ufo-agency.com">Vincent LASSERRE</a>',
			'homepage'      => 'https://github.com/' . self::REPO,
			'download_link' => $release['package'],
			'last_updated'  => $release['published_at'],
			'sections'      => array(
				'changelog' => $notes . '<p><a href="' . esc_url( $release['url'] ) . '">' . esc_html__( 'Voir la release sur GitHub', 'ufo-blocks' ) . '</a></p>',
			),
		);
	}

	/**
	 * Désactivé sur une copie de travail git : une mise à jour remplacerait
	 * le dépôt local par le zip de la release.
	 */
	private function is_enabled() {
		return (bool) apply_filters( 'ufo_blocks_updater_enabled', ! is_dir( $this->plugin_dir . '.git' ) );
	}

	/**
	 * Dernière release publiée, mise en cache (6 h, 1 h après une erreur).
	 * « Vérifier à nouveau » sur l'écran des mises à jour contourne le cache.
	 * Sans authentification, l'API GitHub limite à 60 requêtes par heure et
	 * par IP : le cache évite d'atteindre ce plafond sur un serveur mutualisé.
	 *
	 * @return array|null
	 */
	private function get_release() {
		$force  = is_admin() && isset( $_GET['force-check'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$cached = $force ? false : get_site_transient( self::CACHE_KEY );

		if ( is_array( $cached ) && array_key_exists( 'release', $cached ) ) {
			return $cached['release'];
		}

		$response = wp_remote_get(
			'https://api.github.com/repos/' . self::REPO . '/releases/latest',
			array(
				'timeout' => 10,
				'headers' => array(
					'Accept'     => 'application/vnd.github+json',
					'User-Agent' => 'ufo-blocks',
				),
			)
		);

		$release = $this->parse_release( $response );
		set_site_transient( self::CACHE_KEY, array( 'release' => $release ), null === $release ? HOUR_IN_SECONDS : 6 * HOUR_IN_SECONDS );

		return $release;
	}

	/**
	 * @param array|WP_Error $response
	 * @return array|null
	 */
	private function parse_release( $response ) {
		if ( is_wp_error( $response ) || 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
			return null;
		}

		$data = json_decode( (string) wp_remote_retrieve_body( $response ), true );
		if ( ! is_array( $data ) || ! empty( $data['draft'] ) || ! empty( $data['prerelease'] ) ) {
			return null;
		}

		$version = ltrim( isset( $data['tag_name'] ) ? (string) $data['tag_name'] : '', 'vV' );
		if ( ! preg_match( '/^\d+(\.\d+){1,3}$/', $version ) ) {
			return null;
		}

		// Seul l'asset de ce dépôt est accepté comme paquet à installer.
		$prefix  = 'https://github.com/' . self::REPO . '/releases/download/';
		$package = '';
		$assets  = isset( $data['assets'] ) ? (array) $data['assets'] : array();
		foreach ( $assets as $asset ) {
			$download = isset( $asset['browser_download_url'] ) ? (string) $asset['browser_download_url'] : '';
			if ( isset( $asset['name'] ) && self::ASSET === $asset['name'] && 0 === strpos( $download, $prefix ) ) {
				$package = $download;
				break;
			}
		}
		if ( '' === $package ) {
			return null;
		}

		return array(
			'version'      => $version,
			'package'      => $package,
			'url'          => isset( $data['html_url'] ) ? (string) $data['html_url'] : 'https://github.com/' . self::REPO . '/releases',
			'body'         => trim( isset( $data['body'] ) ? (string) $data['body'] : '' ),
			'published_at' => isset( $data['published_at'] ) ? (string) $data['published_at'] : '',
		);
	}
}
