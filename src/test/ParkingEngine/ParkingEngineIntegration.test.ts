// import { PARKING_ENGINE_COMMANDS } from "../../utils";
var cmd = require('./cmd');
const { exec, spawn } = require('child_process');
var path = require('path');
// import ParkingEngine from '../../main/ParkingEngine/ParkingEngine';
// ${path.join(__dirname,'../../../build/index.js')}

describe("Parker Engine Test", () => {
    it("start parker", async() => {
        const response = await cmd.execute(`${path.join(__dirname,'../../../build/index.js')}`,[],
        ["create_parking_lot 6\n","exit\n"])
        console.log(response,'response');
    });
});