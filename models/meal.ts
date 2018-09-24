import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IPortion extends mongoose.Document {
    portionPrice: Number;
    portionCalories: Number;
    portionCarbs: Number;
    portionProtein: Number;
    portionFacts: Number;
};

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

const Portion = mongoose.model<IPortion>('Portion', PortionSchema);

export interface IMeal extends mongoose.Document {
    name: String;
    alternativeNames: String[];
    cost: Number;
    availablePortions: [{
        portionName: String;
        portionPrice: Number;
        portionCalories: Number;
        portionCarbs: Number;
        portionProtein: Number;
        portionFats: Number;
    }];
    ingredients: String;
    CurrentlyAvailable: Boolean;
    vegan: Boolean;
    vegetarian: Boolean;
    containsLactose: Boolean;
    containsGluten: Boolean;
    kosher: Boolean;
    halal: Boolean;
    containsAllergen: String;
    containsSaturatedFat: Boolean;
    calories: Number;
    carbs: Number;
    fats: Number;
    protein: Number;
    originOfIngredients: Map<String, String>;
    everythingElse: String;
};

export const MealSchema = new Schema({
    name: {
        type: String,
        required: true
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

export const Meal = mongoose.model<IMeal>('Meal', MealSchema);