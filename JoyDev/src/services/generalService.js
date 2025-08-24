export const getFormattedDate = (date)=>{
    const data = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return data.toLocaleDateString("en-IN", options);
}