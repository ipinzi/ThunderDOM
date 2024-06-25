# ThunderDOM/e

### Welcome to the ThunderDOM/e!

ThunderDOM/e is a super lightweight frontend library (Just 2kb un-minified) with no build step! ThunderDOM/e makes it easier to create web components without using huge bloated frameworks like Vue, Svelt, React or Angular or even libs like Solid or jQuery.

ThunderDOM/e components are based off of native web component architecture and use the shadow DOM which has been supported by all browsers since 2020.
This simplifies the process of component creation and aligns the code with other languages using properties, getters, setters and events reducing the cognitive load of the developer and the learning curve of the library.

It's so simple, a developer who knows javascript at the base level can learn in 5 minutes.

ThunderDOM/e should play nicely with HTMX hx- attributes but at this point that is untested so if you try it out, let me know!

ThunderDOM/e is comprised of just two classes and a few functions (as a lot of the functionality is currently built into all browsers), ThunderDOM/e just provides a clear and concise interface with which to interact with the web component system.

This is an example of a ThunderDOMElement:

```js
import * as TD from "../js/thunderDOM/thunderDOM.js";

class MyButton extends TD.ThunderDOMElement{

    //Variable declarations, getters, setters
    _clickCount = 0;
    get clickCount() {
        return this._clickCount;
    }
    set clickCount(value) {
        this._clickCount = value;
        const el = this.getEl("#foo");
        el.textContent = `Click Me (${value} clicks)`;
    }

    //DOM Element HTML, listener bindings and functions
    constructor() {
        super();
        this.root = this.component(()=>{
            return `<button id="foo">Click Me</button>`
        });
        //this.iCss(`#foo{background-color: green;}`); <-- You can also write inline CSS!
        this.css('/css/my-button.css');
        this.bind("#foo","click",(e)=>{this.clickCount++});
    }
}
customElements.define("my-button", MyButton);

```
This allows you to add a button to any page via either frontend or server-side rendering like so:
```html
<my-button></my-button>
```
This means you can use any backend to render your components easily, here is an example in ASP .NET Core!
```cs
@for (var i = 0; i < 10; i++)
{
    <my-button id="button-@i"></my-button>
}
```
This will output a button with an id of "button-0" to "button-9". You can even use these id's for CSS selection of inner shadow dom elements allowing you to style your ThunderDOM components on a per element basis.
```css
/*my-button.css*/
button {
   background-color: yellowgreen;
 }
/*If the shadow dom root (root component / parent) has id "button-1"*/
:host-context(#button-1) button {
   background-color: indigo;
 }
```
This CSS will style all 10 of the button's background color to "yellowgreen" via the component CSS and style just "button-1"'s background colour to "indigo" via the page CSS.
You can also write inline CSS with ```iCss("button{ background-color: yellowgreen; }")``` or use a lib like Tailwind.

### Script Reference:
```js
class ThunderDOMElement{}
```
The base class of all ThunderDOM elements / components. Extend this class to create components.
```js
this.component(componentHTML)
```
Creates the ThunderDOM component from the input html string returned by the delegate function.
```js
this.css(path)
```
Attaches a CSS file to this component for styling.
```js
this.iCss(cssString)
```
Allows for inline CSS styling via an input string.
```js
this.bind(id, eventName, callback)
```
Allows for binding events easily to your component's elements.
```js
this.getElById(id);
```
Returns an element:  Param = An ID for the component's inner element you want to select.
```js
this.getEl(queryString);
```
Shorthand for ```this.root.querySelector(query);```, selects a shadow DOM element via query string within the root component.

### A note from Ipinzi (Arrogant Pixel)

I hope you enjoy using ThunderDOM/e, I made it because I dislike working with all the frontend JS frameworks (except Svelt) and libs. I needed something much lighter, much simpler and something that was easier to understand how to work seamlessly with any backend.

All feedback and criticisms are welcome. Open an issue or [email me directly](mailto:ben@arrogantpixel.com?subject=ThunderDOMe).
