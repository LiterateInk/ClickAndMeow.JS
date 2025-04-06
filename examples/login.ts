import * as ClickAndMeow from "../src";
import { credentials } from "./_credentials";

void async function main() {
  const session = await ClickAndMeow.login(credentials.username, credentials.password);
  console.log("Congratulations! You are logged in.");
  console.log("Your session ID is:", session.phpSessId);
}();
