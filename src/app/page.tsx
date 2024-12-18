"use client";

import React, { useState } from "react";
import { FileType, getReportSaver } from "@/components/FileFactory";
import "bootstrap/dist/css/bootstrap.min.css";

const initialData = [
  { id: 1, name: "Toyota Camry" },
  { id: 2, name: "Honda Accord" },
  { id: 3, name: "Ford Focus" },
];

export default function Home() {
  const [data] = useState(initialData);
  const [selectedFileType, setSelectedFileType] = useState(FileType.TXT);

  const handleSave = () => {
    const saver = getReportSaver(selectedFileType, data);
    const blob = saver.save();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report.${selectedFileType}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-5">
      <h2>Система управління автопарком</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Назва</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <label className="form-label">
          Оберіть формат файлу для збереження:
        </label>
        <select
          className="form-select mb-3"
          value={selectedFileType}
          onChange={(e) => setSelectedFileType(e.target.value)}
        >
          <option value={FileType.TXT}>TXT</option>
          <option value={FileType.XML}>XML</option>
          <option value={FileType.JSON}>JSON</option>
        </select>

        <button className="btn btn-success" onClick={handleSave}>
          Save to File
        </button>
      </div>
    </div>
  );
}
