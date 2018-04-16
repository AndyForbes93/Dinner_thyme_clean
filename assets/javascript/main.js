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

    $("#submit").on("click", function test() {
        //making cards appear
        $(".container").removeClass("hide")

        //ingredient search
        if (search === "") {
            alert("Please enter a search query");
        } else {
            search = $("#ingredient-input").val();
        }

        //queryURL and array to push recipes into 
        var queryURL = "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=716be10f3517e512858d539e14920f86&sort=r&page=1&q=" + search;

        var recipeIdArray = [];

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            let recipeCount = response.count;

            var obj = jQuery.parseJSON(response);
            //for loop to append first five recipe titles and images to cards
            for (var i = 0; i < 5; i++) {
                recipeIdArray.push(obj.recipes[i].recipe_id);
                $("#recipe-name-" + i).html(obj.recipes[i].title);
                $("#recipe-image-" + i).attr("src", obj.recipes[i].image_url);
                // $("#recipe-card-" + i).attr("href", obj.recipes[i].source_url);



                var url = "https://cors-anywhere.herokuapp.com/https://community-food2fork.p.mashape.com/get?key=716be10f3517e512858d539e14920f86&rId=" + obj.recipes[i].recipe_id;
                $.ajax({
                    url: url,
                    method: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-Mashape-Key", "17STlxvDu0mshiHdSIFa7pNut86Vp1EqzzvjsngIg9bGERUjDu");
                    }
                }).then(function (newResponse) {
                    //for loop to append list of ingredients for each recipe
                    var recipeObj = jQuery.parseJSON(newResponse);
                    for (var j = 0; j < recipeObj.recipe.ingredients.length; j++) {
                        let list = $("<ul>");
                        let listItem = $("<li>");
                        $(list).append(listItem);
                        listItem.text(recipeObj.recipe.ingredients[j]);
                        $("#ingredientList-" + j).append(list);

                        //setting nutriionURL to search for the ingredient at each position of the array
                        /*     var nutritionURL = "https://api.nutritionix.com/v1_1/search/" + recipeObj.recipe.ingredients[j] +
                            "?&appId=3d9a6196&appKey=68a05b8f20a5908648e499d5b974c8ae&fields=item_name,nf_calories";

                        let totalCalories = 0;
                        let resultArr = [];
                        $.ajax({
                            url: nutritionURL,
                            method: "GET"
                        }).then(function (nutritionResponse) {




                            for (var k = 0; k < nutritionResponse.hits.length; k++) {
                                if (nutritionResponse.hits[k].fields.nf_calories) {
                                    resultArr.push(nutritionResponse.hits[k].fields.nf_calories);
                                } else {}
                            }
                        });

*/
                    }

                });


            }
        });


    });

    // !! In each of the following, inside the following 6 on-click events, all instances of recipeCards will be replaced with 
    // the current response. the indexes of those responses should remain the same !!
    $(".container").on("click", '#0', function () {
        clearIng();
        $('.modal-title').text(recipeCardArr[0].dish);
        $('.tw-modal-pic').attr('src', imgArr[0]);
        for (j = 0; j < recipeCardArr[0].ingredients.length; j++) {
            mIngredientList = $('<li>').addClass('get-cleared');
            $(mIngredientList).html(recipeCardArr[0].ingredients[j]);
            $('#calorie-card').append(mIngredientList);
        }
        $('#myModal').modal('show');
    });
    // Modal 2
    $(".container").on("click", '#1', function () {
        clearIng();
        console.log('you did it !!');
        $('.modal-title').text(recipeCardArr[1].dish);
        $('.tw-modal-pic').attr('src', imgArr[1]);
        for (j = 0; j < recipeCardArr[1].ingredients.length; j++) {
            mIngredientList = $('<li>').addClass('get-cleared');
            $(mIngredientList).html(recipeCardArr[1].ingredients[j]);
            $('#calorie-card').append(mIngredientList);
        }
        $('#myModal').modal('show');
    });
    // Modal 3
    $(".container").on("click", '#2', function () {
        clearIng();
        console.log('you did it !!');
        $('.modal-title').text(recipeCardArr[2].dish);
        $('.tw-modal-pic').attr('src', imgArr[2]);
        for (j = 0; j < recipeCardArr[2].ingredients.length; j++) {
            mIngredientList = $('<li>').addClass('get-cleared');
            $(mIngredientList).html(recipeCardArr[2].ingredients[j]);
            $('#calorie-card').append(mIngredientList);
        }
        $('#myModal').modal('show');
    });
    // Modal 4
    $(".container").on("click", '#3', function () {
        clearIng();
        console.log('you did it !!');
        $('.modal-title').text(recipeCardArr[3].dish);
        $('.tw-modal-pic').attr('src', imgArr[3]);
        for (j = 0; j < recipeCardArr[3].ingredients.length; j++) {
            mIngredientList = $('<li>').addClass('get-cleared');
            $(mIngredientList).html(recipeCardArr[3].ingredients[j]);
            $('#calorie-card').append(mIngredientList);
        }
        $('#myModal').modal('show');
    });
    // Modal 5
    $(".container").on("click", '#4', function () {
        clearIng();
        console.log('you did it !!');
        $('.modal-title').text(recipeCardArr[4].dish);
        $('.tw-modal-pic').attr('src', imgArr[4]);
        for (j = 0; j < recipeCardArr[4].ingredients.length; j++) {
            mIngredientList = $('<li>').addClass('get-cleared');
            $(mIngredientList).html(recipeCardArr[4].ingredients[j]);
            $('#calorie-card').append(mIngredientList);
        }
        $('#myModal').modal('show');
    });
    // Modal 6
    $(".container").on("click", '#5', function () {
        clearIng();
        $('.modal-title').text(recipeCardArr[5].dish);
        $('.tw-modal-pic').attr('src', imgArr[5])
        for (j = 0; j < recipeCardArr[5].ingredients.length; j++) {
            mIngredientList = $('<li>').addClass('get-cleared');
            $(mIngredientList).html(recipeCardArr[5].ingredients[j]);
            $('#calorie-card').append(mIngredientList);
        }
        $('#myModal').modal('show');
    });
    // function to clear rows
    function clearIt() {
        $("#row1").empty();
        $("#row2").empty();
    };
    // Clear Ingredients from the current modal list
    function clearIng() {
        $(".get-cleared").empty();
    }

});