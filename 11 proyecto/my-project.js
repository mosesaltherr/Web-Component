customElements.define('merchandise-card', class MerchandiseCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['brand', 'prod_img', 'alt_img', 'name', 'model', 'price', 'name_button', 'effect_3d'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.render();
        }
    }

    mouseMovedCard(event) {
        const card = this.shadowRoot.querySelector('.card');
        if (!card) return;

        let xAxis = (window.innerWidth / 2 - event.pageX) / 10;
        let yAxis = (window.innerHeight / 2 - event.pageY) / 10;

        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    mouseEnterCard() {
        const card = this.shadowRoot.querySelector('.card');
        if (!card) return;

        card.style.transition = "none";
    }

    mouseLeaveCard() {
        const card = this.shadowRoot.querySelector('.card');
        if (!card) return;

        card.style.transition = "all 0.3s ease";
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }

    handleEvent(event) {
        switch (event.type) {
            case 'mousemove':
                this.mouseMovedCard(event);
                break;
            case 'mouseenter':
                this.mouseEnterCard(event);
                break;
            case 'mouseleave':
                this.mouseLeaveCard(event);
                break;
        }
    }

    getTemplate() {
        const brand = this.getAttribute('brand') || '';
        const prodImg = this.getAttribute('prod_img') || '';
        const altImg = this.getAttribute('alt_img') || '';
        const name = this.getAttribute('name') || '';
        const model = this.getAttribute('model') || '';
        const price = this.getAttribute('price') || '';
        const nameButton = this.getAttribute('name_button') || 'Buy';

        const template = document.createElement('template');
        template.innerHTML = `
        ${this.getStyles()}
        <section class="card">
            <div class="card_up">
                <p class="card_brand">${brand}</p>
                <img class="card_img" src="${prodImg}" alt="${altImg}">
            </div>
            <div class="card_down">
                <div class="card_text">
                    <h2 class="card_name">${name}</h2>
                    <p class="card_model">${model}</p>
                </div>
                <p class="card_description"><slot></slot></p>
                <div class="card_pricebuy">
                    <p class="card_price">${price}</p>
                    <button class="card_btn">${nameButton}</button>
                </div>
            </div>
        </section>
        `;
        return template;
    }

    getStyles() {
        return `
        <style>
        :host {
            --primary-color: #504682;
            --secundary-color: #e4e4e4;
            --brand-font: 'Montserrat', sans-serif;
            --brand-size: 22px;
            --brand-color: var(--primary-color);
            --name-font: 'Montserrat', sans-serif;
            --name-size: 18px;
            --name-color: var(--primary-color);
            --model-font: 'Montserrat', sans-serif;
            --model-size: 16px;
            --model-color: var(--primary-color);
            --description-font: 'Montserrat', sans-serif;
            --description-size: 14px;
            --description-color: var(--primary-color);
            --price-font: 'Montserrat', sans-serif;
            --price-size: 14px;
            --price-color: var(--primary-color);
            --btn-font: 'Montserrat', sans-serif;
            --btn-size: 14px;
            --btn-width: 100px;
            --btn-height: 40px;
            --btn-hover-color: #7b6dff;
            --btn-border-radius: 4px;
            perspective: 1000px;
            perspective-origin: center;
            display: block;
            width: 100%;
            height: 100%;
        }

        .card {
            display: flex;
            min-width: 270px;
            max-width: 300px;
            height: 550px;
            padding: 0 12px;
            margin: auto;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 0px 10px rgba(22, 22, 22, 0.925);
            transform-style: preserve-3d;
            background-color: var(--secundary-color);
            border-radius: 8px;
            overflow: hidden;
            -webkit-user-select: none;
            user-select: none;
            transition: all 0.3s ease;
        }

        .card_up {
            display: flex;
            width: 100%;
            height: 45%;
            padding: 0 12px;
            position: relative;
            justify-content: flex-start;
            align-items: flex-start;
            background-color: var(--primary-color);
        }

        .card_brand {
            width: 100%;
            height: auto;
            margin: 15px 0 0 0;
            font-size: var(--brand-size);
            font-weight: bold;
            font-family: var(--brand-font);
            color: #ffffff;
        }

        .card_img {
            width: 90%;
            height: auto;
            position: absolute;
            bottom: -45px;
            right: 20px;
            object-fit: contain;
            transition: transform 0.75s ease-out;
        }

        .card_down {
            width: 100%;
            height: 55%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            padding: 0 12px;
            background-color: var(--secundary-color);
        }

        .card_text {
            display: flex;
            width: 100%;
            height: 40px;
            margin-top: 30px;
            margin-bottom: 10px;
            justify-content: flex-start;
            align-items: baseline;
        }

        .card_name {
            width: 60%;
            height: auto;
            margin: 0;
            font-size: var(--name-size);
            font-family: var(--name-font);
            color: var(--name-color);
        }

        .card_model {
            width: 40%;
            height: auto;
            margin: 0;
            text-transform: uppercase;
            font-weight: bold;
            font-size: var(--model-size);
            font-family: var(--model-font);
            color: var(--model-color);
        }

        .card_description {
            width: 100%;
            height: 130px;
            margin: 0;
            padding: 10px 0;
            text-align: left;
            font-size: var(--description-size);
            font-family: var(--description-font);
            color: var(--description-color);
        }

        .card_pricebuy {
            display: flex;
            width: 100%;
            height: 60px;
            justify-content: space-between;
            align-items: center;
        }

        .card_price {
            margin: 0;
            font-weight: bold;
            font-size: var(--price-size);
            font-family: var(--price-font);
            color: var(--price-color);
        }

        .card_btn {
            width: var(--btn-width);
            height: var(--btn-height);
            border-style: none;
            border-radius: var(--btn-border-radius);
            font-size: 11px;
            font-weight: bold;
            color: var(--secundary-color);
            background-color: var(--primary-color);
            box-shadow: 0px 0px 10px rgba(22, 22, 22, 0.925);
            cursor: pointer;
            transition: background-color 100ms ease-out, transform 100ms ease-out;
        }

        .card_btn:hover {
            background-color: var(--btn-hover-color);
            color: #161618;
        }

        .card_btn:active {
            transform: scale(0.9);
        }

        @media screen and (min-width: 900px) {
            .card {
                max-width: 650px;
                width: 650px;
                height: 400px;
                padding: 0;
                flex-direction: row;
            }

            .card_up {
                width: 50%;
                height: 100%;
            }

            .card_img {
                bottom: 40px;
                right: 10px;
                transform: rotateZ(-10deg) scale(1.4);
            }

            .card_down {
                width: 50%;
                height: 100%;
                padding-inline: 40px;
            }

            .card_text {
                width: 100%;
                height: 80px;
                margin-top: 65px;
                margin-bottom: 0px;
                flex-direction: column;
            }

            .card_name {
                width: 100%;
                font-size: 30px;
            }

            .card_model {
                width: 100%;
                font-size: 13px;
            }

            .card_description {
                font-size: 13px;
            }

            .card_pricebuy {
                margin-top: 20px;
            }
        }
        </style>`
    }

    render() {
        this.shadowRoot.replaceChildren(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
        if (this.getAttribute('effect_3d') === 'true') {
            this.addEventListener('mousemove', this);
            this.addEventListener('mouseenter', this);
            this.addEventListener('mouseleave', this);
        }
    }

    disconnectedCallback() {
        this.removeEventListener('mousemove', this);
        this.removeEventListener('mouseenter', this);
        this.removeEventListener('mouseleave', this);
    }
});