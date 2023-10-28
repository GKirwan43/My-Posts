const convertDateToString = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
  
    return `${month}/${day}/${year} at ${hours12}:${minutes} ${ampm}`;
  };
  
  export default convertDateToString;
  