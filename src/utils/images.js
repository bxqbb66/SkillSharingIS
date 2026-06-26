export function avatarUrl(studentId) {
  // Custom avatars
  if (studentId === '20210001') return '/avatars/20210001.png';
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentId}`;
}

const categoryMeta = {
  '学业': { emoji: '📚', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-500' },
  '学业辅导': { emoji: '📚', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-500' },
  '技术': { emoji: '💻', gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-500' },
  '技术服务': { emoji: '💻', gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-500' },
  '生活': { emoji: '🏠', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500' },
  '生活服务': { emoji: '🏠', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500' },
  '文体': { emoji: '🎯', gradient: 'from-orange-500 to-amber-600', bg: 'bg-orange-500' },
  '文体服务': { emoji: '🎯', gradient: 'from-orange-500 to-amber-600', bg: 'bg-orange-500' },
};

export function getCategoryMeta(category) {
  return categoryMeta[category] || { emoji: '📌', gradient: 'from-gray-400 to-gray-500', bg: 'bg-gray-400' };
}
