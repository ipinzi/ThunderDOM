/**
 * @file thunderDOM.js
 * @brief ThunderDOM/e
 * @author Ben Simpson (ipinzi) - Arrogant Pixel
 **/

console.log("Entering ThunderDOMe...");

let thunderDOMClasses = {};

export class ThunderDOMElement extends HTMLElement{
   constructor(){
        super();
    }
    component(componentHTML) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = componentHTML();
        return this.shadowRoot;
    }
    css(path){
        const css = new CSSStyleSheet();
        const contents = getFileContents(path);
        try{
            css.replace(contents);
            this.shadowRoot.adoptedStyleSheets = [css];
        }catch(err){
            console.error("ThunderDOMe "+err);
        }
    }
    iCss(cssString){
        const css = new CSSStyleSheet();
        try{
            css.replace(cssString);
            this.shadowRoot.adoptedStyleSheets = [css];
        }catch(err){
            console.error("ThunderDOMe "+err);
        }
    }
    bind(querySelector, eventName, callback){
        const el = this.getEl(querySelector);
        el.addEventListener(eventName, callback);
    }
    getElById(id){
        return this.shadowRoot.getElementById(id);
    }
    getEl(querySelector){
        return this.shadowRoot.querySelector(querySelector);
    }
}
export class ThunderDOMElementSSR{
    name = ""; //The name of your web component
    attribute = ""; //Use attribute for the selector of your class for SSR components
    constructor(rootNode){
        this.root = rootNode;
    }
    bind(querySelector, eventName, callback){
        if(querySelector  instanceof String){
            const el = this.getEl(querySelector);
            el.addEventListener(eventName, callback);
        }else{
            querySelector.addEventListener(eventName, callback);
        }
    }
    getElById(id){
        return this.root.getElementById(id);
    }
    getEl(querySelector){
        return this.root.querySelector(querySelector);
    }
    setBindings(){}
}

export function getFileContents(filePath) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, false); // Synchronous request
    xhr.send();
    if (xhr.status === 200) {
        return xhr.responseText;
    } else {
        console.error(`Error fetching ${filePath}: ${xhr.status}`);
        return null;
    }
}
export function DefineComponent(name, thunderDomClass){
    thunderDOMClasses[name] = thunderDomClass;
}
export function BindThunderDOMElement(element, name, thunderDomClass){

    const attribute = `[data-${name}]`
    let thunderDOMElement = new thunderDomClass(element);
    thunderDOMElement.name = name;
    thunderDOMElement.attribute = attribute;
    thunderDOMElement.setBindings();
    return thunderDOMElement;
}
export function BindThunderDOM(classMap = {}){
    const objs = [];
    let map = thunderDOMClasses;
    if(Object.keys(classMap).length > 0)  map = classMap;
    for(const property in map){
        const attribute = `[data-${property}]`
        const thunderDOMElementClass = map[property];
        
        const elements = document.querySelectorAll(attribute);
        elements.forEach((el)=>{
            let thunderDOMElement = new thunderDOMElementClass(el);
            thunderDOMElement.name = property;
            thunderDOMElement.attribute = attribute;
            thunderDOMElement.setBindings();
            objs.push(thunderDOMElement);
        });
    }
    console.log("All components bound successfully. Welcome to the ThunderDOMe")
    return objs;
}

document.addEventListener("DOMContentLoaded", () => {
    const keys = Object.keys(thunderDOMClasses);
    if(keys.length > 0) BindThunderDOM();
});