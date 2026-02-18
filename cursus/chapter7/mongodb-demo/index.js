require('dotenv').config()

const mongoose = require('mongoose');


async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_BIEZOENDER_URI);
        console.log('connected');
    } catch (err){
        console.error('cant connect...', err);
    }
}

connectDB();

//STAP 1: maak schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default: Date.now},
    isPublished: Boolean
});

//STAP 2: create model
//Course is enkelvoud, mongo gaat dit automatisch naar meervoud veranderen.
const Course = mongoose.model('Course', courseSchema);

//STAP 3: Maak document instance
async function createCourse(){
    try {
        const course = new Course({
            name: 'Node.js Course',
            author: 'M. Dima',
            tags: ['node', 'backend'],
            isPublished: true
        });
        
        const result = await course.save();
        console.log(result);
    } catch (err){
        console.error('error saving course: ', err);
    }
}

// createCourse();
// createCourse();

//Reading document
async function getCourses(){
    // const courses = await Course.find();
    
    //vinden op basis v voorwaarde
    const courses = await Course
        .find({ author: 'M. Dima', isPublished: true})
        .limit(10)
        //sort op naam: 1=A-Z, -1=Z-A of bij date: -1=newest first
        .sort({name:1})
        //select alleen de velden naam en tags
        //excluden kan ook, bv name:0
        // .select({name: 1, tags:1, author:1})
    console.log(courses);
}
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();

//operators
// const courses = await Course
//     .find()
//     .or([{ author: 'M. Dima' }, { isPublished: true }]);
// const courses = await Course
//     .find()
//     .and([{ author: 'M. Dima' }, { isPublished: true }]);
// // These are equivalent:
// .find({ author: 'M. Dima', isPublished: true })
// .find().and([{ author: 'M. Dima' }, { isPublished: true }])

//starts with: /^letters/
//ends with: /letters$/
// /blabla$/i ==> case insensitive
//contains /*letters*/


//=======================================================
//=======================================================
//=======================================================
//MODIFY
async function updateCourse(id){
    try{
    const course = await Course.findById(id);

    if(!course) return;

    // course.isPublished = true;
    // course.author = 'modified';

    course.set({
        isPublished: true,
        author: 'Switched'
    });

    const result = await course.save();

    console.log(result);
} catch (err){
    console.error('error: ', err.message);
}
}

// updateCourse('699356f8306159be3785e296')

async function updateCourse2(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jack',
            isPublished: true
        }
    }, { new: true }); //belangrijk
    console.log(course);
}
updateCourse2('6993567e22b62f1936c25e08');

// // Set values
// { $set: { author: 'John', isPublished: true } }

// // Increment price by 5
// { $inc: { price: 5 } }

// // Add tag to array
// { $push: { tags: 'javascript' } }

// // Remove tag from array
// { $pull: { tags: 'angular' } }

// // Update many documents
// Course.updateMany({ filter }, { update })

// // Update one document
// Course.updateOne({ filter }, { update })

// // Find and update, return document
// Course.findByIdAndUpdate(id, { update })
// Course.findOneAndUpdate({ filter }, { update })

// // Query first approach
// const doc = await Course.findById(id);
// doc.property = value;
// await doc.save();


//=======================================================
//=======================================================
//=======================================================
//DELETE
async function removeCourse(id) {
    try{
    const result = await Course.findByIdAndDelete(id);

    if(!result){
        console.log('not found');
        return;
    }

    console.log('delete course: ', result.name)

    } catch (err){
         console.error('error deleting course:', err.message);
    }
}

removeCourse('6993567e22b62f1936c25e07');