const SAMPLE_DATA = {
    "name": "Welcome to the MongoDB Single View Workshop",
    "description": "At the end of this workshop, you should be able to:  \n" +
    "- Connect to a running Atlas Cluster  \n"+
    "- Use the provided **MongoDB** Console to execute **MongoDB** commands  \n"+
    "  \n"+
    "  \n"+
    "  \n"+
    "---  \n"+
    "### Additional Resources  \n"+
    "In case you want to follow along with the presentation materials, or would  \n"+
    "like additional documentation, etc,  \n" +
    "***PLEASE REFER TO THE FOLLOWING LINKS***  \n"+
    "  \n"+
    "MongoDB Documentation can he found here: [MongoDB Docs](http://docsmongodb.com) \n"+
    "  \n"+
    "A PDF of the lab materials are available here: [PDF](https://drive.google.com/file/d/1lanMnkNITnxZBVWujdGNRTOboiOXWX4O/view?usp=sharing)  \n"+
    "  \n"+
    "  \n"+
    "  \n"+
    "  \n"+
    "  \n"+
    "  \n"+
    "  \n"+
    "  \n"+
    "  \n"
    ,
    "steps":[
        {
            "title": "This is the first Step",
            "markdown": 
                "This proof shows how MongoDB can perform expressive queries using query criteria spanning a " +
                "number of fields and how secondary indexes can be leveraged to greatly reduce query response time " +
                "and minimise database overhead. Specifically, the proof will show that a collection of 1,000,000 " +
                "randomly generated documents can be searched using a combination of elements, demonstrating " +
                "the richness and flexibility of the query language. These elements will include:  \n" +
                "  \n" +
                "* A date field  \n" +
                "* A text field  \n" +
                "* A boolean field  \n" +
                "* A field that is in a sub document  \n" +
                "* A field that is inside an array  \n" +
                "* A range based filter  \n" +
                "  \n" +
                "For the test 1,000,000 fictitious 'single view' insurance customer records are generated and " +
                "loaded into a collection in a MongoDB Atlas cluster.  \n" +
                "  \n" +
                "The expressive query that will be run will return all documents where the _\"customer is " +
                "Female, born in 1990, lives in Utah and has at least one Life insurance policy for " +
                "which they are registered as a Smoker\"_.  \n" +
                "  \n" +
                "  \n" +
                "---  \n" +
                "## Setup  \n" +
                "__1. Configure Laptop__  \n" +
                "* Ensure MongoDB version 3.6+ is installed on your laptop in order to access the MongoDB command line tools (a MongoDB Atlas cluster will be used to actually host the data)  \n" +
                "* [Download](https://www.mongodb.com/download-center/compass) and install Compass on your laptop  \n" +
                "* Ensure Node (version 6+) and NPM are installed your laptop  \n" +
                "* Download and install the [mgeneratejs](https://www.npmjs.com/package/mgeneratejs) JSON generator tool on your laptop  \n",
            "textToCopy": "db.collection.find({name: 'Alejandro'})"
        },
        {
            "title": "WORKLOAD-ISOLATION",
            "markdown": 
                "---  \n" +
                "## Execution  \n" +
                "* In one terminal/shell from the base folder of this proof, run the __update__ script " +
                "to perform a continuous operational/transactional workload (applying random updates to " +
                "documents) against the cluster, indefinitely, ensuring you provide the full application " +
                "SRV connection string you copied during the setup for this proof, for " +
                "example (ensure you change the password to the value you provided):  \n" +
                "```bash  \n" +
                "./update_docs.py mongodb+srv://main_user:MyPassword@testcluster-abcde.mongodb.net/test?retryWrites=true  \n" +
                "```  \n" +
                "  \n" +
                "&nbsp;This update workload should be executed against the cluster's current primary node  \n" +
                "  \n" +
                "* In a separate terminal/shell from the base folder of this proof, run the __query__ " +
                "script to perform a continuous analytical workload (performing aggregation framework " +
                "group-bys) against the cluster, indefinitely, ensuring you provide the full application " +
                "SRV connection string you copied during the setup for this proof, for example (ensure " +
                "you change the password to the value you provided):  \n" +
                "  \n" +
                "&nbsp;This query workload uses a __read preference tag__ targeting the 2 secondary nodes that are marked for __analytics__  \n",
            "textToCopy": "db.collection.find()"
        }

    ]
}

export const BLANK_STEP = {
    title: "",
    markdown:"",
    textToCopy:""
}

export const BLANK_LAB = {
    "name": "",
    "description": "",
    "steps" : [
        BLANK_STEP
    ]

}
export default SAMPLE_DATA;