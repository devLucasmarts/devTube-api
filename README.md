# DevTube API ▶️

## About the project 📄

This is the DevTube API, an application based on YouTube.
<br />
<br />

## How to download and install ⚙️🖥️
<br />

#### git clone 🔽

<pre>
git clone git@github.com:martsDev/devTube-api.git
</pre>

<br />

### Access src directory 📂

<pre>
cd src
</pre>

<br />

### Install the dependencies 🔧

<pre>
npm install
</pre>

<br />

### Run the project! ▶️

<pre>
npm run dev
</pre>

<br />

## How to use the API 🖥️

<br />

## Sign up and Sign in routes 

<br />

### Sign up (/api/auth/signup)


<pre>
curl --request POST \
  --url http://localhost:3001/api/auth/signup \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTI1YWVmZWYyZTc4ZmQ5ZWUzMzBiYiIsImlhdCI6MTY2MjE1MTczN30.yi8-s14cjPx23SaOMd0SMwoOjC4AiKjNg2WRb9QtIjg \
  --data '{
	"username": "John Doe",
	"email": "johndoe@email.com",
	"password": "123456789"
}'
</pre>

<br />

### Sign in (/api/auth/signin)


<pre>
curl --request POST \
  --url http://localhost:3001/api/auth/signin \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I \
  --data '{
	"username": "John Doe",
	"password": "123456789"
} '
</pre>

<br />

## User routes

### Get an account (/api/users/find/:id)

<pre>
curl --request GET \
  --url http://localhost:3001/api/users/find/631645bc40d59f7c71d8bbec \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />

### Delete an account (/api/users/:id)

<pre>
curl --request DELETE \
  --url http://localhost:3001/api/users/631645bc40d59f7c71d8bbec \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>