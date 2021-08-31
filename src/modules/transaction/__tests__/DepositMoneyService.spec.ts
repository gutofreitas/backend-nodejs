import AppError from "@shared/errors/AppError";

import FakeDepositMoneyRepository from "../repositories/fakes/FakeDepositMoneyRepository";
import DepositMoneyService from "../services/DepositMoneyService";
import FakeAccountRepository from "../../account/repositories/fakes/FakeAccountRepository";

let fakeDepositMoneyRepository: FakeDepositMoneyRepository;
let fakeAccountRepository: FakeAccountRepository;
let depositMoneyService: DepositMoneyService;


describe("DepositMoney", () => {
  beforeEach(() => {
    fakeDepositMoneyRepository = new FakeDepositMoneyRepository();
    fakeAccountRepository = new FakeAccountRepository();

    depositMoneyService = new DepositMoneyService(
      fakeDepositMoneyRepository,
      fakeAccountRepository
    );
  });

  it("should be able to make deposit", async () => {

    const transaction = await depositMoneyService.execute({
      accountId: 1,
      value: 10.00
    });

    expect(transaction).toHaveProperty("id");
  });
  
  it("should not be able to make deposit for account non-existing", async () => {
    expect(
      depositMoneyService.execute({
        accountId: 2,
        value: 10.00
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to make deposit for invalid value", async () => {
    expect(
      depositMoneyService.execute({
        accountId: 1,
        value: 0.00
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to make deposit for  insert  invalid transaction", async () => {
    expect(
      depositMoneyService.execute({
        accountId: 1,
        value: 0.01
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
