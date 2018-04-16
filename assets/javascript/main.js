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

    $("#createAcc").on("click", function(e) {
        e.preventDefault();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
        $("#modal").hide();        
    });

    let signInEmail = $("#email_inline").val().trim();
    let signInPassword = $("#password_inline").val().trim();
    $("#sign-in-Btn").on("click", function() {
  
        firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        $(signInEmail, signInPassword).val('');
    });

    $("#signoutBtn").on("click", function() {
        firebase.auth().signOut().then(function(user) {
            // Sign-out successful.
            console.log(user.email + "Has signed out.");
          }).catch(function(error) {
            // An error happened.
          });
    });

    $("#signupBtn").on("click", function() {
        $("#modal").show();
    });

    $("#closeModal").on("click", function() {
        $("#modal").hide();
    });
    
    const getCurrentUser = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log(user);
            } else {
              // No user is signed in.
              console.log("No one is signed in");
            }
          });
    }

    getCurrentUser();

    const appendCurrentUser = function() {
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        if (user != null) {
          email = user.email;
          uid = user.uid;  
        }
    }

    appendCurrentUser();

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
                recipeCardColumn.html(`
                        <div class="row hoverable">
                            <h2 class="header" id="recipe-name-${recipe.title}">${recipe.title}</h2>
                            <div class="card horizontal">
                                <div class="card-image">
                                    <img id="recipe-image-${recipe.image_url}" src="${recipe.image_url}" height="300px">
                                </div>
                                <div class="card-content">
                                    <div class="card-content">
                                        <p class="ingredientList" id="ingredient-${recipe.recipe_id}">
                                            <span class="ingredient-title">Ingredients needed: </span>
                                        </p>
                                    </div>
                                    <div class="card-action">
                                        <div class="button">
                                            <button class="button waves-effect waves-light z-depth-4 green darken-1 modal-trigger" id="" data-toggle="modal-" data-target="modal-0">View Nutrition</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
                $(recipeCard).append(recipeCardColumn);
                $(".recipeCardContainer").append(recipeCard);

                    var url = `https://cors-anywhere.herokuapp.com/https://community-food2fork.p.mashape.com/get?key=2faf058c37cad76f25dc0f61a8700b82&rId=${recipe.recipe_id}`;
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

                            console.log(ingredientListArr);
       
                                ingredientsArr.forEach(function(ingredient){
                                
                                    if(ingredientData.recipe.recipe_id === recipe.recipe_id){
                                        
                                        let list = $("<ul>");
                                        let listItem = $("<li>");
                                        listItem.text(ingredient);
                                        $(list).append(listItem);
                                        $(`#ingredient-${recipe.recipe_id}`).append(list);
    
                                    }
                                    
                                });

                    });
            }//end of if statment
        })



   


        const appendIngredients = function (newresponse) {
            var obj = jQuery.parseJSON(newresponse);
            let ingredientArr = obj.recipe.ingredients;
            // for (j = 0; j < 5; j++) {
            //     ingredientArr.forEach(element => {

            //     }); {
            //         let list = $("<ul>");
            //         let listItem = $("<li>");
            //         $(list).append(listItem);
            //         listItem.text(ingredientArr[i]);
            //         $("#ingredientList-" + j).append(list);
            //     }

            //     var nutritionURL = "https://api.nutritionix.com/v1_1/search/" + ingredientArr[i] + "?&appId=f35ae0d0&appKey=b148a8cfc03753efc27ea05a30bfd6e9&fields=item_name,nf_calories";
            //     //var queryURL = "http://cors-proxy.htmldriven.com/?url=https://api.nutritionix.com/v1_1/search/taco?&appId=f35ae0d0&appKey=80cac78d0905b2d36ca8825470f578d7";

            //     let totalCalories = 0;
            //     let resultArr = [];
            //     $.ajax({
            //         url: nutritionURL,
            //         method: "GET"
            //     }).then(function (response) {

            //         for (var i = 0; i < response.hits.length; i++) {
            //             if (response.hits[i].fields.nf_calories) {
            //                 resultArr.push(response.hits[i].fields.nf_calories);
            //             } else {
            //                 console.log(response.hits[i].fields.item_name);
            //             }
            //         }
            //     });
            // }
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

    

    $(document).ready(function () {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').modal();
    });
  });
})
