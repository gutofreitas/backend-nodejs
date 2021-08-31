export default interface ITransactionDTO {
  transactionTypeId: number;
  accountId: number;
  value: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
