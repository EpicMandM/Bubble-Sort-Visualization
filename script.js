$(document).ready(function () {
  let array = [];
  let currentIndex = 0;

  $("#generate-array").click(function () {
    const inputArray = $("#array-input").val().split(",").map(Number);
    array = [...inputArray];
    currentIndex = 0;
    renderArray(array);
    $("#next-step").prop("disabled", false);
  });

  $("#next-step").click(function () {
    if (currentIndex < array.length - 1) {
      const [i, j] = bubbleSortStep(array, currentIndex);
      if (j === currentIndex) {
        currentIndex = 0;
      } else {
        currentIndex = j;
      }
      renderArray(array, i, j);

      if (isSorted(array)) {
        $("#next-step").prop("disabled", true);
      }
    } else {
      currentIndex = 0;
    }
  });

  function bubbleSortStep(arr, index) {
    if (arr[index] > arr[index + 1]) {
      const temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;
    }
    return [index, index + 1];
  }

    function renderArray(arr, i = -1, j = -1) {
    $("#array-container").empty();

    const maxAbsValue = Math.max(...arr.map(Math.abs), 1);

    arr.forEach((value, index) => {
      const element = createArrayElement(value, index, maxAbsValue);

      if (!isSorted(arr) && (index === i || index === j)) {
        element.addClass("black");
      }

      $("#array-container").append(element);
    });
  }

  function createArrayElement(value, index, maxAbsValue) {
    const minHeight = 20;
    const maxHeight = 150;
    const height = Math.max((Math.abs(value) / maxAbsValue) * maxHeight, minHeight);
    const containerWidth = $("#array-container").width();
    const totalWidth = 28 * array.length;

    const div = $('<div></div>')
      .addClass('array-element')
      .css('height', `${height}px`)
      .css('left', `${(containerWidth - totalWidth) / 2 + index * 28}px`);

    const valueSpan = $('<span></span>')
      .addClass('array-element-value')
      .text(value);

    div.append(valueSpan);

    if (value < 0) {
      div.css({
        'bottom': '50%',
        'transform': 'rotate(180deg)',
        'transform-origin': 'bottom',
      });
      valueSpan.css({
        'transform': 'rotate(180deg)',
      });
    } else {
      div.css('bottom', '50%');
    }

    return div;
  }
});

  function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  }