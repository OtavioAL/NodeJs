import { parse } from "csv-parse";
import fs from "node:fs";

const path = new URL("../tasks.csv", import.meta.url);

const stream = fs.createReadStream(path);

const parseCSV = parse({
  trim: true,
  skipEmptyLines: true,
  fromLine: 2,
  delimiter: ",",
});

stream.pipe(parseCSV);

parseCSV
  .on("readable", () => {
    let line;

    while ((line = parseCSV.read()) !== null) {
      const [title, description] = line;

      fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })
        .then()
        .catch((error) => console.error("Error: ", error, "\n"));
    }
  })
  .on("error", (error) => {
    reject(error);
  });
