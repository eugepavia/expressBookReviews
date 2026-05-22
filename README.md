# Book Review App (practice project)

## Endpoints:

### Public access
|METHOD  |ENDPOINT          |ACTION                              |
|:------:|:-----------------|:-----------------------------------|
|POST    | /register        | Register user                      |
|POST    | /customer/login  | Login user                         |
|GET     | /books           | Get book list                      |
|GET     | /isbn/:isbn      | Get book details based on ISBN     |
|GET     | /author/:author' | Get book details based on author   |
|GET     | /title/:title    | Get book details based on title    |
|GET     | /review/:isbn    | Get book reviews                   |       

### Login needed
PUT '/customer/auth/review/:isbn'    Add book review

|METHOD      |ENDPOINT                     |ACTION                                    |
|:---------:|:-----------------------------|:-----------------------------------------|
|PUT        | /customer/auth/review/:isbn  | Add or modify review (1xUser and 1xBook) |
|DELETE     | /customer/auth/review/:isbn  | Delete review (user owned only)          |

### To improve
* Make branch with axios instead of async/await
* Change send(JSON.stringify(response)) for just json(response)