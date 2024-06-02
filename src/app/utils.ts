export function formatDuration(durationInSeconds?: number): string {
  if (durationInSeconds) {
    const seconds = Math.abs(durationInSeconds);
    let formatted = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

    if (durationInSeconds < 0) {
      formatted = "-" + formatted;
    }

    return formatted;
  }

  return '';
}
