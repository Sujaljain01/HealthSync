import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username : String,
    name:String,
    age: Number,
    //email : String,
    password : String,
    gender: { type: String, enum: ['Male', 'Female', 'Other']},
    contactNumber: Number,
    // address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     postalCode: String
    // },
    bloodGroup : String,
    medicalRecords: [{ type: String}],
    healthIssues: [{ type: String}]
});



const Patient = new mongoose.model("Patient", patientSchema);


const doctorSchema = new Schema({
    firstName: String,
    lastName: String,
    specialty: String,
    contactNumber: Number,
    username: String,
    email : String,
    password : String,
    patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }]
});


const Doctor = new mongoose.model("Doctor", doctorSchema);


const medicalRecordSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient'},
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor'},
    visitDate: { type: Date },
    diagnosis: { type: String},
    treatment: { type: String},
    prescription: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

const MedicalRecord = new mongoose.model("MedicalRecord", medicalRecordSchema);

const appointmentSchema = new Schema({
    patientId : String,
    appointmentDate : Date,
    doctorName : String 
});

const Appointment = new mongoose.model("Appointment", appointmentSchema);

const medicineSchema = new mongoose.Schema({
    patientId : String,
    medName: {
      type: String,
      trim: true, 
      maxlength: 100, 
    },
    duration: {
      type: String,
      enum: ['After Meal', 'Before Meal'], 
    },
    dosage: {
      type: Number,
    },
    medTime : String
  });

  const Medicine = new mongoose.model("Medicine", medicineSchema);


  const scheduleSchema = new mongoose.Schema({
    to : String,
    body : String,
    schedule : String
  });

  const Schedule = new mongoose.model("Schedule", scheduleSchema);

const ex = {
    'models' : {
        'Patient' : Patient,
        'Doctor' : Doctor,
        'MedicalRecord' : MedicalRecord,
        'Appointment' : Appointment,
        'Medicine' : Medicine,
        'Schedule' : Schedule
    } ,
    'schemas' : {
        'patientSchema' : patientSchema,
        'doctorSchema' : doctorSchema,
        'medicalRecordSchema' : medicalRecordSchema,
        'appointmentSchema' : appointmentSchema,
        'medicineSchema' : medicineSchema,
        'scheduleSchema' : scheduleSchema
    }
};

export default ex;
