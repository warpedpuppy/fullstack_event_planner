export default {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    formatDate(str) {
        let dateObject = new Date(str);
        return `${this.months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`
    }
}