## Grocery Product List - API
This Grocery Product API has a basic features of product and category management. It is extendable project means possible to add more features according to need.

# API endpoints
## Product CRUD Operations
After running the application, it will start on port 3000 by default. Then uri will be http://domain.com/api then perform api implementation using endpoints given below
### Create a Product

- **Endpoint**: `POST /product/add`
- **Description**: Create a new grocery product.

### Retrieve a Product

- **Endpoint**: `GET /product/:productId`
- **Description**: Retrieve details of a specific product by its ID.

### Update a Product

- **Endpoint**: `PUT /product/update`
- **Description**: Update an existing product by its ID.

### Delete a Product

- **Endpoint**: `DELETE /product/:productId`
- **Description**: Delete a specific product by its ID.
### Filter Product by (price,category,searching)

- **Endpoint**: `POST /search`
- **Description**: search product by keyword by sending keyword in request body.
- **Endpoint**: `POST /filter-by/price`
- **Description**: filter product by price by sending from and to price in request body.
- **Endpoint**: `POST /filter-by/category`
- **Description**: filter product by category by sending category name in request body.
