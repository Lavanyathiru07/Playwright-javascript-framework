import fs from 'fs';
export default class DataReader {

  static read(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
}
