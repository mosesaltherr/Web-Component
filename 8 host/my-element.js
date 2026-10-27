class MyElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
        <section>
            <h2>
                <slot name="title"></slot>
            </h2>
            <div>
                <p>
                    <slot name="parrafo"></slot>
                </p>
            </div>
        </section>
        ${this.getStyles()}
        `;
        return template;
    }

    getStyles() {
        return `
        <style>
        :host {
            display: inline-block;
            with: 100%;
            height: 100px;
            background: grey;
            min-width: 300px;
            min-height: 200px;
            color: white;
            border-radius: 10px;
            padding: 10px;
        }
        :host(.blue) {
            background: blue;
        }
        :host(.blue) p {
            background: black;
        }
        :host h2 {
            color: red;
        }
        :host-context(my-element.card) {
            background: green;
            display: block;
            max-width: 300px;
        }
        </style>
        `
    }

    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('my-element', MyElement);