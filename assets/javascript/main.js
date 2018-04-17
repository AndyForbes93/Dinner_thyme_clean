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

    let signInEmail = $("#email_inline").val().trim();
    let signInPassword = $("#password_inline").val().trim();


    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // User is signed in.
            $("#signupBtn, #sign-in-Btn, #email_inline, #password_inline").hide();
            $("#userName").text("Currently signed in as " + user.email);
        } else {


          // No user is signed in.
          $("#email_inline, #password_inline, #signupBtn, #sign-in-Btn").show();
          $("#userName").hide();
          console.log("No one is signed in");
        }
    });

    $("#createAcc").on("click", function (e) {
        e.preventDefault();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        // allows using to create acc through signun btn modal
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
        $("#modal").hide();

        $("#email").val("");
        $("#password").val("");
        $("#modal").hide();        
    });
    var user = firebase.auth().currentUser;

    $("#sign-in-Btn").on("click", function() {
        // handling sign in for users stored in firebase.
        let signInEmail = $("#email_inline").val().trim();
        let signInPassword = $("#password_inline").val().trim();
        firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).catch(function(error) {


            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
            // ...
        });

        $("#email_inline").val("");
        $("#password_inline").val("");
    });

    $("#signoutBtn").on("click", function () {
        firebase.auth().signOut().then(function (user) {
            // Sign-out successful.
            console.log(user.email + "Has signed out.");
        }).catch(function (error) {
            // An error happened.
        });
    });


    $("#signupBtn").on("click", function () {
        $("#modal").show();
    });

    $("#closeModal").on("click", function () {
        $("#modal").hide();
    });

    const validateSearch = function () {
        if (search === "") {
            $("#searchLabel").hide()
            $("#invalidSearch").show();
            setTimeout(function () {

                $("#searchLabel").show();
                $("#invalidSearch").hide();
            }, 1000)
        } else {
            search = $("#ingredient-input").val();
            $(".container").removeClass("hide");
            $(".recipeCardContainer").html("");
        }
    }
    const makeRecipeCard = function (response) {
        let recipeCount = response.count;
        var obj = jQuery.parseJSON(response);
        obj.recipes.forEach(function (recipe, index, arr) {
          
            if (index <= 4) {

                var recipeCard = $("<div>").addClass("row recipe-card");
                var recipeCardColumn = $("<div>").addClass("col s10 m10");
                recipeCardColumn.html(`<div class="row hoverable">

                                            <h2 class="header" id="recipe-name-${recipe.title}">${recipe.title}   
                                            <a class="waves-effect waves-light btn " id="button-${recipe.recipe_id}>"><i class="material-icons">star</i></button></a></h2>
                                            <div class="card horizontal">
                                                <div class="card-image">
                                                    <img id="recipe-image-${recipe.image_url}" src="${recipe.image_url}" height="300px">
                                                </div>
                                                <div class="card-content">
                                                    <p class="ingredientList" id="ingredient-${recipe.recipe_id}">
                                                        <span class="ingredient-title"> </span>
                                                    </p>
                                                    <span class="card-title activator grey-text text-darken-4 modal-dialog modal-lg">Show Ingredients and Nutrition Information
                                                        <i class="material-icons right">more_vert</i>
                                                    </span>
                                                </div>
                                                <div class="card-reveal lists">
                                                    <span class="card-title grey-text text-darken-4 modal-title" id="calorie-card">Show Nutrition Information
                                                        <i class="material-icons right">close</i>
                                                    </span>
                                                    <div class="row tw-line">
                                                        <div class="col s6 m6 lists" id="ingredientListNutri-${recipe.recipe_id}">
                                                            <div class="modal-body">
                                                                <p>Ingredients Needed:</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="col s6 m6" id="nutriList-${recipe.recipe_id}">
                                                        <div class="modal-body">
                                                            <p>Nutrition Information:</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>`);
                $(recipeCard).append(recipeCardColumn);
                $(".recipeCardContainer").append(recipeCard);
                var url = `https://cors-anywhere.herokuapp.com/https://community-food2fork.p.mashape.com/get?key=716be10f3517e512858d539e14920f86&rId=${recipe.recipe_id}`;
                $.ajax({
                    url: url,
                    method: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-Mashape-Key", "17STlxvDu0mshiHdSIFa7pNut86Vp1EqzzvjsngIg9bGERUjDu");
                    },
                }).then(function (ingredientData) {
                    ingredientData = JSON.parse(ingredientData);
                    let ingredientsArr = ingredientData.recipe.ingredients;
                    let ingredientListArr = Array.from(document.querySelectorAll('.ingredientList'));


                    ingredientsArr.forEach(function (ingredient) {


                        ingredientsArr.forEach(function (ingredient) {
                            let splitStr = ingredient.split(" ").join("%20");

                            //console.log(splitStr);
                            let calories = 0;
                            let totCalories = 0;

                            var nutritionURL = "https://api.nutritionix.com/v1_1/search/" + splitStr + "?&appId=e12be5ac&appKey=817ebbcc808058aa40405dd1e3c1d7e3&fields=item_name,nf_calories";
                            $.ajax({
                                    url: nutritionURL,
                                    method: "GET",
                                    success: function (response) {
                                        
                                        calories = response.hits[0].fields.nf_calories;



                                        totCalories = Math.floor(calories + totCalories);
                                      //  console.log("Total Calories(kcal):" + totCalories);

                                        fat = response.hits[0].fields.nf_total_fat;
                                        totFat = Math.floor(fat + totFat);
                                       // console.log("Total Fat(g):" + totFat);
                                        cholesterol = response.hits[0].fields.nf_cholesterol;
                                        totCholesterol = Math.floor(cholesterol + totCholesterol);
                                       // console.log("Total Cholesterol(mg):" + totCholesterol);
                                        carbs = response.hits[0].fields.nf_total_carbohydrate;
                                        totCarbs = Math.floor(carbs + totCarbs);
                                       // console.log("Total Carbohydrates(g):" + totCarbs);
                                        fiber = response.hits[0].fields.nf_dietary_fiber;
                                        totFiber = Math.floor(fiber + totFiber);
                                       //  console.log("Total Fiber(g):" + totFiber);
                                        sugar = response.hits[0].fields.nf_sugars;
                                        totSugar = Math.floor(sugar + totSugar);
                                      //  console.log("Total Sugar(g):" + totSugar);
                                        protein = response.hits[0].fields.nf_protein;
                                         totProtein = Math.floor(protein + totProtein);
                                       //  console.log("Total Protein(g):" + totProtein);
                                         iron = response.hits[0].fields.nf_iron_dv;
                                        totIron = Math.floor(iron + totIron);
                                      //  console.log("Total Iron(%dv):" + totIron);
                                        sodium = response.hits[0].fields.nf_sodium;
                                        totSodium = Math.floor(sodium + totSodium);
                                      //  console.log("Total Sodium(mg):" + totSodium);

                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        if (xhr.status == 404) {
                                            console.log(thrownError);
                                        }
                                    }
                                })
                                .then(function () {
                                    console.log(calories);
                                    console.log("Total Calories(kcal):" + totCalories);
                                    console.log("Total Fat(g):" + totFat);
                                    console.log("Total Cholesterol(mg):" + totCholesterol);
                                    console.log("Total Carbohydrates(g):" + totCarbs);
                                    console.log("Total Fiber(g):" + totFiber);
                                    console.log("Total Sugar(g):" + totSugar);
                                    console.log("Total Protein(g):" + totProtein);
                                    console.log("Total Iron(%dv):" + totIron);
                                    console.log("Total Sodium(mg):" + totSodium);  


                                            let calories = response.total_hits.hits[0].fields.nf_calories;
                                            let list2 = $("<ul>");
                                            let listItem2 = $("<li>");

                                            //  need to define calories for each item in the AJAX call
                                            listItem2.text(calories + "calories");
                                            $(list2).append(listItem2);

                                            //!!this is where you will append the nutrition list!!
                                            $(`#nutriList-${recipe.recipe_id}`).append(list2);

                                });


                        });


                        if (ingredientData.recipe.recipe_id === recipe.recipe_id) {
                            let list = $("<ul>");
                            let listItem = $("<li>");

                            listItem.text(ingredient);
                            $(list).append(listItem);

                            $(`#ingredient-${recipe.recipe_id}`).append(list);
                            $(`#ingredientListNutri-${recipe.recipe_id}`).append(list);
                        }
                    });
                });
            } //end of if statment
        })




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





            const appendIngredients = function (newresponse) {
                var obj = jQuery.parseJSON(newresponse);
                let ingredientArr = obj.recipe.ingredients;
            }
        });
    }






    $("#submit").on("click", function test() {
        // var queryURL = "http://cors-proxy.htmldriven.com/?url=http://food2fork.com/api/search?key=2faf058c37cad76f25dc0f61a8700b82&q=asparagus";

        //Makes sure search isn't blank.
        validateSearch();

        var queryURL = "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=716be10f3517e512858d539e14920f86&q=" + search;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            makeRecipeCard(response);
        });
    })



        $(".favorite").on("click", function () {
            console.log("saved to favorites");
        });



        $(document).ready(function () {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').modal();
        });
    });
});
