// const db = require('../config/connection');
// const Patient = require('../models');

// const patientSeeds = require('./patientSeeds.json');

// db.once('open', async () => {
   
//     console.log(patientSeeds);
  
//     try {
       
//         await Patient.deleteMany({});
//         await Patient.insertMany(patientSeeds)

//         console.log('all done!');
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
//     process.exit(0);
// });
