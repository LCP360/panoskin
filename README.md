# Panoskin.js, a client library used to load the Panoskin viewer
Panoskin is the toolbelt to your Google Business tours. It adds a skinable, customizable, interactive UI to your existing Google Business tours. Panoskin also supports interactive image and video galleries, works with Google Analytics, and can be used to load a custom virutal tour from LCP360. Panoskin works on mobile, does not require you to load any other external libraries to work, and can be easily added within any webpage.

## How it works
Load Panoskin library by either referencing the latest minified version served from our CDN or through Bower.

```html
<script src="//lcp360.cachefly.net/panoskin.min.js"></script>
```

`Bower install panoskin`

Call the createViewer method after loading the Panoskin library, passing in an id of the container you want to load the tour into and the tour id that you want to load. Note, your domain(s) will need to be whitelisted for the tours you are attempting to load.

```html
<div id="pano"></div>

<script src="//lcp360.cachefly.net/panoskin.min.js"></script>
<script>
  PANOSKIN.createViewer({
    id: 'pano',
    tour: '/cambria/'
  });
</script>
```

Some optional CSS to make your container fluid

```css
  #pano {
    width: 100%;
    height: 70%;
    max-height: 500px;
    max-width: 700px;
  }
```
Versioning
```bash
git add --all
git commit -m "Releasing v1.0.7"
git tag v1.0.7
git push origin master --tags
```
