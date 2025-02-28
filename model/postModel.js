const postSchema = new mongoose.Schema({
    content: {
         type: String, required: true
         },
    author: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
     }, // Many-to-one with User
  },
  {
    timestamps: true
}
);
  
  module.exports = mongoose.model('Post', postSchema);
  