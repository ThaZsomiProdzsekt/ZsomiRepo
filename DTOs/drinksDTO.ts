export class drinksDTO {
    public name: String;
    public size: String;
    public liter: Number;
    public price: Number;
    public calories: Number;
    public sugar: Number;
    public cold: Boolean;
    public hot: Boolean;
    public amountOfAvailable: Number;
    public alcoholPercentage: Number;
    public sugarFree: Boolean;
    public fruityDrink: Boolean;
    public caffeine: Number;
    public everythingElse: String;

    constructor(name: String, size: String, liter: Number, price: Number) {
        this.name = name;
        this.size = size;
        this.liter = liter;
        this.price = price;
    }
    
}