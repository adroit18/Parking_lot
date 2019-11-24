// import { PARKING_ENGINE_COMMANDS } from "../../utils";
var cmd = require('./cmd');
const { exec, spawn } = require('child_process');
var path = require('path');
// import ParkingEngine from '../../main/ParkingEngine/ParkingEngine';
// ${path.join(__dirname,'../../../build/index.js')}

describe("Parker Engine Test", () => {
    it("full integration test", async() => {
        const inputs = [
            "create_parking_lot 6\n",
            "park KA-01-HH-1234 White\n",
            "park KA-01-HH-9999 White\n",
            "park KA-01-BB-0001 Black\n",
            "park KA-01-HH-7777 Red\n",
            "park KA-01-HH-2701 Blue\n",
            "park KA-01-HH-3141 Black\n",
            "leave 4\n",
            "status\n",
            "park KA-01-P-333 White\n",
            "park DL-12-AA-9999 White\n",
            "registration_numbers_for_cars_with_colour White\n",
            "slot_numbers_for_cars_with_colour White\n",
            "slot_number_for_registration_number KA-01-HH-3141\n",
            "slot_number_for_registration_number MH-04-AY-1111\n"
        ];
        const expectedOut = [
            "Created a parking lot with 6 slots",
            "Allocated slot number: 1",
            "Allocated slot number: 2",
            "Allocated slot number: 3",
            "Allocated slot number: 4",
            "Allocated slot number: 5",
            "Allocated slot number: 6",
            "Slot number 4 is free",
            "Slot No.    Registration No    Colour",
            "1           KA-01-HH-1234      White",
            "2           KA-01-HH-9999      White",
            "3           KA-01-BB-0001      Black",
            "5           KA-01-HH-2701      Blue",
            "6           KA-01-HH-3141      Black",
            "Allocated slot number: 4",
            "Sorry, parking lot is full",
            "KA-01-HH-1234, KA-01-HH-9999, KA-01-P-333",
            "1, 2, 4",
            "6",
            "Not found,"
        ]
        const response = await cmd.execute(
            `${path.join(__dirname,'../../../build/index.js')}`,
            [],
            inputs);
        const formattedResp = response.split("\n").join();
        expect(formattedResp).toBe(expectedOut.join());
    });
});