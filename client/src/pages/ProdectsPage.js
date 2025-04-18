import { useState, useEffect } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    // fetch("https://your-api.com/products")
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {/* <img src={product.image} alt={product.name} /> */}
              {/* <img src={product.imageUrl} alt={product.name} /> */}
              <img src={"/images/Xiaomi Phone.jpg"} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
