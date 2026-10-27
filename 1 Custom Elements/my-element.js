const templateHTML = `
<style>
    .texto { color: red; }
    p { color: blue; }
</style>
<p>Hello World 2</p>
<p>Hello World 3</p>
<p>Hello World 4</p>
`;

class MyElement extends HTMLElement {
    constructor() {
        super();

        this.container = document.createElement('div');
        this.container.innerHTML = templateHTML;
        
        this.p = document.createElement('p');
        this.p.textContent = 'Hello World';
    }

    connectedCallback() {
        this.appendChild(this.p);
        this.appendChild(this.container);
    }
}

customElements.define('my-element', MyElement);