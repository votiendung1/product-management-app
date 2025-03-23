document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

    const response = await fetch('https://your-backend-url/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, category })
    });

    if (response.ok) {
        alert("Product added successfully!");
        fetchProducts();
    } else {
        alert("Error adding product");
    }
});

// Fetch products
async function fetchProducts() {
    const response = await fetch('https://your-backend-url/products');
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(p => `<li>${p.name} - $${p.price}</li>`).join('');
}

fetchProducts();
