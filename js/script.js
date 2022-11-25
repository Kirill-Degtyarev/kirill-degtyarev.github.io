'use strict';

const checkBoxsProducts = document.getElementsByName('check-item');
const generalChecboxProduct = document.getElementById('product-check');
const generalChecboxProductBody =
    document.getElementById('product-check').parentElement.parentElement.childNodes[1].outerHTML;
const missingList = document.querySelectorAll('.items-missing__list-item');
const subTitleSale = document.querySelectorAll('.item-body__price');
const subTitleFabrication = document.querySelectorAll('.item-body__info-fabricator');
const deliverySelector = document.querySelectorAll('.delivery-main__select-item');
const listDelivery = document.querySelectorAll('.delivery-main__addres');
const listItemProduct = document.querySelectorAll('.product-list__item');
const totalPriceEl = document.getElementById('total-price');
const discountPriceBasket = document.getElementById('discount-price');
const discountSumBasket = document.getElementById('discount-sum-price');
const inputTel = document.querySelector('.tel');

inputTel.addEventListener('input', mask, false);
inputTel.addEventListener('focus', mask, false);
inputTel.addEventListener('blur', mask, false);
inputTel.addEventListener('keydown', mask, false);

subTitleFabrication.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
        if (!e.target.classList.contains('show-fabrication')) {
            e.target.classList.add('show-fabrication');
        }
    });
    item.addEventListener('mouseleave', (e) => {
        if (e.target.classList.contains('show-fabrication')) {
            e.target.classList.remove('show-fabrication');
        }
    });
});

subTitleSale.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
        if (!e.target.classList.contains('total-price')) {
            e.target.classList.add('total-price');
        }
    });
    item.addEventListener('mouseleave', (e) => {
        if (e.target.classList.contains('total-price')) {
            e.target.classList.remove('total-price');
        }
    });
});

const onHideProduct = (e) => {
    const dataID = e.currentTarget.dataset.item;
    const listItem = document.querySelector(`.${dataID}`);
    const parent = e.currentTarget.parentElement;
    const parentElement = parent.children[0];
    if (listItem.style.display == 'block' || listItem.style.display == '') {
        listItem.style.display = 'none';
        e.currentTarget.classList.add('rotate-spoiler');
    } else {
        listItem.style.display = 'block';
        e.currentTarget.classList.remove('rotate-spoiler');
    }
    if (dataID === 'product-items__list') {
        if (listItem.style.display === 'none') {
            const currentProductList = document.querySelectorAll('.product-list__item');
            let price = 0;
            let count = 0;
            currentProductList.forEach((item) => {
                const counterProduct = item.querySelector('.amount-counter__count');
                const discountPriceProduct = item.querySelector('.item-body__price-finite');
                price += +discountPriceProduct.textContent.split('сом')[0].replace(/\s/g, '');
                count += +counterProduct.textContent;
            });
            const stringHeader = `<h2 class="title-product">${
                count.toLocaleString() + ' товаров' + ' · ' + price.toLocaleString() + ' сом'
            } </h2>`;
            parentElement.remove();
            parent.insertAdjacentHTML('afterbegin', stringHeader);
        } else {
            parentElement.remove();
            parent.insertAdjacentHTML('afterbegin', generalChecboxProductBody);
        }
    }
};

const selectAllProducts = (e) => {
    if (e.target.checked) {
        checkBoxsProducts.forEach((i) => {
            if (!i.checked) {
                i.click();
                i.checked = true;
            }
        });
    } else {
        checkBoxsProducts.forEach((i) => {
            if (i.checked) {
                i.click();
                i.checked = false;
            }
        });
    }
};

const changeBtnPayment = (e) => {
    const checkBoxPay = e.target.checked;
    const completionBtn = document.querySelector('.completion-btn');
    if (checkBoxPay) {
        completionBtn.value = 'Оплатить ' + totalPriceEl.textContent;
    } else {
        completionBtn.value = 'Заказать';
    }
};

const changeDeliveryAddres = (e) => {
    e.preventDefault();
    const selfItem = e.currentTarget;
    const radioAddres = selfItem.querySelectorAll('input[type="radio"]');
    const pointAddres = document.querySelector('.point-addres');
    const deliveryPointAddres = document.querySelector('.delivery-point__addres');
    const closeContainer = document.querySelector('.close-modal');
    let checkedRadioId;

    radioAddres.forEach((radio) => {
        if (radio.checked) {
            checkedRadioId = radio.id;
        }
    });
    if (checkedRadioId) {
        let labelAdress = document.querySelector(`[for="${checkedRadioId}"]`).children[0]
            .childNodes[0].textContent;
        console.log(labelAdress);
        pointAddres.textContent = labelAdress;
        deliveryPointAddres.textContent = labelAdress;
        closeContainer.click();
    }
};

const changePayCard = (e) => {
    e.preventDefault();
    const selfItem = e.target;
    const radioCard = selfItem.querySelectorAll('input[type="radio"]');
    const closeContainer = document.querySelector('.close-modal');
    const paymentMain = document.querySelector('.pay-main__card');
    const paymentBasket = document.querySelector('.payment-card');
    const paymentMainImg = paymentMain.children[0];
    const paymentMainNumber = paymentMain.children[1].childNodes[0];
    const paymentBasketImg = paymentBasket.children[0];
    const paymentBasketNumber = paymentBasket.children[1];
    let checkedCard;

    radioCard.forEach((radio) => {
        if (radio.checked) {
            checkedCard = radio.id;
        }
    });

    if (checkedCard) {
        const labelCard = document.querySelector(`[for="${checkedCard}"]`);
        const selectedCardImg = labelCard.childNodes[1].innerHTML;
        const selectedCardNumber = labelCard.childNodes[3].innerText;
        paymentMainNumber.innerText = selectedCardNumber;
        paymentBasketNumber.innerText = selectedCardNumber;
        paymentMainImg.innerHTML = selectedCardImg;
        paymentBasketImg.innerHTML = selectedCardImg;
        closeContainer.click();
    }
};

const changeUserInfo = (e) => {
    e.preventDefault();
    const selfItem = e.target;
    const mailInput = document.getElementById('mail');
    const mailInputErr = document.querySelector('.error-email__no');
    const usernameInput = document.getElementById('username');
    const usernameInputErr = document.querySelector('.error-username');
    const surnameInput = document.getElementById('surname');
    const surnameInputErr = document.querySelector('.error-surname');
    const numberInput = document.getElementById('phone');
    const numberInputErr = document.querySelector('.error-number__no');
    const innInput = document.getElementById('inn');
    const innInputErr = document.querySelector('.error-inn');
    if (mailInput.value.length === 0) {
        mailInputErr.style.display = 'block';
        mailInput.style.borderColor = '#F55123';
        mailInput.focus();
    }
    if (usernameInput.value.length === 0) {
        usernameInputErr.style.display = 'block';
        usernameInput.style.borderColor = '#F55123';
        usernameInput.focus();
    }
    if (surnameInput.value.length === 0) {
        surnameInputErr.style.display = 'block';
        surnameInput.style.borderColor = '#F55123';
        surnameInput.focus();
    }
    if (numberInput.value.length === 0) {
        numberInputErr.style.display = 'block';
        numberInput.style.borderColor = '#F55123';
        numberInput.focus();
    }
    if (innInput.value.length === 0) {
        innInputErr.style.display = 'block';
        innInput.style.borderColor = '#F55123';
        innInput.focus();
    }
};

const closeModal = (e) => {
    e.stopPropagation();
    const closeContainer = document.querySelector('.close-modal');
    const itemClose = e.target;
    if (itemClose.classList.contains('close-modal') || itemClose.classList.contains('close-btn')) {
        closeContainer.style.display = 'none';
        document.body.style.overflow = '';
        [...closeContainer.children].forEach((i) => {
            i.style.display = 'none';
        });
    }
};

const openModalPayment = (e) => {
    document.body.style.overflow = 'hidden';
    const closeContainer = document.querySelector('.close-modal');
    const modalPayment = document.querySelector('.modal-payment');
    modalPayment.style.display = 'block';
    closeContainer.style.display = 'flex';
};

const openModalDelivery = (e) => {
    document.body.style.overflow = 'hidden';
    const closeContainer = document.querySelector('.close-modal');
    const modalDelivery = document.querySelector('.modal-delivery');
    modalDelivery.style.display = 'block';
    closeContainer.style.display = 'flex';
};

deliverySelector.forEach((item) => {
    item.addEventListener('click', (e) => {
        const selfItem = e.currentTarget;
        const selfListId = selfItem.dataset.id;
        deliverySelector.forEach((item) => {
            item.classList.remove('active-delivery');
        });
        listDelivery.forEach((item) => {
            if (item.id == selfListId) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        selfItem.classList.add('active-delivery');
    });
});

function mask(event) {
    let keyCode;
    event.keyCode && (keyCode = event.keyCode);

    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    let matrix = '+7 (___) ___-__-__',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, ''),
        new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
    i = new_value.indexOf('_');
    if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
    }
    let reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
            return '\\d{1,' + a.length + '}';
        })
        .replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');

    if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
        this.value = new_value;
        this.parentElement.classList.add('input-valid');
    }
    if (event.type == 'blur' && this.value.length < 5) {
        this.value = '';
        this.parentElement.classList.remove('input-valid');
    }
}

const onInputUsername = (e) => {
    const selfItem = e.target;
    const NAME_REGEXP = /^[a-zа-яЁё\s]+$/i;
    const errorUsername = document.querySelector('.error-username');
    if (NAME_REGEXP.test(selfItem.value) || selfItem.value.length === 0) {
        selfItem.style.color = '#000000';
        selfItem.style.borderColor = '#00000033';
        errorUsername.style.display = 'none';
        selfItem.parentElement.classList.add('input-valid');
    } else {
        errorUsername.style.display = 'block';
        selfItem.style.borderColor = '#F55123';
        selfItem.style.color = '#F55123';
    }
    if (selfItem.value.length === 0) selfItem.parentElement.classList.remove('input-valid');
};

const onInputSurname = (e) => {
    const selfItem = e.target;
    const SURNAME_REGEXP = /^[a-zа-яЁё\s]+$/i;
    const errorSurname = document.querySelector('.error-surname');
    if (SURNAME_REGEXP.test(selfItem.value) || selfItem.value.length === 0) {
        selfItem.style.color = '#000000';
        selfItem.style.borderColor = '#00000033';
        errorSurname.style.display = 'none';
        selfItem.parentElement.classList.add('input-valid');
    } else {
        errorSurname.style.display = 'block';
        selfItem.style.borderColor = '#F55123';
        selfItem.style.color = '#F55123';
    }
    if (selfItem.value.length === 0) selfItem.parentElement.classList.remove('input-valid');
};

const onInputEmail = (e) => {
    const selfItem = e.currentTarget;
    const errorEmail = document.querySelector('.error-email');
    const errorEmailNo = document.querySelector('.error-email__no');
    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    errorEmailNo.style.display === 'block' ? (errorEmailNo.style.display = 'none') : '';
    if (EMAIL_REGEXP.test(selfItem.value) || selfItem.value.length === 0) {
        selfItem.style.color = '#000000';
        selfItem.style.borderColor = '#00000033';
        errorEmail.style.display = 'none';
    } else {
        errorEmail.style.display = 'block';
        selfItem.style.color = '#F55123';
        selfItem.style.borderColor = '#F55123';
    }
    selfItem.value.length === 0
        ? selfItem.parentElement.classList.remove('input-valid')
        : selfItem.parentElement.classList.add('input-valid');
};

const onInputInn = (e) => {
    const selfItem = e.currentTarget;
    const errorInn = document.querySelector('.error-inn');
    if (selfItem.value.length > 10) {
        errorInn.style.display = 'block';
        selfItem.style.color = '#F55123';
        selfItem.style.borderColor = '#F55123';
    } else {
        selfItem.style.color = '#000000';
        selfItem.style.borderColor = '#00000033';
        errorInn.style.display = 'none';
    }
    if (selfItem.value.length === 0) {
        selfItem.style.color = '#000000';
        selfItem.style.borderColor = '#00000033';
        errorInn.style.display = 'none';
    }
    selfItem.value.length === 0
        ? selfItem.parentElement.classList.remove('input-valid')
        : selfItem.parentElement.classList.add('input-valid');
};

listItemProduct.forEach((product) => {
    const productPrice = +product.dataset.price;
    const checkBox = product.querySelector('input[type="checkbox"]');
    const discountProduct = product.querySelectorAll('.price-sale__item');
    const totalPriceProduct = product.querySelectorAll('.item-body__price-total');
    const discountPriceProduct = product.querySelectorAll('.item-body__price-finite');
    const incrementCounterBtn = product.querySelector('.amount-counter__plus');
    const decrementCounterBtn = product.querySelector('.amount-counter__minus');
    const counterProduct = product.querySelector('.amount-counter__count');
    const amountResidueEl = product.querySelector('.item-body__amount-residue');
    const deleteItem = product.querySelector('.amount-actions__delete');
    let amountResidue = 0;
    let discounts = 0;
    if (amountResidueEl) {
        amountResidue = +amountResidueEl.children[0].dataset.residue;
    }
    discountProduct.forEach((item) => {
        let discount = +item.dataset.sale;
        discounts += discount;
    });

    checkBox.addEventListener('change', (e) => {
        const selfItem = e.currentTarget;
        if (selfItem.checked) {
            for (let i = 0; i < checkBoxsProducts.length; i++) {
                if (checkBoxsProducts[i].checked) {
                    generalChecboxProduct.checked = true;
                } else {
                    generalChecboxProduct.checked = false;
                    return;
                }
            }
        } else {
            for (let i = 0; i < checkBoxsProducts.length; i++) {
                if (!checkBoxsProducts[i].checked) {
                    generalChecboxProduct.checked = false;
                    return;
                }
            }
        }
    });

    decrementCounterBtn.addEventListener('click', (e) => {
        const selfItem = e.currentTarget;
        incrementCounterBtn.classList.contains('disabled-amount')
            ? incrementCounterBtn.classList.remove('disabled-amount')
            : '';
        if (+counterProduct.textContent > 1) {
            counterProduct.textContent = +counterProduct.textContent - 1;

            +counterProduct.textContent === 1 ? selfItem.classList.add('disabled-amount') : '';

            if (amountResidueEl) {
                amountResidueEl.children[0].innerText = amountResidue - +counterProduct.textContent;
            }

            discountPriceProduct.forEach((item) => {
                item.innerText =
                    changeDiscountPrice(
                        productPrice,
                        +counterProduct.textContent,
                        discounts,
                    ).toLocaleString() + ' сом';
            });

            totalPriceProduct.forEach((item) => {
                item.innerText =
                    changeTotoalPrice(productPrice, +counterProduct.textContent).toLocaleString() +
                    ' сом';
            });
            changePriceBasket();
        }
    });

    incrementCounterBtn.addEventListener('click', (e) => {
        const selfItem = e.currentTarget;
        decrementCounterBtn.classList.contains('disabled-amount')
            ? decrementCounterBtn.classList.remove('disabled-amount')
            : '';
        if (!selfItem.classList.contains('disabled-amount')) {
            counterProduct.textContent = +counterProduct.textContent + 1;

            +counterProduct.textContent === amountResidue
                ? selfItem.classList.add('disabled-amount')
                : '';

            if (amountResidueEl) {
                amountResidueEl.children[0].innerText = amountResidue - +counterProduct.textContent;
            }

            discountPriceProduct.forEach((item) => {
                item.innerText =
                    changeDiscountPrice(
                        productPrice,
                        +counterProduct.textContent,
                        discounts,
                    ).toLocaleString() + ' сом';
            });

            totalPriceProduct.forEach((item) => {
                item.innerText =
                    changeTotoalPrice(productPrice, +counterProduct.textContent).toLocaleString() +
                    ' сом';
            });
            changePriceBasket();
        }
    });
    deleteItem.addEventListener('click', (e) => {
        product.remove();
        changePriceBasket();
    });
});

missingList.forEach((product) => {
    const deleteItem = product.querySelector('.amount-actions__delete');
    deleteItem.addEventListener('click', (e) => {
        product.remove();
    });
});

const changeDiscountPrice = (price, count, discount) => {
    const ultimatePrice = Math.round(((price * discount) / 100) * count);
    return ultimatePrice;
};

const changeTotoalPrice = (price, count) => {
    const ultimatePrice = Math.round(price * count);
    return ultimatePrice;
};

const changePriceBasket = () => {
    const currentProductList = document.querySelectorAll('.product-list__item');
    let totalPrice = 0;
    let finitePrice = 0;
    let discountSum = 0;
    currentProductList.forEach((item) => {
        const currentCheckBox = item.querySelector('input[type="checkbox"]');
        const totalPriceProductAll = item.querySelectorAll('.item-body__price-total');
        const finitePriceProductAll = item.querySelectorAll('.item-body__price-finite');
        if (currentCheckBox.checked) {
            totalPriceProductAll.forEach((item) => {
                const price = +item.textContent.split('сом')[0].replace(/\s/g, '');
                totalPrice += price;
            });
            finitePriceProductAll.forEach((item) => {
                const finite = +item.textContent.split('сом')[0].replace(/\s/g, '');
                finitePrice += finite;
            });
        }
    });
    discountSum = Math.round(totalPrice / 2 - finitePrice / 2);
    finitePrice = Math.round(finitePrice / 2);
    totalPrice = Math.round(totalPrice / 2);
    discountSumBasket.innerText = '-' + discountSum.toLocaleString() + ' сом';
    discountPriceBasket.innerText = totalPrice.toLocaleString() + ' сом';
    totalPriceEl.innerText = finitePrice.toLocaleString() + ' сом';
    if (currentProductList.length === 0) {
        generalChecboxProduct.checked = false;
    }
};

checkBoxsProducts.forEach((item) => {
    item.addEventListener('change', (e) => {
        const itemParent = item.parentElement.parentElement;
        const priceTotalEl = itemParent.querySelector('.item-body__price-total');
        const priceFiniteEl = itemParent.querySelector('.item-body__price-finite');
        const priceTotal = +priceTotalEl.textContent.split('сом')[0].replace(/\s/g, '');
        const priceFinite = +priceFiniteEl.textContent.split('сом')[0].replace(/\s/g, '');
        const couterBasketHeader = document.querySelector('.header__basket-count');
        const priceDiscount = priceTotal - priceFinite;
        const counterBasketTotal = document.getElementById('number-of-product');
        if (e.target.checked) {
            totalPriceEl.textContent =
                (
                    +totalPriceEl.textContent.split('сом')[0].replace(/\s/g, '') + priceFinite
                ).toLocaleString() + ' сом';
            discountPriceBasket.textContent =
                (
                    +discountPriceBasket.textContent.split('сом')[0].replace(/\s/g, '') + priceTotal
                ).toLocaleString() + ' сом';
            discountSumBasket.textContent =
                '-' +
                (
                    +discountSumBasket.textContent.split('сом')[0].replace(/\s/g, '') * -1 +
                    priceDiscount
                ).toLocaleString() +
                ' сом';
            couterBasketHeader.textContent = +couterBasketHeader.textContent + 1;
            if (+couterBasketHeader.textContent !== 0) {
                couterBasketHeader.style.display = 'flex';
            }
            counterBasketTotal.textContent =
                +counterBasketTotal.textContent.split('товара')[0].replace(/\s/g, '') +
                1 +
                ' товара';
        } else {
            totalPriceEl.textContent =
                (
                    +totalPriceEl.textContent.split('сом')[0].replace(/\s/g, '') - priceFinite
                ).toLocaleString() + ' сом';
            discountPriceBasket.textContent =
                (
                    +discountPriceBasket.textContent.split('сом')[0].replace(/\s/g, '') - priceTotal
                ).toLocaleString() + ' сом';
            discountSumBasket.textContent =
                '-' +
                (
                    +discountSumBasket.textContent.split('сом')[0].replace(/\s/g, '') * -1 -
                    priceDiscount
                ).toLocaleString() +
                ' сом';
            couterBasketHeader.textContent = +couterBasketHeader.textContent - 1;
            if (+couterBasketHeader.textContent === 0) {
                couterBasketHeader.style.display = 'none';
            }
            counterBasketTotal.textContent =
                +counterBasketTotal.textContent.split('товара')[0].replace(/\s/g, '') -
                1 +
                ' товара';
        }
    });
});
