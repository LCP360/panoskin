var PANOSKIN = {

    createViewer: function(obj) {

        var id = obj.id,
            tour = obj.tour,
            url = (obj.dev) ? document.domain + ":" + location.port : 'panoskin.lcp360.com';

        if (!obj.id || !obj.tour) return console.log('Please specifiy the id and tour link');

        var iframe = document.createElement('iframe'), frameSrc = "//" + url + '/_.html?id=' + id + '&tour=' + tour;
        iframe.src = (obj.legacy) ? frameSrc + "&legacy=true" : frameSrc;
        iframe.style.width = "inherit";
        iframe.style.height = "inherit";
        iframe.style.border = "none";
        iframe.frameBorder = "none";
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('scrolling', 'no');
        document.getElementById(id).appendChild(iframe);
    },
    event: function(el, event, fnc) {

        if (el.attachEvent) el.attachEvent("on" + event, fnc);
        else if (el.addEventListener) el.addEventListener(event, fnc, false);

    },
    GA: function(param) {

        // Fire Analytics
        var _gaq = _gaq || [];

        if (param.trackPageView) {

            console.log('Track Page View: ' + param.trackPageView);
            _gaq.push(['_trackPageview', param.trackPageView]);
        }

        // Debug Mode
        if (param.panoid && param.debug) console.log("Moving to pano: " + param.panoid + "\n\n" + "Tracking as: " + param.trackPageView);
        else if (param.debug) console.log("Tracking as: " + param.trackPageView);
        if (param.redirect) document.location.href = param.redirect;

    },
    fullScreen: function(param) {

        var id = param.id,
            prefix = ["webkit", "moz", "o", "ms", ""],
            fullScreenFnc = function(e, r) {
                for (var i, f, t = 0; t < prefix.length && !e[i];) {
                    if (i = r, "" == prefix[t] && (i = i.substr(0, 1).toLowerCase() + i.substr(1)), i = prefix[t] + i, f = typeof e[i], "undefined" != f) return prefix = [prefix[t]], "function" == f ? e[i]() : e[i];
                    t++
                }
            };

        if (!id) return;

        var el = document.getElementById(id);

        if (el.getAttribute('data-attr-fullscreen') || fullScreenFnc(document, "FullScreen") || fullScreenFnc(document, "IsFullScreen")) {

            el.setAttribute('style', el.getAttribute('data-attr-style-bk'));
            el.removeAttribute('data-attr-style-bk');
            el.removeAttribute('data-attr-fullscreen');
            fullScreenFnc(document, "CancelFullScreen");

        } else {

            fullScreenFnc(el, "RequestFullScreen");
            el.setAttribute('data-attr-style-bk', el.getAttribute('style'));
            el.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000000; max-width: 100%; max-height: 100%;');
            el.setAttribute('data-attr-fullscreen', 'true');
        }

    },
    redirect: function(param) {
        if (param.url) document.location = param.url;
    }
}


// Cross Frame Event
PANOSKIN.event(window, 'message', function (e) {

    var domain = e.origin.split('viewer.')[1] || e.origin,
        data = JSON.parse(e.data);
        domain = domain.split('.com')[0] || domain,
        domain = domain.toLowerCase();

	console.log(domain)

    if (domain == "panoskin" || domain == "lcp360" || domain == "localhost") {
        PANOSKIN[data.fnc](data.param);
    }
	
 
});