![Logo](https://user-images.githubusercontent.com/57197702/218442989-cf6e2ba1-afde-4a15-a52e-da22d76021f3.JPG)

# Lock

Lock uses REST APIs to protect endpoints by using token and session techniques.

The session branch is connected to the Redis and Mongo databases.

The Token branch is linked to MongoDB.



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
Import this [JSON file](Auth_session_token.postman_collection.json) into Postman Collection, and you will be able to use all REST APIs.

If you don't know how to do it, watch this [video](https://www.youtube.com/watch?v=bzquMXmCLUQ).
    
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
| `isAuthenticated` | `middleware`| **Required** you must be logged in to create a post |

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
| `isAuthenticated` | `middleware`| **Required** you must be logged in to create a post |

#### Logout
```http
  get /token/logout
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