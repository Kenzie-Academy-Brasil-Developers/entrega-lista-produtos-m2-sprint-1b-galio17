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

function createProductInfo (tag, innerText) {
    const productInfo = document.createElement(tag);

    productInfo.innerText = innerText;

    return productInfo;
}

function runOnClick (event) {
    if (verifyClass('estiloGeralBotoes')) {
        filterProducts();
    }
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