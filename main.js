var App = {
  json: []
  , venueID: 0
  , noResults: false
};
$(document).ready(function () {
  // var api = "https://sidefound.netlify.com/sidefound.json";
  // VueJS data
  var app = new Vue({
    el: "#app"
    , data: App
    , created: function () {
      ajaxGetEvents();
    }
  });

  function ajaxGetEvents() {
    return $.ajax({
      url: 'https://api.airtable.com/v0/applDRlhH1yungVMb/Products?view=Grid%20view'
      , beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer keyT68wd2tbtwNHJ7")
      }
      , success: function (data) {
        App.json = data;
       
          
      }
    });
  }
  $(".filterBtn", this).on("click", function () {
    $(".filterBtn").removeClass("selected");
    $(this).addClass("selected");
    filterResult();
    setTimeout(function () {
      var visiblePC = $(".ProductCards:visible").length;
      if (visiblePC < 1) {
        App.noResults = true;
      }
      else {
        App.noResults = false;
      }
    }, 650);
  });

  function filterResult() {
    // This var gets the element that has the class called 'selected'
    var selected = $(".selected");
    // This gets the data-value from the element that has the selected class
    var selectedVal = selected.attr("data-value");
    // These are some arrays that hold the IDs for the events and assigns them to the correct venue
    var Filter1 = [1];
    var Filter2 = [2];
    var Filter3 = [3];
    var Filter4 = [4];
    var All = [1, 2, 3, 4];
    // This evaluates the data value
    var thisArray = eval(selectedVal);
    /* This goes through every event and matches them to the correct venue,
     * and which ever venue is clicked it will hide the events that don't match,
     * and shows the events that match */
    var addNumb = 0;
    $(".ProductCards").each(function () {
      var $this = $(this);
      var thisVal = parseInt($this.attr("id"));
      if ($.inArray(thisVal, thisArray) == -1) {
        $this.fadeOut("slow");
      }
      else {
        $this.fadeIn("slow");
      }
    });
    App.Count = $(".ProductCards:visible").length;
  }
  $("a#contact").on("click", function (e) {
    e.preventDefault();
    $("div#contactDetails").slideUp("slow");
  })
  
});
