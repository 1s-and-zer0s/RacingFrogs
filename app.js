var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
app.service('RacingService', RacingService);
//No need to change anything above this line.

function RacingService(){
    
}

function MainController() {
    var vm = this; //instead of using this when refering to the controller, let's use vm. It will make things easier.
    
    vm.joe = new GuyConstructor("Joe", 100);
    vm.bob = new GuyConstructor("Bob", 150);
    vm.bank = 200;
    
    vm.frogList = [];
    
    function FrogConstructor(laneNum, name, posX){  
        this.laneNum = laneNum;
        this.name = name;
        this.posX = posX;
    }
    
     vm.addFrogToList = function (frog){
        vm.frogList.push(frog);
    }
    
    vm.race = function race(){
        vm.frogList.forEach(function(frog){
            frog.posX += Math.random();
        })
    }
    
    function moveFrogs(){
        for (var i = 0; i < vm.race.length; i++){
            var frog = vm.race[i];
            frog.posX += Math.floor(Math.random() * 10);
        }
    }
    
    function checkWinners(){
        vm.winners = [];
        vm.race.forEach(function(frog){
            if(frog.posX >= finishLine){
                vm.winners.push(frog);
            }
        })
        if(vm.winners.length > 0){
            vm.racing = false;
            
        }
    }
    
    function testing (){
        var frog1 = new FrogConstructor(1, "Bill", 1);
        var frog2 = new FrogConstructor(2,"Frank", 1);
        var frog3 = new FrogConstructor(3, "Hermit", 1);
        vm.addFrogToList(frog1);
        vm.addFrogToList(frog2);
        vm.addFrogToList(frog3);
    }
    testing();
    
    
    
    

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

