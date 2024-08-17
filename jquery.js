

class Collection{
    constructor()
    {
        this.list = []
        this.screen =  new Screen()
    }

    add(item)
    {
        this.list.push(item)
    }

     returnList()
    {
        return this.list.map((t) => t.getString()).join('')
    }
    
    evaluate()
    {
        return eval(this.returnList())
    }

    updateScreen(){
        this.screen.updateScreen(this.returnList())
    }

    handleEvaluate(){
        var temp =  this.evaluate()
        this.clear()
        this.add(new Input(temp));
        this.updateScreen();
    }

    clear()
    {
        delete this.list;
        this.list = []; 
    }

    handleClear(){
      this.clear();
      this.updateScreen();
    }

    deleteLastElement()
    {
        this.list.pop();
    }
}

class Input{
    constructor(value)
    {
        this.value = value
    }
    getString()
    {
        return this.value;
    }
}

class Operator{
    constructor(value)
    {
        this.value = value
    }
    getString()
    {
        return this.value;
    }

}

class Screen{

    getScreen(){
        return this.monitor
    }

    updateScreen(value){
        document.getElementById("screen").innerHTML = value
    }

    getTenDigit(value)
    {
        return value.substring(0,10)
    }

}




class Calculator
{
    constructor()
    {
        this.collection = new Collection;
    }

    addInput(value)
    { 
        this.collection.add(new Input(value))
        this.updateScreen()
    }

    addOperator(value)
    {  
        let check = new InputCheck(this.collection.returnList())
        if( check.allowOperator())
        {
            this.collection.add(new Input(value))
            this.updateScreen()
        }
    }

    updateScreen()
    {
      this.collection.updateScreen();
    }

         
    handleEvaluate(){
        this.collection.handleEvaluate();
        this.updateScreen();
        this.collection.updateScreen();
    }

    AC(){
        this.collection.handleClear();
    }
    BA(){
        this.collection.deleteLastElement()
        this.updateScreen();ß
    }

    percentage(){
        this.addOperator('/')
        this.addInput('100')
        this.handleEvaluate();
    }
}

class InputCheck{
    constructor(list)
    {
        this.list = list;
        this.operators = ['+','-','*','/']
    }


    lastIsOperator()
    { 
        let lastInput = this.getLastInput()
        return this.operators.includes(lastInput)
    }

    allowOperator()
    {
        return (! this.listIsEmpty() && ! this.lastIsOperator() )
    }

    
    listIsEmpty()
    {
        return (this.list.length === 0)
    }

    getLastInput()
    {
        return this.list.length > 0 ? this.list[this.list.length-1] : null
    }

}

