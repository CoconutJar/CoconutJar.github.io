export class Fireball{
    constructor(velocity, mesh, scene){
        this.velocity = velocity;
        this.mesh = mesh;
        this.scene = scene;
        this.time = 0;
        this.rot = Math.random() * .03;
        this.ran = Math.floor(Math.random() * 3);
        this.value = 0.015;
    }

    // Time is used as variable for distance traveled
    update(){
        this.time ++;

        if(this.time >500 && this.value > 0.01){
            this.value = 0.01;
            this.rot = this.rot*2;
        }

        console.log(this.ran);
    
        switch(this.ran){
            case(0):{
                this.mesh.rotation.x += this.rot;
                this.mesh.translateX(this.value * this.velocity);
            }
            case(1):{
                this.mesh.rotation.y += this.rot;
                this.mesh.translateX(this.value * this.velocity);
            }
            case(2):{
                this.mesh.rotation.z += this.rot;
                this.mesh.translateX(this.value * this.velocity);
            }
        }

        if(this.mesh.position.x > 100 || this.mesh.position.x < -100 ||
                this.mesh.position.y > 100 || this.mesh.position.y < -100 ||
                this.mesh.position.z > 100 || this.mesh.position.z < -100 || this.time >550) {

            this.scene.remove(this.mesh);
            console.log("removed fireball");
            return 1;
        }
        return 0;
    }
}