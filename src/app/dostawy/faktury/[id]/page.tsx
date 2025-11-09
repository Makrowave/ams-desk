'use client';

import InvoiceDisplay from '../../../../components/invoices/InvoiceDisplay';
import { Invoice as InvoiceType } from '../../../../types/deliveryTypes';

const Invoice = ({ params }: { params: { id: string } }) => {
  const testInvoice: InvoiceType = {
    id: Number(params.id),
    invoiceNumber: 'TEST/2025/0001',
    issueDate: new Date('2025-11-07'),
    paymentDate: new Date('2025-11-21'),
    issuerName: 'Test Firma',
    issuerAddress: 'ul. Testowa 1, 00-000 Test',
    nettoAmount: 123.45,
    bruttoAmount: 151.64,
    deliveryId: undefined,
  };
  return <InvoiceDisplay invoice={testInvoice} />;
};

export default Invoice;
