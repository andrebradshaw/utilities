var findDupes = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? true : (o[i] = false));
