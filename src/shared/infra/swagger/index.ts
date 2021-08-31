import account from "./account.json";
import transaction from "./transaction.json";

const swaggerFile = {
  openapi: "3.0.0",
  info: {
    title: "CyberBank",
    description: "",
    version: "1.0.0",
  },
  paths: {
    ...account,
    ...transaction,
  },
  components: {
  },
};

export { swaggerFile };
