const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const formSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        // //required: true
    },
    applicationDetails: {
        applicationNo: {
            //custom string for each form
            type: String,
            default: `MAHANSK${currentYear}MPS`,
        },
        applicantName: {
            type: String,
            //required: true
        },
        businessName: {
            type: String,
            //required: true
        },
        communicationAddress: {
            type: String,
            //required: true
        },
        projectUnitAddress: {
            type: String,
            //required: true
        },
        contactNo: [
            {
                type: String,
                //required: true
            }
        ],
        emailId: {
            type: String,
            //required: true
        },
        applicationDate: {
            type: Date,
            //required: true
        },
        validityDate: {
            type: Date,
            //required: true
        },
    },
    feesDetails: {
        documentationVerificationFee: {
            type: Number,
            //required: true
        },
        projectRegistrationFee: {
            type: Number,
            //required: true
        },
        projectManagementFee: {
            type: Number,
            //required: true
        },
        projectDevelopmentFee: {
            type: Number,
            //required: true
        },
        fundingAssistanceFee: {
            type: Number,
            //required: true
        },
        totalFees: {
            type: Number,
            //required: true
        },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    paymentInfo: {
        paymentStatus: {
            type: String,
            default: 'Not Paid'
        },
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        paymentDate: {
            type: Date,
        },
    },


});

module.exports = mongoose.model('Form', formSchema);



