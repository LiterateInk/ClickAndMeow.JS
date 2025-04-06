import * as clickandmeow from "../src";
import { credentials } from "./_credentials";

void async function main() {
  const session = await clickandmeow.login(credentials.username, credentials.password);
  console.log("Congratulations! You are logged in.");
  console.log("Your session ID is:", session.phpSessId);
}();
