export function getFirebaseAuthMessage(err: unknown, fallback = "Something went wrong. Try again."): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = String((err as { code: string }).code);
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Invalid email or password.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 8 characters.";
      case "auth/popup-closed-by-user":
        return "Sign-in was cancelled.";
      case "auth/popup-blocked":
        return "Pop-up was blocked. Allow pop-ups for this site or try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
      default:
        if ("message" in err && typeof (err as { message: unknown }).message === "string") {
          return (err as { message: string }).message;
        }
        return fallback;
    }
  }
  return fallback;
}
