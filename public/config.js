// Defined in a separate public file, because building the react app 
// because when building the react app, the current environment variables
// are "baked" into the build file. So changing them later won't have any effect. 
// However, putting them into a public file like this, maked react read the public file instead,
// allowing you to change the API URL without rebuilding the app.

window.ENV = {
  BACKEND_URL: 'http://localhost:8080/api'
}