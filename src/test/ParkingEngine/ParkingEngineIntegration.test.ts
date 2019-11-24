// import { PARKING_ENGINE_COMMANDS } from "../../utils";
var cmd = require('./childProcessHelper.js');
const { exec, spawn } = require('child_process');
var path = require('path');
// import ParkingEngine from '../../main/ParkingEngine/ParkingEngine';
// ${path.join(__dirname,'../../../build/index.js')}

describe("Parker Engine Test", () => {
    console.log("********** RUNNING INTEGRATION TEST **********");
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
    it("integration test for parking full", async() => {
        const inputs = [
            "create_parking_lot 2\n",
            "park KA-01-HH-1234 White\n",
            "park KA-01-HH-9999 White\n",
            "leave 1\n",
            "park KA-01-HH-9994 Red\n",
            "status\n",
            "park KA-01-HH-9995 Violet\n",
        ];
        const expectedOut = [
            "Created a parking lot with 2 slots",
            "Allocated slot number: 1",
            "Allocated slot number: 2",
            "Slot number 1 is free",
            "Allocated slot number: 1",
            "Slot No.    Registration No    Colour",
            "1           KA-01-HH-9994      Red",
            "2           KA-01-HH-9999      White",
            "Sorry, parking lot is full,",
        ]
        const response = await cmd.execute(
            `${path.join(__dirname,'../../../build/index.js')}`,
            [],
            inputs);
        const formattedResp = response.split("\n").join();
        expect(formattedResp).toBe(expectedOut.join());
    });
    it("integration Registration Number for cars with color update", async() => {
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
            "leave 2\n",
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
            "Slot number 2 is free",
            "1, 4",
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
    it("integration test for final exit", async() => {
        const inputs = [
            "create_parking_lot 2\n",
            "park KA-01-HH-1234 White\n",
            "park KA-01-HH-9999 White\n",
            "leave 1\n",
            "park KA-01-HH-9994 Red\n",
            "status\n",
            "exit\n",
        ];
        const expectedOut = [
            "Created a parking lot with 2 slots",
            "Allocated slot number: 1",
            "Allocated slot number: 2",
            "Slot number 1 is free",
            "Allocated slot number: 1",
            "Slot No.    Registration No    Colour",
            "1           KA-01-HH-9994      Red",
            "2           KA-01-HH-9999      White,",
        ]
        const response = await cmd.execute(
            `${path.join(__dirname,'../../../build/index.js')}`,
            [],
            inputs);
        const formattedResp = response.split("\n").join();
        expect(formattedResp).toBe(expectedOut.join());
    });
    it("integration test Invalid Commands", async() => {
        const inputs = [
            "not a valid command\n",
            "create_parking_lot 0\n",
            "park KA-01-HH-9999 White\n",
            "leave 1\n",
            "park KA-01-HH-9994 Red\n",
            "status\n",
            "create_parking_lot -2\n",
            "park -2\n",
            "park green\n",
            "exit"
        ];
        const expectedOut = [
            "Please Enter a valid command",
            "Please enter number greater than zero",
            "Please initialise a parking area first",
            "Please initialise a parking area first",
            "Please initialise a parking area first",
            "Please initialise a parking area first",
            "Please enter number greater than zero",
            "Please Enter a valid command",
            "Please Enter a valid command,",
        ]
        const response = await cmd.execute(
            `${path.join(__dirname,'../../../build/index.js')}`,
            [],
            inputs);
        const formattedResp = response.split("\n").join();
        expect(formattedResp).toBe(expectedOut.join());
    });
    it("integration test Not Found Cases", async() => {
        const inputs = [
            "create_parking_lot 4\n",
            "registration_numbers_for_cars_with_colour green\n",
            "slot_numbers_for_cars_with_colour red\n",
            "slot_number_for_registration_number 121\n",
            "park KA-01-HH-9994 Red\n",
            "park KA-01-HH-1234 White\n",
            "park KA-01-HH-1235 Red\n",
            "registration_numbers_for_cars_with_colour Red\n",
            "slot_numbers_for_cars_with_colour Red\n",
            "slot_number_for_registration_number KA-01-HH-1235\n",
            "exit"
        ];
        const expectedOut = [
            "Created a parking lot with 4 slots",
            "Not found",
            "Not found",
            "Not found",
            "Allocated slot number: 1",
            "Allocated slot number: 2",
            "Allocated slot number: 3",
            "KA-01-HH-9994, KA-01-HH-1235",
            "1, 3",
            "3,"
        ]
        const response = await cmd.execute(
            `${path.join(__dirname,'../../../build/index.js')}`,
            [],
            inputs);
        const formattedResp = response.split("\n").join();
        expect(formattedResp).toBe(expectedOut.join());
    });
});