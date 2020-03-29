 var switchAccentedChars = (s) => s
.replace(/á|à|â|ä|ã|å/g, 'a')
.replace(/Á|À|Â|Ä|Ã/g,'A')
.replace(/æ|é|è|ê|ë/g,'e')
.replace(/É|È|Ê|Ë/g,'E')
.replace(/í|ì|î|ï/g,'i')
.replace(/ñ|Ñ/g,'n')
.replace(/ó|ò|ô|ö|õ|ø|œ/g,'o')
.replace(/Ó|Ò|Ô|Ö|Õ|Ø|Œ/g,'O')
.replace(/ß/g,'ss')
.replace(/Ú|Ù|Û|Ü/g,'U')
.replace(/ú|ù|û|ü/g,'u');
