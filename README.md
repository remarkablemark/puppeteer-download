# puppeteer-download

[Puppeteer](https://pptr.dev/) download inspired by [Stackoverflow answer](https://stackoverflow.com/questions/55408302/how-to-get-the-download-stream-buffer-using-puppeteer).

## Prerequisites

- [Node.js](https://nodejs.org/)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablemark/puppeteer-download.git
cd puppeteer-download
```

Install the dependencies:

```sh
npm install
```

## Run

Pass URL argument to download content:

```sh
npm start -- <URL>
```

[Example](https://test-videos.co.uk/bigbuckbunny/mp4-h264):

```sh
npm start -- https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4
```

Downloads are found in the `./downloads/` directory.

## License

[MIT](LICENSE)
