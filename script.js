document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const category = document.getElementById('category');
    const sort = document.getElementById('sort');

    let objects = [];
    // Fetch data from API and display products
    async function fetchData() {
    
            let response = await fetch('https://fakestoreapi.com/products');
            let data = await response.json();
            objects = data;
            displayProducts(objects);
    }

    // Display products on the page
    function displayProducts(products) {
        container.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Count: ${product.rating.count}</p>
                <p>Rating: ${product.rating.rate}</p>
            `;
            container.appendChild(productCard);
        });
    }
    sort.addEventListener('change', () => {
        const sortType = sort.value;
        const sortedProducts =objects;
        if (sortType === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        displayProducts(sortedProducts);
    });

    filter.addEventListener('change', () => {
        const selected = category.value;
        const filteredProducts = selected
            ? objects.filter(product => product.category === selected)
            : objects;
        displayProducts(filteredProducts);
    });
    fetchData();
});
