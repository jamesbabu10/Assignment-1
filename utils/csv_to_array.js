const fs = require("fs");
const { parse } = require("csv-parse");

async function csv_to_array(csv_name) {
  const arr = [];
  return new Promise(function (resolve, reject) {
    fs.createReadStream(`./csv/${csv_name}.csv`)
      .pipe(
        parse({
          delimiter: ";",
          columns: true,
          ltrim: true,
          bom: true,
        })
      )
      .on("data", (data) => arr.push(data))
      .on("end", () => {
        resolve(arr);
      })
      .on("error", () => {
        reject("error");
      });
  });
}

function compare(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

module.exports = { csv_to_array, compare };
