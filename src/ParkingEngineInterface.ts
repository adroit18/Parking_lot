
interface ParkingEngineInterface {
    startParker():void
}
interface ParkingEngineConstructor {
    new (): ParkingEngineInterface;
}
export  {
    ParkingEngineConstructor,
    ParkingEngineInterface
}