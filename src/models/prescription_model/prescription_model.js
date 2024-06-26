const mongoose = require('mongoose')

const HC_P_PRESCRIPTION = new mongoose.Schema({
    Diagnosis: [{
        diagonosis: {
            type: String,
            trim: true,
        }
    }],
    cheif_complain: [{
        complains: {
            type: String,
            trim: true,
        }
    }],
    teratment: [{
        med_type: {
            type: String,
            trim: true,
        },
        med_name: {
            type: String,
            trim: true,
        },
        med_dose_in_a_day: {
            type: String,
            trim: true,
        },
        med_dose_days: {
            type: String,
            trim: true,
        },
        med_dose_meal: {
            type: String,
            // enum: ["খাবার পরে", "খাবার আগে"],
            trim: true,
        },
        med_important:{
            type: Boolean
        }
    }],
    follow_up: {
        type: String,
        trim: true,
    },
    advice: [{
        type: String,
        trim: true,
    }],
    hc_p_cheif_past_history: [{
        history: {
            type: String,
            trim: true,
        },
        case: {
            type: String,
            trim: true,
        }
    }],
    hc_p_cheif_drug_history: [{
        type: String,
        trim: true,
    }],
    hc_p_general_examination: {
        Anemia: {
            type: String,
            // enum: ["Absent", "Mild", "moderate", "severe"],
            trim: true
        },
        Jaundice: {
            type: String,
            // enum: ["Absent", "Mild", "moderate", "severe"],
            trim: true
        },
        Oedema: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Lymph_node: {
            type: String,
            trim: true
        },
        Thyroid_gland: {
            type: String,
            trim: true
        },
        Pulse: {
            type: String,
            trim: true
        },
        Blood_pressure: {
            type: String,
            trim: true
        },
        Respiration: {
            type: String,
            trim: true
        },
        Body_temperature: {
            type: String,
            trim: true
        },
    },
    hc_p_gex_female: {
        Menstrual_obstetric_History: {
            type: String,
            trim: true
        },
        LMP: {
            type: String,
            trim: true
        },
        Para: {
            type: String,
            trim: true
        },
        Marrid_for: {
            type: String,
            trim: true
        },
        Gravida: {
            type: String,
            trim: true
        },
        ALC: {
            type: String,
            trim: true
        },
        LMP: {
            type: String,
            trim: true
        },
        EDD: {
            type: String,
            trim: true
        },
        Age_of_Menarche: {
            type: String,
            trim: true
        },
        M_Period: {
            type: String,
            trim: true
        },
        M_Cycle: {
            type: String,
            trim: true
        },
        M_Flow: {
            type: String,
            trim: true
        },
        Practiced: {
            type: String,
            trim: true
        },
        Last_Use: {
            type: String,
            trim: true
        },
        Per_Vagainal: {
            type: String,
            trim: true
        },
        Breast: {
            type: String,
            trim: true
        },
    },
    hc_p_gex_systemic_examination: {
        Heart: {
            type: String,
            trim: true
        },
        Lung: {
            type: String,
            trim: true
        },
        Abdomen: {
            type: String,
            trim: true
        },
        MSK: {
            type: String,
            trim: true
        },
        Oral_cavity: {
            type: String,
            trim: true
        },
        Eye: {
            type: String,
            trim: true
        },
        Ear: {
            type: String,
            trim: true
        },
        Nose: {
            type: String,
            trim: true
        },
        PNS: {
            type: String,
            trim: true
        },
        Mouth_Pharynx: {
            type: String,
            trim: true
        },
        Larynx: {
            type: String,
            trim: true
        },
        GIT: {
            type: String,
            trim: true
        },
        Genitourinary_System: {
            type: String,
            trim: true
        },
        Bones_Joints: {
            type: String,
            trim: true
        },
    },
    hc_p_ex_baby: {
        Mothers_disease_during_pregnancy: {
            type: String,
            trim: true
        },
        Vaccine_History_Of_Mother: {
            type: String,
            trim: true
        },
        Labor_duration: {
            type: String,
            trim: true
        },
        Cry: {
            type: String,
            trim: true
        },
        Movement: {
            type: String,
            trim: true
        },
        Breathing: {
            type: String,
            trim: true
        },
    },
    hc_p_ex_post_operative_patient: [{
        OT_procedure: {
            type: String,
            trim: true
        },
        Infection: {
            type: String,
            trim: true
        }
    }],
    hc_p_ex_others: {
        Appearance: {
            type: String,
            // enum: ["Well", "Ill Looking"],
            trim: true
        },
        body_built: {
            type: String,
            // enum: ["Average", "Small", "Heavy"],
            trim: true
        },
        Nutrition: {
            type: String,
            // enum: ["Nourished", "Under nourished"],
            trim: true
        },
        Decubitus: {
            type: String,
            // enum: ["On choice", "Propped up", "Mohammedan prayer position"],
            trim: true
        },
        Cyanosis: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Clubbing: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Dehydration: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Koilonychia: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Leukonychia: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Neck_vein: {
            type: String,
            trim: true
        },
        Gynaecomastia: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Pigmentation: {
            type: String,
            // enum: ["Absent", "Present"],
            trim: true
        },
        Bony_Tenderness: {
            type: String,
            // enum: ["Tender", "Non Tender"],
            trim: true
        },
        Spider_naevi: {
            type: String,
            trim: true
        },
        Palmer_erythemia: {
            type: String,
            trim: true
        },
        Distribution_of_body_hair: {
            type: String,
            trim: true
        },
        Skin_condition: {
            type: String,
            trim: true
        },
        Family_history: [{
            familyHistorys: {
                type: String,
                trim: true
            }
        }],
        Personal_history: [{
            personalHistorys: {
                type: String,
                trim: true
            }
        }],
        Dietary_History: [{
            dieatryHistorys: {
                type: String,
                trim: true
            }
        }],
        Salient_feature: {
            type: String,
            trim: true
        },
        Provisional_diagnosis: {
            type: String,
            trim: true
        },
        Differential_diagnosis: {
            type: String,
            trim: true
        }
    },
    hc_p_investigation: [{
        investigations: {
            type: String,
            trim: true
        }
    }],
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_PATIENTS"
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_DOCTOR"
    },
    chamber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_HOSPITAL"
    },
    Note: {
        type: String,
        trim: true,
    },
    Review:{
        type: Number,
        trim: true,
        enum:[0,1,2,3],
        defult:0
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("HC_P_PRESCRIPTION", HC_P_PRESCRIPTION)