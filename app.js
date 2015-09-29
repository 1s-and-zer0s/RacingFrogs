var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
//No need to change anything above this line.

function MainController() {
    var vm = this; //instead of using this when refering to the controller, let's use vm. It will make things easier.
    
    vm.joe = new guyConstructor("Joe", 100);
    vm.bob = new guyConstructor("Bob", 150);
    vm.bank = 200;

    function guyConstructor(name, startingCash) {

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


