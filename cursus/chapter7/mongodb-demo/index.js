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
        .select({name: 1, tags:1})
    console.log(courses);
}
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

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
