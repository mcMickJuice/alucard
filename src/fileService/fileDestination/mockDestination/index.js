
function destination(config) {
  /*
storage root
connectionTimeoutLength
destination ip
connection credentials

  */


    //transferable
    //Stream<T> - chunk updates
    function moveFileToDestination() {

    }

    //Stream<T> - chunk updates...
    function removeFileFromDestination() {

    }

    //monitorable
    //Promise<Response>
    function getUpStatus() {
        /*
        Response: {
            error: error (optional),
            isOk: bool
        }
    
        error: {
            message: String,
            date: Date
        }
        */
    }


    //Promise<Storage> 
    function getStorageStatus() {
        //how much space is left in specified storage location
        /* 
        storage: {
            rawSpace: String,
            percentageLeft: Number
        }
        */
    }

    //Promise<roms>
    function currentRoms() {
        //list of roms currently on disc.
        //This should be source of truth that we reconcile with occassionally
        //when we shutdown, an error occurs, etc
        /* 
            roms: List of {
                romName: String,
                romId: String,
                dateAdded: Date
            }
    
            consumer can use this data to join and present an overview
            of held roms e.g. totals by console, type etc
        */
    }

    return {
        currentRoms: currentRoms,
        getStorageStatus: getStorageStatus,
        getUpStatus: getUpStatus,
        removeFile: removeFileFromDestination,
        moveFile: moveFileToDestination
    }
}