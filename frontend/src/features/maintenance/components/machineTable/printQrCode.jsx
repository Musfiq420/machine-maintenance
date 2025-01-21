import React from "react";

export default function PrintQrCode({ data }) {
  const handlePrintAllQrs = async () => {
    const finalData = data;
    if (finalData.length === 0) {
      alert("No machines found.");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const qrSize = 30;
    const perRow = 4;
    const perPage = 40;

    let x = margin;
    let y = margin + 10;

    doc.setFontSize(14);
    doc.text("All Machine QRs", pageWidth / 2, margin, { align: "center" });

    for (let i = 0; i < finalData.length; i++) {
      const machine = finalData[i];
      const val = machine.machine_id;
      const qrDataURL = await qrcode.toDataURL(val, { width: 200 });

      doc.addImage(qrDataURL, "PNG", x, y, qrSize, qrSize);
      doc.setFontSize(10);
      doc.text(`ID: ${machine.machine_id}`, x, y + qrSize + 4);

      x += qrSize + margin;

      if ((i + 1) % perRow === 0) {
        x = margin;
        y += qrSize + 15;
      }

      if ((i + 1) % perPage === 0 && i + 1 < finalData.length) {
        doc.addPage();
        doc.text("All Machine QRs", pageWidth / 2, margin, { align: "center" });
        x = margin;
        y = margin + 10;
      }
    }

    doc.save("all_qrs.pdf");
  };

  return (
    <button
      className="px-12 py-3 bg-primary text-white font-semibold rounded-md"
      onClick={handlePrintAllQrs}
    >
      Print QR
    </button>
  );
}
