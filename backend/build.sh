#!/bin/bash


if [[ -x bin ]]; then
	echo "remove bin folder manually first!"
	exit 1
fi

# Compile typescript
npm run build

# Copy model typescript project
pushd bin
npm install
mkdir node_modules/@model
cp ../../model/*js node_modules/@model

# Copy frontend
mkdir frontend
cp ../../DoChat/dist/DoChat/ frontend/ -r
if [[ "$?" == 1 ]]; then 
	echo ================WARNING WARNING WARNING WARNING =============================
	echo ================WARNING WARNING WARNING WARNING =============================
	echo ================WARNING WARNING WARNING WARNING =============================
	echo Copy UI distributable to `pwd`/frontend/DoChat
	echo ================WARNING WARNING WARNING WARNING =============================
	echo ================WARNING WARNING WARNING WARNING =============================
	echo ================WARNING WARNING WARNING WARNING =============================
fi

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

popd

npx electron-packager bin/ DoChat --overwrite
