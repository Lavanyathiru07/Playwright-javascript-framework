import fs from 'fs';
import csv from 'csv-parser';

export default class CSVReader {

  static read(filePath) {
    return new Promise((resolve, reject) => {

      const results = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}