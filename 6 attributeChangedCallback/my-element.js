class MyElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'parrafo', 'img'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
        <section>
            <h2>
                ${this.title}
            </h2>
            <div>
                <p>${this.parrafo}</p>
                <img src="${this.img}" alt="">
            </div>
        </section>
        ${this.getStyles()}
        `;
        return template;
    }

    getStyles() {
        return `
        <style>
            .title {
                color: red;
            }
        </style>
        `
    }

    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.title = this.getAttribute('title');
        this.parrafo = this.getAttribute('parrafo');
        this.img = this.getAttribute('img');

        this.render();
    }
}

customElements.define('my-element', MyElement);