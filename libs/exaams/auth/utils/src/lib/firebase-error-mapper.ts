export function getReadableFirebaseError(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/invalid-credential':
      'Invalid credentials. Please check your email and password.',
    'auth/email-already-in-use': 'This email is already in use.',
    'auth/weak-password':
      'The password is too weak. Please use a stronger password.',
    'auth/user-disabled': 'This user has been disabled.',
  };

  return (
    errorMessages[errorCode.replace(/^FirebaseError: Firebase: /, '')] ||
    errorCode.replace('FirebaseError: Firebase:', '')
  );
}
