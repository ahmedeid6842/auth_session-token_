![Logo](https://user-images.githubusercontent.com/57197702/218442989-cf6e2ba1-afde-4a15-a52e-da22d76021f3.JPG)

# Lock 

Lock uses REST APIs to protect endpoints by using token and session techniques.

The session branch is connected to the Redis and Mongo databases.

The Token branch is linked to MongoDB.

**Feature** Although users have an address book



## Requirements
<p>
 <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=nodejs,mongodb,redis,postman&theme=light"/>
    </a>
    <a href="https://www.npmjs.com/"><img src="https://authy.com/wp-content/uploads/npm-logo.png" width="50px" height="50"/></a>
 </p>


## Environment Variables

To run this project, you will need to add the following environment variables to your **.env** file

`PORT` : port where you application build on it <number>

`REFRESH_JWT_SECRET` : refresh token secret <string>

`ACCESS_JWT_SECRET` : string, access token secret <string>

`MONGODB_URI` : string, mongo database uri <string>

`SESSION_SECRET` : <string>

## Installation

Install my-project with npm

```bash
  npm install
  npm run dev #if your are a developer 
  npm run start
```
    
## Usage
Import this [JSON file](Lock.postman_collection.json) into Postman Collection, and you will be able to use all REST APIs.

If you don't know how to do it, watch this [video](https://www.youtube.com/watch?v=bzquMXmCLUQ).

you can also use swagger-ui by access **/api-docs/**
![swagger](https://user-images.githubusercontent.com/57197702/218692185-0666ea88-3261-411c-9715-7c4bb959be61.gif)

## API Reference

### Session Based

####  Register
```http
  POST /session/register
```
| Request Body | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `email`      | `string` | **Required** .user's email    |
| `password`   | `string` | **Required** .user's password |

#### Login
```http
  Post /session/login
```
| Request Body | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `email`      | `string` | **Required** .user's email    |
| `password`   | `string` | **Required** .user's password |

#### Home
```http
  get /session/home
```
| Constraints       | Type        | Description                   |
| :--------         | :-------    | :-------------------------    |
| `isAuthenticated` | `middleware`| **Required** you must be logged in to get to home endpoint |

#### Logout
```http
  get /session/logout
```

### Token Based

####  Register
```http
  POST /token/register
```
| Request Body | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `email`      | `string` | **Required** .user's email    |
| `password`   | `string` | **Required** .user's password |

#### Login
```http
  Post /token/login
```
| Request Body | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `email`      | `string` | **Required** .user's email    |
| `password`   | `string` | **Required** .user's password |

#### Home
```http
  get /token/home
```
| Constraints       | Type        | Description                   |
| :--------         | :-------    | :-------------------------    |
| `isAuthenticated` | `middleware`| **Required** you must be logged in to get to home endpoint |

#### Logout
```http
  get /token/logout
```

### Address Book

| Constraints       | Type        | Description                   |
| :--------         | :-------    | :-------------------------    |
| `isAuthenticated` | `middleware`| **Required** you must be logged in to access Address Book endpoint|

####  Get Your Address
```http
  GET /addressBook/
```

#### Add Your Address
```http
  POST /addressBook/
```
| Request Body | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `name.firstName` | `string` | **Required** .user's first Name    |
| `name.lastName`   | `string` | **Required** .user's last Name |
| `contactNumber`   | `string` | **Required** .user's phone number |
| `address.country`   | `string` | **Required** .user's country |
| `address.city`   | `string` | **Required** .user's city |
| `address.street`   | `string` | **Required** .user's street |
| `address.postalCode`   | `number` | **Required** .user's address postal code |

#### Update your Address
```http
  PUT /addressBook/
```
| Request Body | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `name.firstName` | `string` | user's first Name    |
| `name.lastName`   | `string` | user's last Name |
| `contactNumber`   | `string` | user's phone number |
| `address.country`   | `string` | user's country |
| `address.city`   | `string` | user's city |
| `address.street`   | `string` | user's street |
| `address.postalCode`   | `number` | user's address postal code |

#### Delete Your Address
```http
  DELETE /addressBook
```

## Contributing

<h4> Always feel free to break the lock 😅. </h4> 

<div align="center">
<img src="https://user-images.githubusercontent.com/57197702/218451102-eaaaeb4d-9392-41af-9dc3-8ba42bb48324.gif"/>
</div>

## Authors

- [@AhmedEid](https://github.com/ahmedeid6842/)

    
## Lessons Learned

- Build a strong authentication using both session and token
- How to connect Redis Database with session 
- How to use both access and refresh token for authentication process
- There is always something new to learn 👨‍💻.