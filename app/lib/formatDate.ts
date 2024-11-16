export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Define options for date formatting
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    
    return formattedDate;
}
