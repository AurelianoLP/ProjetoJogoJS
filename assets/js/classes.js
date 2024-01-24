
// tamplete personagem padrão
class Character{

    _life = 1;
    maxLife = 1;
    attack = 0;
    defesa = 0;

    constructor(name){
        this.name = name;
    }

    // pegar a vida
    get life(){
        return this._life;
    }

    // colocar um novo valor, a barra de vida não pode ficar menor 
    // que 0, fazemos a verificação se newlife for menor que 0, retorna 0, senão coloca o novo valor  
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife
    }
}

//criando um gerreiro com caracteristicas proprias, extendendo da class character
class Knight extends Character{
    constructor(name){
        super(name)
        this.life = 100;
        this.attack = 10;
        this.defesa = 8;
        this.maxLife = this.life
    }
}
// criando um mago
class Sorcerer extends Character{
    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defesa = 3;
        this.maxLife = this.life

    }
}
//criando um mostro
class LittleMonster extends Character{
    constructor(){
        super('Little Monster')
        this.life = 40;
        this.attack = 4;
        this.defesa = 4;
        this.maxLife = this.life
    }
}

//mostro maior
class BigMonster extends Character{
    constructor(){
        super('Big Monster')
        this.life = 120;
        this.attack = 16;
        this.defesa = 6;
        this.maxLife = this.life
    }
}

//montando um cenario, dois lutadore e dois elementos
class Stage{
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject ){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;

    }

    start(){
        this.update();
        //todo evento do botão de atacar
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))

    }

    update(){
        //fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`; 
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100; //calculo da porcentagem na barra de vida
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`
        
        //fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`; 
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100; //calculo da porcentagem na barra de vida
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    //função atacar

    doAttack(attracking, attacked){ 
        if(attracking.life <= 0 || attacked.life <= 0 ){
            this.log.addMessage ('atacando cachorro morto');
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attracking.attack * attackFactor;
        let actualDefense = attacked.defesa * defenseFactor;

        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.log.addMessage (`${attracking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        }
        else{
            this.log.addMessage (`${attacked.name} conseguiu defender`)
        }

        this.update()
    }

}

class Log{
    list = []

    constructor(listEL){
        this.listEL = listEL
    }

    addMessage(msg){
        this.list.unshift(msg)
        this.render()
    }

    render(){
        this.listEL.innerHTML = '';

        for(let i in this.list){
            this.listEL.innerHTML += `<li>${this.list[i]}<li>`
        }
    }
}