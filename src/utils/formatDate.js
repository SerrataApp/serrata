export default function formatDate(date) {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  return formattedDate
}