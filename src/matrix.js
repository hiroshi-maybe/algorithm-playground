
var largest_dimension = function(matrix) {
  var i, j, column_len = matrix[0].length, row_len = matrix.length, max=0, val, prev;
  matrix.forEach(function(row) {
    var i=0, len=row.length, prev;
    for (; i<len; i+=1) {
      prev = row[i-1] || 0;
      row[i] = row[i]==1 ? row[i]+prev : row[i];
    }
  });
  for (i=0; i<row_len; i+=1) {
    for (j=0; j<column_len; j+=1) {
      val = matrix[i][j];
      prev = (matrix[i-1]&&matrix[i-1][j]) || 0;
      if (val != 0) {
	matrix[i][j] += prev;
      }
      if (matrix[i][j]>=max) max = matrix[i][j];
    }
  }
  return max;
};

console.log(largest_dimension([
  [0,0,0,1,0],
  [1,1,1,0,0],
  [1,1,1,1,0],
  [1,1,0,0,0],
  [1,1,1,1,0]
]));