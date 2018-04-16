//trey's test obj
let recipeCardArr = [{
        dish: 'Cupcakes',
        ingredients: ['carrots', 'peas', 'spice', 'water']
    },
    {
        dish: 'Fried Eggs',
        ingredients: ['eggs', 'bacon', 'pop-tart']
    },
    {
        dish: 'Crab',
        ingredients: ['cat food', 'fish eyes', 'cereal']
    },
    {
        dish: 'Seaweed Cake',
        ingredients: ['nasty fish', 'seaweed']
    },
    {
        dish: 'Catfish',
        ingredients: ['Catfish', 'trout', 'shrimp', 'lamb', 'squash']
    },
    {
        dish: 'Stuffed Peppers',
        ingredients: ['Peppers', 'Cheese', 'butter']
    }
];
//-------------------------------------------- BEGGINNING OF CARD JS ---------------------------------------------------------------
//declare variables
let twNewRow, twNewDiv, twInnerDiv1, twNewImg, twNewh3, twDiv2, twNewh5, twNewIngredients, twListItem, mIngredientList;
let twList = ['carrots', 'peas', 'steak', 'tomatoes']; // <----------- ingredients could all (as needed) be pushed into this array 
let twArrPassed = []; // and popped into second array after search button hit again 
let imgArr = ['assets/images/cupcakes.jpg', 'assets/images/friedegg.jpg', 'assets/images/crab.jpg',
    'assets/images/sushi.jpg', 'assets/images/catfish.jpg', 'assets/images/stuffedpeppers.jpg'
] // test pictures
/* or maybe another option // you could say twArr[k] = twArrPassed[k] forEach twArr.length
 and then while{(twArr[k] === twArrPassed[k]) do nothing}k++, else run the following loop */
$('#press-me').click(function () { // <----place submit button's id in here
    clearIt();
    /* for (i=0; i<k+7; i++)*/
    // for loop to create each image 
    for (i = 0; i < recipeCardArr.length; i++) {

        // 1. creates a new div and adds classes. this will be the main div to which everything is attached
        twNewDiv = $('<div>').addClass('card  click-for-modal text-white tw-new-colour mb-3 col-lg-4 tw-each-card');
        twNewDiv.attr('data-target', '.bd-example-modal-lg');
        twNewDiv.attr('id', i);
        console.log(i);
        // 2. create a div, assign attributes, and attach it to the previously created div
        twInnerDiv1 = $('<div>').addClass('card-body row tw-card-top');
        twNewDiv.append(twInnerDiv1);
        // 3. create an image, assign attributes, and attach to inner div
        twNewImg = $('<img>').addClass('col-lg-4 tw-food-pic ');
        twNewImg.attr('src', imgArr[i]); // <------------ This is where the image will go (src[i])
        twInnerDiv1.append(twNewImg);
        // 4. create an h3 to hold the name of the selected dish, assign attributes
        twNewh3 = $('<h3>').html(recipeCardArr[i].dish);
        $(twNewh3).addClass('tw-h3-card col-lg-6 dish-to-modal'); // <-------------- This is where you the name of the dish will go
        twInnerDiv1.append(twNewh3);
        // 5. new div to attach to the generated image
        twDiv2 = $('<div>').addClass('card-body tw-card-bottom');
        twNewDiv.append(twDiv2);
        // 6. new h5 to append to the image
        twNewh5 = $('<h5>').addClass('card-title tw-line');
        $(twNewh5).html("What you will need..."); // <------------- This is where the name of the dish should appear
        twDiv2.append(twNewh5);
        // 7. a ul tag to attach to h5
        twNewIngredients = $('<ul>').addClass('tw-p-card tw-ul');
        twNewh5.append(twNewIngredients);
        // 8. an li tag for each ingredient
        for (j = 0; j < recipeCardArr[i].ingredients.length; j++) { // <----------- You could probably do a for each loop right here
            twListItem = $('<li>'); // <---------------- this will be based on the number of ingredents involved [j]
            $(twListItem).html(recipeCardArr[i].ingredients[j]); // <---------------- This is where the ingredients will go
            twNewIngredients.append(twListItem);
            console.log(recipeCardArr[i]);
        }
        console.log([i]);
        // if statement creates a row every 3rd element created started at 'card 4'
        if (i === 2) {
            $('#add-cards-here').addClass('row');
        }
        $('#add-cards-here').prepend(twNewDiv);

    } //<---------- End of for loop

}); //<----------- End of onclick event
//----------------------------------------------- END OF CARDS JS ------------------------------------------------------------------
//--------------------------------------------- BEGINNING OF MODAL JS --------------------------------------------------------------
$('#myModal').modal({
    show: false
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
// ------------------------------------------ END OF MODAL JS ---------------------------------------------------------------------
//======================================== END TREY'S JAVASCRIPT ==================================================================