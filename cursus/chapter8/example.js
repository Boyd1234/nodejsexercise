const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,//custom validators:
    tags: {
    type: Array,
    validate: {
        isAsync: true,
        validator: function(v, callback) {
            setTimeout(() => {
                const result = v && v.length > 0;
                callback(result);
            }, 1000);
        },
        message: 'A course should have at least one tag.'
    }
    },
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,

  //boolean required
  price: {
  type: Number,
  required: function() {
    return this.isPublished;
  },
  min: 10,
  max: 200
}
});

//string: lowercase, uppercase, trim : true of false
//numbers: min, max, get en set:v => Math.round(v) on read of write/create