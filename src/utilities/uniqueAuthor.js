export default function uniqueAuthor(au, ar){
    au = au.concat(ar.filter((item => {
        return au.every(e => e.name != item.name);
    })))
    return au;
};