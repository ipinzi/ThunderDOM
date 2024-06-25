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
export class ThunderDOMElement extends HTMLElement{
    component(componentHTML) {
        const root = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = componentHTML();
        return root;
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
        return this.root.getElementById(id);
    }
    getEl(querySelector){
        return this.root.querySelector(querySelector);
    }
}