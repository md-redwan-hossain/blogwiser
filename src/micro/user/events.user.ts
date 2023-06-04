import { EventEmitter } from "node:events";
import { memoryDB } from "../../macro/settings.macro.js";

const userEvent = new EventEmitter();
userEvent.addListener("newUserSignup", () => {
  const currentUserCount = memoryDB.get("totalUsersinMemoryDB");
  memoryDB.set("totalUsersinMemoryDB", Number(currentUserCount) + 1);
});

userEvent.addListener("userDeleted", () => {
  const currentUserCount = memoryDB.get("totalUsersinMemoryDB");
  memoryDB.set("totalUsersinMemoryDB", Number(currentUserCount) - 1);
});
export default userEvent;
