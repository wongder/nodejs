async function publishAll() {
  const [payments, invoices, receipts] = await Promise.all([
    getPayments(),
    getInvoices(),
    getReceipts()
  ]);
  // do stuff with that
}
