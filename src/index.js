module.exports = function solveSudoku(matrix) {
  // your solution

  // 1) создать вместо каждого нуля массив возможных чисел в этой клетке от 1 до 9
  for (var i = 0; i < matrix[0].length; i++) { // можно до 9
    for (var j = 0; j < matrix[0].length; j++){
      if (matrix[i][j] === 0) {
        matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  for (var needToRepeat = false; needToRepeat === true; ) {
    needToRepeat = false;
    // 2) 
    for (var i = 0; i < 9; i++){
      var arrStr = []; // массив встеченных(уже находящихся элементов в этой строке)
      for (var j = 0; j < 9; j++) {
        if (!Array.isArray(matrix[i][j])) { // если элемент НЕ является массивом, то добавить его в arrStr
          аrrStr.push(matrix[i][j]);
        }
      }
      // 3) 
      for (var j = 0; j < 9; j++) {
        if (Array.isArray(matrix[i][j])) { // если элемент ЯВЛЯЕТСЯ массивом, то 
          elemEque1: for (var k = 0; k < arrStr.length; k++) { // проход по встреченным
            for (var m = 0; m < matrix[i][j]; m++) { // проход по возможным в этой ячейке
              if (matrix[i][j][m] === arrStr[k]) { // если совпали, то удалить из возможных
                matrix[i][j].splice(m, 1);
                needToRepeat = true; // после окончания пройти заново, т.к. есть изменения
                continue elemEque1; // незачем идти дальше, ведь в массиве не повторяются
              }
            }

          }
          if (matrix[i][j].length === 1){ // проверим если возможен только один вариант, то заменим массив на значение
            matrix[i][j] = matrix[i][j][0];
          }
        }
      }
    }

    // 2.1) 
    for (var j = 0; j < 9; j++){
      var arrStr = []; // массив встеченных(уже находящихся элементов в этой строке)
      for (var i = 0; i < 9; i++) {
        if (!Array.isArray(matrix[i][j])) { // если элемент НЕ является массивом, то добавить его в arrStr
          аrrStr.push(matrix[i][j]);
        }
      }
      // 3.1) 
      for (var i = 0; i < 9; i++) {
        if (Array.isArray(matrix[i][j])) { // если элемент ЯВЛЯЕТСЯ массивом, то 
          elemEque1: for (var k = 0; k < arrStr.length; k++) { // проход по встреченным
            for (var m = 0; m < matrix[i][j]; m++) { // проход по возможным в этой ячейке
              if (matrix[i][j][m] === arrStr[k]) { // если совпали, то удалить из возможных
                matrix[i][j].splice(m, 1);
                needToRepeat = true; // после окончания пройти заново, т.к. есть изменения
                continue elemEque1; // незачем идти дальше, ведь в массиве не повторяются
              }
            }

          }
          if (matrix[i][j].length === 1){ // проверим если возможен только один вариант, то заменим массив на значение
            matrix[i][j] = matrix[i][j][0];
          }
        }
      }
    }
  }
  return matrix;

}
