export function useGoogleSignIn() {
  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      '/api/auth/google', // change this to your actual endpoint
      'Google Login',
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        // optionally: re-fetch user info or trigger state update
        window.location.reload();
      }
    }, 500);
  };

  return { handleGoogleLogin };
}
