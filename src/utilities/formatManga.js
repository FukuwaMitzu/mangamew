function formatTitle(title) {
    let a= title;
    return a.en || a.ja || a['ja-ro'] || a['ja'] || a[Object.keys(a)[0]] | "";
}
function formatDesciption(des) {
    let a = des;
    return a.en || a.ja || a['ja-ro'] || a['ja'] || a[Object.keys(a)[0]] || "";
}
function formatAltTitles(alt){
    let a = {};
    alt.forEach((item) => {
        let b = Object.keys(item)[0];
        if(!a[b])
        a[b] = item[b];
    });
    return a.en || a.ja || a['ja-ro'] || a['ja'] || a[Object.keys(a)[0]] || "";
}

export {formatAltTitles, formatDesciption, formatTitle};