export function avatarUrl(studentId) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentId}`;
}

export function coverUrl(seed) {
  return `https://picsum.photos/seed/${seed}/400/300`;
}
