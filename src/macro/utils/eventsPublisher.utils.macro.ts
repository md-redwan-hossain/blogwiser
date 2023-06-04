import adminEvent from "../../micro/admin/events.admin.js";
import userEvent from "../../micro/user/events.user.js";

export function fireEventOnSignUp({ userId, role }: { userId: string; role: string }) {
  adminEvent.emit("newUserSignUp", { userId, role });

  switch (true) {
    case role === "user":
      userEvent.emit("newUserSignup");
      break;

    default:
      break;
  }
}
