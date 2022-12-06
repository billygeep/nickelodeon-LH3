#check if build dependencies are install
[ -d "node_modules" ] || npm install

#call npm run deploy to build for deployment
npm run deploy

#add app.bundle.min.js to the jsembed and delete the auto added script tags containing app.bundle.min.js

