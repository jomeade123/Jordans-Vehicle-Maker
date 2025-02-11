// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";


// define the Cli class
class Cli {
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  // TODO: You will need to use the Union operator to define additional types for the array
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  vehicles: (Truck | Car | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;


  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Truck | Car | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return 'VIN' + Math.floor(Math.random() * 1000000);
  }


  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'What type of vehicle do you want to choose?',
          choices: this.vehicles.map(vehicle => { return { name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`, value: vehicle.vin }; }),
        },
      ])
      .then((answers) => {

        if (answers) {
          this.selectedVehicleVin = answers.vehicleType;
          console.log('Selected vehicle:', this.selectedVehicleVin);
          this.performActions();
        }
        //if statement instead


      })
      .catch(error => {
        console.error('Error selecting vehicle type:', error);
      });
  }

  // set the selectedVehicleVin to the vin of the selected vehicle


  // perform actions on the selected vehicle


  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ['Car' , 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {


        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        }
        else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        }
        else if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
        // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type
      });

  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        console.log(car);
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.startCli();
      })
    }

  // method to create a truck
  createTruck(): void {
        inquirer
      .prompt([
          {
            type: 'input',
            name: 'color',
            message: 'Enter Color',
          },
          {
            type: 'input',
            name: 'make',
            message: 'Enter Make',
          },
          {
            type: 'input',
            name: 'model',
            message: 'Enter Model',
          },
          {
            type: 'input',
            name: 'year',
            message: 'Enter Year',
          },
          {
            type: 'input',
            name: 'weight',
            message: 'Enter Weight',
          },
          {
            type: 'input',
            name: 'topSpeed',
            message: 'Enter Top Speed',
          },
          {
            type: 'input',
            name: 'wheelDiameter',
            message: 'Enter Wheel Diameter',
          },
          {
            type: 'input',
            name: 'wheelBrand',
            message: 'Enter Wheel Brand',
          },
          {
            type: 'input',
            name: 'towingCapacity',
            message: 'Enter Towing Capacity',
          },
        ])
          .then((answers) => {
            const truck = new Truck(
              Cli.generateVin(),
              answers.color,
              answers.make,
              answers.model,
              parseInt(answers.year),
              parseInt(answers.weight),
              parseInt(answers.topSpeed),
              [parseInt(answers.wheelDiameter), answers.wheelBrand],
              parseInt(answers.towingCapacity),
            );
            this.vehicles.push(truck);
            this.selectedVehicleVin = truck.vin;
            this.performActions();
          });
      }

// method to create a motorbike
createMotorbike(): void {
        inquirer
      .prompt([
          {
            type: 'input',
            name: 'color',
            message: 'Enter Color',
          },
          {
            type: 'input',
            name: 'make',
            message: 'Enter Make',
          },
          {
            type: 'input',
            name: 'model',
            message: 'Enter Model',
          },
          {
            type: 'input',
            name: 'year',
            message: 'Enter Year',
          },
          {
            type: 'input',
            name: 'weight',
            message: 'Enter Weight',
          },
          {
            type: 'input',
            name: 'topSpeed',
            message: 'Enter Top Speed',
          },
          {
            type: 'input',
            name: 'frontWheelDiameter',
            message: 'Enter Front Wheel Diameter',
          },
          {
            type: 'input',
            name: 'frontWheelBrand',
            message: 'Enter Front Wheel Brand',
          },
          {
            type: 'input',
            name: 'rearWheelDiameter',
            message: 'Enter Rear Wheel Diameter',
          },
          {
            type: 'input',
            name: 'rearWheelBrand',
            message: 'Enter Rear Wheel Brand',
          },
        ])
          .then((answers) => {
            const motorbike = new Motorbike(
              Cli.generateVin(),
              answers.color,
              answers.make,
              answers.model,
              parseInt(answers.year),
              parseInt(answers.weight),
              parseInt(answers.topSpeed),
              [parseInt(answers.frontWheelDiameter), answers.frontWheelBrand],
            );
            this.vehicles.push(motorbike);
            this.selectedVehicleVin = motorbike.vin;
            this.performActions();
            // TODO: Use the answers object to pass the required properties to the Motorbike constructor
            // TODO: push the motorbike to the vehicles array
            // TODO: set the selectedVehicleVin to the vin of the motorbike
            // TODO: perform actions on the motorbike
          });
      }


// method to find a vehicle to tow
// TODO: add a parameter to accept a truck object
findVehicleToTow(): void {
        inquirer
      .prompt([
          {
            type: 'list',
            name: 'vehicleToTow',
            message: 'Select a vehicle to tow',
            choices: this.vehicles.map((vehicle) => {
              return {
                name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                value: vehicle,
              };
            }),
          },
        ])
          .then((answers) => {
            // TODO: check if the selected vehicle is the truck
            // TODO: if it is, log that the truck cannot tow itself then perform actions on the truck to allow the user to select another action
            const selectedTruck: Truck = this.vehicles.find((vehicle: Car | Truck | Motorbike) => vehicle.vin === this.selectedVehicleVin) as Truck;
    if (selectedTruck instanceof Truck) {
      if (answers.vehicleToTow.vin === selectedTruck.vin) {
        console.log("The truck cannot tow itself.");
        this.performActions();
      } else {
        selectedTruck.tow(answers.vehicleToTow);
        this.performActions();
      }
    }
            // TODO: if it is not, tow the selected vehicle then perform actions on the truck to allow the user to select another action
          });
      }


    // method to perform actions on a vehicle
    performActions(): void {
      inquirer
    .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
        .then((answers: { action: string }) => {
          if (answers.action === 'Print details') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].printDetails();
              }
            }
          } else if (answers.action === 'Start vehicle') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].start();
              }
            }
          } else if (answers.action === 'Accelerate 5 MPH') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].accelerate(5);
              }
            }
          } else if (answers.action === 'Decelerate 5 MPH') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].decelerate(5);
              }
            }
          } else if (answers.action === 'Stop vehicle') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].stop();
              }
            }
          } else if (answers.action === 'Turn right') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].turn('right');
              }
            }
          } else if (answers.action === 'Turn left') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].turn('left');
              }
            }
          } else if (answers.action === 'Reverse') {
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].reverse();
              }
            }
          } else if (answers.action === 'Select or create another vehicle') {
            const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow();
              return;
            } else if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            }
            this.startCli();
            return;
          } else {
            this.exit = true;
          }
          if (!this.exit) {
            this.performActions();
          }
        });
    }

    // method to start the cli
    startCli(): void {
      inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
        .then((answers) => {
          // check if the user wants to create a new vehicle or select an existing vehicle
          if (answers.CreateOrSelect === 'Create a new vehicle') {
            this.createVehicle();
          } else {
            this.chooseVehicle();
          }
        });
    }

  }
    // export the Cli class
    export default Cli;