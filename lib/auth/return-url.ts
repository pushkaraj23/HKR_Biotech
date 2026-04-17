/** Sign-in URL that returns the user to `returnPath` after a successful login. */
export function loginPathWithCallback(returnPath: string): string {
  return `/login?callbackUrl=${encodeURIComponent(returnPath)}`;
}
