import { jsPDF } from "jspdf";

import moment from "moment";

import { COLUMNS_TO_LABELS, fields_to_pdf } from "../../definitions";

import { objectToString } from "./csvExport";

export { createPDF, prepareDataForPDF };

function prepareDataForPDF(rows) {
  const data = JSON.parse(JSON.stringify(rows));

  for (const row of data) {
    for (const key in row) {
      if (!fields_to_pdf.includes(key)) {
        delete row[key];
        continue;
      }
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

    for (const key of fields_to_pdf) {
      if (!(key in row) || !row[key]) {
        row[key] = " ";
      }
    }

    console.log(row);
  }
  console.log(data);
  return data;
}

function createHeaders(pageWidth, keys) {
  const width = pageWidth / keys.length;
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: COLUMNS_TO_LABELS[keys[i]],
      width,
      align: "center",
      padding: 0,
    });
  }
  return result;
}

function createPDF(rows) {
  console.log("here");
  const newRows = prepareDataForPDF(rows);
  const doc = new jsPDF({ orientation: "landscape" });

  console.log(doc.getFontList());
  const config = {
    headerBackgroundColor: "ffffff",
    printHeaders: true,
    // autoSize: true,
    fontSize: 8,
  };

  doc.setFont("Helvetica");

  const pageWidth = 380;

  var headers = createHeaders(pageWidth, fields_to_pdf);

  doc.table(1, 1, newRows, headers, config);

  doc.save("two-by-four.pdf");
}
