import AppError from "@shared/errors/AppError";

import FakeAccountRepository from "../repositories/fakes/FakeAccountRepository";
import GetAccountByIdService from "../services/GetAccountByIdService";

let fakeAccountRepository: FakeAccountRepository;
let getAccountByIdService: GetAccountByIdService;

describe("GetAccountPerID", () => {
  beforeEach(() => {
    fakeAccountRepository = new FakeAccountRepository();

    getAccountByIdService = new GetAccountByIdService(
      fakeAccountRepository
    );
  });

  it("should be able to get a account per id", async () => {

    const account = await getAccountByIdService.execute(1);

    expect(account).toHaveProperty("id");
    expect(account.id).toBe(1);
  });
  
  it("should not be able to get a account from non-existing", async () => {
    expect(
      getAccountByIdService.execute(2),
    ).rejects.toBeInstanceOf(AppError);
  });


});
