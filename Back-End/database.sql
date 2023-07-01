CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price NUMERIC,
  size VARCHAR(100),
  details TEXT,
  images BYTEA[],
  product_Type TEXT,
  gender TEXT,

);