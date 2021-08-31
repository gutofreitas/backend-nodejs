import AppError from "@shared/errors/AppError";

import FakeWtihdrawMoneyRepository from "../repositories/fakes/FakeWithdrawMoneyRepository";
import WithdrawMoneyService from "../services/WithdrawMoneyService";
import FakeAccountRepository from "../../account/repositories/fakes/FakeAccountRepository";

let fakeWtihdrawMoneyRepository: FakeWtihdrawMoneyRepository;
let fakeAccountRepository: FakeAccountRepository;
let WtihdrawMoneyService: WithdrawMoneyService;


describe("WtihdrawMoney", () => {
  beforeEach(() => {
    fakeWtihdrawMoneyRepository = new FakeWtihdrawMoneyRepository();
    fakeAccountRepository = new FakeAccountRepository();

    WtihdrawMoneyService = new WithdrawMoneyService(
      fakeWtihdrawMoneyRepository,
      fakeAccountRepository
    );
  });

  it("should be able to make Withdraw", async () => {

    const transaction = await WtihdrawMoneyService.execute({
      accountId: 1,
      value: 10.00
    });

    expect(transaction).toHaveProperty("id");
  });
  
  it("should not be able to make Withdraw for account non-existing", async () => {
    expect(
      WtihdrawMoneyService.execute({
        accountId: 2,
        value: 10.00
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to make Withdraw for invalid value", async () => {
    expect(
      WtihdrawMoneyService.execute({
        accountId: 1,
        value: 0.00
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to make Withdraw for  insert  invalid transaction", async () => {
    expect(
      WtihdrawMoneyService.execute({
        accountId: 1,
        value: 0.01
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to make Withdraw with value > limit", async () => {
    expect(
      WtihdrawMoneyService.execute({
        accountId: 1,
        value: 700.00
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to make Withdraw with value > balance", async () => {
    expect(
      WtihdrawMoneyService.execute({
        accountId: 1,
        value: 100.00
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
