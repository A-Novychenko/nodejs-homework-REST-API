# nodejs-homework-REST-API

Server application for storing contacts in db-mongoos for registered users. Registration with email verification. Authorization and authentication with JWT issuance. Also implemented is the storage of the user's avatar on the server

## API base URL

```
https://nodejs-homework-rest-api-x682.onrender.com/api
```

# User

## `POST /users/register`

Create a new user

```
/users/register
```

`Parameters`

No parameters

`Request body`

Content-Type: application/json

Example Value:

```
{
  "email": "test@gmail.com",
  "password": "examplepassword"
}
```

`Responses`

201 User created.

400 User creation error.

409 User creation error - conflict.

500 Server error.

`Verification`

After successful registration, an email with a verification link is sent to the user's email.

`Responses`

200 Verification successful.

404 User not found.

500 Server error.

To resend the verification email, use:

```
/users/verify
```

`Parameters`

No parameters

`Request body`

Content-Type: application/json

Example Value:

```
{
  "email": "test@gmail.com"
}
```

`Responses`

200 Verification email sent.

400 missing required field email.

400 Verification has already been passed.

500 Server error.

## `POST /users/login`

Login user

```
/users/login
```

`Parameters`

No parameters

`Request body`

Content-Type: application/json

Example Value:

```
{
  "email": "test@gmail.com",
  "password": "examplepassword"
}
```

`Responses`

200 User created.

400 User creation error.

401 Email or password is wrong

500 Server error.

## `GET /users/logout`

Logging out and deleting JWT

```
/users/logout
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

`Responses`

204 The user is logged out.

401 Missing header with authorization token.

500 Server error.

## `GET /users/current`

Get current user details

```
/users/current
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

`Responses`

200 The user is logged out.

401 Not authorized.

500 Server error.

## `PATCH /users/`

Changes the subscription type. Can only be one of three values:'starter', 'pro', 'business'

```
/users/
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

`Request body`

Content-Type: application/json

Example Value:

```
{
"subscription":"pro"
}
```

`Responses`

200 Success. Subscription updated

400 Bad Request. - Subscription must be one of the following values ['starter', 'pro', 'business']

401 Not authorized.

500 Server error.

## `PATCH /users/avatars`

Avatar updates

```
/users/avatars
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

`Request body`

Content-Type: form-data

uploaded file in the field named avatar

`Responses`

200 Success.

400 Bad Request.

401 Unauthorized.

500 Server error.

# Contact

## `GET /contacts`

Get all contacts. On a successful request, returns all of the user's contacts. Implemented pagination.
If no parameters are specified in the request, it returns 1 page with no more than 20 contacts.
To select a page in the parameters, you need to specify the `page`, and for the amount on the page, the `limit`

```
/contacts
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

If there are no parameters, it will return the contacts of the first page (page=1) and 20 contacts (limit=20)
Or you can set page and limit parameters

`Responses`

200 Success.

400 Bad Request/incorrect token.

401 Unauthorized.

500 Server error.

## `GET /contacts/:contactId`

Get contact by id

```
/contacts/:contactId
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

contactId: contact ID

`Responses`

200 Success.

400 Bad Request/incorrect token.

401 Unauthorized.

404 Not found.

500 Server error.

## `POST /contacts/`

Create contact

```
/contacts/
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

`Request body`

name, email, phone is required but favorite not requared(adds default {favorite: false})

Content-Type: application/json
Example Value:

```
{
      "name": "Alec HowardX",
      "email": "Donec.elementum@scelerisquescelerisquedui.net",
      "phone": "(748) 206-2687",
      "favorite": false
}
```

`Responses`

201 Create contact.

400 Missing required name field or incorrect JWT.

401 Unauthorized.

500 Server error.

## `DELETE /contacts/:contactId`

Remove contact by id

```
/contacts/:contactId
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

contactId: contact ID

`Responses`

200 contact deleted.

400 Bad Request/incorrect token.

401 Unauthorized.

404 Not found.

500 Server error.

## `PUT /contacts/:contactId`

Update contact by id

```
/contacts/:contactId
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

contactId: contact ID

`Request body`

name, email, phone is required

Content-Type: application/json
Example Value:

```
{
      "name": "Alec HowardX",
      "email": "Donec.elementum@scelerisquescelerisquedui.net",
      "phone": "(748) 206-2687",
      "favorite": false
}
```

`Responses`

200 contact updated.

400 missing fields/incorrect token.

401 Unauthorized.

404 Not found.

500 Server error.

## `PATCH /contacts/:contactId`

Change contact status

```
/contacts/:contactId/favorite
```

`Parameters`

Authorization: "Bearer {{token}}" - The token issued to the current user.

contactId: contact ID

`Request body`

favorite is required

Content-Type: application/json
Example Value:

```
{
      "favorite": false
}
```

`Responses`

200 contact updated.

400 missing fields/incorrect token.

401 Unauthorized.

404 Not found.

500 Server error.

#

### Server commands:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
