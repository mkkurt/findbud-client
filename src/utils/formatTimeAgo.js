export default function formatTimeAgo(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const timeDiff = now - created;
  const diffInMinutes = Math.floor(timeDiff / 1000 / 60);
  const diffInHours = Math.floor(timeDiff / 1000 / 60 / 60);
  const diffInDays = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return `${diffInDays} days ago`;
  }
}
