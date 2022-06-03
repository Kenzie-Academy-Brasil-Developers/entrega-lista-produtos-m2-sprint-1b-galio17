function listProducts (productsData, tagId, isCart) {
    const productList = document.getElementById(tagId);

    productList.innerHTML = '';    

    productsData.forEach((product) => {
        const newProduct = createProductCard(product, isCart);
        
        productList.append(newProduct);
    }); 
}

function createProductCard (product, isCart) {
    const productCard = document.createElement('li');
    const productImage = createProductImage(product);
    const productDetails = createProductDetails(product, isCart);

    productCard.classList.add('product');
    productCard.id = product.id;

    if(isCart) {
        productCard.classList.add('product--cart');
        productImage.classList.add('product__image--cart');
    }

    productCard.append(productImage, productDetails);

    return productCard;
}

function createProductImage ({ img: image, nome: name }) {
    const productImage = document.createElement('img');

    productImage.src = image;
    productImage.alt = `Imagem de ${name}`;
    productImage.classList.add('product__image');

    return productImage;
}

function createProductDetails(product, isCart) {
    const productDetails = document.createElement('section');
    const productInfo = createProductInfo(product, isCart);
    const productButton = createProductElement('button', (product.promocao) ? 'Promoção' : 'Comprar', 'buttons', 'buttons--cart');

    productDetails.classList.add('product__details');
    productButton.classList.add(`buttons--addCart`);
    
    if(isCart) {
        productDetails.classList.add('product__details--cart');
        productButton.classList.remove(`buttons--addCart`);
        productButton.classList.add(`buttons--removeCart`);

        productButton.innerText = '';
    }

    productDetails.append(productInfo, productButton);
    
    return productDetails;
}

function createProductInfo(product, isCart) {
    const productInfo = document.createElement('div');
    const productTitle = createProductElement('h3', product.nome, 'product__title');
    const productSection = createProductElement('span', product.secao, 'product__section');
    const productPrice = createProductElement('span', (product.promocao) ? product.precoPromocao : product.preco, 'product__price');

    productInfo.classList.add('product__info');
    
    if(isCart) {
        productInfo.classList.add('product__info--cart');
        productTitle.classList.add('product__title--cart');
        productSection.classList.add('product__section--cart');
        productPrice.classList.add('product__price--cart');
        
        productInfo.append(productTitle, productSection, productPrice);
    } else {
        const productNutrients = createProductNutrients(product.componentes);
        
        
        productInfo.append(productTitle, productSection, productNutrients, productPrice);
    }

    return productInfo;
}

function createProductElement (tag, innerText, ...className) {
    const productElement = document.createElement(tag);

    productElement.classList.add(...className)
    productElement.innerText = innerText;

    return productElement;
}

function createProductNutrients(nutrients) {
    const productNutrients = document.createElement('ol');

    productNutrients.classList.add('nutrientsContainer')

    nutrients.forEach((nutrient) => {
        const newNutrient = createProductElement('li', nutrient, 'nutrientsContainer__nutrient');

        productNutrients.append(newNutrient);
    })

    return productNutrients;
}

function runOnClick(cartProductsData) {
    addEventListener('click', (event) => {
        const classButtons = 'buttons'
        if (verifyClass(classButtons)) {
            if(verifyClass(`${classButtons}--cart`)) createCartProducts(cartProductsData, classButtons);
            else filterProducts(classButtons);
    
            loadCart(cartProductsData);
        }
    });
}

function verifyClass(className) {
    return event.target.classList.contains(className);
}

function filterProducts () {
    const currentFilter = document.querySelector('.curFilter');
    let filteredProducts = [];

    if(currentFilter) currentFilter.classList.remove('curFilter');

    if(verifyClass('estiloGeralBotoes--botaoBuscaPorNome')) filteredProducts = createSearchProducts();
    else {
        event.target.classList.add('curFilter');

        if(verifyClass('estiloGeralBotoes--mostrarTodos')) filteredProducts = createSectionProducts('Todos');
        else if(verifyClass('estiloGeralBotoes--filtrarHortifruti')) filteredProducts = createSectionProducts('Hortifruti');
        else if(verifyClass('estiloGeralBotoes--filtrarPanificadora')) filteredProducts = createSectionProducts('Panificadora');
        else if(verifyClass('estiloGeralBotoes--filtrarLaticionio')) filteredProducts = createSectionProducts('Laticínio');
    }

    listProducts(filteredProducts);
    calculatePrice(filteredProducts);
}

function createSearchProducts () {
    const searchInput = document.querySelector('.campoBuscaPorNome');

    if (searchInput.value) {
        const regexCapture = new RegExp(searchInput.value.trim(), 'i');
        
        searchInput.value = '';
        
        return produtos.filter((product) => regexCapture.test(product.nome));
    } else return produtos;
}

function createSectionProducts (sectionOfProducts) {
    if(sectionOfProducts !== 'Todos') return produtos.filter((product) => product.secao === sectionOfProducts);
    else return produtos;
}

function calculatePrice (productsData) {
    const totalPrice = document.getElementById('precoTotal');
    totalPrice.innerText = productsData.reduce((accPrice, product) => accPrice + product.preco, 0).toFixed(2);
}

listProducts(produtos);
calculatePrice(produtos);
addEventListener('click', runOnClick);