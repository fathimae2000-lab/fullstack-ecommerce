const getProducts = `
SELECT 
  products.id,
  products.product_name,
  products.image,
  products.price,
  products.offerprice,
  products.rating,
  categories.name AS category
FROM products
JOIN categories 
ON products.category_id = categories.id
`

const getProductById = `
SELECT 
  products.id,
  products.product_name,
  products.image,
  products.price,
  products.offerprice,
  products.rating,
  categories.name AS category
FROM products
JOIN categories 
ON products.category_id = categories.id
WHERE products.id = $1
`

const createProduct = 'INSERT INTO products(product_name, image, price, offerprice, category_id, rating) VALUES ($1,$2,$3,$4,$5,$6)'

module.exports = {
    getProducts,
    getProductById,
    createProduct,
}