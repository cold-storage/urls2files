# URLs 2 Files

Takes an array of URLs and writes them to files.

## Install

```sh
npm i urls2files
```

## Enjoy

```js
const options = { urls: ['https://myurl.txt', 'https://another.txt'] };
require('urls2files')(options, (error, files) => {
  console.log(files);
});
```

The above will output something like the following which will be an array of
the files in the same order as the urls.

```
[
  '/var/folders/1d/h6759p715zx1dy8sdltygq800000gn/T/HkBgGzGzTCG.csv',
  '/var/folders/1d/h6759p715zx1dy8sdltygq800000gn/T/BkfzfMGT0z.csv'
]
```

**Options**

```
urls:       An array of URLs

https:      Options for the https.get(options[, callback]) method.
            https://nodejs.org/api/https.html#https_https_get_options_callback

dir:        The folder to write the files to. Defaults to os.tmpdir()
```
