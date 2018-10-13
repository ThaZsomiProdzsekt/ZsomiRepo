"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
;
const PortionSchema = new Schema({
    portionName: {
        type: String,
        required: true
    },
    portionPrice: {
        type: Number,
        required: true
    },
    portionCalories: {
        type: Number,
        required: false
    },
    portionCarbs: {
        type: Number,
        required: false,
    },
    portionProtein: {
        type: Number,
        required: false
    },
    portionFats: {
        type: Number,
        required: false,
    }
});
const Portion = mongoose.model('Portion', PortionSchema);
exports.MealSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    belongsToRestaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant'
    },
    alternativeNames: {
        type: [String],
        required: false
    },
    cost: {
        type: Number,
        required: true
    },
    availablePortions: {
        type: [{
                portionName: {
                    type: String,
                    required: true
                },
                portionPrice: {
                    type: Number,
                    required: true
                },
                portionCalories: {
                    type: Number,
                    required: false
                },
                portionCarbs: {
                    type: Number,
                    required: false,
                },
                portionProtein: {
                    type: Number,
                    required: false
                },
                portionFats: {
                    type: Number,
                    required: false,
                }
            }],
        required: true
    },
    ingredients: {
        type: String,
        required: false,
        default: ''
    },
    CurrentlyAvailable: {
        type: Boolean,
        required: false,
        default: true
    },
    vegan: {
        type: Boolean,
        required: false,
        default: false
    },
    vegetarian: {
        type: Boolean,
        required: false,
        default: false
    },
    containsLactose: {
        type: Boolean,
        required: false,
        default: true
    },
    containsGluten: {
        type: Boolean,
        required: false,
        default: true
    },
    kosher: {
        type: Boolean,
        required: false,
        default: false
    },
    halal: {
        type: Boolean,
        required: false,
        default: false
    },
    containsAllergen: {
        type: String,
        required: false,
        default: ''
    },
    containsSaturatedFat: {
        type: Boolean,
        required: false,
        default: true
    },
    calories: {
        type: Number,
        required: false
    },
    carbs: {
        type: Number,
        required: false,
    },
    fats: {
        type: Number,
        required: false
    },
    protein: {
        type: Number,
        required: false
    },
    originOfIngredients: {
        type: Map,
        of: String,
        required: false,
        default: ''
    },
    everythingElse: {
        type: String,
        required: false
    }
});
exports.Meal = mongoose.model('Meal', exports.MealSchema);
//# sourceMappingURL=meal.js.map