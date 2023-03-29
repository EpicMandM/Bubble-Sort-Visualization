(function ($) {
  $(document).ready(function () {
    var array = [];
    var currentIndex = 0;
    var inputArray, indices, i, j, temp, maxAbsValue, height, containerWidth, totalWidth, div, valueSpan;

    $("#generate-array").click(function () {
      inputArray = $("#array-input").val().split(",").map(Number);
      array = [...inputArray];
      currentIndex = 0;
      renderArray(array);
      $("#next-step").prop("disabled", false);
    });

    $("#next-step").click(function () {
      if (currentIndex < array.length - 1) {
        indices = bubbleSortStep(array, currentIndex);
        i = indices[0];
        j = indices[1];
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
        temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
      }
      return [index, index + 1];
    }

    function renderArray(arr, i = -1, j = -1) {
      $("#array-container").empty();

      maxAbsValue = Math.max.apply(null, arr.map(Math.abs).concat([1]));

      arr.forEach(function (value, index) {
        var element = createArrayElement(value, index, maxAbsValue);

        if (!isSorted(arr) && (index === i || index === j)) {
          element.addClass("black");
        }

        $("#array-container").append(element);
      });
    }

    function createArrayElement(value, index, maxAbsValue) {
      var minHeight = 20;
      var maxHeight = 150;
      height = Math.max((Math.abs(value) / maxAbsValue) * maxHeight, minHeight);
      containerWidth = $("#array-container").width();
      totalWidth = 28 * array.length;

      div = $("<div></div>")
        .addClass("array-element")
        .css("height", height + "px")
        .css("left", (containerWidth - totalWidth) / 2 + index * 28 + "px");

      valueSpan = $("<span></span>")
        .addClass("array-element-value")
        .text(value);

      div.append(valueSpan);

      if (value < 0) {
        div.css({
          bottom: "50%",
          transform: "rotate(180deg)",
          transformOrigin: "bottom",
        });
        valueSpan.css({
          transform: "rotate(180deg)",
        });
      } else {
        div.css("bottom", "50%");
      }

      return div;
    }

function isSorted(arr) {
      for (i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          return false;
        }
      }
      return true;
    }
  });
})(jQuery);