export default function progress() {
  setInterval(() => {
    process.stdout.write('.')
  }, 300);
}
