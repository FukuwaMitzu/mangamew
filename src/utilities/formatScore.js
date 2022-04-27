export default function formatScore(number){
    if(isNaN(number) || number===null)return "N/A";

    let temp = number;
    let i = 0;
    while(temp>=1000){
        temp/=1000;
        i+=1;
    }
    let counter = "";
    if(i>=1){
        number = temp.toFixed(1);
        counter = "k";
    }
    if(i>=2)counter = "mil";
    if(i>=3)counter = "bil";
    
    return `${number}${counter}`;
}

function formatAverage(number){
    if(isNaN(number) || number===null)return "N/A";
    return number.toFixed(2);
}
export {formatScore, formatAverage};