const mongoose = require('mongoose')

//Here we have done indexing on date field and it's by default in ascending order.
const eventSechma = mongoose.Schema(
    {
        event_name: {type:String,required:true},
        city_name: {type:String,required:true},
        date: {type:String, required:true, index:true},
        time: {type:String,required:true},
        latitude: {type:String, required:true},
        longitude: {type:String, required:true}
    },{
        timestamps: false
    }
)


const Event = mongoose.model.Event || mongoose.model("Event", eventSechma)

module.exports={
    Event
}