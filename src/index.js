module.exports = function solveSudoku(matrix) {
  // your solution

  // 1) создать вместо каждого нуля массив возможных чисел в этой клетке от 1 до 9
  for (var i = 0; i < matrix[0].length; i++) { // дальше буду использовать 9 вместо matrix[0].length
    for (var j = 0; j < matrix[0].length; j++){
      if (matrix[i][j] === 0) {
        matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  var arrObjOfMatrix = []; // массив объектов. В объектах матрицы сохраненные при новом подборе
  var needAdjustment; // булеан необходимости подбора, когда алгоритмы не работают

  var needToRepeatMain = true;
  MainWhile: while (needToRepeatMain === true) { // это общий повтор
    needToRepeatMain = false;

    var needToRepeat = true;
    while (needToRepeat === true) { // этот цикл для строк, столбцов и квадратов
      needToRepeat = false;
      // 2) создание массива невозможных чисел в этой строке
      for (var i = 0; i < 9; i++){ // правильнее matrix[0].length вместо 9, но так понятнее
        var arrStr = []; // массив встреченных(уже находящихся элементов в этой строке)
        for (var j = 0; j < 9; j++) {
          if (!Array.isArray(matrix[i][j])) { // если элемент НЕ является массивом, то добавить его в arrStr
            arrStr.push(matrix[i][j]);
          }
        }
        // 2.1) удаление из ячейки-матрицы невозможных значений
        for (var j = 0; j < 9; j++) {
          if (Array.isArray(matrix[i][j])) { // если элемент ЯВЛЯЕТСЯ массивом, то 
            elemEque1: for (var k = 0; k < arrStr.length; k++) { // проход по встреченным
              for (var m = 0; m < matrix[i][j].length; m++) { // проход по возможным в этой ячейке
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
      // проверка если в ячейке массив с одним значением
      for (var i = 0; i < 9; i++) { 
        for (var j = 0; j < 9; j++){
          if (Array.isArray(matrix[i][j]) && (matrix[i][j].length === 1)) {
            matrix[i][j] = matrix[i][j][0];
            needToRepeat = true;
          }
        }
      }

      // 3) создание массива невозможных чисел в этом столбце
      for (var j = 0; j < 9; j++){
        var arrStr = []; // массив встеченных(уже находящихся элементов в этом стобце)
        for (var i = 0; i < 9; i++) {
          if (!Array.isArray(matrix[i][j])) { // если элемент НЕ является массивом, то добавить его в arrStr
            arrStr.push(matrix[i][j]);
          }
        }
        // 3.1) 
        for (var i = 0; i < 9; i++) {
          if (Array.isArray(matrix[i][j])) { // если элемент ЯВЛЯЕТСЯ массивом, то 
            elemEque2: for (var k = 0; k < arrStr.length; k++) { // проход по встреченным
              for (var m = 0; m < matrix[i][j].length; m++) { // проход по возможным в этой ячейке
                if (matrix[i][j][m] === arrStr[k]) { // если совпали, то удалить из возможных
                  matrix[i][j].splice(m, 1);
                  needToRepeat = true; // после окончания пройти заново, т.к. есть изменения
                  continue elemEque2; // незачем идти дальше, ведь в массиве не повторяются
                }
              }

            }
            if (matrix[i][j].length === 1){ // проверим если возможен только один вариант, то заменим массив на значение
              matrix[i][j] = matrix[i][j][0];
            }
          }
        }
      }
      // проверка если в ячейке массив с одним значением
      for (var i = 0; i < 9; i++) { 
        for (var j = 0; j < 9; j++){
          if (Array.isArray(matrix[i][j]) && (matrix[i][j].length === 1)) {
            matrix[i][j] = matrix[i][j][0];
            needToRepeat = true;
          }
        }
      }


      // 5) квадраты. Аналогичный поиск в квадратны(3х3) ячейках
      for (var bl1 = 0; bl1 < 3; bl1++){
        for (var bl2 = 0; bl2 < 3; bl2++){
          // по квадрату
          var arrSqr = []; // массив встреченных чисел в данном квадрате
          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (!Array.isArray(matrix[bl1 * 3 + i ][bl2 * 3 + j ])) { // если НЕ массив
                arrSqr.push(matrix[bl1 * 3 + i ][bl2 * 3 + j ]); // то добавить
              }
            }
          }

          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (Array.isArray(matrix[bl1 * 3 + i ][bl2 * 3 + j ])) { // если массив
                elemEque3: for (var ii = 0; ii < arrSqr.length; ii++) {
                  for (var jj = 0; jj < matrix[bl1 * 3 + i ][bl2 * 3 + j ].length; jj++) {
                    if (matrix[bl1 * 3 + i ][bl2 * 3 + j ][jj] === arrSqr[ii]) { //  если совпали, то удалить из возможных
                      matrix[bl1 * 3 + i ][bl2 * 3 + j ].splice(jj, 1);
                      needToRepeat = true; // после окончания пройти заново, т.к. есть изменения
                      continue elemEque3; // незачем идти дальше, ведь в массиве не повторяются
                    }
                  }
                }
                if (matrix[bl1 * 3 + i ][bl2 * 3 + j ].length === 1){ // проверим если возможен только один вариант, то заменим массив на значение
                  matrix[bl1 * 3 + i ][bl2 * 3 + j ] = matrix[bl1 * 3 + i ][bl2 * 3 + j ][0];
                }
              }
            }
          }
        }
      }
      //  проверка если в ячейке массив с одним значением
      for (var i = 0; i < 9; i++) { 
        for (var j = 0; j < 9; j++){
          if (Array.isArray(matrix[i][j]) && (matrix[i][j].length === 1)) {
            matrix[i][j] = matrix[i][j][0];
            needToRepeat = true;
          }
        }
      }
    } 

    // 6) проверка если элемент в стоке возможен только в одной из ячеек
    for (var i = 0; i < 9; i++) {
      var arrStr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // надо попробовать через new заданной длинны
      var arrStrPos = [];
      for (var j = 0; j < 9; j++) {
        if (Array.isArray(matrix[i][j])) { // если элемент Является массивом, то добавить в arrStr кол-во встреченных
          for (var k = 0; k < matrix[i][j].length; k++){
            arrStr[matrix[i][j][k]]++; // встретилось число, значит в arrStr на данной позиции увеличить на 1
            arrStrPos[matrix[i][j][k]] = j; // позиция массива возможных значений в строке(чтобы потом не искать)
          }
        }
      }
      for (var m = 0; m < arrStr.length; m++){
        if (arrStr[m] === 1){ // если число возможно только в одной ячейке
          matrix[i][arrStrPos[m]] = m; // то эта ячейка равна числу(номеру по порядку в arrStr)
          needToRepeatMain = true;
        }
      }
      if (needToRepeatMain) { // в начало или выскочит ошибка
        continue MainWhile;
      }
    }
    // 7) проверка если элемент в СТОЛБЦЕ возможен только в одной из ячеек
    for (var j = 0; j < 9; j++) {
      var arrStr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // надо попробовать через new заданной длинны
      var arrStrPos = [];
      for (var i = 0; i < 9; i++) {
        if (Array.isArray(matrix[i][j])) { // если элемент Является массивом, то добавить в arrStr кол-во встреченных
          for (var k = 0; k < matrix[i][j].length; k++){
            arrStr[matrix[i][j][k]]++; // встретилось число, значит в arrStr на данной позиции увеличить на 1
            arrStrPos[matrix[i][j][k]] = i; // позиция массива возможных значений в столбце(чтобы потом не искать)
          }
        }
      }
      for (var m = 0; m < arrStr.length; m++){ // можно начинать и с m = 1
        if (arrStr[m] === 1){ // если число возможно только в одной ячейке
          matrix[arrStrPos[m]][j] = m; // то эта ячейка равна числу(номеру по порядку в arrStr)
          needToRepeatMain = true;
        }
      }
      if (needToRepeatMain) {
        continue MainWhile; // в начало или выскочит ошибка
      }
    }

    // 8) проверка если элемент в КВАДРАТЕ возможен только в одной из ячеек
    for (var bl1 = 0; bl1 < 3; bl1++){
      for (var bl2 = 0; bl2 < 3; bl2++){
        var arrStr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // надо попробовать через new заданной длинны
        var arrStrPos = [];
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
            if (Array.isArray(matrix[bl1 * 3 + i][bl2 * 3 + j])) { // если элемент Является массивом, то добавить в arrStr кол-во встреченных
              for (var k = 0; k < matrix[bl1 * 3 + i][bl2 * 3 + j].length; k++){
                arrStr[matrix[bl1 * 3 + i][bl2 * 3 + j][k]]++; // встретилось число, значит в arrStr на данной позиции увеличить на 1
                arrStrPos[matrix[bl1 * 3 + i][bl2 * 3 + j][k]] = i * 3 + j; // позиция массива возможных значений в столбце(чтобы потом не искать)
              }
            }
          }
        }
        for (var m = 0; m < arrStr.length; m++){
          if (arrStr[m] === 1){ // если число возможно только в одной ячейке
            matrix[bl1 * 3 + Math.floor(arrStrPos[m]/3)][bl2 * 3 + arrStrPos[m] % 3] = m; // то эта ячейка равна числу(номеру по порядку в arrStr)
            needToRepeatMain = true;
          }
        }
        if (needToRepeatMain) {
          continue MainWhile; // в начало или выскочит ошибка
        }
      }
    }

    // 10) ПРОВЕРКА: если не проходит - откат к предыдущей
    for (var i = 0; i < 9; i++) { 
      for (var j = 0; j < 9; j++){
        for (var k = j + 1; k < 9; k++) {
          if (!Array.isArray(matrix[i][j]) && (matrix[i][j] === matrix[i][k])) { //ОШИБКА не массив и равен другому в этом ряду
            while (true) { // бесконечный цикл, т.к. в if переход в начало, он рано или поздно сработает
              // если не последняя возможный вариант в ячейке при данном подборе 
              if (arrObjOfMatrix[arrObjOfMatrix.length - 1].Ind < arrObjOfMatrix[arrObjOfMatrix.length - 1].IndMax) {
                (arrObjOfMatrix[arrObjOfMatrix.length - 1].Ind)++; // выбрать следующий
                // и откатимся к последней в массиве сохранённой общей матрице
                for (var ii = 0; ii < 9; ii++) { 
                  for (var jj = 0; jj < 9; jj++){
                    if (Array.isArray(arrObjOfMatrix[arrObjOfMatrix.length - 1].MatrixCopy[ii][jj])) {
                      matrix[ii][jj] = arrObjOfMatrix[arrObjOfMatrix.length - 1].MatrixCopy[ii][jj].slice(); // ВОЗВРАТ к исходному, глубоко копирую массив
                    }
                    else {
                      matrix[ii][jj] = arrObjOfMatrix[arrObjOfMatrix.length - 1].MatrixCopy[ii][jj];
                    }
                  }
                }
                var x = arrObjOfMatrix[arrObjOfMatrix.length - 1]; //для краткости записи - ОБЪЕКТ последний
                matrix[x.Pos1][x.Pos2] = matrix[x.Pos1][x.Pos2][x.Ind]; // заменили эл-т в матрице на следующий возможный
                // и в начало
                var needToRepeatMain = true;
                continue MainWhile;
              }
              else {
                arrObjOfMatrix.pop(); // удалим последнюю копию матрицы и её атрибуты. Ведь ошибка в предыдущем подборе
              }
            }
          }
        }
      }
    }

    // 9) Подбор!!!
    needAdjustment = false;
    
    adjust1: for (var i = 0; i < 9; i++) { 
      for (var j = 0; j < 9; j++){
        if (Array.isArray(matrix[i][j])) { // ещё остались массивы в матрице
          needAdjustment = true;
          break adjust1;      
        }
      }
    }
    

    if (needAdjustment){
      var copyOfmatrix = [[],[],[],[],[],[],[],[],[]];
      for (var i = 0; i < 9; i++) { 
        for (var j = 0; j < 9; j++){
          if (Array.isArray(matrix[i][j])) {
            copyOfmatrix[i][j] = matrix[i][j].slice(); // глубоко копирую массив
          }
          else {
            copyOfmatrix[i][j] = matrix[i][j];
          }
        }
      }
      var objMatrixCopy = {}; // объект, который хранит матрицу, к которой надо будет откатываться + доп. атрибуты
      objMatrixCopy.MatrixCopy = copyOfmatrix;

      var shortLength = 9; // самое малое число возможных вариантов в ячейке
      var indShortLength1 = 0; // номер строки такой ячейки
      var indShortLength2 = 0; // номер столбца такой ячейки
      for (var i = 0; i < 9; i++) { 
        for (var j = 0; j < 9; j++){
          if (Array.isArray(matrix[i][j]) && (matrix[i][j].length < shortLength)) {
            shortLength = matrix[i][j].length;
            indShortLength1 = i;
            indShortLength2 = j;
          }
        }
      }
      objMatrixCopy.Pos1 = indShortLength1; // i ячейки, в которую вставляем подбором
      objMatrixCopy.Pos2 = indShortLength2; // j
      objMatrixCopy.Ind = 0; // номер возможного варианта
      objMatrixCopy.IndMax = shortLength - 1; //сколько всего возможных вариантов в ячейке. - 1 т.к. индексы начинаются с нуля
      arrObjOfMatrix.push(objMatrixCopy); // добавим копию матрицы в массив копий
      // в ячейку, где меньше всего вариантов запишем первый по счету
      matrix[indShortLength1][indShortLength2] = matrix[indShortLength1][indShortLength2][0];

      needToRepeatMain = true;
      continue MainWhile;
    } 

    // проверка если в ячейке массив с одним значением
    for (var i = 0; i < 9; i++) { 
      for (var j = 0; j < 9; j++){
        if (Array.isArray(matrix[i][j]) && (matrix[i][j].length === 1)) {
          matrix[i][j] = matrix[i][j][0];
          needToRepeatMain = true;
        }
      }
    }
  }
  
  // заменяю на нули, т.к. проходят тесты и с массивами))) можно убрать будет и без этого работать
  var arrToNull = matrix.slice();
  for (var i = 0; i < 9; i++) { 
    for (var j = 0; j < 9; j++){
      if (Array.isArray(arrToNull[i][j])) {
        arrToNull[i][j] = 0;
      }
    }
  }

  return arrToNull;

}
