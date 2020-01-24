/**
 * PROBLEM STATEMENT:
 *
 * Write code that sorts a few plain ticket pairs in the form of source to destination
 * into their logical trip sequence.  (assume no duplicates exist) 
 * 
 * example input flights = {SFO -> SEA, BOS -> SFO, IAD -> DEN, SEA -> IAD} 
 * answer [BOS, SFO, SEA, IAD, DEN]
 */

//TEST DATA
const input = [
    {start: 'SFO', end: 'SEA'},
    {start: 'BOS', end: 'SFO'},
    {start: 'IAD', end: 'DEN'},
    {start: 'SEA', end: 'IAD'}
];

/**
 * Initiates the evaluation of the trip order and prints the resulting output
 * on the console.
 */
(function printTrip(originalTrip){
    console.log(createTripList(originalTrip));
})(input);

/**
 * This is the main function which orchestrates the rest of the 
 * solution.  First it determines which leg is the start of the trip.
 * Then it reorders the legs from start to finish and finally it iterates
 *  that list and returns a string representation.
 * 
 * @param {*} originalTrip - the input data to be evaluated
 * @returns {String} - The stops of the trip ordered from start to finish
 */
function createTripList(originalTrip){

    //Determines which airport is the start of the trip
    const startingAirport = findTripStart({...buildStartEndArrays(originalTrip)});

    //Reorders the legs from starting airport to the final destination airport
    const orderedLegs = evaluateLegs(originalTrip, startingAirport);

    //Builds a string of the stops based on the ordered tripStops
    return buildTripStopsString(orderedLegs);
}

/**
 * Iterates the array of ordered trip stops and builds a string
 * representation.
 * 
 * @param {Array} tripStopsArray - An ordered Array of trip stops from start to finish
 * @return {String} - A string representation of the tripStopsArray
 */
function buildTripStopsString(tripStopsArray){
    let printedTrip = '';
    tripStopsArray.forEach((aStop, index) => {
        if(index !== tripStopsArray.length-1){
            printedTrip += aStop + ", ";
        }else{
            printedTrip += aStop;
        }
    })
    return printedTrip;
}

/**
 * This function evaluates each leg of the trip looking for the links
 * between the start and end of each leg and matches them to identify
 * the order of the trip by trip leg.
 * 
 * @param {String} tripObject - The original input data of trip legs
 * @param {String} legStart - An airport name for the starting location
 * @param {Array} trip - the list of legs in the trip
 * @returns {Array} the array of ordered legs
 */
function evaluateLegs(tripObject, legStart, trip = []){
    trip.push(legStart);
    tripObject.forEach((aLeg, i) => {
        if(aLeg.start === legStart){
            tripObject.splice(i, 1);
            evaluateLegs(tripObject, aLeg.end, trip);
        }
    })
    return trip;
}

/**
 * This is a utility function to build two arrays used in the search.
 * 
 * @param {Array} origins - The list that will store the starting airport codes for each leg in the trip.
 * @param {Array} destinations - The list that will store the ending airport codes for each leg in the trip.
 * @returns {Object} - An object containing the two arrays of airport codes
 */
function buildStartEndArrays(tripObject, origins = [], destinations = []){
    tripObject.forEach(aLeg => {
        origins.push(aLeg.start);
        destinations.push(aLeg.end);
    }) 
    return {origins, destinations}
}

/**
 * This searches the origin and destination arrays to determine which airport is the first
 * airport in the trip.
 * 
 * @param {Object} origins - Destructed object that contains a list of start airport codes and another list of end airport codes.
 */
function findTripStart({origins, destinations}){
    let start;
    origins.some(aLegStart =>{
        //If it is not found in the destinations than it is the trip start
        if(!inDestinations(aLegStart, destinations)){
            start = aLegStart;
            return true;
        }
    });

    return start;
}

/**
 * Searches the destinations array for the trip legs start airport code 
 * 
 * @param {String} aLegStart - Airport code for the start of the leg
 * @param {Array} destinations - Array of destination airport codes
 */
function inDestinations(aLegStart, destinations){
    return destinations.find(aLegEnd => {
        return aLegStart === aLegEnd;
    })
}