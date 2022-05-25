function listFoods (productsData) {
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


listFoods(produtos);