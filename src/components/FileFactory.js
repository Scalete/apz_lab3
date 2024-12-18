export const FileType = {
  TXT: "txt",
  XML: "xml",
  JSON: "json",
};

class ReportSaver {
  constructor(data) {
    this.data = data;
  }

  save() {
    throw new Error("Метод save() має бути реалізований у підкласі");
  }
}

export class TxtReportSaver extends ReportSaver {
  save() {
    const content = this.data
      .map((item) => `${item.id}, ${item.name}`)
      .join("\n");
    return new Blob([content], { type: "text/plain" });
  }
}

export class XmlReportSaver extends ReportSaver {
  save() {
    let content = `<?xml version="1.0" encoding="UTF-8"?>\n<items>\n`;
    this.data.forEach((item) => {
      content += `  <item>\n    <id>${item.id}</id>\n    <name>${item.name}</name>\n  </item>\n`;
    });
    content += `</items>`;
    return new Blob([content], { type: "application/xml" });
  }
}

export class JsonReportSaver extends ReportSaver {
  save() {
    const content = JSON.stringify(this.data, null, 2);
    return new Blob([content], { type: "application/json" });
  }
}

export function getReportSaver(type, data) {
  switch (type) {
    case FileType.TXT:
      return new TxtReportSaver(data);
    case FileType.XML:
      return new XmlReportSaver(data);
    case FileType.JSON:
      return new JsonReportSaver(data);
    default:
      throw new Error("Непідтримуваний тип файлу");
  }
}
