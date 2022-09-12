function chopSequence(logs,key){
    let next_logs = [[logs[0]]];
    for(let i=1; i<logs.length; i++){
        if(logs[i][key] == logs[(i-1)][key] +1) next_logs.at(-1).push(logs[i]);
        else next_logs.push([logs[i]])
    }
    return next_logs;
}
chopSequence(
  [{"sequence_index":0},{"sequence_index":1},{"sequence_index":2},{"sequence_index":3},{"sequence_index":4},{"sequence_index":5},{"sequence_index":7},{"sequence_index":8},{"sequence_index":10},{"sequence_index":11},{"sequence_index":12},{"sequence_index":13},{"sequence_index":14},{"sequence_index":15},{"sequence_index":16},{"sequence_index":17},{"sequence_index":18},{"sequence_index":19}],
  'sequence_index'
);
