/*
 Copyright 2022 Tim Pieper, Lennart Dapper

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

let element = null;

const EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};

function createListener(_element, callBackFunction) {
    element = _element
    EventUtil.addHandler(window, "scroll", function () {
        handleElementInViewport(callBackFunction);
        return true;
    });
    EventUtil.addHandler(window, "load", function () {
        handleElementInViewport(callBackFunction);
        return true;
    });
    EventUtil.addHandler(window, "DomContentLoaded", function () {
        handleElementInViewport(callBackFunction);
        return true;
    });
    EventUtil.addHandler(window, "resize", function () {
        handleElementInViewport(callBackFunction);
        return true;
    });
}

function isElementInViewport() {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleElementInViewport(callBackFunction) {
    if (isElementInViewport()) {
        element = callBackFunction();
        //element changed to return-value of callback function
    }

}

module.exports = createListener;

// Allow use of default import syntax in TypeScript
module.exports.default = createListener;