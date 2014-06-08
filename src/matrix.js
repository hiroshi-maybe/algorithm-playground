
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

var rotate = function(matrix) {
  var temp, head, tail, offset, outer, offset, len = matrix.length;
  for (outer=0; outer<len/2; outer+=1) {
    for (offset=0; offset<len-outer*2-1; offset+=1) {
      temp = matrix[outer+offset][outer];
      matrix[outer+offset][outer] = matrix[outer][len-outer-offset-1];
      matrix[outer][len-outer-offset-1] = matrix[len-outer-offset-1][len-outer-1];
      matrix[len-outer-offset-1][len-outer-1] = matrix[len-outer-1][outer+offset];
      matrix[len-outer-1][outer+offset] = temp;
    }
  }
  return matrix;
};

console.log(rotate([
  [1,2,3,4,5],
  [11,12,13,14,15],
  [21,22,23,24,25],
  [31,32,33,34,35],
  [41,42,43,44,45]
]));

var region_fill = function(matrix, x, y, color) {
  var chk = function(_x,_y,_c) {
    return matrix[_y]!=null && matrix[_y][_x]!=null && matrix[_y][_x]!=_c;
  };
  matrix[y][x] = color;
  chk(x-1,y,color) && region_fill(matrix, x-1,y, color);
  chk(x,y+1,color) && region_fill(matrix, x,y+1, color);
  chk(x+1,y,color) && region_fill(matrix, x+1,y, color);
  chk(x,y-1,color) && region_fill(matrix, x,y-1, color);
};

var matrix = [
  [1,1,0,1,1],
  [0,1,0,0,1],
  [1,0,0,0,1],
  [1,1,0,1,1],
  [0,0,1,0,0]
];
region_fill(matrix, 2, 2, 1);
console.log(matrix);

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 8.8

var copy = function(matrix) {
  return matrix.map(function(row) {
    return row.slice();
  });
};

var can_put = function(matrix, y, x) {
  var row, col, diagonal, n = matrix.length;
  for (row=0; row<y; row+=1) {
    // Same column occupied
    if (matrix[row][x]==1) return false;
    // Left diagonal
    diagonal = matrix[row][x-(y-row)];
    if (diagonal!=null && diagonal==1) return false;
    // right diagonal
    diagonal = matrix[row][x+(y-row)];
    if (diagonal!=null && diagonal==1) return false;
  }
  return true;
};

var _n_queen = function(matrix, row) {
  var matrix_new, col=0, n=matrix.length;
  if (row >= n) {
    console.log(matrix);
    return;
  }
  for (; col<n; col+=1) {
    if (can_put(matrix, row, col)) {
      matrix_new = copy(matrix);
//      console.log("d",n,row,col,matrix_new);
      matrix_new[row][col] = 1;
      _n_queen(matrix_new, row+1);
    }
  }
};
var n_queen = function(n) {
  var i, j, matrix=[];
  for (i=0; i<n; i+=1) {
    matrix.push([]);
    for (j=0; j<n; j+=1) {
      matrix[i].push(0);
    }
  }
  _n_queen(matrix, 0);
};

n_queen(8);
console.log(c);