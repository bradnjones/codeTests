/**
 * PROBLEM STATEMENT:
 * 1 - Find all the values that are in both strings.
 * 2 - Order those values ascending numbers then letters (a-z)
 * 3 - Print the final filtered, sorted values in a manner like the following '1 2 23 A B'
 */

// let first = '1 2 3 A B C';
// let second = 'X 11 G M 2 9 3 C N R';
const first = 'Z 1 3 3 B J C 2 11 X A -1';
const second = 'Z J X 11 3 G M 9 3 -1 C N R 2 A';

/**
 * Main Function that orchestrates the execution of the code
 */
(function main(a, b){
    let first = a.split(' ');
    let second = b.split(' ');
    let matchingItems = [];

    collectMatchingItems(first, second, matchingItems);
    collectMatchingItems(second, first, matchingItems);

    let filteredList = removeDuplicates(matchingItems.slice());
    let sortedList = sortList(filteredList.slice());
    console.log(convertToSpaceDelimitedString(sortedList));
})(first, second);

/**
 * Adds each item in the first list that is also in the second list to the matching * items list.
 * 
 * @param {string[]} first 
 * @param {string[]} second 
 * @param {string[]} matchingItems 
 */
function collectMatchingItems(first, second, matchingItems){
    for(let i = 0; i<first.length; i++){
        aChar = first[i];
        let found = second.indexOf(aChar, 0);
        if(found !== -1){
            matchingItems.push(aChar);
        }
    }
}

/**
 * Returns an array with only the unique values having removed duplicate
 * occurrences.
 * 
 * @param {string[]} anArray 
 */
function removeDuplicates(anArray){
    let uniqueValues = [];
    anArray.forEach(anItem => {
        if(uniqueValues.indexOf(anItem, 0) === -1){
            uniqueValues.push(anItem);
        }
    });
    return uniqueValues;
}

/**
 * Sorts the raw list of unique values ascending by number first then
 * letters.
 * 
 * @param {string[]} aList 
 */
function sortList(aList){
    let numbersList = [];
    let lettersList = [];

    populateLists(aList, numbersList, lettersList);
    sortNumbers(numbersList);
    sortLetters(lettersList);
    let combinedLists = [...numbersList, ...lettersList];
    return combinedLists;
}

/**
 * Used to populate the number and letter lists from the main list
 * @param {string[]} aList 
 * @param {string[]} numbersList 
 * @param {string[]} lettersList 
 */
function populateLists(aList, numbersList, lettersList){
    aList.forEach(anItem => {
        isLetter(anItem) ? lettersList.push(anItem) : numbersList.push(anItem);
    });
}

/*********************************************
 * UTILITY FUNCTIONS
 *********************************************/
/**
 * Checks to see of a character is a letter or a number.  If it is a letter then
 * the uppercase and lowercase values will not be equal whereas for numbers they will.
 * In this case if it's not a letter then it is a number as symbols are not a part
 * of the possible values to be evaluated.
 * 
 * @param {String} value 
 * @returns boolean
 */
function isLetter(value){
    return value.toLowerCase() !== value.toUpperCase();
}

/**
 * Sorts a list of letters in ascending order
 * 
 * @param {string[]} lettersList 
 * @returns string[]
 */
function sortLetters(lettersList){
    lettersList.sort();
}

/**
 * Sorts a list of numbers in natural ascending order
 * 
 * @param {string[]} numbersList 
 * @returns string[]
 */
function sortNumbers(numbersList){
    numbersList.sort((a,b) => {
        let keyA = parseInt(a);
        let keyB = parseInt(b);
        return keyA - keyB;
    });
}

/**
 * Builds a string of the elements in the array delimited by a space
 * 
 * @param {string[]} aList 
 * @returns string
 */
function convertToSpaceDelimitedString(aList){
    let output = '';
    for(let y=0; y<aList.length; y++){
        let anItem = aList[y];
        if(y === aList.length -1){
            output += anItem;
        }else {
            output += anItem + ' ';
        }
    }
    return output;
}