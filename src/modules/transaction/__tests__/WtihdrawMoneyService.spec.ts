import AppError from "@shared/errors/AppError";

import FakeWithdrawMoneyRepository from "../repositories/fakes/FakeWithdrawMoneyRepository";
import WithdrawMoneyService from "../services/WithdrawMoneyService";
import FakeAccountRepository from "../../account/repositories/fakes/FakeAccountRepository";

let fakeWithdrawMoneyRepository: FakeWithdrawMoneyRepository;
let fakeAccountRepository: FakeAccountRepository;
let withdrawMoneyService: WithdrawMoneyService;


describe("WithdrawMoney", () => {
  beforeEach(() => {
    fakeWithdrawMoneyRepository = new FakeWithdrawMoneyRepository();
    fakeAccountRepository = new FakeAccountRepository();

    withdrawMoneyService = new WithdrawMoneyService(
      fakeWithdrawMoneyRepository,
      fakeAccountRepository
    );
  });

  it("should be able to make Withdraw", async () => {
    const transaction = await withdrawMoneyService.execute({
      accountId: 1,
      value: 10.00
    });

    expect(transaction).toHaveProperty("id");
  });
  
  it("should not be able to make Withdraw for account non-existing", async () => {
    expect(
      withdrawMoneyService.execute({
        accountId: 2,
        value: 10.00
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(() => withdrawMoneyService.execute({
      accountId: 2,
      value: 10.00
    })).rejects.toHaveProperty('message','Conta inválida!');
  });

  it("should not be able to make Withdraw for invalid value", async () => {
    expect(
      withdrawMoneyService.execute({
        accountId: 1,
        value: 0.00
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(() => withdrawMoneyService.execute({
      accountId: 1,
      value: 0.00
    })).rejects.toHaveProperty('message','Valor da transação invalido!');
  });

  it("should not be able to make Withdraw for insert invalid transaction", async () => {
    expect(
      withdrawMoneyService.execute({
        accountId: 1,
        value: 0.01
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(() => withdrawMoneyService.execute({
      accountId: 1,
      value: 0.01
    })).rejects.toHaveProperty('message','Falha ao realizar o saque!');
  });

  it("should not be able to make Withdraw with value > limit", async () => {
    expect(
      withdrawMoneyService.execute({
        accountId: 1,
        value: 700.00
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(() => withdrawMoneyService.execute({
      accountId: 1,
      value: 700.00
    })).rejects.toHaveProperty('message','Valor do saque maior que o limite permitido!');
  });

  it("should not be able to make Withdraw with value > balance", async () => {
    expect(
      withdrawMoneyService.execute({
        accountId: 1,
        value: 100.00
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      withdrawMoneyService.execute({
        accountId: 1,
        value: 100.00
      }),
    ).rejects.toHaveProperty('message', 'Saldo insuficiente!');
  });

});
