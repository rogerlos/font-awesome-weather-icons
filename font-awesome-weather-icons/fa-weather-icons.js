/**
 * Adds Weather Icons to Font Awesome. Only works on Font Awesome 5 using SVG!
 *
 * CFG object below defines the prefix used when placing icons:
 *   <i class="fawi fa-cloudy"></i>
 *
 * Include the aliases you need, if any, by snipping 'aliased-' from the front and '.json' from the back of the
 * JSON filename in cfg.
 */
window.addEventListener( 'DOMContentLoaded', function () {

    ( function ( FA ) {

        if ( typeof( FA ) === 'undefined' ) return;

        let CFG    = { path : path() + 'cfg/', prefix : 'fawi', aliases : [ 'owm' ] },
            ICONS  = {},
            LOADED = 0;

        get_json_icons( CFG.path + 'icons.json' );

        /**
         * Add icons to Font Awesome
         */
        function awesome() {
            FA.library.add( ICONS );
        }

        /**
         * Gets aliased icons, as desired
         */
        function get_aliases() {
            if ( ! CFG.aliases.length ) {
                awesome();
                return
            }
            CFG.aliases.forEach( function ( al ) {
                get_json_icons( CFG.path + 'aliased-' + al + '.json', true );
            } );
        }

        /**
         * Uses fetch to get CFG files
         *
         * @param key
         * @param alias
         */
        function get_json_icons( key, alias ) {
            alias = typeof( alias ) !== 'undefined';
            fetch( key ).then( function ( response ) {
                if ( response.ok ) {
                    response.json().then( function ( json ) {
                            alias ? icons_aliases( json ) : icons( json );
                        }
                    )
                }
            } );
        }

        /**
         * Add core icons to ICONS
         *
         * @param icons
         */
        function icons( icons ) {
            icons.forEach( function ( ic ) {
                ic.prefix            = CFG.prefix;
                ICONS[ ic.iconName ] = ic;
            } );
            get_aliases();
        }

        /**
         * "Aliases" icons have a string value for 'icon' which matches the main icon file iconName.
         *
         * @param aliased
         */
        function icons_aliases( aliased ) {
            aliased.forEach( function ( al ) {
                al.prefix            = CFG.prefix;
                al.icon              = ICONS[ al.icon ].icon;
                ICONS[ al.iconName ] = al;
            } );
            LOADED ++;
            if ( LOADED === CFG.aliases.length ) awesome();
        }

        /**
         * Gets path of this script for use by fetch()
         *
         * @returns {string}
         */
        function path() {

            let scripts= document.getElementsByTagName('script'),
                path= scripts[scripts.length-1].src.split('?')[0];

               return path.split('/').slice(0, -1).join('/')+'/';
        }

    }( window.FontAwesome ) )
} );