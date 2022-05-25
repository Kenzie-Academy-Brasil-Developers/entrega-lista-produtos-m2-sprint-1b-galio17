function listFoods (productsData) {
    const productList = document.querySelector('ul');

    productList.innerHTML = '';    

    productsData.forEach((product) => {
        const newProduct = createProductCard(product);
        productList.append(newProduct);
    });
}

listFoods(produtos);