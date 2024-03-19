document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products');
    const sortSelect = document.getElementById('sort');
    const categorySelect = document.getElementById('category');
  
    let productsData = []; // To store the original product data
  
    // Fetch data from the API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(products => {
        productsData = products; // Store original product data
        renderProducts(products);
  
        // Event listener for sorting and filtering changes
        function updateProducts() {
          const filteredProducts = filterProducts(productsData, categorySelect.value);
          const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
          renderProducts(sortedProducts);
        }
  
        // Event listeners for sort and filter selects
        sortSelect.addEventListener('change', updateProducts);
        categorySelect.addEventListener('change', updateProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  
    // Function to render products
    function renderProducts(products) {
      productsContainer.innerHTML = '';
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>Price: $${product.price}</p>
          <p>Category: ${product.category}</p>
        `;
        productsContainer.appendChild(productElement);
      });
    }
  
    // Function to sort products by price
    function sortProducts(products, sortOrder) {
      return products.slice().sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }
  
    // Function to filter products by category
    function filterProducts(products, category) {
      if (!category) {
        return products;
      }
      return products.filter(product => product.category === category);
    }
  });
  