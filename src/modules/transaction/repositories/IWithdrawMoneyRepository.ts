import IDepositMoneyDataDTO from "../dtos/IDepositMoneyDataDTO";
import Transaction from "../infra/postgres/models/Transaction";

interface IWithdrawMoneyRepository {
  create(depositMoneyData: IDepositMoneyDataDTO): Promise<Transaction|undefined>;
}

export default IWithdrawMoneyRepository;
