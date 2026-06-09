import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
  createdAt:{
    type: Date,
    default: Date.now, 
  },
  language:{
    type: String,
    default: 'cpp',
  },
  fileName:{
    type: String,
    required: true,
  },
  codeBase:{
    type: String,
    default: '#include<bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\t// Write your code here\n\treturn 0;\n}',
  },
  lastModified:{
    type: Date,
    default: Date.now,
  },
  accessTo:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  }],
});

const File = mongoose.model('File', fileSchema);
export default File;
