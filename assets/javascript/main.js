$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyD3OPFSy0LLw_-4aiC8lNoOu10C6r6GPZg",
        authDomain: "dinner-thyme-acaba.firebaseapp.com",
        databaseURL: "https://dinner-thyme-acaba.firebaseio.com",
        projectId: "dinner-thyme-acaba",
        storageBucket: "dinner-thyme-acaba.appspot.com",
        messagingSenderId: "59448784946"
    };

    firebase.initializeApp(config);

    const database = firebase.database();
    //add searchbar validation input
    var search;
    var recipeIdArray = [];
    // Hiding text until invalid search is run.
    $("#invalidSearch").hide();

    const validateSearch = function() {
        if (search === "") {
            $("#searchLabel").hide()
            $("#invalidSearch").show();
            setTimeout(function() {
                $("#searchLabel").show();
                $("#invalidSearch").hide();
            }, 1000)
        } else {
            search = $("#ingredient-input").val();
        }
    }

    const makeRecipeCard = function(response) {
        let recipeCount = response.count;
        var obj = jQuery.parseJSON(response);

        //console.log(obj);
        for (var i = 0; i < 5; i++) {
            // console.log(obj.recipes[i].title);
            // console.log(obj.recipes[i].recipe_id);
            recipeIdArray.push(obj.recipes[i].recipe_id);
            $("#recipes").append(obj.recipes[i].title + "<br>");
            $("#recipes").append("<ul><li><a href='#'>" +obj.recipes[i].title+ "</a></li></ul>");

        }

        for (i = 0; i < 5; i++) {
            // console.log(obj.recipes[i].title);
            // console.log(obj.recipes[i].recipe_id);
            //trying to append five cards for search
            var name = obj.recipes[i].title;
            var number = obj.recipes[i].recipe_id;
            recipeIdArray.push(obj.recipes[i].recipe_id);
            $("#recipe-name").text(name);
            $("#recipe-image").attr("src", obj.recipes[i].image_url);
        }
    } 

    const appendIngredients = function(newresponse) {
        var obj = jQuery.parseJSON(newresponse);
            let ingredientArr = obj.recipe.ingredients;
            for(var i = 0; i < ingredientArr.length; i++) {
                let list = $("<ul>");
                let listItem = $("<li>");
                $(list).append(listItem);
                listItem.text(ingredientArr[i]);
                $("#ingredientList").append(list);
        
                var nutritionURL = "https://api.nutritionix.com/v1_1/search/" + ingredientArr[i] +"?&appId=f35ae0d0&appKey=b148a8cfc03753efc27ea05a30bfd6e9&fields=item_name,nf_calories";
                //var queryURL = "http://cors-proxy.htmldriven.com/?url=https://api.nutritionix.com/v1_1/search/taco?&appId=f35ae0d0&appKey=80cac78d0905b2d36ca8825470f578d7";
                
                let totalCalories = 0;
                let resultArr = [];
                $.ajax({
                    url: nutritionURL,
                    method: "GET"
                }).then(function (response) {

                    for(var i = 0; i < response.hits.length; i++) {
                        if(response.hits[i].fields.nf_calories) {
                            resultArr.push(response.hits[i].fields.nf_calories);
                        } else {
                            console.log(response.hits[i].fields.item_name);
                        }
                    }
                });
            }
    }

    $("#submit").on("click", function test() {
        // var queryURL = "http://cors-proxy.htmldriven.com/?url=http://food2fork.com/api/search?key=2faf058c37cad76f25dc0f61a8700b82&q=asparagus";

        //Makes sure search isn't blank.
        validateSearch();

        var queryURL = "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=2faf058c37cad76f25dc0f61a8700b82&q=" + search;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            makeRecipeCard(response);
        });

        var url = "https://cors-anywhere.herokuapp.com/https://community-food2fork.p.mashape.com/get?key=2faf058c37cad76f25dc0f61a8700b82&rId=5cc4a8";
        $.ajax({
            url: url,
            method: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader("X-Mashape-Key", "17STlxvDu0mshiHdSIFa7pNut86Vp1EqzzvjsngIg9bGERUjDu"); },
        }).then(function (newresponse) {
            
            appendIngredients(newresponse);
        });

    });  
});