/**
 * Invoice Service
 * Handles invoice generation and download
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { CustomerOrderDetails } from './customerOrderService';

/**
 * Generate invoice PDF
 */
export async function generateInvoicePDF(
  order: CustomerOrderDetails,
  lang: 'th' | 'en' = 'th'
): Promise<void> {
  const doc = new jsPDF();

  // Translations
  const translations = {
    invoice: lang === 'th' ? 'ใบเสร็จรับเงิน/ใบกำกับภาษี' : 'INVOICE/TAX RECEIPT',
    invoiceNo: lang === 'th' ? 'เลขที่' : 'Invoice No.',
    date: lang === 'th' ? 'วันที่' : 'Date',
    billTo: lang === 'th' ? 'ผู้ซื้อ' : 'Bill To',
    shipTo: lang === 'th' ? 'จัดส่งถึง' : 'Ship To',
    description: lang === 'th' ? 'รายการ' : 'Description',
    quantity: lang === 'th' ? 'จำนวน' : 'Quantity',
    price: lang === 'th' ? 'ราคา' : 'Price',
    total: lang === 'th' ? 'ยอดรวม' : 'Total',
    subtotal: lang === 'th' ? 'รวมเป็นเงิน' : 'Subtotal',
    shipping: lang === 'th' ? 'ค่าจัดส่ง' : 'Shipping',
    discount: lang === 'th' ? 'ส่วนลด' : 'Discount',
    grandTotal: lang === 'th' ? 'ยอดสุทธิ' : 'Grand Total',
    paymentMethod: lang === 'th' ? 'วิธีชำระเงิน' : 'Payment Method',
    status: lang === 'th' ? 'สถานะ' : 'Status',
  };

  let yPos = 20;

  // Company Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('SAK WoodWorks', 105, yPos, { align: 'center' });
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(lang === 'th' ? 'ผู้ผลิตวัสดุก่อสร้างคุณภาพสูง' : 'Premium Construction Materials', 105, yPos, { align: 'center' });
  yPos += 15;

  // Invoice Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(translations.invoice, 105, yPos, { align: 'center' });
  yPos += 10;

  // Invoice Number and Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${translations.invoiceNo}: ${order.id}`, 14, yPos);
  doc.text(`${translations.date}: ${new Date(order.date_created).toLocaleDateString()}`, 140, yPos);
  yPos += 15;

  // Bill To
  doc.setFont('helvetica', 'bold');
  doc.text(translations.billTo, 14, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(`${order.billing.first_name} ${order.billing.last_name}`, 14, yPos);
  yPos += 6;
  if (order.billing.company) {
    doc.text(order.billing.company, 14, yPos);
    yPos += 6;
  }
  doc.text(order.billing.address_1, 14, yPos);
  yPos += 6;
  if (order.billing.address_2) {
    doc.text(order.billing.address_2, 14, yPos);
    yPos += 6;
  }
  doc.text(`${order.billing.city} ${order.billing.state} ${order.billing.postcode}`, 14, yPos);
  yPos += 6;
  doc.text(`Tel: ${order.billing.phone}`, 14, yPos);
  yPos += 10;

  // Ship To
  doc.setFont('helvetica', 'bold');
  doc.text(translations.shipTo, 110, yPos - 54);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(`${order.shipping.first_name} ${order.shipping.last_name}`, 110, yPos - 54);
  yPos += 6;
  if (order.shipping.company) {
    doc.text(order.shipping.company, 110, yPos - 54);
    yPos += 6;
  }
  doc.text(order.shipping.address_1, 110, yPos - 54);
  yPos += 6;
  if (order.shipping.address_2) {
    doc.text(order.shipping.address_2, 110, yPos - 54);
    yPos += 6;
  }
  doc.text(`${order.shipping.city} ${order.shipping.state} ${order.shipping.postcode}`, 110, yPos - 54);
  yPos = Math.max(yPos, 90);

  // Line Items Table
  const tableData = order.items.map(item => [
    item.name,
    item.quantity.toString(),
    item.total_formatted,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [[translations.description, translations.quantity, translations.total]],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 50, halign: 'right' },
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  // Totals
  const pageWidth = doc.internal.pageSize.getWidth();
  const rightColumn = pageWidth - 14;

  doc.setFontSize(10);

  // Subtotal
  doc.text(`${translations.subtotal}:`, rightColumn - 60, yPos);
  doc.text(order.subtotal_formatted, rightColumn, yPos, { align: 'right' });
  yPos += 8;

  // Shipping
  if (parseFloat(order.shipping_total) > 0) {
    doc.text(`${translations.shipping}:`, rightColumn - 60, yPos);
    doc.text(order.shipping_total_formatted, rightColumn, yPos, { align: 'right' });
    yPos += 8;
  }

  // Discount
  if (parseFloat(order.discount_total) > 0) {
    doc.text(`${translations.discount}:`, rightColumn - 60, yPos);
    doc.text(`-${order.discount_total_formatted}`, rightColumn, yPos, { align: 'right' });
    yPos += 8;
  }

  // Grand Total
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`${translations.grandTotal}:`, rightColumn - 60, yPos);
  doc.text(order.total_formatted, rightColumn, yPos, { align: 'right' });
  yPos += 15;

  // Payment Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${translations.paymentMethod}: ${order.payment_method_title}`, 14, yPos);
  yPos += 7;
  doc.text(`${translations.status}: ${getStatusLabel(order.status, lang)}`, 14, yPos);

  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      lang === 'th' ? 'ขอบคุณที่ใช้บริการ' : 'Thank you for your business!',
      105,
      280,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      105,
      287,
      { align: 'center' }
    );
  }

  // Save PDF
  doc.save(`invoice-${order.id}.pdf`);
}

/**
 * Get status label in Thai/English
 */
function getStatusLabel(status: string, lang: 'th' | 'en'): string {
  const labels: Record<string, { th: string; en: string }> = {
    pending: { th: 'รอดำเนินการ', en: 'Pending' },
    processing: { th: 'กำลังดำเนินการ', en: 'Processing' },
    'on-hold': { th: 'ระงับชั่วคราว', en: 'On Hold' },
    completed: { th: 'เสร็จสิ้น', en: 'Completed' },
    cancelled: { th: 'ยกเลิก', en: 'Cancelled' },
    refunded: { th: 'คืนเงินแล้ว', en: 'Refunded' },
    failed: { th: 'ล้มเหลว', en: 'Failed' },
  };

  return labels[status]?.[lang] || status;
}

/**
 * Download invoice for an order
 */
export async function downloadInvoice(orderId: string | number, lang: 'th' | 'en' = 'th'): Promise<void> {
  try {
    const response = await fetch(`/api/customer-orders/${orderId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }

    const order: CustomerOrderDetails = await response.json();

    // Generate and download PDF
    await generateInvoicePDF(order, lang);
  } catch (error) {
    console.error('Failed to download invoice:', error);
    throw error;
  }
}
