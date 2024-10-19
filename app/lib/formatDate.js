export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Define options for date formatting
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return `${formattedDate}`;
}