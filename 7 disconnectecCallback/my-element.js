class MyCustomElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Connected');
    }

    disconnectedCallback() {
        console.log('Disconnected');
    }
}

customElements.define('my-custom-element', MyCustomElement);

const boton = document.querySelector('#btn-eliminar');
boton.addEventListener('click', () => {
    const elemento = document.querySelector('my-custom-element');
    if (elemento) {
        elemento.remove(); // Esto dispara automáticamente el disconnectedCallback
    } else {
        console.log('El componente ya no existe en el DOM');
    }
});