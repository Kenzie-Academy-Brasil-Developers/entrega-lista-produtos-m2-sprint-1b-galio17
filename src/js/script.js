function listProducts (productsData) {
    const productList = document.querySelector('ul');

    productList.innerHTML = '';    

    productsData.forEach((product) => {
        const newProduct = createProductCard(product);
        productList.append(newProduct);
    });
}

function createProductCard (product) {
    const productCard = document.createElement('li');
    const productImage = createProductImage(product);
    const productTitle = createProductInfo('h3', product.nome);
    const productPrice = createProductInfo('p', `R$ ${product.preco.toFixed(2)}`);
    const productSection = createProductInfo('span', `${product.secao}`);

    productCard.append(productImage, productTitle, productPrice, productSection);

    return productCard;
}

function createProductImage (product) {
    const productImage = document.createElement('img');

    productImage.src = product.img;
    productImage.alt = `Imagem de ${product.nome}`;

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