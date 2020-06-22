import moment from "moment";

// Converts an object to a string with each key/value on a newline
const objectToString = (obj) => {
  let str = "";
  for (const key in obj) {
    str += `${key}: ${obj[key]}\n`;
  }
  if (str.length > 0 && str[str.length - 1] === "\n") {
    str = str.substring(0, str.length - 1);
  }
  return str;
};

export const prepareDataForExporting = (input) => {
  const data = JSON.parse(JSON.stringify(input));
  for (let row of data) {
    for (let key in row) {
      switch (typeof row[key]) {
        case "string":
          if (moment(row[key].substring(0, 10), "YYYY-MM-DD").isValid()) {
            row[key] = new Date(row[key]).toLocaleDateString();
          }
          break;
        case "object":
          row[key] = objectToString(row[key]);
          break;
        default:
          break;
      }
    }
  }
  return data;
};

export const filterFieldsToExport = (allFields, VIEWABLE_COLUMNS) => {
  return allFields.filter((field) => {
    for (const type in VIEWABLE_COLUMNS) {
      if (field in VIEWABLE_COLUMNS[type]) {
        if (VIEWABLE_COLUMNS[type][field]) {
          return true;
        }
      }
    }
    return false;
  });
};
