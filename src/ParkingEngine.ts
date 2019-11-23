import * as readline from 'readline';
class ParkingEngine {
    private interactiveBot:any;
    constructor(){
        this.interactiveBot = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    public startParker(){
        this.interactiveBot.question('', (answer:string)=>this.processCommands(answer))
    }
    public closeParker(){
        this.interactiveBot.close();
    }
    public processCommands(answer:string):void{
        switch(answer.toLowerCase()) {
            case 'y':
                console.log('Super!');
                break;
            case 'n':
                console.log('Sorry! :(');
                break;
            default:
                console.log('Invalid answer!');
        }
        this.closeParker();
    }
}
export {ParkingEngine};