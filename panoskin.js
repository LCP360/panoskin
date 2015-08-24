var PANOSKIN = {

    createViewer: function(obj) {

        var id = obj.id;
        var tour = obj.tour;
        var url = (obj.dev) ? document.domain + ":" + location.port : 'panoskin.com';

        if (!obj.id || !obj.tour) return console.log('Please specifiy the id and tour link');

        var iframe = document.createElement('iframe'), frameSrc = "//" + url + '/_.html?id=' + id + '&tour=' + tour;
        iframe.src = (obj.legacy) ? frameSrc + "&legacy=true" : frameSrc;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.frameBorder = "none";
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('webkitallowfullscreen', 'true');
        iframe.setAttribute('mozallowfullscreen', 'true');
        iframe.setAttribute('scrolling', 'no');
        iframe.className = "ps_panoskinTour";


        var pano = document.getElementById(id);
        pano.appendChild(iframe);

        pano.addEventListener("enterFullScreen", function () {

            var e = pano;
            e.setAttribute('data-attr-fullscreen', 'true');
            e.setAttribute('data-attr-style-bk', e.getAttribute('style') || '');
            e.setAttribute('style', 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000000;max-width:100%;max-height:100%;');

        });

        pano.addEventListener("exitFullScreen", function () {

            var e = pano;
            e.removeAttribute('data-attr-fullscreen');
            e.setAttribute('style', e.getAttribute('data-attr-style-bk') || '');
            e.removeAttribute('data-attr-style-bk');
        });




    },
    event: function(el, event, fnc) {

        if (el.attachEvent) el.attachEvent("on" + event, fnc);
        else if (el.addEventListener) el.addEventListener(event, fnc, false);

    },
    GA: function(param) {

        // Fire Analytics
        window._gaq = window._gaq || [];

        if (param.trackPageView) {
            console.log('Tracking event ' + param.trackPageView)
            window._gaq.push(['_trackPageview', param.trackPageView]);
        }

        if (param.redirect) document.location.href = param.redirect;

    },
    fireEvent: function (element, event) {

       if (document.createEvent) {
           // dispatch for firefox + others
           var evt = document.createEvent("HTMLEvents");
           evt.initEvent(event, true, true ); // event type,bubbling,cancelable
           return !element.dispatchEvent(evt);
       } else {
           // dispatch for IE
           var evt = document.createEventObject();
           return element.fireEvent('on'+event,evt)
       }

    },
    fullScreen: function(param) {

        if (!param.id) return;

        var id = param.id;
        var e = PANOSKIN.fullscreenedTour = document.getElementById(id);


        if (e.getAttribute('data-attr-fullscreen')) PANOSKIN.fireEvent(e, "exitFullScreen");
        else PANOSKIN.fireEvent(e, "enterFullScreen");
    },
    exitFullScreen: function (param){

        var id = param.id;
        var e = PANOSKIN.fullscreenedTour = document.getElementById(id);

        PANOSKIN.fireEvent(e, "exitFullScreen");
    },
    redirect: function(param) {
        if (param.url) document.location = param.url;
    }
}


// Cross Frame Event from panoskin.com
PANOSKIN.event(window, 'message', function (e) {

    var domain = e.origin
                  .split('.com')[0]
                  .replace("http://", "")
                  .replace("https://", "")
                  .replace("viewer.", "")
                  .replace("panoskin.", "")
                  .replace("www.", "")
                  .split(':')[0]
                  .toLowerCase();

    var data = JSON.parse(e.data);


    if (domain == "panoskin" || domain == "localhost") {
        PANOSKIN[data.fnc](data.param);
    }
     
});