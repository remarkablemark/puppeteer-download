export function envToBoolean(env?: string): boolean {
  switch (env) {
    case 'true':
    case '1':
      return true;
    case 'false':
    case '0':
    default:
      return false;
  }
}
