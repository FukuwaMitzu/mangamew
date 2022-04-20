export default function formatScore(number){
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