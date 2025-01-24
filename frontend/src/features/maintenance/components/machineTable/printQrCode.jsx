import QRCode from "react-qr-code";

import { jsPDF } from "jspdf";
import qrcode from "qrcode"; // For generating QR code data URLs

export default function PrintQrCode({ data }) {
  const handlePrintAllQrs = async () => {
    const finalData = data;
    if (finalData.length === 0) {
      alert("No machines found.");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15; // Updated margin
    const qrSize = 30;
    const perRow = 4;
    const perPage =
      Math.floor((pageHeight - 2 * margin - 10) / (qrSize + 15)) * perRow; // Adjust per page count dynamically

    let x = margin;
    let y = margin + 10;

    doc.setFontSize(14);
    const title = data.length === 1 ? "" : "All Machine QRs";
    doc.text(title, pageWidth / 2, margin, { align: "center" });

    for (let i = 0; i < finalData.length; i++) {
      const machine = finalData[i];
      const val = machine.machine_id;
      const qrDataURL = await qrcode.toDataURL(val, { width: 200 });

      doc.addImage(qrDataURL, "PNG", x, y, qrSize, qrSize);
      doc.setFontSize(10);
      doc.text(`ID: ${machine.machine_id}`, x, y + qrSize + 4);

      x += qrSize + margin;

      // Move to the next row if current row is full
      if ((i + 1) % perRow === 0) {
        x = margin;
        y += qrSize + 15;
      }

      // Add a new page if current page is full
      if ((i + 1) % perPage === 0 && i + 1 < finalData.length) {
        doc.addPage();
        doc.text("All Machine QRs", pageWidth / 2, margin, { align: "center" });
        x = margin;
        y = margin + 10;
      }
    }

    const fileName =
      data.length === 1 ? `${data[0].machine_id}_qr.pdf` : "all_qrs.pdf";
    doc.save(fileName);
  };

  return (
    <button
      className="px-12 py-3 bg-primary-dark text-white font-semibold rounded-md"
      onClick={handlePrintAllQrs}
    >
      Print QR
    </button>
  );
}
