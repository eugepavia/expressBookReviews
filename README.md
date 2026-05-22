# coding-project-template

## Endpoints:

### Public access
POST '/register'            Register user
POST '/customer/login'      Login user
GET '/'                     Get book list
GET '/isbn/:isbn'           Get book details based on ISBN
GET '/author/:author'       Get book details based on author
GET '/title/:title'         Get book details based on title
GET '/review/:isbn'         Get book reviwe

### Login needed
PUT '/auth/review/:isbn'    Add book review
