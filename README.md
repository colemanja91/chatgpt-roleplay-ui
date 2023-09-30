# ChatGPT Roleplay UI

Front-end for the API created in https://github.com/colemanja91/chatgpt-roleplay

Built with Joy UI. Uses `react-speech-recognition` to power speech-to-text for chat interactions (currently only on Chrome).

## Running

Install dependencies:

```sh
npm install
```

Run app on [http://localhost:3001](http://localhost:3001) (ensure the backend is running first)

```sh
npm start
```

## Using TTS

OK, running React projects that reference local system files is terrible. If you want to use TTS mp3 files generated by the backend,
you must symlink the output directory to the `public` directory of this repo. (This has to be, like, the one case in the world where it's actually _easier_ to run something in production - just throw them on S3!)

```sh
ln -s /path-to-backend-tts-output/ ./public/shared_data
```

## TODO
