class Helper {

    static getNodeElementById(node) {
        return typeof node == 'string' ? document.getElementById(node) : node;
    }

    static addClass(node, classString) {
        let object = Helper.getNodeElementById(node);
        let regExp = new RegExp("(^|\\s)" + classString + "(\\s|$)", "g")
        if (regExp.test(object.className)) return
        object.className = (object.className + " " + classString).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
    }

    static removeClass(node, classString) {
        let object = Helper.getNodeElementById(node);
        let regExp = new RegExp("(^|\\s)" + classString + "(\\s|$)", "g")
        object.className = object.className.replace(regExp, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
    }

    static toggle(node) {
        let object = Helper.getNodeElementById(node);
        object.style.display = (object.style.display == 'none') ? '' : 'none'
    }

    static insertAfter(parent, node, referenceNode) {
        let object = Helper.getNodeElementById(node);
        let referenceObject = Helper.getNodeElementById(referenceNode);
        parent.insertBefore(object, referenceObject.nextSibling);
    }

    static getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    static setCookie(name, value, props) {
        props = props || {}
        var exp = props.expires
        if (typeof exp == "number" && exp) {
            var d = new Date()
            d.setTime(d.getTime() + exp * 1000)
            exp = props.expires = d
        }
        if (exp && exp.toUTCString) { props.expires = exp.toUTCString() }

        value = encodeURIComponent(value)
        var updatedCookie = name + "=" + value
        for (var propName in props) {
            updatedCookie += "; " + propName
            var propValue = props[propName]
            if (propValue !== true) { updatedCookie += "=" + propValue }
        }
        document.cookie = updatedCookie
    }

    static deleteCookie(name) {
        setCookie(name, null, { expires: -1 })
    }

    static parseXml(xml, arrayTags) {
        let dom = null;
        if (window.DOMParser) dom = (new DOMParser()).parseFromString(xml, "text/xml");
        else if (window.ActiveXObject) {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml)) throw dom.parseError.reason + " " + dom.parseError.srcText;
        } else throw new Error("cannot parse xml string!");

        function parseNode(xmlNode, result) {
            if (xmlNode.nodeName == "#text") {
                let v = xmlNode.nodeValue;
                if (v.trim()) result['#text'] = v;
                return;
            }

            let jsonNode = {},
                existing = result[xmlNode.nodeName];
            if (existing) {
                if (!Array.isArray(existing)) result[xmlNode.nodeName] = [existing, jsonNode];
                else result[xmlNode.nodeName].push(jsonNode);
            } else {
                if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1) result[xmlNode.nodeName] = [jsonNode];
                else result[xmlNode.nodeName] = jsonNode;
            }

            if (xmlNode.attributes)
                for (let attribute of xmlNode.attributes) jsonNode[attribute.nodeName] = attribute.nodeValue;

            for (let node of xmlNode.childNodes) parseNode(node, jsonNode);
        }

        let result = {};
        for (let node of dom.childNodes) parseNode(node, result);

        return result;
    }

}