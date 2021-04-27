class Load {


    static _DefaultLoadingTime = 3000;
    static _DefaultLoadingClasses = ["loading"];
    static _DefaultLoadedClasses = ["loaded"];
    LoadingTime;
    DocumentPreloading;
    ElementsPreloading;

    constructor(settings) {
        const _Class = this;

        for (var key in settings) {
            if (_Class.hasOwnProperty(key)) {
                if (settings[key]) {
                    _Class[key] = settings[key];
                } else if (_Class.hasOwnProperty("_Default" + key)) {
                    _Class[key] = _Class["_Default" + key];
                }
            }
        }

        if (_Class.DocumentPreloading) _Class._documentPreloading();
    }

    _documentPreloading() {
        _Class.ElementsPreloading.forEach(function(elems, i) {
            const loadElements = document.querySelectorAll(elems);
            loadElements.forEach(function(elem, key) {

            });
        });

    }


}

new Load({
    DocumentPreloading: true,
    ElementsPreloading: [
        "p", "h1", "h2", "h3", "h4", "h5", "h6", "button", "input", "img"
    ],
    LoadingTime: 5000
});