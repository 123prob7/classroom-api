
# Classroom API

REST API Nodejs server for classroom app



## API Reference

#### Get all class data

```http
  GET /api/class/
```

#### Create a class

```http 
  POST /api/class/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `className`      | `string` | **Required** Name of the class |
| `section`      | `string` | Short description of the class |

#### Login account

```http 
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |

#### Get current user (use for check if logged in)

```http 
  GET /api/auth/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sessionUser`      | `string` | **Required** |

## Run Locally

Clone the project

```bash
  git clone https://github.com/123prob7/classroom-api
```

Go to the project directory

```bash
  cd classroom-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

