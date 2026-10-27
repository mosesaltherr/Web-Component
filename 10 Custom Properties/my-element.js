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
                --primary-color: red;
                --heading-primary: 50px;
                --heading-secondary: 20px;
            }
            h2 {
                color: var(--primary-color);
                font-size: var(--heading-primary);
            }
            p {
                color: var(--secondary-color);
                font-size: var(--heading-secondary);
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