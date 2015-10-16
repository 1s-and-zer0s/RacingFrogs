var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
app.service('RacingService', RacingService);
//No need to change anything above this line.

function RacingService() {
    this.addTwoNumbers = function (x, y) {
        return x + y;
    }
}

function MainController($timeout, RacingService) {
    var vm = this; //instead of using 'this' when refering to the controller, we use vm. It is necessary.
    
    vm.frogList = [];
    var frogLimit = 7;

    var finishLine = 94;

    function FrogConstructor(laneNum, name, posX) { //creates a frog object with properties - laneNum, name, & posX
        this.laneNum = laneNum;
        this.name = name;
        this.posX = posX;
    }

    vm.addFrogToList = function (frogname) { 
        if (vm.frogList.length === frogLimit || !vm.frogName) {
            return;
        }
        var newlaneNum = vm.frogList.length + 1;
        vm.frogList.push(new FrogConstructor(newlaneNum, frogname, 1));
        vm.frogName = '';
    }

    vm.race = function race() {
        vm.frogList.forEach(function (frog) {
            frog.posX += Math.random();
        })
    }

    function moveFrogs() {
        checkWinners();
        if (vm.racing) {
            var indexOfFrogToMove = Math.floor(Math.random() * vm.frogList.length);
            vm.frogList[indexOfFrogToMove].posX += Math.random() * 3;
            $timeout(moveFrogs, 50)
        }
    }

    vm.startRace = function () {
        vm.racing = true;
        moveFrogs();
    }

    function checkWinners() {
        var potentialWinners = [];
        vm.winners = [];
        vm.frogList.forEach(function (frog) {
            if (frog.posX >= finishLine) { //if a frog's position in the frog list is past the finish line
                potentialWinners.push(frog); //put that frog into the potential winners array
            }
        });
        if (potentialWinners.length > 0) {
            var firstToCross = 0;
            var firstPlace;
            potentialWinners.forEach(function (frog) {
                if (frog.posX > firstToCross) {
                    firstToCross = frog.posX;
                    firstPlace = frog;
                } else {
                    vm.winners.push(frog);
                }
            });
            vm.winners.unshift(firstPlace);
            vm.racing = false;
        } else {
            vm.winners = potentialWinners;
        }
    }

    vm.reset = function () {
        vm.frogList.forEach(function (frog) {
            frog.posX = 1;
        });
    }

    vm.joe = new GuyConstructor("Joe", 100);
    vm.bob = new GuyConstructor("Bob", 150);
    vm.bank = 200;

    function GuyConstructor(name, startingCash) {

        this.name = name;
        this.cash = startingCash;

        this.giveCash = function (cashGuyGives) {
            if (cashGuyGives <= this.cash && cashGuyGives > 0) {
                this.cash = this.cash - cashGuyGives;
                return cashGuyGives;
            }
            else {
                console.log("'I don't have enough cash to give you " + cashGuyGives + " dollars.' " + this.name + " says.");
            }
        };
        this.receiveCash = function (cashGuyReceives) {
            if (cashGuyReceives > 0) {
                this.cash = this.cash + cashGuyReceives;
                return cashGuyReceives;
            }
            else {
                alert("'" + cashGuyReceives + " dollars isn't an amount I'll take.' " + this.name + " says.");
                return 0;
            }
        }
    }

    vm.giveMoneyToJoe = function () {
        if (vm.bank >= 10) {
            vm.bank -= vm.joe.receiveCash(10)
        }
        else {
            alert("The bank is out of money. Time for a government bailout.");
        }
    }

    vm.receiveMoneyFromBob = function () {
        if (vm.bob.cash > 0) {
            vm.bank += vm.bob.giveCash(5)
        }
        else {
            alert("You took all Bob's money you greedy banker!");
        }
    }
}






