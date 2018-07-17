# Weather Icons + Font Awesome

This snippet of JS adds the weather icons originally found at https://github.com/erikflowers/weather-icons to 
Font Awesome 5 __JS/SVG__ as "native" FA icons. Which means you can do any of the cool things
FA allows--layering, rotating, resizing, bullets...

Pull requests to clean up, fix things, or make the code less stupid are welcome. (I may take ages
to do anything about it, but your contributions are valued, I promise.)

While I do have a design background, I am not drawing new icons...but if you  
have glyphs which fit into the beautiful look of these icons (as determined by me), throw them into the
issue tracker or make a pull request and we'll see how snooty I am.

## How to Use

Your web page already has Font Awesome 5 JS+SVG included, eh? Ok, cool, cool... 

Add `fa-weather-icons.js` to your page. 
Note that the `cfg` directory needs to stay where it is in relation to the JS file--
or adjust the path in the `CFG` array if you move it. 

If you don't make any changes to the `CFG` array, weather icons + the Open Weather Map aliased icons
should be available by default (see example below). Note the notes, however.

( _Technical detail which is barely technical:_ The JS will wait for the DOM to load, and if 
`Window.Fontawesome` is found, adds the weather icons. )

## Notes

* This is not a font, per se. It piggyback's on FA 5's `Library` api to add SVG paths directly to FA.
* Did I mention this only works with the JS/SVG version of FA 5?
* Aliased glyphs are added as complete copies of the original icon they alias--nothing smart is 
done here with sprites or other performant shenanigans.
* Weather Icons are added to FA without specifying a Unicode character, so referencing them directly as
psuedo elements may prove challenging. If someone would like to find a batch of unused Unicode characters to
use in `icons.json`, which will direct FA to use said codes, I'm not against it...just don't have the time or 
knowledge to do so properly.
* The nifty wind direction classes on the original are not mimicked--instead, use FA's arbitrary 
rotation transformations.
* I preserved the sizing hints in the original SVG font, but it's not clear to me if FA pays mind to them.
* Icon names are the original names, except you need to use "fa" instead of "wi". `wi-cloudy` 
becomes `fa-cloudy`. You will need to use the custom `fawi` prefix as well:

```
<i class="fawi fa-wind"></i>
```

You can change the prefix in the JS `CFG` array if "fawi" doesn't do it for you.

## Configuration

This is a pretty "dumb" JS file--it is not invoked by other scripts, isn't meant to be chained, and doesn't
have any getters or setters (for now, anyway). It also doesn't have any requirements other than Font Awesome.

That said, there is some minimal configuration you can do directly in the JS file:

* By default, the FA prefix for these icons is "fawi". You can change that to whatever you like. 
* The APIs supported by Weather Icons are still supported by this conversion, but you will need to be 
sure to add them to the `CFG.aliases` array. You can see their filenames in the `cfg` directory. 
Snip the "aliased-" from the front and ".json" from the back to add them:

```
aliases: [ 'owm', 'moon', 'yahoo' ],
```

## JSON

`icons.json` does not contain any icons which are were aliased in the original font. In practical terms, 
the api-specific icon names and the "moon" icons referenced by number were aliases, and are now
in their own `aliased-` files.

The JSON files can be edited to your heart's content, removing unneeded icons or adding your own. Actual 
glyphs should go into the "icons.json" file. Alias files should reference the `iconName` of the original
icon. Peek at the JSON to see what I mean.

## Change Log

### 1.0

* Initial release.

## License

* This is licensed under the original licenses for Weather Icons and Font Awesome, as applicable. 
* Feel free to use the bits I've contributed as you please. (If you make a cajillion dollars from those
bits, I reserve the right to whine at you about it, in hopes you'll send me a modestly-sized crate of cash
just to shut me up.)
* That said, you _could_ hire me, or even just say nice things about me. It wouldn't kill you just 
this once, would it? We _talked_ about this...