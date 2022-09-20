# Wellcome to DevTube API repository!▶️
<br />

<img src="https://i.ibb.co/WWLkCC0/1.jpg" />

<br />

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

### Config the ENVs 🔧
Look the env.example inside the src directory.

<br />

### Run the project! ▶️

<pre>
npm run dev
</pre>

<br />

## How to use the API 🖥️
Just copy and paste the Curls below into your favorite API client like Insomnia or Postman.

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

<br />

### Update an account (/api/users/:id)

<pre>
curl --request PUT \
  --url http://localhost:3001/api/users/631645bc40d59f7c71d8bbec \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I \
  --data '{
	"password": "12345678"
} '
</pre>

<br />

### Like video (/api/users/like/:id)
Pass the video id via params.

<pre>
curl --request PUT \
  --url http://localhost:3001/api/users/631645bc40d59f7c71d8bbec \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I \
  --data '{
	"password": "12345678"
} '
</pre>

<br />

### Dislike video (/api/users/dislike/:id)
Pass the video id via params.

<pre>
curl --request PUT \
  --url http://localhost:3001/api/users/631645bc40d59f7c71d8bbec \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I \
  --data '{
	"password": "12345678"
} '
</pre>

<br />

### Subscribe (/api/users/sub/:id)
Pass the user id via params.

<pre>
curl --request PUT \
  --url http://localhost:3001/api/users/sub/631645bc40d59f7c71d8bbec \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

## Video routes

### Get random videos (/api/videos/random)

<pre>
curl --request GET \
  --url http://localhost:3001/api/videos/random \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />

### Get video by id (/api/videos/find/:id)
Pass the video id via params.

<pre>
curl --request GET \
  --url http://localhost:3001/api/videos/find/6316492840d59f7c71d8bbf6 \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />

### Get video by query (/api/videos/search?q=)
Pass the key word via query.

<pre>
curl --request GET \
  --url 'http://localhost:3001/api/videos/search?q=best' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />

### Get video by tags (/api/videos/tags?tags=)
Pass the video tag via query.

<pre>
curl --request GET \
  --url 'http://localhost:3001/api/videos/tags?tags=React%2CJs' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />

### Get all channel videos by id (/api/videos/channel/:id)
Pass the user id via params.

<pre>
curl --request GET \
  --url http://localhost:3001/api/videos/channel/63125aefef2e78fd9ee330bb \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />

### Add video (/api/videos/)

<pre>
curl --request POST \
  --url http://localhost:3001/api/videos/ \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I \
  --data '{
	"title": "The best Mew",
	"description": "teste desc",
	"imgUrl": "hero.jpg",
	"videoUrl": "teste",
	"tags": ["js", "React"]
}'
</pre>

<br />

### Delete video (/api/videos/:id)
Pass the video id via params.

<pre>
curl --request DELETE \
  --url http://localhost:3001/api/videos/63165f128c2a6905afe1d917 \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />

## Video comments

<br />

### Add comment (/api/video/comments/)

<pre>
curl --request POST \
  --url http://localhost:3001/api/video/comments/ \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I \
  --data '{
	"userComment": "First!",
	"videoId": "63053743b8baade512e3a015"
}'
</pre>

<br />

<br />

### Get all comments (/api/video/comments/:id)
Pass the video id via params.

<pre>
curl --request GET \
  --url http://localhost:3001/api/video/comments/6316609a8c2a6905afe1d91e \
  --header 'Content-Type: application/json' \
  --cookie access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTY0NWJjNDBkNTlmN2M3MWQ4YmJlYyIsImlhdCI6MTY2MjQwNDAzMn0.gwOQ0G0GVdCgHZu3E3pOUBlXM4vivsux4h6VzNOim9I
</pre>

<br />
