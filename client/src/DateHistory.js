export default function history(d){
    var d1 = new Date(d);
    var d2 = new Date();
    var yearsdiff = d2.getFullYear()-d1.getFullYear();
    var monthsdiff = Math.floor((d2-d1)/(1000*60*60*24*12));
    var daysdiff = Math.ceil((d2-d1)/(1000*60*60*24));
    var hoursdiff = Math.floor((d2-d1)/(1000*60*60));
    var minutesdiff = Math.floor((d2-d1)/(1000*60));
    var secondsdiff = Math.floor((d2-d1)/(1000));
    var hist = '';
    if(secondsdiff < 60){
        hist = (secondsdiff === 1)?('a second ago'):(`${secondsdiff} seconds ago`);
    } else if(minutesdiff < 60) {
        hist = (minutesdiff === 1)?('a min ago'):(`${minutesdiff} minutes ago`);  
    } else if(hoursdiff < 24){
        hist = (hoursdiff === 1)?('an hour ago'):(`${hoursdiff} hours ago`);
    } else if(daysdiff < 31){
        hist = (daysdiff === 1)?('a day ago'):(`${daysdiff} days ago`);
    } else if(monthsdiff < 12){
        hist = (monthsdiff === 1)?('a month ago'):(`${monthsdiff} months ago`);
    } else{
        hist = (yearsdiff === 1)?('a year ago'):(`${yearsdiff} years ago`);
    }
        return hist;
}